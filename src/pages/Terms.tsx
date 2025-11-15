import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using Supplement Safety Bible ("Service"), you accept and agree to be bound
                by the terms and provisions of this agreement. If you do not agree to these Terms of Service,
                please do not use our Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Supplement Safety Bible provides an online platform for checking potential interactions
                between dietary supplements and prescription medications. Our Service includes access to
                a database of supplements, medications, and documented interactions based on scientific research.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Disclaimer</h2>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-4">
                <p className="text-gray-900 font-semibold mb-2">IMPORTANT NOTICE</p>
                <p className="text-gray-700 leading-relaxed">
                  The information provided by Supplement Safety Bible is for educational and informational
                  purposes only and is not intended as a substitute for professional medical advice, diagnosis,
                  or treatment. Always seek the advice of your physician or other qualified health provider
                  with any questions you may have regarding a medical condition or treatment.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Never disregard professional medical advice or delay in seeking it because of something you
                have read on our Service. If you think you may have a medical emergency, call your doctor
                or emergency services immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of the Service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Plans and Billing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer several subscription tiers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Starter:</strong> Free plan with limited features</li>
                <li><strong>Pro:</strong> Paid subscription at $29/month or $290/year</li>
                <li><strong>Premium:</strong> Paid subscription at $49/month or $490/year</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                By subscribing to a paid plan, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Pay all applicable fees for your selected subscription plan</li>
                <li>Automatic renewal of your subscription unless cancelled</li>
                <li>Billing at the beginning of each billing cycle</li>
                <li>No refunds for partial billing periods</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may cancel your subscription at any time. Upon cancellation, you will retain access
                to paid features until the end of your current billing period.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Copy, modify, or distribute content from the Service without permission</li>
                <li>Use automated systems to access the Service without authorization</li>
                <li>Misrepresent your identity or affiliation with any person or entity</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Supplement
                Safety Bible and are protected by international copyright, trademark, patent, trade secret,
                and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly display,
                publicly perform, republish, download, store, or transmit any of the material on our Service
                without our prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUPPLEMENT SAFETY BIBLE SHALL NOT BE LIABLE FOR
                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
                PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
                GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, or the like that may be transmitted through the Service</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Supplement Safety Bible and its officers,
                directors, employees, and agents from and against any claims, liabilities, damages, losses,
                and expenses arising out of or in any way connected with your access to or use of the Service
                or your violation of these Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify or replace these Terms at any time at our sole discretion.
                We will provide notice of any material changes by posting the new Terms on this page and
                updating the "Last updated" date. Your continued use of the Service after such modifications
                constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Service immediately, without
                prior notice or liability, for any reason, including if you breach these Terms. Upon
                termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United
                States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed">
                Email: <a href="mailto:legal@supplementsafetybible.com" className="text-blue-600 hover:text-blue-700">legal@supplementsafetybible.com</a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
            >
              &larr; Back to Home
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
