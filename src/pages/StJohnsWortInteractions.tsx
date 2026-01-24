import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertTriangle, FlaskConical, Pill, BookOpen, ChevronRight, Info } from 'lucide-react';

export default function StJohnsWortInteractions() {
  return (
    <>
      <Helmet>
        <title>St. John's Wort Drug Interactions: What to Know | Evidence-Based Guide</title>
        <meta
          name="description"
          content="St. John's Wort interacts with many prescription medications by affecting liver enzymes. Learn about documented interactions, risks, and why supplement labels may be inadequate."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://supplementsafetybible.com/st-johns-wort-drug-interactions" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Disclaimer Banner */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <p className="text-slate-800 font-medium">
              <strong>Educational information only. Not medical advice.</strong> This content is for educational purposes and does not replace consultation with a healthcare provider.
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            St. John's Wort Drug Interactions: What to Know
          </h1>

          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            St. John's Wort (Hypericum perforatum) is one of the most extensively documented herbal supplements for drug interactions. Evidence suggests it can reduce the effectiveness of numerous prescription medications by speeding up their breakdown in the body, potentially leading to treatment failure.
          </p>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-slate-700 leading-relaxed">
              St. John's Wort is a popular herbal supplement traditionally used for mood support. Despite being available over-the-counter and marketed as a natural product, it has powerful effects on drug metabolism that have been documented in peer-reviewed clinical research. These effects can significantly impact how prescription medications work in the body.
            </p>

            <p className="text-slate-700 leading-relaxed">
              The FDA and international health agencies have issued warnings about St. John's Wort interactions, yet many consumers remain unaware of the scope of this issue. Product labels may include generic warnings, but they often fail to convey the clinical significance or list all affected medication categories.
            </p>
          </div>

          {/* How St. John's Wort Affects Drug Metabolism */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FlaskConical className="w-8 h-8 text-blue-600" />
              How St. John's Wort Affects Drug Metabolism
            </h2>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <p className="text-slate-700 leading-relaxed mb-6">
                St. John's Wort's interaction mechanism is well-documented in scientific literature. The herb contains compounds that induce or activate certain enzymes and transport proteins responsible for drug metabolism:
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Cytochrome P450 Enzyme Induction</h3>
                  <p className="text-slate-700 leading-relaxed">
                    St. John's Wort strongly induces CYP3A4, an enzyme responsible for metabolizing approximately 50% of all prescription medications. When this enzyme is activated, drugs are broken down more quickly, leading to lower drug levels in the blood. It may also affect other CYP enzymes including CYP2C9 and CYP2C19.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">P-Glycoprotein Activation</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The herb also activates P-glycoprotein, a protein that pumps drugs out of cells and reduces their absorption. This can further decrease medication levels and effectiveness.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Duration of Effect</h3>
                  <p className="text-slate-700 leading-relaxed">
                    These enzyme-inducing effects can persist for weeks after stopping St. John's Wort. Studies suggest it may take 1-2 weeks or longer for enzyme activity to return to baseline after discontinuation, meaning interactions can continue even after the supplement is stopped.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Known Interaction Categories */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Pill className="w-8 h-8 text-red-600" />
              Known Interaction Categories
            </h2>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <p className="text-slate-700 leading-relaxed mb-6">
                St. John's Wort has been documented to interact with numerous medication classes. The following categories represent areas where clinical evidence or significant case reports exist:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-6 py-3 bg-red-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Antidepressants and Psychiatric Medications</h3>
                  <p className="text-slate-700 leading-relaxed">
                    St. John's Wort may increase serotonin levels and can interact with SSRIs, SNRIs, and other antidepressants, potentially leading to serotonin syndrome—a serious condition. It may also reduce levels of some antipsychotic medications.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6 py-3 bg-red-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Oral Contraceptives</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Evidence suggests St. John's Wort can reduce the effectiveness of birth control pills by increasing their metabolism. This has led to breakthrough bleeding and unintended pregnancies in documented cases.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6 py-3 bg-red-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Immunosuppressants</h3>
                  <p className="text-slate-700 leading-relaxed">
                    St. John's Wort can significantly reduce blood levels of immunosuppressant drugs like cyclosporine and tacrolimus, used by transplant patients. This can lead to organ rejection—a life-threatening complication. Multiple case reports document this interaction.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-3 bg-orange-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Anticoagulants (Blood Thinners)</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The herb may reduce effectiveness of warfarin and potentially other anticoagulants, increasing the risk of blood clots. Changes in INR (a measure of blood clotting) have been documented when St. John's Wort is started or stopped.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-3 bg-orange-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">HIV Medications</h3>
                  <p className="text-slate-700 leading-relaxed">
                    St. John's Wort can substantially reduce levels of protease inhibitors and non-nucleoside reverse transcriptase inhibitors used to treat HIV. This can lead to treatment failure and development of drug-resistant virus strains.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-3 bg-orange-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Cancer Chemotherapy</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The herb may reduce levels of irinotecan and potentially other chemotherapy drugs, which could impact cancer treatment effectiveness. Some oncologists recommend avoiding all herbal supplements during cancer treatment.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-yellow-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Cardiovascular Medications</h3>
                  <p className="text-slate-700 leading-relaxed">
                    St. John's Wort may reduce levels of digoxin (used for heart failure and arrhythmias) and some calcium channel blockers and statins. This could affect cardiovascular disease management.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-yellow-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Sedatives and Anesthesia</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The herb may interact with benzodiazepines, anesthetics, and other central nervous system depressants. Many surgical protocols recommend discontinuing St. John's Wort before procedures.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-yellow-50">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Other Medications</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Additional reported interactions include medications for seizures, diabetes, thyroid conditions, and many others. The list continues to grow as more research is conducted and case reports are published.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why This Is Complicated */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              Why This Is Complicated
            </h2>

            <div className="bg-amber-50 rounded-xl border border-amber-200 p-8">
              <p className="text-slate-800 leading-relaxed mb-6">
                Despite extensive documentation of St. John's Wort interactions, several factors make this issue more complex than it might appear:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Variable Product Potency</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Different St. John's Wort products contain varying amounts of active compounds, particularly hypericin and hyperforin. Studies have found wide variation in content between brands and even between batches from the same manufacturer. This makes it difficult to predict the strength of interactions.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Inadequate Product Labels</h3>
                  <p className="text-slate-700 leading-relaxed">
                    While many St. John's Wort products now include warnings about drug interactions, these warnings are often generic and incomplete. They may state "consult a healthcare provider if taking other medications" without specifying which medication classes are of particular concern or explaining the mechanism and clinical significance.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Time-Dependent Effects</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Enzyme induction doesn't happen immediately—it develops over days to weeks of regular St. John's Wort use. This means someone might initially tolerate the combination, only to develop problems later. Similarly, stopping the herb doesn't immediately reverse the effect.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Individual Variation</h3>
                  <p className="text-slate-700 leading-relaxed">
                    People metabolize drugs at different rates based on genetics and other factors. While St. John's Wort affects most people, the degree of enzyme induction can vary. Additionally, some medications have wider therapeutic windows and may tolerate some reduction in levels better than others.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Interactions May Not Cause Symptoms</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Many St. John's Wort interactions don't produce obvious symptoms. A medication simply becomes less effective. For immunosuppressants or HIV medications, this might not be noticed until serious complications develop. For oral contraceptives, the first sign might be an unintended pregnancy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Clinical Significance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Info className="w-8 h-8 text-purple-600" />
              Why Labels Aren't Enough
            </h2>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <p className="text-slate-700 leading-relaxed mb-6">
                Relying solely on supplement labels to identify drug interactions has significant limitations:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Generic Warnings:</strong>
                    <span className="text-slate-700"> Labels typically include broad statements like "consult your doctor if taking prescription medications" without identifying specific high-risk drug classes or explaining the nature of interactions.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Incomplete Lists:</strong>
                    <span className="text-slate-700"> Even when labels list specific drugs, the lists are often incomplete. New interactions continue to be discovered and reported in medical literature, but supplement labels aren't required to be updated accordingly.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">No Severity Indication:</strong>
                    <span className="text-slate-700"> Labels don't distinguish between theoretical concerns and well-documented, clinically significant interactions. They also don't indicate which interactions might be life-threatening versus those that are more manageable.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Technical Language:</strong>
                    <span className="text-slate-700"> When labels do provide specific information, it may use technical terminology (like "CYP3A4 inducer") that consumers without medical background can't interpret or apply to their own medications.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Limited Space:</strong>
                    <span className="text-slate-700"> Physical label size constraints mean comprehensive interaction information simply cannot fit on a bottle. At best, labels provide a starting point for further investigation.</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Can I take St. John's Wort if I'm not on any prescription medications?
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  If you're not taking prescription medications, the drug interaction concern is reduced. However, consider that you might need to start a medication in the future, and St. John's Wort's effects persist for weeks after stopping. Additionally, the herb can interact with some over-the-counter medications and may not be appropriate for everyone. Consult with a healthcare provider before starting any supplement regimen.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  How long after stopping St. John's Wort is it safe to start a new medication?
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Research suggests it may take 1-2 weeks or longer for enzyme activity to return to normal after discontinuing St. John's Wort. However, the appropriate washout period may vary based on individual factors and the specific medication being started. If you're planning to begin a new prescription, discuss timing with your healthcare provider.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Are all St. John's Wort products equally likely to cause interactions?
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Studies have found significant variation in the content of active compounds between different St. John's Wort products. Products standardized to higher hyperforin content may pose greater interaction risk. However, even low-dose or "low-hyperforin" products can affect drug metabolism in some individuals. The safest approach is to consider all St. John's Wort products as potential interaction risks.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What should I do if I'm currently taking St. John's Wort with prescription medications?
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Do not stop St. John's Wort suddenly without consulting your healthcare provider. Abruptly discontinuing the herb can change drug levels and may cause problems. Instead, schedule an appointment to review your complete medication and supplement regimen. Your provider can help you determine whether the combination poses significant risk and, if needed, develop a safe plan for making changes.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Are there alternatives to St. John's Wort that don't have these interactions?
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Many people take St. John's Wort for mood support, but it's important to work with a healthcare provider to address mental health concerns rather than self-treating with supplements. Prescription antidepressants have undergone extensive testing and their interactions are better documented. Some other supplements have fewer documented interactions, but "fewer" doesn't mean "none," and supplement efficacy for mood support varies. A healthcare provider can help evaluate appropriate options based on your individual situation.
                </p>
              </div>
            </div>
          </section>

          {/* External Reference */}
          <div className="bg-slate-100 rounded-xl p-8 mb-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Additional Resources</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              For more information about St. John's Wort and drug interactions, the National Institutes of Health Office of Dietary Supplements maintains updated fact sheets. The FDA has also issued consumer warnings about St. John's Wort interactions. Peer-reviewed research on specific interactions can be found through PubMed.
            </p>
            <p className="text-slate-600 text-sm italic">
              Note: External resources are provided for informational purposes. We do not endorse specific treatments or recommendations.
            </p>
          </div>

          {/* Soft CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Check Your Medications for St. John's Wort Interactions
            </h2>
            <p className="text-slate-700 mb-6 leading-relaxed max-w-2xl mx-auto">
              For a more complete interaction review tailored to your specific medications and supplements, explore our evidence-based interaction checker. Premium access provides detailed information about documented interactions, severity levels, and clinical significance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/check"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Free Checker
              </Link>
              <Link
                to="/premium"
                className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Premium Features
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/can-supplements-interact-with-prescription-drugs" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Can Supplements Interact With Prescription Drugs?</h4>
                <p className="text-slate-600 text-sm">Learn about supplement-drug interaction mechanisms and risk factors</p>
              </Link>
              <Link to="/supplement-drug-interactions" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Supplement-Drug Interactions Guide</h4>
                <p className="text-slate-600 text-sm">Comprehensive information about common interactions across supplement types</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
