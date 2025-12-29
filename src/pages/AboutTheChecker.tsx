import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Users } from 'lucide-react';

export default function AboutTheChecker() {
  return (
    <>
      <Helmet>
        <title>What Is Supplement Safety Bible? | About the Checker</title>
        <meta
          name="description"
          content="Supplement Safety Bible is an evidence-based tool to identify potential interactions between dietary supplements and prescription medications."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://supplementsafetybible.com/about-the-checker" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
            What Is Supplement Safety Bible?
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-0">
                Supplement Safety Bible is an online, evidence-based tool designed to help people identify potential interactions between dietary supplements and prescription medications.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4 mb-0">
                It focuses on clinically documented risks, common supplement–drug combinations, and situations where extra caution may be needed, such as pregnancy, chronic conditions, and polypharmacy.
              </p>
            </div>

            <section className="mb-12">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-slate-900 mt-0">What the Checker Does</h2>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <ul className="space-y-3 text-slate-700 mb-0">
                  <li>Identifies clinically documented interactions between supplements and medications</li>
                  <li>Provides evidence-based information from peer-reviewed sources</li>
                  <li>Highlights potential risks based on severity level</li>
                  <li>Covers common supplement-drug combinations</li>
                  <li>Addresses special populations (pregnancy, chronic conditions, polypharmacy)</li>
                  <li>Offers educational information to support informed decision-making</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-start gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-slate-900 mt-0">What the Checker Does Not Do</h2>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <ul className="space-y-3 text-slate-700 mb-0">
                  <li>Does not provide medical advice or treatment recommendations</li>
                  <li>Does not replace consultation with a healthcare provider</li>
                  <li>Does not guarantee safety of any combination</li>
                  <li>Does not cover every possible interaction or supplement</li>
                  <li>Does not recommend starting or stopping any medication or supplement</li>
                  <li>Does not diagnose medical conditions</li>
                </ul>
              </div>
            </section>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-12">
              <p className="text-slate-800 font-medium mb-0">
                <strong>Important:</strong> If no interaction is shown, it means no interaction is currently documented, not that the combination is guaranteed to be safe.
              </p>
            </div>

            <section className="mb-12">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-slate-900 mt-0">Who This Tool Is For</h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <ul className="space-y-3 text-slate-700 mb-0">
                  <li><strong>Patients and consumers</strong> who want to research potential interactions before taking supplements with medications</li>
                  <li><strong>Healthcare providers</strong> seeking a quick reference for common supplement-drug interactions</li>
                  <li><strong>Pharmacists</strong> counseling patients on supplement safety</li>
                  <li><strong>Caregivers</strong> managing medications for family members taking multiple supplements</li>
                  <li><strong>Anyone</strong> interested in evidence-based information about supplement safety</li>
                </ul>
              </div>
            </section>

            <div className="bg-slate-100 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Check for Interactions?</h2>
              <p className="text-slate-700 mb-6">
                Use our free interaction checker to review potential risks.
              </p>
              <Link
                to="/check"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try the Checker
              </Link>
            </div>

            <div className="mt-12 text-sm text-slate-600 border-t pt-8">
              <p className="mb-2"><strong>Disclaimer:</strong></p>
              <p className="mb-0">
                This information is for educational purposes only and does not constitute medical advice.
                Always consult with a qualified healthcare provider before making changes to your medications or supplements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
