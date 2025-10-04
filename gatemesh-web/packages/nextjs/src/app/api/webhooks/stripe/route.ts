import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);
        
        if (session.mode === 'payment') {
          // Handle one-time payment (hardware purchase)
          await handleHardwarePurchase(session);
        } else if (session.mode === 'subscription') {
          // Handle subscription creation
          await handleSubscriptionCreated(session);
        }
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice.id);
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', invoice.id);
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subscription.id);
        await handleSubscriptionCancelled(subscription);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleHardwarePurchase(session: Stripe.Checkout.Session) {
  // TODO: Implement hardware purchase handling
  // - Create order record in database
  // - Send order confirmation email
  // - Trigger fulfillment process
  console.log('Processing hardware purchase:', {
    sessionId: session.id,
    customerEmail: session.customer_details?.email,
    totalAmount: session.amount_total,
    metadata: session.metadata,
  });
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  // TODO: Implement subscription creation handling
  // - Create/update user account
  // - Set subscription tier
  // - Send welcome email
  console.log('Processing subscription creation:', {
    sessionId: session.id,
    subscriptionId: session.subscription,
    customerEmail: session.customer_details?.email,
    metadata: session.metadata,
  });
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // TODO: Implement invoice payment success handling
  // - Update subscription status
  // - Send payment confirmation
  console.log('Processing successful payment:', {
    invoiceId: invoice.id,
    subscriptionId: (invoice as any).subscription,
    amount: invoice.amount_paid,
  });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  // TODO: Implement invoice payment failure handling
  // - Send payment failure notification
  // - Update subscription status
  // - Trigger dunning process
  console.log('Processing failed payment:', {
    invoiceId: invoice.id,
    subscriptionId: (invoice as any).subscription,
    amount: invoice.amount_due,
  });
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  // TODO: Implement subscription cancellation handling
  // - Update user access level
  // - Schedule data retention
  // - Send cancellation confirmation
  console.log('Processing subscription cancellation:', {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
  });
}