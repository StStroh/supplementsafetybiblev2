import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AlertCircle, Shield, Search, FileText, CheckCircle, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SupplementDrugInteractions() {
  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Supplement Safety Bible",
    "url": "https://supplementsafetybible.com",
    "logo": "https://supplementsafetybible.com/brand/logo.png",
    "description": "Evidence-based supplement and medication interaction information",
    "sameAs": [
      "https://supplementsafetybible.com"
    ]
  };

  const schemaMedicalWebPage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Understanding Supplement-Drug Interactions: A Comprehensive Guide",
    "description": "Learn about supplement-medication interactions, why they occur, and how to identify potential risks when combining dietary supplements with prescription drugs.",
    "url": "https://supplementsafetybible.com/supplement-drug-interactions",
    "lastReviewed": "2025-01-18",
    "audience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient"
    },
    "about": {
      "@type": "MedicalCondition",
      "name": "Drug Interactions"
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are supplement-drug interactions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Supplement-drug interactions occur when dietary supplements (including vitamins, minerals, herbs, and other nutritional products) interfere with how prescription or over-the-counter medications work in your body. These interactions can reduce medication effectiveness, increase side effects, or create new health risks."
        }
      },
      {
        "@type": "Question",
        "name": "How common are supplement-medication interactions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Supplement-medication interactions are more common than many people realize. Research suggests that approximately 1 in 6 adults taking prescription medications also uses dietary supplements that could potentially interact. The risk increases with the number of medications and supplements taken simultaneously."
        }
      },
      {
        "@type": "Question",
        "name": "Can vitamins interact with prescription drugs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, even common vitamins can interact with prescription medications. For example, vitamin K can reduce the effectiveness of blood thinners like warfarin, vitamin E may increase bleeding risk when combined with anticoagulants, and calcium can interfere with certain antibiotics and thyroid medications by affecting absorption."
        }
      },
      {
        "@type": "Question",
        "name": "What types of interactions should I be most concerned about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most concerning interactions typically involve medications with narrow therapeutic windows (where the difference between an effective and toxic dose is small), such as blood thinners, heart medications, immunosuppressants, and seizure medications. Supplements that affect liver enzymes (like St. John's Wort) or blood clotting (like fish oil, garlic, or ginkgo) warrant particular attention."
        }
      },
      {
        "@type": "Question",
        "name": "How can I check for supplement-drug interactions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can check for interactions by consulting healthcare professionals, using evidence-based interaction checkers, reviewing scientific literature, or utilizing specialized databases. Professional interaction screening tools analyze your complete medication and supplement list against known interaction data to identify potential risks."
        }
      },
      {
        "@type": "Question",
        "name": "Should I tell my doctor about all supplements I take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely. It's essential to inform all your healthcare providers about every supplement, vitamin, mineral, and herbal product you take, including dosages and frequency. Many patients don't consider supplements as 'real medicine,' but they can significantly affect your treatment and health outcomes."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Helmet>
        <title>Supplement-Drug Interactions: Complete Guide to Safety & Risks | Supplement Safety Bible</title>
        <meta name="description" content="Comprehensive guide to understanding supplement-medication interactions. Learn how vitamins, herbs, and dietary supplements can affect prescription drugs, potential risks, and how to check for interactions." />
        <meta name="keywords" content="supplement drug interactions, supplement medication interactions, vitamin drug interactions, herbal medication interactions, supplement interaction checker, drug supplement safety" />
        <link rel="canonical" href="https://supplementsafetybible.com/supplement-drug-interactions" />

        <meta property="og:title" content="Supplement-Drug Interactions: Complete Guide to Safety & Risks" />
        <meta property="og:description" content="Learn how dietary supplements can interact with medications, why interactions occur, and how to identify potential risks." />
        <meta property="og:url" content="https://supplementsafetybible.com/supplement-drug-interactions" />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">
          {JSON.stringify(schemaOrganization)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemaMedicalWebPage)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemaFAQ)}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Understanding Supplement-Drug Interactions: A Comprehensive Guide
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Dietary supplements and prescription medications both play important roles in health management, but their combination can sometimes lead to unexpected interactions. This guide explores how these interactions occur, which combinations require careful attention, and how to make informed decisions about supplement use alongside medications.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg border p-4 mb-12 flex items-start gap-3" style={{ background: '#FFF3E0', borderColor: '#FFB74D' }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F57C00' }} />
            <p className="text-sm" style={{ color: '#E65100' }}>
              <strong>Important:</strong> This information is for educational purposes only and does not constitute medical advice. Always consult with qualified healthcare professionals before starting, stopping, or changing any medications or supplements.
            </p>
          </div>

          {/* Main Content */}
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              What Are Supplement-Drug Interactions?
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Supplement-drug interactions occur when dietary supplements—including vitamins, minerals, herbs, amino acids, and other nutritional products—interfere with how prescription or over-the-counter medications function in the body. These interactions can manifest in several ways: they may reduce a medication's effectiveness, amplify its effects to potentially dangerous levels, increase the risk of side effects, or create entirely new adverse effects that neither the supplement nor medication would cause independently.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              The prevalence of supplement use in the United States is substantial. According to recent surveys, more than half of American adults regularly take at least one dietary supplement, and many of these individuals are also taking prescription medications. This widespread simultaneous use creates numerous opportunities for interactions, yet many people remain unaware of potential risks.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Why Do Supplement-Medication Interactions Occur?
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Understanding the mechanisms behind supplement-drug interactions helps explain why certain combinations require caution. These interactions typically occur through several biological pathways:
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Pharmacokinetic Interactions: How the Body Processes Substances
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Pharmacokinetic interactions affect how the body absorbs, distributes, metabolizes, or eliminates medications. Many supplements influence liver enzymes, particularly the cytochrome P450 system, which is responsible for metabolizing the majority of prescription drugs. When a supplement alters these enzyme systems, it can cause medications to be processed faster or slower than intended, leading to subtherapeutic levels or toxic accumulation.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              St. John's Wort provides a well-documented example of this mechanism. This popular herbal supplement induces several cytochrome P450 enzymes, accelerating the metabolism of numerous medications including birth control pills, antidepressants, blood thinners, and immunosuppressants. This acceleration can render these medications less effective, potentially leading to treatment failure or serious health consequences.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Absorption interactions represent another pharmacokinetic concern. Some supplements can bind to medications in the digestive tract, preventing their absorption. Calcium, for instance, can significantly reduce the absorption of certain antibiotics and thyroid medications when taken simultaneously. This is why timing of administration becomes crucial for many supplement-medication combinations.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Pharmacodynamic Interactions: Overlapping Effects
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Pharmacodynamic interactions occur when supplements and medications have similar or opposing effects on the body. These interactions don't necessarily involve how substances are processed but rather how they act on biological systems.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Consider anticoagulant medications like warfarin, which are prescribed to prevent blood clots. Multiple supplements—including fish oil, garlic, ginkgo biloba, vitamin E, and ginger—also possess blood-thinning properties. When combined with anticoagulant medications, these supplements can create an additive effect, significantly increasing bleeding risk. This doesn't mean these supplements are inherently dangerous, but their use alongside blood-thinning medications requires careful monitoring and professional guidance.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Common Categories of Concern
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              While any supplement-medication combination deserves consideration, certain categories warrant particular attention due to their interaction potential or the seriousness of potential consequences.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Medications with Narrow Therapeutic Windows
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Some medications require very precise blood levels to be effective without causing toxicity—the difference between a therapeutic dose and a dangerous dose is small. These narrow therapeutic window drugs are particularly susceptible to clinically significant interactions. Examples include anticoagulants (warfarin, direct oral anticoagulants), antiepileptic drugs (phenytoin, carbamazepine), immunosuppressants (tacrolimus, cyclosporine), and certain cardiac medications (digoxin).
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              For individuals taking these medications, even minor changes in drug metabolism or absorption can lead to treatment failure or toxicity. Supplement use in these cases requires heightened awareness and close collaboration with healthcare providers.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Cardiovascular Medications
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Blood pressure medications, blood thinners, and heart rhythm drugs frequently interact with dietary supplements. Potassium supplements can be dangerous when combined with certain blood pressure medications that also affect potassium levels. Hawthorn, a popular herbal supplement for cardiovascular support, may interact with heart medications and blood pressure drugs. Grapefruit and grapefruit supplements can affect numerous cardiovascular medications by inhibiting metabolism.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Mental Health Medications
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Antidepressants, anti-anxiety medications, and mood stabilizers can interact with various supplements. SAMe (S-adenosyl-L-methionine), 5-HTP, and tryptophan supplements affect serotonin levels and may interact with selective serotonin reuptake inhibitors (SSRIs) and other antidepressants, potentially leading to serotonin syndrome—a serious condition characterized by confusion, agitation, rapid heart rate, and other symptoms.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Kava, used traditionally for anxiety, has been associated with liver problems and may interact with medications metabolized by the liver or those affecting the central nervous system.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Diabetes Medications
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Several supplements claim to support blood sugar management, including chromium, alpha-lipoic acid, cinnamon, and fenugreek. While some may have beneficial effects, their combination with diabetes medications can potentially cause blood sugar levels to drop too low (hypoglycemia). This risk requires careful monitoring of blood glucose levels and coordination with healthcare providers.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Thyroid Medications
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Levothyroxine and other thyroid hormones require specific conditions for optimal absorption. Calcium, iron, magnesium, and fiber supplements can significantly reduce thyroid medication absorption when taken simultaneously. The standard recommendation is to separate thyroid medication from these supplements by at least four hours. Soy supplements and kelp (high in iodine) may also affect thyroid function and medication requirements.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Vitamins and Minerals: Not Always Risk-Free
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Many people assume that vitamins and minerals, being "natural" and widely available, are inherently safe and unlikely to cause problems with medications. However, even these common supplements can interact significantly with certain drugs.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Vitamin K, found in multivitamins and leafy green vegetables, directly opposes the action of warfarin, a commonly prescribed blood thinner. While consistent vitamin K intake can be managed with appropriate warfarin dosing, large fluctuations in vitamin K consumption can make anticoagulation control difficult.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              High-dose vitamin E supplements (typically above 400 IU daily) may increase bleeding risk, particularly when combined with anticoagulant or antiplatelet medications. Vitamin A in high doses can interact with retinoid medications and potentially increase the risk of liver toxicity.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Calcium and magnesium supplements can interfere with the absorption of various medications, including certain antibiotics (fluoroquinolones, tetracyclines), bisphosphonates for osteoporosis, and thyroid medications. The minerals can form complexes with these medications in the digestive tract, reducing their effectiveness.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              The Challenge of Multiple Supplements and Medications
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              As the number of medications and supplements taken concurrently increases, the complexity of potential interactions grows exponentially. This phenomenon, known as polypharmacy, is increasingly common, particularly among older adults who may be managing multiple chronic conditions.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Each new addition to a supplement or medication regimen doesn't just create one new potential interaction—it creates potential interactions with every other substance being taken. Someone taking five medications and three supplements isn't dealing with eight separate substances but rather with 28 possible pairwise interactions, plus even more complex multi-way interactions.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              This complexity makes professional review and systematic interaction checking increasingly important. What appears safe when considering individual supplement-medication pairs may reveal concerning patterns when the complete regimen is evaluated comprehensively.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              The Information Gap
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              One significant challenge in managing supplement-drug interactions is the relative lack of comprehensive research compared to drug-drug interactions. Pharmaceutical companies must conduct extensive studies of potential drug interactions before medications receive approval, but dietary supplements face no such requirements.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Much of what is known about supplement-drug interactions comes from case reports (individual instances where an interaction was suspected), pharmacological theory (predictions based on how substances work), and limited clinical studies. This means that absence of documented interactions doesn't necessarily mean interactions don't exist—they may simply be undiscovered or unreported.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Furthermore, the quality and composition of dietary supplements can vary significantly between brands and even between batches from the same manufacturer, since supplements aren't subject to the same stringent quality control requirements as prescription medications. This variability can make predicting interactions even more challenging.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Strategies for Safe Supplement Use with Medications
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              While supplement-medication interactions present real risks, they can often be managed effectively with appropriate precautions and communication.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Comprehensive Disclosure
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              The foundation of safe supplement use alongside medications is complete transparency with all healthcare providers. This means disclosing every supplement, vitamin, mineral, and herbal product being taken—including dosages and frequency—to physicians, pharmacists, and other healthcare professionals involved in care.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Bring bottles or a written list to appointments. Include over-the-counter medications as well, since many contain active ingredients that can interact with supplements and prescription drugs. Don't assume providers will ask about supplements—many patients report that their doctors never inquire about supplement use, so proactive disclosure is essential.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Timing and Spacing
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              For many absorption-related interactions, appropriate timing can mitigate risk. Separating supplements from medications by several hours can prevent them from interfering with each other in the digestive tract. Healthcare providers can advise on optimal timing strategies for specific supplement-medication combinations.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Systematic Interaction Checking
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Before starting a new supplement, especially when taking prescription medications, systematic interaction checking provides valuable risk assessment. Professional databases, healthcare provider consultations, and specialized interaction checking tools can identify potential concerns that might not be immediately obvious.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              These resources evaluate interactions based on available evidence, mechanism of action, and clinical significance, helping to distinguish between theoretical interactions of minimal concern and combinations that require dose adjustments, timing modifications, or avoidance.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Monitoring and Awareness
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              When taking supplements alongside medications, attention to any changes in medication effectiveness or new symptoms is important. Unexpected changes in blood pressure, blood sugar levels, mood, energy, or any other health parameters may signal an interaction. Increased side effects, reduced medication effectiveness, or new symptoms warrant prompt discussion with healthcare providers.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Quality Matters
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Choosing high-quality supplements from reputable manufacturers can reduce some risks. Third-party testing certifications (such as USP, NSF, or ConsumerLab) provide some assurance that products contain what their labels claim and are free from contaminants. While this doesn't eliminate interaction risks, it ensures you're dealing with known quantities rather than unpredictable compositions.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              When Professional Review Is Especially Important
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Certain situations warrant particular diligence in reviewing supplement-medication combinations:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
              <li>Taking multiple prescription medications (three or more)</li>
              <li>Using medications with narrow therapeutic windows</li>
              <li>Taking medications for serious conditions (heart disease, diabetes, seizures, organ transplants, cancer)</li>
              <li>Planning surgery (some supplements affect bleeding or anesthesia)</li>
              <li>Pregnancy or breastfeeding (see our <Link to="/pregnancy" className="text-blue-600 hover:text-blue-800 underline">pregnancy supplement safety guide</Link> for specialized information)</li>
              <li>Managing complex or multiple health conditions</li>
              <li>Experiencing unexplained symptoms or changes in medication effectiveness</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              The Role of Evidence-Based Interaction Screening
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Professional interaction screening tools serve an important role in identifying potential supplement-drug interactions that might otherwise be overlooked. These systems compile information from scientific literature, case reports, pharmacological principles, and clinical studies to assess interaction risks.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Comprehensive screening considers not just pairwise interactions but also the complete picture of all medications and supplements being taken. This systematic approach helps identify patterns and cumulative risks that might not be apparent when evaluating individual combinations in isolation.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              However, no screening tool can replace professional medical judgment. Results should be interpreted in the context of individual health status, specific dosages, timing of administration, and overall treatment goals. <Link to="/premium" className="text-blue-600 hover:text-blue-800 underline">Professional interaction screening services</Link> provide detailed analysis based on current evidence, but decisions about supplement and medication use should always involve qualified healthcare providers.
            </p>

            {/* CTA Section */}
            <div className="my-12 p-8 rounded-xl" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Professional Interaction Screening
                  </h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Access comprehensive supplement-medication interaction analysis based on current scientific evidence. Get detailed risk assessments, severity ratings, and clinical guidance for your complete supplement and medication regimen.
                  </p>
                  <Link
                    to="/premium#free-vs-premium"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Compare Free vs Professional
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Mini Comparison Preview */}
            <div className="my-12 p-6 rounded-xl border-2" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--color-text-primary)' }}>
                Quick Comparison: Free vs Professional
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Free */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-center" style={{ color: 'var(--color-text-primary)' }}>Free</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span style={{ color: 'var(--color-text-secondary)' }}>Basic interaction flags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-300">✕</span>
                      <span className="text-gray-400">Mechanism details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-300">✕</span>
                      <span className="text-gray-400">PDF reports</span>
                    </li>
                  </ul>
                </div>

                {/* Professional */}
                <div className="rounded-lg p-4" style={{ background: 'linear-gradient(to bottom, #eff6ff, #dbeafe)' }}>
                  <h4 className="font-semibold mb-3 text-center text-blue-900">Professional</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Basic interaction flags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-blue-900">Mechanism details (absorption/metabolism)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-blue-900">PDF reports & stack support</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/premium#free-vs-premium"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  See full comparison
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Moving Forward Safely
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Understanding supplement-drug interactions empowers informed decision-making about health management. The goal isn't to avoid supplements entirely but rather to use them wisely and safely alongside necessary medications.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              This requires ongoing communication with healthcare providers, systematic evaluation of potential interactions, attention to timing and dosing considerations, and awareness of changes that might signal problems. The intersection of supplement and medication use will continue to be an area of active research and evolving understanding.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              By approaching supplement use with the same care and consideration given to prescription medications—recognizing both potential benefits and risks—individuals can make choices that support their health goals while minimizing unnecessary risks. The key is informed, intentional use rather than assuming supplements are universally safe or universally dangerous.
            </p>

            {/* FAQ Section */}
            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    What are supplement-drug interactions?
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Supplement-drug interactions occur when dietary supplements (including vitamins, minerals, herbs, and other nutritional products) interfere with how prescription or over-the-counter medications work in your body. These interactions can reduce medication effectiveness, increase side effects, or create new health risks.
                  </p>
                </div>

                <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    How common are supplement-medication interactions?
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Supplement-medication interactions are more common than many people realize. Research suggests that approximately 1 in 6 adults taking prescription medications also uses dietary supplements that could potentially interact. The risk increases with the number of medications and supplements taken simultaneously.
                  </p>
                </div>

                <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Can vitamins interact with prescription drugs?
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Yes, even common vitamins can interact with prescription medications. For example, vitamin K can reduce the effectiveness of blood thinners like warfarin, vitamin E may increase bleeding risk when combined with anticoagulants, and calcium can interfere with certain antibiotics and thyroid medications by affecting absorption.
                  </p>
                </div>

                <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    What types of interactions should I be most concerned about?
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    The most concerning interactions typically involve medications with narrow therapeutic windows (where the difference between an effective and toxic dose is small), such as blood thinners, heart medications, immunosuppressants, and seizure medications. Supplements that affect liver enzymes (like St. John's Wort) or blood clotting (like fish oil, garlic, or ginkgo) warrant particular attention.
                  </p>
                </div>

                <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    How can I check for supplement-drug interactions?
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    You can check for interactions by consulting healthcare professionals, using evidence-based interaction checkers, reviewing scientific literature, or utilizing specialized databases. <Link to="/check" className="text-blue-600 hover:text-blue-800 underline">Professional interaction screening tools</Link> analyze your complete medication and supplement list against known interaction data to identify potential risks.
                  </p>
                </div>

                <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Should I tell my doctor about all supplements I take?
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Yes, absolutely. It's essential to inform all your healthcare providers about every supplement, vitamin, mineral, and herbal product you take, including dosages and frequency. Many patients don't consider supplements as 'real medicine,' but they can significantly affect your treatment and health outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing and Internal Links */}
            <div className="mt-12 p-6 rounded-lg" style={{ background: 'var(--color-bg-secondary)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Related Resources
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ background: 'white' }}
                >
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Supplement Safety Bible
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Evidence-based supplement information
                    </div>
                  </div>
                </Link>
                <Link
                  to="/check"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ background: 'white' }}
                >
                  <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Interaction Checker
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Check your medications and supplements
                    </div>
                  </div>
                </Link>
                <Link
                  to="/premium"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ background: 'white' }}
                >
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Professional Screening
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Comprehensive interaction analysis
                    </div>
                  </div>
                </Link>
                <Link
                  to="/privacy"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ background: 'white' }}
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Privacy & Security
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      How we protect your information
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
