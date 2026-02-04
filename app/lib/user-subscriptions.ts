import Stripe from 'stripe';
import { getPool } from './db';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2026-01-28.clover' })
  : null;

export async function ensureUserSubscriptionsTable() {
  const pool = await getPool();
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_subscriptions (
        email TEXT PRIMARY KEY,
        stripe_customer_id TEXT,
        subscribed BOOLEAN NOT NULL DEFAULT FALSE,
        registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expired_at TIMESTAMPTZ
      );
    `);
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('pg_type_typname_nsp_index')) {
      return;
    }
    throw error;
  }
}

export async function createUserSubscriptionIfMissing(email: string) {
  await ensureUserSubscriptionsTable();
  const pool = await getPool();
  await pool.query(
    `INSERT INTO user_subscriptions (email, stripe_customer_id, subscribed, registered_at, expired_at)
     VALUES ($1, '', FALSE, NOW(), NOW() + INTERVAL '7 days')
     ON CONFLICT (email) DO NOTHING`,
    [email]
  );

  if (!stripeClient) {
    console.warn('Stripe secret key missing; skipping customer creation.');
    return;
  }

  const { rows } = await pool.query(
    `SELECT stripe_customer_id FROM user_subscriptions WHERE email = $1 LIMIT 1`,
    [email]
  );

  const existingCustomerId = rows[0]?.stripe_customer_id;
  if (existingCustomerId) {
    return;
  }

  try {
    const customer = await stripeClient.customers.create({ email });
    await pool.query(
      `UPDATE user_subscriptions
       SET stripe_customer_id = $2
       WHERE email = $1 AND (stripe_customer_id IS NULL OR stripe_customer_id = '')`,
      [email, customer.id]
    );
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
  }
}

export async function handleCheckoutSessionCompleted(params: {
  customerId: string;
  email: string;
}) {
  await ensureUserSubscriptionsTable();
  const pool = await getPool();

  await pool.query(
    `UPDATE user_subscriptions
     SET stripe_customer_id = CASE
         WHEN stripe_customer_id IS NULL OR stripe_customer_id = '' THEN $2
         ELSE stripe_customer_id
       END
     WHERE email = $1`,
    [params.email, params.customerId]
  );

  console.log('Stripe checkout.session.completed', {
    customerId: params.customerId,
    email: params.email
  });
}

export async function handleInvoicePaymentSucceeded(customerId: string) {
  await ensureUserSubscriptionsTable();
  const pool = await getPool();

  await pool.query(
    `UPDATE user_subscriptions
     SET subscribed = TRUE,
         expired_at = COALESCE(expired_at, NOW()) + INTERVAL '1 month'
     WHERE stripe_customer_id = $1`,
    [customerId]
  );

  console.log('Stripe invoice.payment_succeeded', { customerId });
}

export async function handleInvoicePaymentFailed(customerId: string) {
  await ensureUserSubscriptionsTable();
  const pool = await getPool();

  await pool.query(
    `UPDATE user_subscriptions
     SET subscribed = FALSE
     WHERE stripe_customer_id = $1`,
    [customerId]
  );

  console.log('Stripe invoice.payment_failed', { customerId });
}

export async function handleSubscriptionUpdated(
  customerId: string,
  isCanceled: boolean
) {
  await ensureUserSubscriptionsTable();
  const pool = await getPool();

  await pool.query(
    `UPDATE user_subscriptions
     SET subscribed = $2
     WHERE stripe_customer_id = $1`,
    [customerId, !isCanceled]
  );

  console.log('Stripe customer.subscription.updated', { customerId, isCanceled });
}
