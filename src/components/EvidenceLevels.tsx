import { CheckCircle2, AlertCircle, FileQuestion, Beaker, Book, HelpCircle } from 'lucide-react';

const evidenceLevels = [
  {
    level: 'Human Clinical Data',
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: 'Information from human studies, clinical trials, or systematic reviews in pregnant populations.'
  },
  {
    level: 'Case Reports',
    icon: FileQuestion,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Individual case reports or case series documenting outcomes in pregnant individuals.'
  },
  {
    level: 'Animal Studies',
    icon: Beaker,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    description: 'Preclinical data from animal reproduction studies. May not translate to humans.'
  },
  {
    level: 'Traditional Use',
    icon: Book,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: 'Historical or traditional use patterns. Limited scientific validation.'
  },
  {
    level: 'Theoretical Risk',
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: 'Theoretical concerns based on mechanism of action or related compounds.'
  },
  {
    level: 'Insufficient Data',
    icon: HelpCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    description: 'Limited or no data available on safety during pregnancy.'
  }
];

export default function EvidenceLevels() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Evidence Categories
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our pregnancy safety information is categorized by the type and quality of available evidence. Understanding these categories helps you have informed discussions with your healthcare provider.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {evidenceLevels.map((level) => {
          const Icon = level.icon;
          return (
            <div
              key={level.level}
              className={`${level.bgColor} ${level.borderColor} border rounded-lg p-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Icon className={`w-6 h-6 ${level.color}`} />
                </div>
                <div>
                  <h4 className={`font-semibold ${level.color} mb-1`}>
                    {level.level}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {level.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Evidence quality does not necessarily indicate safety or risk. Some substances with limited data may be safe, while others with extensive data may pose concerns. Always discuss your specific situation with your healthcare provider.
        </p>
      </div>
    </div>
  );
}
