import { Pill, Beaker } from 'lucide-react';
import SeverityBadge from './SeverityBadge';

interface ResultCardProps {
  interaction: {
    id: string;
    supplement_name: string;
    medication_name: string;
    severity: string;
    description: string;
  };
  onClick: () => void;
}

export default function ResultCard({ interaction, onClick }: ResultCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Beaker className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">{interaction.supplement_name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Pill className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">{interaction.medication_name}</span>
          </div>
        </div>
        <SeverityBadge severity={interaction.severity} />
      </div>
      <p className="text-gray-600 text-sm line-clamp-2">{interaction.description}</p>
    </div>
  );
}
