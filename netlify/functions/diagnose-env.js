export const handler = async () => {
  const requiredKeys = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'PRICE_ID_PRO_MONTHLY',
    'PRICE_ID_PRO_ANNUAL',
    'PRICE_ID_PREMIUM_MONTHLY',
    'PRICE_ID_PREMIUM_ANNUAL',
  ];

  const results = {};

  requiredKeys.forEach((key) => {
    results[key] = !!process.env[key];
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(results, null, 2),
  };
};
