const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = event.headers['stripe-signature'];

  // Initialize Supabase Admin client (bypasses RLS)
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        console.log('Checkout session completed:', session.id);
        break;
      }

      case 'customer.subscription.created': {
        const subscription = stripeEvent.data.object;
        console.log('Subscription created:', subscription.id);

        // Get customer details
        const customer = await stripe.customers.retrieve(subscription.customer);
        const priceId = subscription.items.data[0].price.id;

        // Map price ID to role
        let role = 'free';
        if (priceId === process.env.VITE_STRIPE_PRICE_PRO || priceId === process.env.VITE_STRIPE_PRICE_PRO_ANNUAL) {
          role = 'pro';
        } else if (priceId === process.env.VITE_STRIPE_PRICE_PREMIUM || priceId === process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL) {
          role = 'premium';
        }

        console.log('Upserting profile:', {
          email: customer.email,
          role,
          stripe_customer_id: subscription.customer,
        });

        // Upsert profile
        const { error } = await supabaseAdmin
          .from('profiles')
          .upsert({
            email: customer.email,
            stripe_customer_id: subscription.customer,
            role,
            current_period_end: subscription.current_period_end,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'email',
          });

        if (error) {
          console.error('Error upserting profile:', error);
        } else {
          console.log('Profile upserted successfully');
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object;
        console.log('Subscription updated:', subscription.id);

        const customer = await stripe.customers.retrieve(subscription.customer);
        const priceId = subscription.items.data[0].price.id;

        // Map price ID to role
        let role = 'free';
        if (priceId === process.env.VITE_STRIPE_PRICE_PRO || priceId === process.env.VITE_STRIPE_PRICE_PRO_ANNUAL) {
          role = 'pro';
        } else if (priceId === process.env.VITE_STRIPE_PRICE_PREMIUM || priceId === process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL) {
          role = 'premium';
        }

        console.log('Updating profile:', {
          email: customer.email,
          role,
          current_period_end: subscription.current_period_end,
        });

        const { error } = await supabaseAdmin
          .from('profiles')
          .upsert({
            email: customer.email,
            stripe_customer_id: subscription.customer,
            role,
            current_period_end: subscription.current_period_end,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'email',
          });

        if (error) {
          console.error('Error updating profile:', error);
        } else {
          console.log('Profile updated successfully');
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;
        console.log('Subscription deleted:', subscription.id);

        const customer = await stripe.customers.retrieve(subscription.customer);

        console.log('Downgrading profile to free:', customer.email);

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            role: 'free',
            current_period_end: null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', subscription.customer);

        if (error) {
          console.error('Error downgrading profile:', error);
        } else {
          console.log('Profile downgraded to free');
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object;
        console.log('Invoice payment succeeded:', invoice.id);

        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);

          console.log('Updating current_period_end:', {
            customer: invoice.customer,
            current_period_end: subscription.current_period_end,
          });

          const { error } = await supabaseAdmin
            .from('profiles')
            .update({
              current_period_end: subscription.current_period_end,
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', invoice.customer);

          if (error) {
            console.error('Error updating period end:', error);
          } else {
            console.log('Period end updated successfully');
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        console.log('Invoice payment failed:', invoice.id, 'for customer:', invoice.customer);
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};
