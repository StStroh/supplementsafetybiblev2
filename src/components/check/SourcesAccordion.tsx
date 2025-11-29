import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface Source {
  title: string;
  url?: string;
  year?: string;
  authors?: string;
}

interface SourcesAccordionProps {
  sources: Source[];
  freeSources?: number;
}

export default function SourcesAccordion({ sources, freeSources = 1 }: SourcesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibleSources = sources.slice(0, freeSources);
  const lockedSources = sources.slice(freeSources);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">Evidence & Sources</span>
          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
            {sources.length} {sources.length === 1 ? 'source' : 'sources'}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="px-5 py-4 bg-white space-y-3">
          {visibleSources.map((source, idx) => (
            <div key={idx} className="pb-3 border-b border-slate-100 last:border-0">
              <div className="text-sm font-medium text-slate-900">{source.title}</div>
              {source.authors && (
                <div className="text-xs text-slate-600 mt-1">{source.authors}</div>
              )}
              {source.year && (
                <div className="text-xs text-slate-500 mt-1">Published: {source.year}</div>
              )}
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
                >
                  View source
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}

          {lockedSources.length > 0 && (
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                <div className="text-sm text-slate-600">
                  +{lockedSources.length} more {lockedSources.length === 1 ? 'source' : 'sources'} available
                </div>
                <a
                  href="/pricing?plan=pro"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Unlock all
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
