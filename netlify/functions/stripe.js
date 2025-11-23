const Stripe = require('stripe');

exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    console.log('❌ Rejected non-POST request');
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Initialize Stripe with secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = event.headers['stripe-signature'];

  // CRITICAL: Do NOT parse body before verification
  // Stripe signature verification requires raw body
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Webhook signature verified successfully');
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
    };
  }

  // Process the verified event
  try {
    console.log(`📨 Processing event type: ${stripeEvent.type}`);

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        console.log('✅ CHECKOUT SESSION COMPLETED');
        console.log(`   - Session ID: ${session.id}`);
        console.log(`   - Customer ID: ${session.customer}`);
        console.log(`   - Subscription ID: ${session.subscription}`);
        console.log(`   - Amount Total: ${session.amount_total}`);

        // TODO: Update database with subscription details
        // Example: Save subscription_id to user record in Supabase

        break;
      }

      case 'customer.subscription.created': {
        const subscription = stripeEvent.data.object;
        console.log('✅ SUBSCRIPTION CREATED');
        console.log(`   - Subscription ID: ${subscription.id}`);
        console.log(`   - Customer ID: ${subscription.customer}`);
        console.log(`   - Status: ${subscription.status}`);
        console.log(`   - Plan: ${subscription.items.data[0]?.price?.id}`);
        console.log(`   - Current Period End: ${new Date(subscription.current_period_end * 1000).toISOString()}`);

        // TODO: Store subscription in database

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object;
        console.log('✅ SUBSCRIPTION UPDATED');
        console.log(`   - Subscription ID: ${subscription.id}`);
        console.log(`   - Customer ID: ${subscription.customer}`);
        console.log(`   - Status: ${subscription.status}`);
        console.log(`   - Current Period End: ${new Date(subscription.current_period_end * 1000).toISOString()}`);

        // TODO: Update subscription status in database

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;
        console.log('✅ SUBSCRIPTION DELETED (CANCELLED)');
        console.log(`   - Subscription ID: ${subscription.id}`);
        console.log(`   - Customer ID: ${subscription.customer}`);
        console.log(`   - Status: ${subscription.status}`);
        console.log(`   - Cancelled At: ${new Date(subscription.canceled_at * 1000).toISOString()}`);

        // TODO: Mark subscription as cancelled in database

        break;
      }

      case 'invoice.paid': {
        const invoice = stripeEvent.data.object;
        console.log('✅ INVOICE PAID (RENEWAL SUCCESS)');
        console.log(`   - Invoice ID: ${invoice.id}`);
        console.log(`   - Customer ID: ${invoice.customer}`);
        console.log(`   - Subscription ID: ${invoice.subscription}`);
        console.log(`   - Amount Paid: ${invoice.amount_paid}`);
        console.log(`   - Period: ${new Date(invoice.period_start * 1000).toISOString()} to ${new Date(invoice.period_end * 1000).toISOString()}`);

        // TODO: Extend subscription period in database

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        console.log('❌ INVOICE PAYMENT FAILED');
        console.log(`   - Invoice ID: ${invoice.id}`);
        console.log(`   - Customer ID: ${invoice.customer}`);
        console.log(`   - Subscription ID: ${invoice.subscription}`);
        console.log(`   - Amount Due: ${invoice.amount_due}`);
        console.log(`   - Attempt Count: ${invoice.attempt_count}`);

        // TODO: Send notification to customer about failed payment
        // TODO: Update subscription status if needed

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object;
        console.log('✅ PAYMENT INTENT SUCCEEDED');
        console.log(`   - Payment Intent ID: ${paymentIntent.id}`);
        console.log(`   - Customer ID: ${paymentIntent.customer}`);
        console.log(`   - Amount: ${paymentIntent.amount}`);
        console.log(`   - Status: ${paymentIntent.status}`);

        // TODO: Record successful payment in database

        break;
      }

      default:
        console.log(`⚠️  Unhandled event type: ${stripeEvent.type}`);
    }

    // Always return 200 for successfully processed events
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('❌ Error processing webhook:', error.message);
    console.error('   Stack:', error.stack);

    // Return 500 for processing errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};
