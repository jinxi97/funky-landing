import Stripe from "stripe";
import {
  handleInvoicePaymentFailed,
  handleInvoicePaymentSucceeded,
  handleSubscriptionCanceled,
  handleSubscriptionResumed,
} from "../../lib/user-subscriptions";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request) {
  if (!webhookSecret) {
    return Response.json({ received: false }, { status: 400 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ received: false }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return Response.json({ received: false }, { status: 400 });
  }

  switch (event.type) {
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId =
        typeof invoice.customer === "string" ? invoice.customer : null;

      if (customerId) {
        await handleInvoicePaymentSucceeded(customerId);
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId =
        typeof invoice.customer === "string" ? invoice.customer : null;

      if (customerId) {
        await handleInvoicePaymentFailed(customerId);
      }
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;

      console.log("Stripe webhook: customer.subscription.updated", subscription);

      if (subscription.cancel_at && customerId) {
        await handleSubscriptionCanceled(customerId, subscription.cancel_at);
      }

      if (!subscription.cancel_at && subscription.trial_end && customerId) {
        await handleSubscriptionResumed(customerId, subscription.trial_end);
      }
      break;
    }
    default:
      break;
  }

  return Response.json({ received: true }, { status: 200 });
}
