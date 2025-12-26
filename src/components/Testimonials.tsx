import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  attribution: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Uso Supplement Safety Bible para verificar interacciones antes de recomendar suplementos a clientes que toman medicamentos. Es claro, conservador y bien fundamentado.',
    attribution: 'Nutrition Consultant, Florida',
  },
  {
    quote: 'Me sorprendió encontrar una interacción que mi médico nunca mencionó. Esta herramienta me ayudó a evitar un error serio.',
    attribution: 'Usuario Premium',
  },
  {
    quote: 'No es marketing. Se nota que está construido con mentalidad de seguridad y evidencia.',
    attribution: 'Quality & Compliance Professional',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Testimonios reales. Decisiones más seguras.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Profesionales y usuarios que confían en Supplement Safety Bible para evitar combinaciones peligrosas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 border border-gray-100"
            >
              <Quote className="w-10 h-10 text-gray-300 mb-4" strokeWidth={1.5} />
              <blockquote className="mb-6">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {testimonial.quote}
                </p>
              </blockquote>
              <footer className="text-sm text-gray-500 font-medium">
                — {testimonial.attribution}
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
