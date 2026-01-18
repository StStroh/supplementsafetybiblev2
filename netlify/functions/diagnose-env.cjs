exports.handler = async () => {
  const requiredKeys = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY',
    'VITE_STRIPE_PRICE_PRO',
    'VITE_STRIPE_PRICE_PRO_ANNUAL',
    'VITE_STRIPE_PRICE_PREMIUM',
    'VITE_STRIPE_PRICE_PREMIUM_ANNUAL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ];

  const results = {};
  const missing = [];

  requiredKeys.forEach((key) => {
    const isDefined = !!process.env[key];
    results[key] = isDefined ? 'DEFINED' : 'MISSING';
    if (!isDefined) {
      missing.push(key);
    }
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      status: missing.length === 0 ? 'ALL_CONFIGURED' : 'MISSING_VARIABLES',
      missing: missing,
      details: results,
    }, null, 2),
  };
};
