import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Supplement {
  id: string;
  name: string;
}

interface Medication {
  id: string;
  name: string;
}

export default function InteractionChecker() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedSupplement, setSelectedSupplement] = useState('');
  const [selectedMedication, setSelectedMedication] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: suppsData } = await supabase
        .from('supplements')
        .select('id, name')
        .order('name');

      const { data: medsData } = await supabase
        .from('medications')
        .select('id, name')
        .order('name');

      if (suppsData) setSupplements(suppsData as Supplement[]);
      if (medsData) setMedications(medsData as Medication[]);
    } catch (error) {
      console.warn('Unable to load data from Supabase:', error);
    }
  };

  const checkInteractions = () => {
    if (!selectedSupplement || !selectedMedication) return;

    window.location.href = `/result/${selectedSupplement}/${selectedMedication}`;
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
                    {supp.name}
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
                    {med.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={checkInteractions}
            disabled={!selectedSupplement || !selectedMedication}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5" />
            Check Interactions
          </button>
        </div>

      </div>
    </section>
  );
}
