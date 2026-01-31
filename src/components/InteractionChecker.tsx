import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { isPaid, roleName } from '../lib/roles';
import { useAuth } from '../state/AuthProvider';
import Autocomplete from './Autocomplete';
import { SUPPORT_EMAIL } from '../lib/support';

type State = 'loading' | 'free_locked' | 'paid' | 'data_error' | 'result';

export default function InteractionChecker() {
  const navigate = useNavigate();
  const { user, session, plan, loading: authLoading } = useAuth();

  const [state, setState] = useState<State>('loading');
  const [supplementValue, setSupplementValue] = useState('');
  const [medicationValue, setMedicationValue] = useState('');
  const [supplementId, setSupplementId] = useState('');
  const [medicationId, setMedicationId] = useState('');
  const [supplements, setSupplements] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [payload, setPayload] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dataErrorDetails, setDataErrorDetails] = useState<string>('');

  const suppRef = useRef<HTMLInputElement>(null);
  const medRef = useRef<HTMLInputElement>(null);

  const userRole = plan || 'free';

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !session) {
      console.info('[InteractionChecker] No session, redirecting to auth');
      navigate('/auth?next=/check', { replace: true });
    }
  }, [authLoading, session, navigate]);

  // Load data once auth is confirmed
  useEffect(() => {
    if (authLoading || !session || !user) {
      return;
    }

    (async () => {
      console.info('[InteractionChecker] User authenticated, role:', userRole);

      // Check if user has paid access
      if (!isPaid(userRole)) {
        console.info('[InteractionChecker] Free user - showing locked panel');
        setState('free_locked');
        return;
      }

      // Paid user - load supplements and medications
      console.info('[InteractionChecker] Paid user, loading data from Supabase');
      const [supRes, medRes] = await Promise.all([
        supabase
          .from('supplements')
          .select('id,name')
          .order('name')
          .limit(2000),
        supabase
          .from('medications')
          .select('id,name')
          .order('name')
          .limit(2000),
      ]);

      // Handle query errors
      if (supRes.error || medRes.error) {
        console.error('[InteractionChecker] Database query error:', {
          supplements: supRes.error,
          medications: medRes.error
        });
        setDataErrorDetails(
          `Query failed: ${supRes.error?.message || medRes.error?.message || 'Unknown error'}`
        );
        setState('data_error');
        return;
      }

      // Check if we got data
      const supData = supRes.data || [];
      const medData = medRes.data || [];

      console.info('[InteractionChecker] Data loaded:', {
        supplements: supData.length,
        medications: medData.length
      });

      if (supData.length === 0 || medData.length === 0) {
        console.warn('[InteractionChecker] No data returned - possible RLS issue or missing seed data');
        setDataErrorDetails(
          `No data available (Supplements: ${supData.length}, Medications: ${medData.length}). This could be an RLS configuration issue or missing seed data.`
        );
        setState('data_error');
        return;
      }

      setSupplements(supData);
      setMedications(medData);
      setState('paid');
    })();
  }, [authLoading, session, user, userRole]);

  const focusField = (field: 'supplement' | 'medication') => {
    (field === 'supplement' ? suppRef.current : medRef.current)?.focus();
  };

  const handleSupplementSelect = (name: string) => {
    const supp = supplements.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (supp) {
      setSupplementValue(name);
      setSupplementId(supp.id);
      if (!medicationValue) {
        setTimeout(() => medRef.current?.focus(), 100);
      }
    }
  };

  const handleMedicationSelect = (name: string) => {
    const med = medications.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (med) {
      setMedicationValue(name);
      setMedicationId(med.id);
    }
  };

  const check = async () => {
    setErrorMsg(null);

    if (!supplementId || !medicationId) {
      setErrorMsg('Please select both a supplement and a medication.');
      return;
    }

    if (!user?.email) {
      setErrorMsg('Authentication required. Please sign in again.');
      return;
    }

    const res = await fetch('/.netlify/functions/get-interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplementId, medicationId, userEmail: user.email }),
    });

    if (res.status === 403) {
      setState('free_locked');
      setErrorMsg('Access denied. Please upgrade your plan.');
      return;
    }

    if (!res.ok) {
      setErrorMsg(`Request failed: ${res.status} ${res.statusText}`);
      return;
    }

    const json = await res.json();
    if (!json?.ok) {
      setErrorMsg(json?.error || 'Interaction not found or error occurred.');
      return;
    }

    setPayload(json.data);
    setState('result');
  };

  // Loading state (auth or data)
  if (authLoading || state === 'loading') {
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading interaction checker...</div>
        </div>
      </div>
    );
  }

  // If no session after loading, redirect will happen via useEffect
  if (!session) {
    return null;
  }

  // Free user - show lock panel with upgrade CTA
  if (state === 'free_locked') {
    return (
      <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg border border-amber-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the Free Plan</h3>
          <p className="text-gray-700 mb-2 max-w-md mx-auto">
            The Interaction Checker is available on Pro and Premium plans.
          </p>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
            Upgrade now to check supplement-medication interactions instantly with unlimited access.
          </p>
          <a
            href="/#pricing?locked=interactions"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold shadow-md"
          >
            Upgrade to Pro or Premium
          </a>
          <p className="text-xs mt-4 text-gray-600">
            60-day money-back guarantee · Change or cancel anytime · Individual use
          </p>
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Data error - paid user but no data available
  if (state === 'data_error') {
    return (
      <div className="p-6 bg-red-50 rounded-xl shadow-lg border border-red-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-700 mb-4 max-w-md mx-auto">
            We couldn't load the supplement and medication data. Please contact support.
          </p>
          <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
            <p className="text-sm text-gray-600 font-mono text-left">{dataErrorDetails}</p>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  // Paid user with data - show interaction checker
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg interaction-form">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Check Supplement-Medication Interactions</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            {roleName(userRole)}
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          Type to search for a supplement and medication to check for potential interactions.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-4">
        <div className="field">
          <button
            type="button"
            className="field-label"
            onClick={() => focusField('supplement')}
            aria-controls="supp-input"
          >
            Supplement
          </button>
          <Autocomplete
            id="supp-input"
            ref={suppRef}
            value={supplementValue}
            placeholder="Type a supplement..."
            onChange={setSupplementValue}
            onSelect={handleSupplementSelect}
            suggestions={supplements}
            type="supplement"
          />
          <p className="mt-1 text-xs text-gray-500">{supplements.length} supplements available</p>
        </div>

        <div className="field">
          <button
            type="button"
            className="field-label"
            onClick={() => focusField('medication')}
            aria-controls="med-input"
          >
            Medication
          </button>
          <Autocomplete
            id="med-input"
            ref={medRef}
            value={medicationValue}
            placeholder="...and a medication"
            onChange={setMedicationValue}
            onSelect={handleMedicationSelect}
            suggestions={medications}
            type="medication"
          />
          <p className="mt-1 text-xs text-gray-500">{medications.length} medications available</p>
        </div>
      </div>

      <button
        onClick={check}
        disabled={!supplementId || !medicationId}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
      >
        {!supplementId || !medicationId ? 'Select Both to Continue' : 'Check Interactions'}
      </button>

      {errorMsg && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{errorMsg}</p>
        </div>
      )}

      {state === 'result' && payload && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="font-semibold text-gray-900 mb-3">Interaction Result</div>
          <div className="bg-white rounded p-3 border border-gray-200">
            <pre className="text-sm whitespace-pre-wrap text-gray-700 overflow-x-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
