import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getInteractionBySlug } from '../data/staticInteractions';
import { AlertTriangle, Info, Eye, CheckCircle, ArrowRight } from 'lucide-react';

export default function InteractionPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  const interaction = getInteractionBySlug(slug);

  if (!interaction) {
    return <Navigate to="/404" replace />;
  }

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'avoid':
        return {
          icon: AlertTriangle,
          label: 'AVOID',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900',
          iconColor: 'text-red-600'
        };
      case 'caution':
        return {
          icon: AlertTriangle,
          label: 'CAUTION',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-900',
          iconColor: 'text-orange-600'
        };
      case 'monitor':
        return {
          icon: Eye,
          label: 'MONITOR',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900',
          iconColor: 'text-yellow-600'
        };
      default:
        return {
          icon: Info,
          label: 'NO KNOWN INTERACTION',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900',
          iconColor: 'text-blue-600'
        };
    }
  };

  const levelConfig = getLevelConfig(interaction.level);
  const LevelIcon = levelConfig.icon;

  // Generate query string for checker pre-fill
  const checkerQuery = `${interaction.supplement.toLowerCase()} ${interaction.medication.toLowerCase()}`;
  const checkerLink = `/check?query=${encodeURIComponent(checkerQuery)}`;

  // Generate FAQ JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can supplements interact with medications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, supplements can interact with medications in various ways. They may increase or decrease medication effectiveness, cause additive effects, or interfere with absorption. Always consult your healthcare provider before combining supplements with medications."
        }
      },
      {
        "@type": "Question",
        "name": `Is the ${interaction.supplement} and ${interaction.medication} interaction dangerous?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The interaction level for ${interaction.supplement} and ${interaction.medication} is classified as: ${levelConfig.label}. ${interaction.primaryConcern} This information is for educational purposes only.`
        }
      },
      {
        "@type": "Question",
        "name": "Should I stop taking my supplement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Never stop taking prescribed medications or supplements without consulting your healthcare provider. They can provide personalized guidance based on your specific health situation and medications."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{interaction.metaTitle}</title>
        <meta name="description" content={interaction.metaDescription} />
        <meta property="og:title" content={interaction.metaTitle} />
        <meta property="og:description" content={interaction.metaDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://supplementsafetybible.com/interactions/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8">
            <ol className="flex items-center space-x-2 text-slate-600">
              <li><Link to="/" className="hover:text-slate-900">Home</Link></li>
              <li>/</li>
              <li><Link to="/check" className="hover:text-slate-900">Interaction Checker</Link></li>
              <li>/</li>
              <li className="text-slate-900 font-medium">{interaction.supplement} & {interaction.medication}</li>
            </ol>
          </nav>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
            {interaction.supplement} and {interaction.medication}: Interaction Overview
          </h1>

          {/* Interaction Level Card */}
          <div className={`${levelConfig.bgColor} ${levelConfig.borderColor} border-2 rounded-xl p-6 mb-8`}>
            <div className="flex items-start space-x-4">
              <div className={`${levelConfig.iconColor} mt-1`}>
                <LevelIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className={`${levelConfig.textColor} font-bold text-lg mb-2`}>
                  {levelConfig.label}
                </div>
                <div className="text-slate-900 font-semibold mb-2">
                  {interaction.primaryConcern}
                </div>
                <div className="text-slate-700">
                  <strong>Who should be careful:</strong> {interaction.whoShouldCarefu}
                </div>
              </div>
            </div>
          </div>

          {/* What's Known */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What's known about this interaction
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {interaction.whatKnown}
              </p>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why this matters
            </h2>
            <ul className="space-y-3">
              {interaction.whyMatters.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What People Typically Do */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What people typically do
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-700 leading-relaxed">
                {interaction.whatPeopleDo}
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-10">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-900 mb-1">
                  Educational Information Only
                </div>
                <p className="text-amber-800 text-sm">
                  This information is for educational purposes only and does not replace professional medical advice.
                  Always consult your healthcare provider before making changes to your supplement or medication regimen.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-8 text-center text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-3">
              Check your full supplement and medication combination
            </h3>
            <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
              Get a comprehensive interaction analysis including {interaction.supplement} and {interaction.medication} plus any other supplements or medications you take.
            </p>
            <Link
              to={checkerLink}
              className="inline-flex items-center justify-center bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors space-x-2"
            >
              <span>Check {interaction.supplement} + {interaction.medication}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Additional Links */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Related Resources
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/check"
                className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <div>
                  <div className="font-medium text-slate-900">Interaction Checker</div>
                  <div className="text-sm text-slate-600">Check multiple items at once</div>
                </div>
              </Link>
              <Link
                to="/pricing"
                className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
              >
                <ArrowRight className="w-6 h-6 text-emerald-600" />
                <div>
                  <div className="font-medium text-slate-900">View Plans</div>
                  <div className="text-sm text-slate-600">Get unlimited access</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
