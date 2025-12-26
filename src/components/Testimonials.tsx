import { Quote, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    rating: 5,
    title: "I caught an interaction I would have completely missed.",
    text: "I take prescription medication and supplements daily. This checker flagged a combination I hadn't even considered.",
    attribution: "Premium User"
  },
  {
    id: 2,
    rating: 5,
    title: "Clear, conservative, and evidence-driven.",
    text: "This isn't hype. It's structured, cautious, and grounded in real research.",
    attribution: "Nutrition & Wellness Professional"
  },
  {
    id: 3,
    rating: 5,
    title: "Finally, something built for safety—not marketing.",
    text: "You can tell this was designed by people who understand risk, not just supplements.",
    attribution: "Quality & Compliance Background"
  }
];

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
  rating,
  title,
  text,
  attribution
}: {
  rating: number;
  title: string;
  text: string;
  attribution: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col h-full relative overflow-hidden group">
    <div className="absolute top-6 right-6 text-slate-100 group-hover:text-slate-200 transition-colors duration-300">
      <Quote className="w-12 h-12" strokeWidth={1.5} />
    </div>

    <div className="relative z-10">
      <StarRating count={rating} />

      <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-snug">
        {title}
      </h3>

      <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
        {text}
      </p>

      <p className="text-sm text-slate-500 font-medium border-t border-slate-100 pt-4">
        — {attribution}
      </p>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4 letter-spacing-wide">
            Trusted by safety-conscious users and professionals
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-16 leading-tight">
            "This tool changed how I combine supplements."
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              rating={testimonial.rating}
              title={testimonial.title}
              text={testimonial.text}
              attribution={testimonial.attribution}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/check"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 group"
          >
            <span>See how the safety checker works</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
