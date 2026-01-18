import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Download, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SafetyPackForm, { SafetyPackConfig } from '../components/safetypack/SafetyPackForm';
import SafetyPackPreviewTabs from '../components/safetypack/SafetyPackPreviewTabs';
import { generateSafetyPackPDF } from '../components/safetypack/generatePDF';
import { supabase } from '../lib/supabase';

const DEFAULT_CONFIG: SafetyPackConfig = {
  brandName: '',
  supportEmail: '',
  productName: '',
  productUrl: 'https://supplementsafetybible.com/check',
  qrUrl: 'https://supplementsafetybible.com/check',
  accentColor: '#7c3aed',
  surgeryWindow: '2–3 weeks',
};

export default function SafetyPack() {
  const [config, setConfig] = useState<SafetyPackConfig>(DEFAULT_CONFIG);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [savedPacks, setSavedPacks] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    checkAuth();
    loadFromLocalStorage();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser();
    setIsAuthenticated(!!data?.user);
    setUserId(data?.user?.id || null);

    if (data?.user) {
      loadSavedPacks(data.user.id);
    }
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('safetyPackConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      } catch (err) {
        console.error('Failed to load config from localStorage:', err);
      }
    }
  };

  const saveToLocalStorage = (newConfig: SafetyPackConfig) => {
    localStorage.setItem('safetyPackConfig', JSON.stringify(newConfig));
  };

  const loadSavedPacks = async (uid: string) => {
    const { data, error } = await supabase
      .from('safety_packs')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSavedPacks(data);
    }
  };

  const handleConfigChange = (newConfig: SafetyPackConfig) => {
    setConfig(newConfig);
    saveToLocalStorage(newConfig);
  };

  const handleSavePack = async () => {
    if (!isAuthenticated || !userId) {
      setMessage({ type: 'error', text: 'Please sign in to save packs' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('safety_packs').insert({
        user_id: userId,
        brand_name: config.brandName,
        support_email: config.supportEmail,
        product_name: config.productName,
        product_url: config.productUrl,
        qr_url: config.qrUrl,
        accent_color: config.accentColor,
        surgery_window: config.surgeryWindow,
        logo_url: config.logoDataUrl,
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Pack saved successfully!' });
      loadSavedPacks(userId);

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save pack:', err);
      setMessage({ type: 'error', text: 'Failed to save pack' });
    } finally {
      setSaving(false);
    }
  };

  const handleLoadPack = (pack: any) => {
    const loadedConfig: SafetyPackConfig = {
      brandName: pack.brand_name || '',
      supportEmail: pack.support_email || '',
      productName: pack.product_name || '',
      productUrl: pack.product_url || DEFAULT_CONFIG.productUrl,
      qrUrl: pack.qr_url || DEFAULT_CONFIG.qrUrl,
      accentColor: pack.accent_color || DEFAULT_CONFIG.accentColor,
      surgeryWindow: pack.surgery_window || DEFAULT_CONFIG.surgeryWindow,
      logoDataUrl: pack.logo_url || undefined,
    };
    setConfig(loadedConfig);
    saveToLocalStorage(loadedConfig);
    setMessage({ type: 'success', text: 'Pack loaded!' });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const blob = await generateSafetyPackPDF(config);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `safety-pack-insert-${config.brandName || 'brand'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'PDF downloaded!' });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setMessage({ type: 'error', text: 'Failed to generate PDF' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-gray-50">
      <Helmet>
        <title>FDA-Guided Safety Pack Generator | Supplement Safety Bible</title>
        <meta
          name="description"
          content="Generate ready-to-use safety content for your supplement brand. Box inserts, Amazon modules, FAQ, and support templates based on FDA consumer education."
        />
      </Helmet>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FDA-Guided Safety Pack
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Generate professional safety content for your supplement brand. Ready-to-use templates
            for packaging inserts, e-commerce, website FAQ, and customer support.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-900 rounded-lg text-sm font-medium">
            <span>✓</span>
            <span>Based on FDA consumer safety education</span>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Saved Packs (if authenticated) */}
        {isAuthenticated && savedPacks.length > 0 && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Saved Packs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedPacks.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => handleLoadPack(pack)}
                  className="p-4 border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all text-left"
                >
                  <div className="font-semibold text-gray-900">
                    {pack.brand_name || 'Untitled Pack'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(pack.created_at).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="mb-8">
          <SafetyPackForm config={config} onChange={handleConfigChange} />
        </div>

        {/* Save Button (if authenticated) */}
        {isAuthenticated && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={handleSavePack}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save This Pack
                </>
              )}
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <p className="text-blue-900">
              <a href="/auth" className="font-semibold underline">
                Sign in
              </a>{' '}
              to save and manage multiple safety packs
            </p>
          </div>
        )}

        {/* Preview Tabs */}
        <div className="mb-8">
          <SafetyPackPreviewTabs config={config} onDownloadPDF={handleDownloadPDF} />
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 text-sm text-gray-700">
          <h3 className="font-bold text-gray-900 mb-2">Important Notes</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              This content references publicly available FDA consumer safety education but does not
              claim FDA endorsement or approval
            </li>
            <li>
              Review content with legal counsel to ensure compliance with your specific regulatory
              requirements
            </li>
            <li>Update brand-specific details before distribution</li>
            <li>Keep records of when and how you distribute this content</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
