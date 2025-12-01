require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const prices = [
  ['PRO_MONTHLY', process.env.STRIPE_PRICE_PRO_MONTHLY],
  ['PRO_ANNUAL', process.env.STRIPE_PRICE_PRO_ANNUAL],
  ['PREMIUM_MONTHLY', process.env.STRIPE_PRICE_PREMIUM_MONTHLY],
  ['PREMIUM_ANNUAL', process.env.STRIPE_PRICE_PREMIUM_ANNUAL]
];

(async () => {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                  STRIPE PRICE AUDIT');
  console.log('═══════════════════════════════════════════════════════════════\n');

  for (const [name, priceId] of prices) {
    if (!priceId) {
      console.log(name + ': (not set)\n');
      continue;
    }
    try {
      const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
      const amount = (price.unit_amount / 100).toFixed(2);
      const interval = price.recurring?.interval || 'one-time';
      const mode = priceId.startsWith('price_test_') ? 'TEST' : 'LIVE';

      console.log(name + ':');
      console.log('  ID: ' + priceId);
      console.log('  Mode: ' + mode);
      console.log('  Amount: $' + amount + ' ' + price.currency.toUpperCase());
      console.log('  Interval: ' + interval);
      console.log('  Nickname: ' + (price.nickname || '(none)'));
      console.log('  Product: ' + (price.product?.name || price.product));
      console.log('');
    } catch (err) {
      console.log(name + ': ERROR - ' + err.message + '\n');
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
})();
