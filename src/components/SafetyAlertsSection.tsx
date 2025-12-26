import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface AlertItem {
  id: string;
  category: string;
  headline: string;
  summary: string;
  timestamp: string;
  route: string;
}

const alerts: AlertItem[] = [
  {
    id: '1',
    category: 'Safety Alert',
    headline: 'Avoid: St. John\'s wort + Eliquis (apixaban)',
    summary: 'St. John\'s wort can reduce apixaban exposure and may reduce clot protection.',
    timestamp: 'Updated recently',
    route: '/alerts/st-johns-wort-apixaban'
  },
  {
    id: '2',
    category: 'Safety Alert',
    headline: 'Avoid: St. John\'s wort + DELSTRIGO (doravirine)',
    summary: 'Co-administration is contraindicated; some labels recommend a washout period.',
    timestamp: 'Updated last month',
    route: '/alerts/st-johns-wort-delstrigo'
  },
  {
    id: '3',
    category: 'Safety Alert',
    headline: 'Avoid: St. John\'s wort + VFEND (voriconazole)',
    summary: 'Contraindicated due to significantly decreased voriconazole concentrations.',
    timestamp: 'Updated 2025',
    route: '/alerts/st-johns-wort-vfend'
  },
  {
    id: '4',
    category: 'Safety Alert',
    headline: 'High risk: 7-OH / kratom-derived opioid products + CNS depressants',
    summary: 'FDA warnings highlight serious harm risk; avoid mixing with sedatives/alcohol.',
    timestamp: 'Updated 2025',
    route: '/alerts/kratom-cns-depressants'
  },
  {
    id: '5',
    category: 'Safety Alert',
    headline: 'Caution: Ashwagandha + liver-risk situations',
    summary: 'Recent reports continue to flag ashwagandha-associated liver injury risk.',
    timestamp: 'Updated 2025',
    route: '/alerts/ashwagandha-liver-risk'
  },
  {
    id: '6',
    category: 'Safety Alert',
    headline: 'Caution: Berberine + narrow-therapeutic-index drugs',
    summary: 'Evidence suggests CYP inhibition potential; interaction risk with some medications.',
    timestamp: 'Updated 2025',
    route: '/alerts/berberine-nti-drugs'
  }
];

export default function SafetyAlertsSection() {
  return (
    <section className="w-full bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr,2fr] lg:gap-16">
          {/* Left: Title + Subtitle */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              New Safety Alerts published
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Newest "avoid" combinations based on updated labels, agencies, and recent safety reports.
            </p>
          </div>

          {/* Right: Feed Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {alerts.map((alert) => (
              <article
                key={alert.id}
                className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                {/* Category Label */}
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                    {alert.category}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="mb-2 text-lg font-bold text-slate-900 leading-snug">
                  {alert.headline}
                </h3>

                {/* Summary */}
                <p className="mb-4 flex-1 text-sm text-slate-600 leading-relaxed">
                  {alert.summary}
                </p>

                {/* Footer: Timestamp + Read More */}
                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">{alert.timestamp}</span>
                  <Link
                    to={alert.route}
                    className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
