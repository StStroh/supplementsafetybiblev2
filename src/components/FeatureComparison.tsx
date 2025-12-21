import { Check, X } from 'lucide-react';

interface ComparisonRow {
  category?: string;
  feature: string;
  starter: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
  note?: string;
}

const comparisonData: ComparisonRow[] = [
  {
    category: 'Interaction Screening Scope',
    feature: 'Supplement–Medication interaction database',
    starter: true,
    pro: true,
    premium: true,
  },
  {
    feature: 'Controlled substance & narrow-therapeutic-index drug coverage',
    starter: 'Preview only',
    pro: true,
    premium: true,
  },
  {
    feature: 'CYP enzyme interaction analysis',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: 'Pharmacodynamic interaction assessment',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    category: 'Severity & Risk Classification',
    feature: 'Color-coded severity ratings (Low/Medium/High)',
    starter: 'Risk level only',
    pro: true,
    premium: true,
  },
  {
    feature: 'Clinical significance scoring',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: 'Onset timing & duration estimates',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    category: 'Evidence & Documentation',
    feature: 'Evidence-based rationale',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: 'Peer-reviewed literature references',
    starter: false,
    pro: 'Summary',
    premium: 'Full citations',
  },
  {
    feature: 'Mechanism of action explanations',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    category: 'Monitoring & Management',
    feature: 'Basic safety recommendations',
    starter: true,
    pro: true,
    premium: true,
  },
  {
    feature: 'Lab monitoring guidance',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: 'Dose adjustment considerations',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: 'Clinical follow-up protocols',
    starter: false,
    pro: false,
    premium: true,
  },
  {
    category: 'Reports & Exports',
    feature: 'PDF report generation',
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: 'Customizable report templates',
    starter: false,
    pro: false,
    premium: true,
  },
  {
    feature: 'White-label branding options',
    starter: false,
    pro: false,
    premium: true,
  },
  {
    category: 'Usage Limits',
    feature: 'Interaction checks per month',
    starter: '10',
    pro: 'Unlimited',
    premium: 'Unlimited',
  },
  {
    feature: 'Saved regimens',
    starter: '3',
    pro: 'Unlimited',
    premium: 'Unlimited',
  },
];

export default function FeatureComparison() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Supplement Safety Bible Feature Comparison
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See what's included at each tier and understand the depth of interaction coverage that sets Supplement Safety Bible apart.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 font-bold text-gray-900 border-b-2 border-gray-200">
                  Feature
                </th>
                <th className="text-center py-4 px-6 font-bold text-gray-900 border-b-2 border-gray-200 w-32">
                  Starter
                  <div className="text-xs font-normal text-gray-500 mt-1">Free</div>
                </th>
                <th className="text-center py-4 px-6 font-bold text-gray-900 border-b-2 border-gray-200 bg-purple-50 w-32">
                  Pro
                  <div className="text-xs font-normal text-[#6B46C1] mt-1">Most Popular</div>
                </th>
                <th className="text-center py-4 px-6 font-bold text-gray-900 border-b-2 border-gray-200 w-32">
                  Premium
                  <div className="text-xs font-normal text-gray-500 mt-1">Clinical</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => {
                if (row.category) {
                  return (
                    <tr key={idx} className="bg-gray-100">
                      <td
                        colSpan={4}
                        className="py-3 px-6 font-bold text-gray-900 text-sm uppercase tracking-wide border-t-2 border-gray-200"
                      >
                        {row.category}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderValue(row.starter)}
                    </td>
                    <td className="py-4 px-6 text-center bg-purple-50/30">
                      {renderValue(row.pro)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderValue(row.premium)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#6B46C1]" />
              Supplement Safety Bible Coverage Includes
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Prescription medications (Rx)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Over-the-counter drugs (OTC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Dietary supplements (vitamins, minerals, herbals)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Narrow-therapeutic-index drugs (warfarin, digoxin, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Immunosuppressants and transplant medications</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Scope of Coverage
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Supplement Safety Bible focuses specifically on <strong>supplement–medication interactions</strong> and includes analysis of:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Pharmacokinetic effects (absorption, metabolism, excretion)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Pharmacodynamic effects (additive, synergistic, antagonistic)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>High-risk drug classes requiring clinical monitoring</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 max-w-4xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-sm text-gray-700 leading-relaxed text-center">
            <strong>Important:</strong> Supplement Safety Bible is designed for educational purposes and does not replace professional medical judgment. All interaction information should be reviewed in the context of the individual patient's clinical status, comorbidities, and prescribing information.
          </p>
        </div>
      </div>
    </section>
  );
}

function renderValue(value: boolean | string): JSX.Element {
  if (value === true) {
    return <Check className="w-5 h-5 inline-block text-green-600" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 inline-block text-gray-300" />;
  }
  return <span className="text-sm text-gray-700 font-medium">{value}</span>;
}
