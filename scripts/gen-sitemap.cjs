const fs = require('fs');
const path = require('path');

const domain = 'https://supplementsafetybible.com';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/search', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
  { path: '/premium', priority: '0.8', changefreq: 'weekly' },
  { path: '/premium/thanks', priority: '0.3', changefreq: 'monthly' },
  { path: '/premium/dashboard', priority: '0.5', changefreq: 'monthly' },
  { path: '/check', priority: '0.9', changefreq: 'daily' },
  { path: '/account', priority: '0.5', changefreq: 'monthly' },
  { path: '/auth', priority: '0.5', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms', priority: '0.4', changefreq: 'monthly' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log('✅ Sitemap generated at public/sitemap.xml');
