import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';
import { INFO_EMAIL } from '../lib/support';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy | Supplement Safety Bible"
        description="Learn how Supplement Safety Bible protects your privacy and handles your personal information."
        canonical="/privacy"
      />
      <Navbar />

      <main className="flex-grow py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Supplement Safety Bible ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Account information (name, email address)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Supplement and medication lists you choose to save</li>
                <li>Usage data and interaction history with our service</li>
                <li>Communications with our support team</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your subscription and payments</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Service Providers:</strong> We share information with third-party service providers
                  who perform services on our behalf, such as payment processing (Stripe), hosting (Supabase),
                  and analytics.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information if required by law or in
                  response to valid legal requests.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale
                  of assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Restricted access to personal information</li>
                <li>Secure payment processing through PCI-compliant providers</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Access and review your personal information</li>
                <li>Correct or update inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
                <li>Object to certain processing of your information</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information for as long as necessary to provide our services and
                fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will
                delete or anonymize your information within 30 days, except where we are required to retain
                it for legal or regulatory purposes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our service is not intended for individuals under the age of 18. We do not knowingly collect
                personal information from children. If you are a parent or guardian and believe we have
                collected information about a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                Your continued use of the service after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed">
                Email: <a href={`mailto:${INFO_EMAIL}`} className="text-blue-600 hover:text-blue-700">{INFO_EMAIL}</a>
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
