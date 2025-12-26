import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { SafetyPackConfig } from './SafetyPackForm';
import {
  generateBoxInsertContent,
  generateAmazonShopifyModule,
  generateWebsiteFAQ,
  generateSupportTemplates,
  generateHowToUse,
} from './SafetyPackContent';

interface SafetyPackPreviewTabsProps {
  config: SafetyPackConfig;
  onDownloadPDF: () => void;
}

type Tab = 'insert' | 'amazon' | 'faq' | 'support' | 'howto';

export default function SafetyPackPreviewTabs({ config, onDownloadPDF }: SafetyPackPreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('insert');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [key]: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [key]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tabs = [
    { id: 'insert' as Tab, label: 'Box Insert' },
    { id: 'amazon' as Tab, label: 'Amazon/Shopify' },
    { id: 'faq' as Tab, label: 'Website FAQ' },
    { id: 'support' as Tab, label: 'Support Templates' },
    { id: 'howto' as Tab, label: 'How to Use' },
  ];

  const supportTemplates = generateSupportTemplates(config);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Previews</h2>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'insert' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Box Insert (PDF)</h3>
              <button
                onClick={onDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 whitespace-pre-wrap font-mono text-sm">
              {generateBoxInsertContent(config)}
            </div>
          </div>
        )}

        {activeTab === 'amazon' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Amazon/Shopify Module</h3>
              <button
                onClick={() => copyToClipboard(generateAmazonShopifyModule(config), 'amazon')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copiedStates['amazon'] ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy Text
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: generateAmazonShopifyModule(config)
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br />'),
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Website FAQ</h3>
              <button
                onClick={() => copyToClipboard(generateWebsiteFAQ(config), 'faq')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copiedStates['faq'] ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy Text
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: generateWebsiteFAQ(config)
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br />'),
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Support Templates</h3>
            {supportTemplates.map((template, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">Template {String.fromCharCode(65 + idx)}: {template.title}</h4>
                  <button
                    onClick={() => copyToClipboard(template.content, `template-${idx}`)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {copiedStates[`template-${idx}`] ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-white">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{template.content}</pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'howto' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Guide</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: generateHowToUse()
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br />'),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
