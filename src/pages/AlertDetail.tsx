import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function AlertDetail() {
  const { alertId } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Safety Alert | Supplement Safety Bible"
        description="Detailed safety alert information about supplement and medication interactions."
        canonical={`/alerts/${alertId}`}
      />
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Alert Header */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-8">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Safety Alert
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Safety Alert Details
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Alert ID: <span className="font-mono">{alertId}</span>
          </p>
        </div>

        {/* Content Placeholder */}
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Detailed Information
            </h2>
            <p className="text-slate-600 leading-relaxed">
              This is a placeholder page for the safety alert. In production, this page would contain:
            </p>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Detailed interaction mechanism information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Clinical significance and severity assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Evidence sources and regulatory references</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Risk management recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Alternative supplement suggestions if applicable</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-8 text-center">
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              Check Your Combinations
            </h3>
            <p className="mb-6 text-slate-600">
              Use our interaction checker to screen your specific supplement and medication regimen.
            </p>
            <Link
              to="/check"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Run Interaction Check
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
