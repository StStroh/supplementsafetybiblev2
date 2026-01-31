import { Helmet } from 'react-helmet-async';
import { Shield, Award, BookOpen, Mail } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Supplement Safety Bible</title>
        <meta name="description" content="Learn about Stefan Stroh and the 20+ years of supplement manufacturing expertise behind our free interaction checker." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#5e2b7e] to-[#8b4d9f] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Supplement Safety Bible</h1>
            <p className="text-xl text-purple-100">
              Industry expertise meets public safety
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Who Created This */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Created This Tool</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                My name is <strong>Stefan Stroh</strong>, and I've spent over 20 years as a Plant Manager
                of an NSF GMP certified supplement manufacturing facility. During my career, I've overseen
                the development of 1,000+ supplement formulations and witnessed firsthand the gaps in
                consumer knowledge about supplement-medication interactions.
              </p>
              <p className="text-gray-700 mb-4">
                This tool was born from a simple observation: consumers deserve the same level of safety
                information that industry professionals have access to. After two decades in supplement
                manufacturing, formulation, and quality assurance, I decided to build a free, accessible
                resource to help people make informed decisions about their health.
              </p>
            </div>
          </div>

          {/* Expertise Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#5e2b7e]" />
              </div>
              <h3 className="font-bold text-lg mb-2">NSF GMP Certified</h3>
              <p className="text-gray-600 text-sm">Operations excellence in supplement manufacturing</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#5e2b7e]" />
              </div>
              <h3 className="font-bold text-lg mb-2">20+ Years Experience</h3>
              <p className="text-gray-600 text-sm">Plant management and formulation expertise</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#5e2b7e]" />
              </div>
              <h3 className="font-bold text-lg mb-2">1,000+ Formulations</h3>
              <p className="text-gray-600 text-sm">Developed and quality-assured</p>
            </div>
          </div>

          {/* Independence Statement */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">100% Independent & Free</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                This tool is completely free to use with no registration required. We have zero financial
                conflicts of interest:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ No supplement sales</li>
                <li>✓ No affiliate commissions</li>
                <li>✓ No advertising revenue</li>
                <li>✓ No sponsored content</li>
                <li>✓ No hidden fees</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our only goal is public safety. Period.
              </p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Data Sources</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Every interaction in our database is backed by credible scientific sources:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>PubMed:</strong> Peer-reviewed medical research</li>
                <li><strong>NIH:</strong> National Institutes of Health clinical data</li>
                <li><strong>FDA:</strong> Food and Drug Administration safety alerts</li>
                <li><strong>Medical Journals:</strong> Published clinical studies and case reports</li>
                <li><strong>Pharmacology Research:</strong> CYP450 enzyme interactions and bioavailability studies</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We combine this published research with real-world manufacturing expertise to provide
                practical, actionable safety information.
              </p>
            </div>
          </div>

          {/* Why I Built This */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why I Built This</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                After 20+ years in the supplement industry, I've seen too many preventable incidents where
                consumers simply didn't know about dangerous interactions. The information exists in scientific
                literature, but it's scattered, technical, and inaccessible to most people.
              </p>
              <p className="text-gray-700 mb-4">
                As an industry insider, I have a responsibility to expose the truth and make this critical
                safety information freely available. This isn't about fear-mongering – it's about empowering
                people with the knowledge they need to make safe, informed decisions.
              </p>
              <p className="text-gray-700">
                If this tool prevents even one dangerous interaction, it's worth every hour invested in building it.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-[#5e2b7e] to-[#8b4d9f] text-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
            <p className="text-purple-100 mb-4">
              Questions, feedback, or suggestions? I'd love to hear from you.
            </p>
            <a
              href="mailto:info@supplementsafetybible.com"
              className="inline-block bg-white text-[#5e2b7e] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              info@supplementsafetybible.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
