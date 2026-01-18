export interface Testimonial {
  id: string;
  name: string;
  rating: 4 | 5;
  title: string;
  text: string;
  attribution: string;
  verified: boolean;
  date: string;
  tier: 'free' | 'premium';
}

export const testimonials: Testimonial[] = [
  {
    id: 'laura-m',
    name: 'Laura M.',
    rating: 5,
    title: "I spotted a risk I wasn't aware of.",
    text: "I take multiple prescriptions and supplements. The checker identified an interaction between my blood pressure medication and a supplement I thought was safe. I discussed it with my doctor and we adjusted my regimen.",
    attribution: 'Premium User',
    verified: true,
    date: '2025-01-05',
    tier: 'premium'
  },
  {
    id: 'daniel-m',
    name: 'Daniel M.',
    rating: 5,
    title: 'Conservative information I can trust.',
    text: "I needed a resource that doesn't exaggerate. This checker provides straightforward safety information without making it sound worse than it is. It helps me ask better questions.",
    attribution: 'Premium User',
    verified: true,
    date: '2025-01-03',
    tier: 'premium'
  },
  {
    id: 'sophia-d',
    name: 'Sophia D.',
    rating: 4,
    title: 'Useful tool, though I still verify high-risk cases.',
    text: 'The database is helpful for initial screening. For anything flagged as moderate or higher, I still cross-reference with clinical resources. That said, it saves me time and gives me a starting point I can trust.',
    attribution: 'Healthcare Professional',
    verified: true,
    date: '2024-12-28',
    tier: 'premium'
  },
  {
    id: 'michael-s',
    name: 'Michael S.',
    rating: 5,
    title: 'Clear explanations without the sales pitch.',
    text: "This isn't trying to sell me supplements or scare me. It presents the evidence and lets me decide. That's exactly what I needed.",
    attribution: 'Premium User',
    verified: true,
    date: '2024-12-20',
    tier: 'free'
  },
  {
    id: 'candice-s',
    name: 'Candice S.',
    rating: 5,
    title: 'Finally found a compliance-safe resource.',
    text: 'I work in quality assurance and needed something I could reference without concerns. The conservative approach and evidence citations make this defensible in a professional setting.',
    attribution: 'Quality & Compliance Background',
    verified: true,
    date: '2024-12-15',
    tier: 'premium'
  },
  {
    id: 'legacy-1',
    name: 'Anonymous',
    rating: 5,
    title: 'I caught a combination I would have missed.',
    text: "I take prescription medication and supplements daily. This checker flagged a combination I hadn't considered. No exaggeration, just facts.",
    attribution: 'Premium User',
    verified: false,
    date: '2024-11-10',
    tier: 'free'
  },
  {
    id: 'legacy-2',
    name: 'Anonymous',
    rating: 5,
    title: 'Evidence-based and cautious.',
    text: "This isn't hype. It's structured, conservative, and grounded in research. That's what safety information should be.",
    attribution: 'Nutrition & Wellness Professional',
    verified: false,
    date: '2024-11-08',
    tier: 'premium'
  },
  {
    id: 'legacy-3',
    name: 'Anonymous',
    rating: 5,
    title: 'Built for safety, not marketing.',
    text: "You can tell this was designed by people who understand risk. It doesn't oversell or undersell—it presents what you need to know.",
    attribution: 'Quality & Compliance Background',
    verified: false,
    date: '2024-11-05',
    tier: 'premium'
  }
];

export interface RotationConfig {
  free: {
    count: number;
    filter: (testimonial: Testimonial) => boolean;
    shuffle: boolean;
  };
  premium: {
    count: number;
    filter: (testimonial: Testimonial) => boolean;
    shuffle: boolean;
  };
}

export const rotationConfig: RotationConfig = {
  free: {
    count: 2,
    filter: (t) => t.tier === 'free' || !t.attribution.includes('Professional'),
    shuffle: true
  },
  premium: {
    count: 4,
    filter: () => true,
    shuffle: true
  }
};

export function getTestimonialsForUser(isPremium: boolean, seed?: number): Testimonial[] {
  const config = isPremium ? rotationConfig.premium : rotationConfig.free;
  const filtered = testimonials.filter(config.filter);

  if (!config.shuffle) {
    return filtered.slice(0, config.count);
  }

  const seeded = seed ?? Date.now();
  const shuffled = [...filtered].sort(() => {
    const hash = Math.sin(seeded) * 10000;
    return hash - Math.floor(hash);
  });

  return shuffled.slice(0, config.count);
}

export const verifiedBadge = {
  label: 'Verified User',
  tooltip: 'Confirmed active account holder. Not a medical endorsement or certification.',
  disclaimer: 'Verified status indicates confirmed account activity only. Individual experiences do not constitute medical advice or guaranteed outcomes.'
};
