import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
    })
  : null;

const SUBSCRIPTION_PLANS = {
  basic: {
    monthly: null, // Free plan
    yearly: null,
  },
  professional: {
    monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY,
    yearly: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY,
  },
  enterprise: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY,
    yearly: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY,
  },
};

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 503 }
      );
    }

    const { planId, billingPeriod } = await request.json();
    
    if (!planId || !billingPeriod) {
      return NextResponse.json(
        { error: 'Plan ID and billing period are required' },
        { status: 400 }
      );
    }

    // Handle free plan
    if (planId === 'basic') {
      return NextResponse.json({
        message: 'Free plan selected',
        redirectUrl: '/dashboard',
      });
    }

    const priceId = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]?.[billingPeriod as 'monthly' | 'yearly'];
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or billing period' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?setup=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        plan_id: planId,
        billing_period: billingPeriod,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Subscription checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription checkout session' },
      { status: 500 }
    );
  }
}