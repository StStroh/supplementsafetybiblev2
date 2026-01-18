import { Quote, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getTestimonialsForUser, verifiedBadge, type Testimonial } from '../data/testimonials';
import { getSchemaScript } from '../lib/testimonialSchema';
import { useIsPremium } from '../lib/useAuth';
import { useState, useEffect } from 'react';

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star
        key={i}
        className="w-5 h-5 fill-amber-400 text-amber-400"
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const TestimonialCard = ({
  testimonial
}: {
  testimonial: Testimonial;
}) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col h-full relative overflow-hidden group">
    <div className="absolute top-6 right-6 text-slate-100 group-hover:text-slate-200 transition-colors duration-300">
      <Quote className="w-12 h-12" strokeWidth={1.5} />
    </div>

    <div className="relative z-10">
      <StarRating count={testimonial.rating} />

      <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-snug">
        {testimonial.title}
      </h3>

      <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
        {testimonial.text}
      </p>

      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">
            — {testimonial.name !== 'Anonymous' ? testimonial.name : testimonial.attribution}
          </p>
          {testimonial.verified && (
            <div
              className="flex items-center gap-1 text-blue-600"
              title={verifiedBadge.tooltip}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium">{verifiedBadge.label}</span>
            </div>
          )}
        </div>
        {testimonial.name !== 'Anonymous' && (
          <p className="text-xs text-slate-400 mt-1">{testimonial.attribution}</p>
        )}
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const isPremium = useIsPremium();
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);
  const [rotationSeed] = useState(() => Math.floor(Date.now() / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    const testimonials = getTestimonialsForUser(isPremium, rotationSeed);
    setDisplayedTestimonials(testimonials);
  }, [isPremium, rotationSeed]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {getSchemaScript()}
        </script>
      </Helmet>

      <section className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4 letter-spacing-wide">
              Trusted by safety-conscious users and professionals
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-16 leading-tight">
              "This tool changed how I check interactions."
            </h2>
          </div>

          <div className={`grid grid-cols-1 ${displayedTestimonials.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 lg:gap-8 mb-12`}>
            {displayedTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>

          <div className="text-center space-y-4">
            <Link
              to="/check"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 group"
            >
              <span>See how the safety checker works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              {verifiedBadge.disclaimer}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
