import Stripe from "stripe";
import {
  handleInvoicePaymentFailed,
  handleInvoicePaymentSucceeded,
  handleSubscriptionUpdated,
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
      const isCanceled =
        subscription.status === "canceled" ||
        subscription.cancel_at_period_end === true ||
        Boolean(subscription.cancel_at) ||
        subscription.cancellation_details?.reason === "cancellation_requested" ||
        Boolean(subscription.canceled_at) ||
        Boolean(subscription.ended_at);

      console.log("Stripe webhook: customer.subscription.updated", subscription);
      console.log("Stripe webhook: customer.subscription.updated", { customerId, isCanceled });

      if (customerId) {
        await handleSubscriptionUpdated(customerId, isCanceled);
      }
      break;
    }
    default:
      break;
  }

  return Response.json({ received: true }, { status: 200 });
}
