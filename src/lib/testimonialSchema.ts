import { testimonials } from '../data/testimonials';

export function generateTestimonialSchema() {
  const reviews = testimonials
    .filter(t => t.verified && t.name !== 'Anonymous')
    .map(t => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': t.name
      },
      'datePublished': t.date,
      'reviewBody': `${t.title} ${t.text}`,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': t.rating,
        'bestRating': 5,
        'worstRating': 1
      }
    }));

  const ratingValues = testimonials
    .filter(t => t.verified)
    .map(t => t.rating);

  const averageRating = ratingValues.length > 0
    ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
    : '5.0';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Supplement Safety Bible',
    'description': 'Evidence-based supplement and medication interaction checker for safety-conscious users',
    'brand': {
      '@type': 'Brand',
      'name': 'Supplement Safety Bible'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': averageRating,
      'reviewCount': ratingValues.length,
      'bestRating': 5,
      'worstRating': 1
    },
    'review': reviews
  };

  return schema;
}

export function getSchemaScript(): string {
  const schema = generateTestimonialSchema();
  return JSON.stringify(schema, null, 2);
}
