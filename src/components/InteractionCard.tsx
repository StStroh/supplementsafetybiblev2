import { Beaker, Pill } from 'lucide-react';

interface InteractionCardProps {
  interaction: {
    id: string;
    supplement_name: string;
    medication_name: string;
    severity: string;
    description: string;
  };
  onClick: () => void;
}

const severityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  severe: 'bg-red-100 text-red-800 border-red-200'
};

export default function InteractionCard({ interaction, onClick }: InteractionCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center space-x-2">
              <Beaker className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">{interaction.supplement_name}</span>
            </div>
            <span className="text-gray-400">+</span>
            <div className="flex items-center space-x-2">
              <Pill className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">{interaction.medication_name}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${
            severityColors[interaction.severity as keyof typeof severityColors] || severityColors.low
          }`}
        >
          {interaction.severity.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 text-sm line-clamp-2">{interaction.description}</p>
    </div>
  );
}
