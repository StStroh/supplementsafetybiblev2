import { useState } from 'react';
import { Upload } from 'lucide-react';

export interface SafetyPackConfig {
  brandName: string;
  supportEmail: string;
  productName: string;
  productUrl: string;
  qrUrl: string;
  accentColor: string;
  surgeryWindow: string;
  logoDataUrl?: string;
}

interface SafetyPackFormProps {
  config: SafetyPackConfig;
  onChange: (config: SafetyPackConfig) => void;
}

export default function SafetyPackForm({ config, onChange }: SafetyPackFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | undefined>(config.logoDataUrl);

  const handleChange = (field: keyof SafetyPackConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setLogoPreview(dataUrl);
        onChange({ ...config, logoDataUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={config.brandName}
            onChange={(e) => handleChange('brandName', e.target.value)}
            placeholder="Your Brand Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Support Email
          </label>
          <input
            type="email"
            value={config.supportEmail}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
            placeholder="support@yourbrand.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={config.productName}
            onChange={(e) => handleChange('productName', e.target.value)}
            placeholder="Product Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product URL
          </label>
          <input
            type="url"
            value={config.productUrl}
            onChange={(e) => handleChange('productUrl', e.target.value)}
            placeholder="https://supplementsafetybible.com/check"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            QR Code Target URL
          </label>
          <input
            type="url"
            value={config.qrUrl}
            onChange={(e) => handleChange('qrUrl', e.target.value)}
            placeholder="https://supplementsafetybible.com/check"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Surgery Window
          </label>
          <input
            type="text"
            value={config.surgeryWindow}
            onChange={(e) => handleChange('surgeryWindow', e.target.value)}
            placeholder="2–3 weeks"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Accent Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={config.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="h-12 w-16 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={config.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              placeholder="#7c3aed"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Logo (Optional)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700">Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="h-12 w-auto object-contain border border-gray-200 rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
