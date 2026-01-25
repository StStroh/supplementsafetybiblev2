import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SearchCard {
  medication: string;
  supplement: string;
  risk: 'High Risk' | 'Medium Risk' | 'Low Risk';
  riskColor: string;
  bgColor: string;
  medParam: string;
  suppParam: string;
}

const searchCards: SearchCard[] = [
  {
    medication: 'Blood Thinners',
    supplement: 'Fish Oil',
    risk: 'High Risk',
    riskColor: 'text-red-800',
    bgColor: 'bg-red-50 border-red-200 hover:border-red-300',
    medParam: 'Warfarin',
    suppParam: 'Fish Oil'
  },
  {
    medication: 'Blood Pressure Meds',
    supplement: 'Vitamin D',
    risk: 'Medium Risk',
    riskColor: 'text-yellow-800',
    bgColor: 'bg-yellow-50 border-yellow-200 hover:border-yellow-300',
    medParam: 'Lisinopril',
    suppParam: 'Vitamin D'
  },
  {
    medication: 'Statins',
    supplement: 'CoQ10',
    risk: 'Low Risk',
    riskColor: 'text-green-800',
    bgColor: 'bg-green-50 border-green-200 hover:border-green-300',
    medParam: 'Atorvastatin',
    suppParam: 'CoQ10'
  },
  {
    medication: 'Thyroid Medication',
    supplement: 'Calcium',
    risk: 'Medium Risk',
    riskColor: 'text-yellow-800',
    bgColor: 'bg-yellow-50 border-yellow-200 hover:border-yellow-300',
    medParam: 'Levothyroxine',
    suppParam: 'Calcium'
  },
  {
    medication: 'Antidepressants',
    supplement: "St. John's Wort",
    risk: 'High Risk',
    riskColor: 'text-red-800',
    bgColor: 'bg-red-50 border-red-200 hover:border-red-300',
    medParam: 'Sertraline',
    suppParam: "St. John's Wort"
  },
  {
    medication: 'Diabetes Medication',
    supplement: 'Chromium',
    risk: 'Medium Risk',
    riskColor: 'text-yellow-800',
    bgColor: 'bg-yellow-50 border-yellow-200 hover:border-yellow-300',
    medParam: 'Metformin',
    suppParam: 'Chromium'
  }
];

export default function MostSearchedSection() {
  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">
          Most Searched Interactions
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Click any card to instantly check that combination with our free tool.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchCards.map((card, index) => (
            <Link
              key={index}
              to={`/check?med=${encodeURIComponent(card.medParam)}&sup=${encodeURIComponent(card.suppParam)}`}
              className={`block p-6 ${card.bgColor} border-2 rounded-xl transition-all hover:shadow-lg transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg mb-1">
                    {card.medication}
                  </div>
                  <div className="text-gray-700 font-medium">
                    + {card.supplement}
                  </div>
                </div>
              </div>

              <div className={`inline-block px-3 py-1 ${card.riskColor} bg-white rounded-full text-sm font-bold mb-3`}>
                {card.risk}
              </div>

              <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
