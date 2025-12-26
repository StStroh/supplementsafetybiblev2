export default function SafetyEngineWorkflow() {
  return (
    <div className="w-full overflow-x-auto bg-white py-12 px-6">
      <div className="min-w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Supplement Safety Engine Workflow
        </h2>

        <div className="flex gap-6 items-start justify-center">
          {/* Column 1: Evidence Sources */}
          <div className="flex flex-col gap-4 w-56">
            <div className="rounded-xl border-2 border-[#0284C7] bg-[#E0F2FE] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                Evidence Sources
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• PubMed · FDA · EMA</li>
                <li>• DailyMed</li>
                <li>• Expert Input</li>
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="rounded-xl border-2 border-[#0284C7] bg-[#E0F2FE] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900">
                Raw Evidence Queue
              </h3>
            </div>
          </div>

          {/* Arrow 1 to 2 */}
          <div className="flex items-center pt-12">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-gray-400">
              <path d="M0 12h40m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Column 2: AI + Human Pre-Screening */}
          <div className="flex flex-col gap-4 w-56">
            <div className="rounded-xl border-2 border-[#7C3AED] bg-[#F3E8FF] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                AI + Human Pre-Screening
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Dose realism</li>
                <li>• Interaction plausibility</li>
                <li>• Population risk</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 ml-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="rounded-lg border-2 border-[#6B7280] bg-[#E5E7EB] px-3 py-1.5 shadow-sm flex-1">
                  <p className="font-medium text-xs text-gray-800">Discard → Archive</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="rounded-lg border-2 border-[#6B7280] bg-[#E5E7EB] px-3 py-1.5 shadow-sm flex-1">
                  <p className="font-medium text-xs text-gray-800">Monitor → Watchlist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow 2 to 3 */}
          <div className="flex items-center pt-12">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-gray-400">
              <path d="M0 12h40m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Column 3: Safety Evidence Core */}
          <div className="flex flex-col gap-4 w-56">
            <div className="rounded-xl border-2 border-[#0D9488] bg-[#CCFBF1] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                Safety Evidence Core (SEC)
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Mechanism</li>
                <li>• Evidence grade</li>
                <li>• Dose thresholds</li>
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="rounded-xl border-2 border-[#0D9488] bg-[#CCFBF1] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                Expert Synthesis
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Normalize doses</li>
                <li>• Resolve conflicts</li>
              </ul>
            </div>
          </div>

          {/* Arrow 3 to 4 */}
          <div className="flex items-center pt-12">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-gray-400">
              <path d="M0 12h40m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Column 4: Stacked Outputs */}
          <div className="flex flex-col gap-4 w-56">
            <div className="rounded-xl border-2 border-[#0D9488] bg-[#CCFBF1] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900">
                Safety Database
              </h3>
              <p className="text-xs text-gray-600 mt-1">(Machine-readable)</p>
            </div>

            <div className="rounded-xl border-2 border-[#0D9488] bg-[#CCFBF1] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900">
                Supplement Guide
              </h3>
              <p className="text-xs text-gray-600 mt-1">(Human-readable)</p>
            </div>

            <div className="rounded-xl border-2 border-[#0D9488] bg-[#CCFBF1] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900">
                Condition Pages
              </h3>
              <p className="text-xs text-gray-600 mt-1">(SEO / Education)</p>
            </div>
          </div>

          {/* Arrow 4 to 5 */}
          <div className="flex items-center pt-12">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-gray-400">
              <path d="M0 12h40m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Column 5: Expert Review & Deployment */}
          <div className="flex flex-col gap-4 w-56">
            <div className="rounded-xl border-2 border-[#D97706] bg-[#FEF3C7] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                Expert Review & Compliance
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Claim control</li>
                <li>• Versioning</li>
                <li>• Audit trail</li>
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="rounded-xl border-2 border-[#16A34A] bg-[#DCFCE7] p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                Deployment
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Interaction Checker</li>
                <li>• PDF Exports</li>
                <li>• API</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
            Workflow Stages
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#0284C7] bg-[#E0F2FE]"></div>
              <span className="text-gray-700">Evidence / Inputs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#7C3AED] bg-[#F3E8FF]"></div>
              <span className="text-gray-700">Screening / AI Logic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#0D9488] bg-[#CCFBF1]"></div>
              <span className="text-gray-700">Safety Engine / Database</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#D97706] bg-[#FEF3C7]"></div>
              <span className="text-gray-700">Expert Review / Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#16A34A] bg-[#DCFCE7]"></div>
              <span className="text-gray-700">Deployment / Outputs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#6B7280] bg-[#E5E7EB]"></div>
              <span className="text-gray-700">Archive / Discard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
