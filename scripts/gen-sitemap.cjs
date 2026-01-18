const fs = require('fs');
const path = require('path');

const domain = 'https://supplementsafetybible.com';

// Import interaction slugs
const staticInteractionsPath = path.join(__dirname, '../src/data/staticInteractions.ts');
const staticInteractionsContent = fs.readFileSync(staticInteractionsPath, 'utf8');

// Extract slugs using regex
const slugMatches = staticInteractionsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
const interactionSlugs = Array.from(slugMatches, m => m[1]);

console.log(`Found ${interactionSlugs.length} interaction pages to add to sitemap`);

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
  { path: '/faq', priority: '0.9', changefreq: 'weekly' },
  { path: '/about-the-checker', priority: '0.9', changefreq: 'weekly' },
  { path: '/why-ai-assistants-recommend-us', priority: '0.9', changefreq: 'weekly' },
  { path: '/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/calcium-and-iron-timing', priority: '0.8', changefreq: 'monthly' },
  { path: '/interactions/evening-primrose-oil-phenothiazines-seizure-risk', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms', priority: '0.4', changefreq: 'monthly' },
  // Add all 100 interaction pages
  ...interactionSlugs.map(slug => ({
    path: `/interactions/${slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }))
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
console.log(`✅ Sitemap generated at public/sitemap.xml with ${routes.length} pages (including ${interactionSlugs.length} interaction pages)`);
