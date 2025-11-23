import { useState, useEffect } from 'react';
import { Search, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isPaid } from '../lib/roles';

interface Supplement {
  id: string;
  name: string;
}

interface Medication {
  id: string;
  name: string;
}

interface Profile {
  role: string;
}

export default function InteractionChecker() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedSupplement, setSelectedSupplement] = useState('');
  const [selectedMedication, setSelectedMedication] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsLocked(true);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', user.email)
        .maybeSingle();

      const role = profile?.role || 'free';
      setUserRole(role);

      if (!isPaid(role)) {
        setIsLocked(true);
        setLoading(false);
        return;
      }

      await loadData();
      setLoading(false);
    } catch (error) {
      console.error('Error checking access:', error);
      setIsLocked(true);
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const { data: suppsData, error: suppsError } = await supabase
        .from('supplements')
        .select('id, name')
        .order('name');

      const { data: medsData, error: medsError } = await supabase
        .from('medications')
        .select('id, name')
        .order('name');

      if (suppsError) {
        console.error('Error loading supplements:', suppsError);
      }
      if (medsError) {
        console.error('Error loading medications:', medsError);
      }

      if (suppsData) setSupplements(suppsData as Supplement[]);
      if (medsData) setMedications(medsData as Medication[]);
    } catch (error) {
      console.error('Unable to load data from Supabase:', error);
    }
  };

  const checkInteractions = () => {
    if (!selectedSupplement || !selectedMedication) return;
    window.location.href = `/result/${selectedSupplement}/${selectedMedication}`;
  };

  if (loading) {
    return (
      <section id="checker" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isLocked) {
    return (
      <section id="checker" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-blue-100">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Pro & Premium Feature
            </h2>

            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              The Interaction Checker is available exclusively to Pro and Premium subscribers.
              Upgrade your plan to unlock instant access to comprehensive interaction analysis.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-slate-900 mb-4">With Pro or Premium, you get:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Unlimited interaction checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Severity ratings and detailed recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Evidence-based interaction database</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Regularly updated with new research</span>
                </li>
              </ul>
            </div>

            <a
              href="/#pricing"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              View Plans & Upgrade
            </a>

            {userRole === 'free' && (
              <p className="text-sm text-slate-500 mt-4">
                You're currently on the Free plan
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

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
