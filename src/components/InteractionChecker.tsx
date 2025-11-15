import { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Supplement {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Medication {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Interaction {
  id: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  recommendation: string;
  supplement_name?: string;
  medication_name?: string;
}

export default function InteractionChecker() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedSupplement, setSelectedSupplement] = useState('');
  const [selectedMedication, setSelectedMedication] = useState('');
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: suppsData } = await supabase
      .from('supplements')
      .select('*')
      .order('name');

    const { data: medsData } = await supabase
      .from('medications')
      .select('*')
      .order('name');

    if (suppsData) setSupplements(suppsData);
    if (medsData) setMedications(medsData);
  };

  const checkInteractions = async () => {
    if (!selectedSupplement || !selectedMedication) return;

    setLoading(true);
    setSearchPerformed(true);

    const { data } = await supabase
      .from('interactions')
      .select(`
        *,
        supplements:supplement_id(name),
        medications:medication_id(name)
      `)
      .eq('supplement_id', selectedSupplement)
      .eq('medication_id', selectedMedication);

    if (data) {
      const formattedData = data.map((item: any) => ({
        ...item,
        supplement_name: item.supplements?.name,
        medication_name: item.medications?.name,
      }));
      setInteractions(formattedData);
    } else {
      setInteractions([]);
    }

    setLoading(false);
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'low':
        return {
          icon: Info,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Low Risk',
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          label: 'Moderate Risk',
        };
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          label: 'High Risk',
        };
      case 'severe':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'Severe Risk',
        };
      default:
        return {
          icon: Info,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: 'Unknown',
        };
    }
  };

  return (
    <section id="checker" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Check Interactions Now
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a supplement and medication to check for potential interactions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Supplement
              </label>
              <select
                value={selectedSupplement}
                onChange={(e) => setSelectedSupplement(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Choose a supplement...</option>
                {supplements.map((supp) => (
                  <option key={supp.id} value={supp.id}>
                    {supp.name} {supp.category && `(${supp.category})`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Medication
              </label>
              <select
                value={selectedMedication}
                onChange={(e) => setSelectedMedication(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Choose a medication...</option>
                {medications.map((med) => (
                  <option key={med.id} value={med.id}>
                    {med.name} {med.category && `(${med.category})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={checkInteractions}
            disabled={!selectedSupplement || !selectedMedication || loading}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Checking...' : 'Check Interactions'}
          </button>
        </div>

        {searchPerformed && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {interactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Known Interactions
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Based on current research, no significant interactions have been documented between
                  these two substances. However, always consult your healthcare provider.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Interaction Results
                </h3>
                {interactions.map((interaction) => {
                  const config = getSeverityConfig(interaction.severity);
                  const Icon = config.icon;

                  return (
                    <div
                      key={interaction.id}
                      className={`${config.bg} ${config.border} border-2 rounded-xl p-6`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${config.color} flex-shrink-0`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className={`text-lg font-bold ${config.color}`}>
                              {config.label}
                            </h4>
                          </div>
                          <p className="text-gray-900 font-semibold mb-2">
                            Description:
                          </p>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {interaction.description}
                          </p>
                          <p className="text-gray-900 font-semibold mb-2">
                            Recommendation:
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {interaction.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
