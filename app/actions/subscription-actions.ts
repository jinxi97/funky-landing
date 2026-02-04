'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePriceId = process.env.STRIPE_PRICE_ID;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2026-01-28.clover'
});

export async function manageSubscription() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    redirect('/one-click-openclawd/sign-up');
  }

  const pool = await getPool();
  const { rows } = await pool.query(
    `SELECT stripe_customer_id, subscribed, expired_at
     FROM user_subscriptions
     WHERE email = $1
     LIMIT 1`,
    [email]
  );

  const customerId = rows[0]?.stripe_customer_id;
  const subscribed = Boolean(rows[0]?.subscribed);
  const expiredAt = rows[0]?.expired_at as Date | null | undefined;

  if (!customerId) {
    throw new Error('Stripe customer ID not found for user.');
  }

  const origin = (await headers()).get('origin');
  const baseUrl = origin ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const returnUrl = `${baseUrl}/one-click-openclawd/app`;

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 100
  });
  const activeStatuses = new Set([
    'active',
    'trialing',
    'past_due',
    'unpaid'
  ]);
  const hasSubscription = subscriptions.data.some((subscription) =>
    activeStatuses.has(subscription.status)
  );

  if (hasSubscription) {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    });

    redirect(portalSession.url);
  }

  if (!stripePriceId) {
    throw new Error('STRIPE_PRICE_ID is not set');
  }

  const trialEndUnix = expiredAt
    ? Math.floor(new Date(expiredAt).getTime() / 1000)
    : undefined;
  const nowUnix = Math.floor(Date.now() / 1000);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: stripePriceId, quantity: 1 }],
    subscription_data:
      trialEndUnix && trialEndUnix > nowUnix
        ? { trial_end: trialEndUnix }
        : undefined,
    success_url: `${returnUrl}?checkout=success`,
    cancel_url: `${returnUrl}?checkout=cancel`
  });

  if (checkoutSession.url) {
    redirect(checkoutSession.url);
  }

  throw new Error('Stripe checkout session URL is missing');
}
