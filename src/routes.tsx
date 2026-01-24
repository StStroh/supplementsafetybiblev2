import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Search from './pages/Search';
import InteractionDetails from './pages/InteractionDetails';
import Admin from './pages/Admin';
import Success from './pages/Success';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Premium from './pages/Premium';
import PremiumThanks from './pages/PremiumThanks';
import PremiumDashboard from './pages/PremiumDashboard';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Check from './pages/Check';
import CheckV2 from './pages/CheckV2';
import Account from './pages/Account';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import AuthPassword from './pages/AuthPassword';
import Free from './pages/Free';
import FreeThanks from './pages/FreeThanks';
import Landing from './pages/Landing';
import Metrics from './pages/Metrics';
import RefundPolicy from './pages/RefundPolicy';
import Supplements from './pages/Supplements';
import Medications from './pages/Medications';
import Conditions from './pages/Conditions';
import PreviewChecker from './pages/PreviewChecker';
import PreviewGuides from './pages/PreviewGuides';
import PreviewFeed from './pages/PreviewFeed';
import PregnancyLactation from './pages/PregnancyLactation';
import PostCheckout from './pages/PostCheckout';
import NotFound from './pages/NotFound';
import CheckoutCancel from './pages/CheckoutCancel';
import AuthTest from './pages/AuthTest';
import BillingSuccess from './pages/BillingSuccess';
import BillingCancel from './pages/BillingCancel';
import Welcome from './pages/Welcome';
import AlertDetail from './pages/AlertDetail';
import SafetyPack from './pages/SafetyPack';
import AdminReview from './pages/AdminReview';
import AdminImport from './pages/AdminImport';
import InteractionPage from './pages/InteractionPage';
import AboutTheChecker from './pages/AboutTheChecker';
import WhyAIRecommends from './pages/WhyAIRecommends';
import Diagnostics from './pages/Diagnostics';
import DemoOmega3 from './pages/DemoOmega3';
import Browse from './pages/Browse';
import AdminTokens from './pages/AdminTokens';
import AdminCoverage from './pages/AdminCoverage';
import AdminAliasPacks from './pages/AdminAliasPacks';
import AdminTokenPacks from './pages/AdminTokenPacks';
import AdminLeads from './pages/AdminLeads';
import AdminReviewQueue from './pages/AdminReviewQueue';
import StackMode from './pages/StackMode';
import EveningPrimroseSeizureRisk from './pages/EveningPrimroseSeizureRisk';
import CalciumIronTiming from './pages/CalciumIronTiming';
import EveningPrimrosePhenothiazines from './pages/EveningPrimrosePhenothiazines';
import SupplementDrugInteractions from './pages/SupplementDrugInteractions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'interaction/:id',
        element: <InteractionDetails />
      },
      {
        path: 'admin',
        element: <Admin />
      },
      {
        path: 'admin/review',
        element: <AdminReview />
      },
      {
        path: 'admin/import',
        element: <AdminImport />
      },
      {
        path: 'admin/tokens',
        element: <AdminTokens />
      },
      {
        path: 'admin/coverage',
        element: <AdminCoverage />
      },
      {
        path: 'admin/alias-packs',
        element: <AdminAliasPacks />
      },
      {
        path: 'admin/token-packs',
        element: <AdminTokenPacks />
      },
      {
        path: 'admin/leads',
        element: <AdminLeads />
      },
      {
        path: 'admin/review-queue',
        element: <AdminReviewQueue />
      },
      {
        path: 'success',
        element: <Success />
      },
      {
        path: 'pricing',
        element: <Pricing />
      },
      {
        path: 'premium',
        element: <Premium />
      },
      {
        path: 'premium/thanks',
        element: <PremiumThanks />
      },
      {
        path: 'premium/dashboard',
        element: <PremiumDashboard />
      },
      {
        path: 'faq',
        element: <FAQ />
      },
      {
        path: 'privacy',
        element: <Privacy />
      },
      {
        path: 'terms',
        element: <Terms />
      },
      {
        path: 'check',
        element: <CheckV2 />
      },
      {
        path: 'check-interactions',
        element: <CheckV2 />
      },
      {
        path: 'check-old',
        element: <Check />
      },
      {
        path: 'stack-mode',
        element: <StackMode />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'auth/callback',
        element: <AuthCallback />
      },
      {
        path: 'auth/password',
        element: <AuthPassword />
      },
      {
        path: 'auth/test',
        element: <AuthTest />
      },
      {
        path: 'free',
        element: <Free />
      },
      {
        path: 'free/thanks',
        element: <FreeThanks />
      },
      {
        path: 'landing',
        element: <Landing />
      },
      {
        path: 'metrics',
        element: <Metrics />
      },
      {
        path: 'refund-policy',
        element: <RefundPolicy />
      },
      {
        path: 'browse',
        element: <Browse />
      },
      {
        path: 'supplements',
        element: <Supplements />
      },
      {
        path: 'medications',
        element: <Medications />
      },
      {
        path: 'conditions',
        element: <Conditions />
      },
      {
        path: 'preview/checker',
        element: <PreviewChecker />
      },
      {
        path: 'preview/guides',
        element: <PreviewGuides />
      },
      {
        path: 'preview/feed',
        element: <PreviewFeed />
      },
      {
        path: 'supplement-drug-interactions',
        element: <SupplementDrugInteractions />
      },
      {
        path: 'pregnancy-lactation-safety',
        element: <PregnancyLactation />
      },
      {
        path: 'evening-primrose-oil-seizure-risk-epilepsy-phenothiazines',
        element: <EveningPrimroseSeizureRisk />
      },
      {
        path: 'guides/calcium-and-iron-timing',
        element: <CalciumIronTiming />
      },
      {
        path: 'interactions/evening-primrose-oil-phenothiazines-seizure-risk',
        element: <EveningPrimrosePhenothiazines />
      },
      {
        path: 'checkout/cancel',
        element: <CheckoutCancel />
      },
      {
        path: 'billing/success',
        element: <BillingSuccess />
      },
      {
        path: 'billing/cancel',
        element: <BillingCancel />
      },
      {
        path: 'post-checkout',
        element: <PostCheckout />
      },
      {
        path: 'welcome',
        element: <Welcome />
      },
      {
        path: 'alerts/:alertId',
        element: <AlertDetail />
      },
      {
        path: 'safety-pack',
        element: <SafetyPack />
      },
      {
        path: 'interactions/:slug',
        element: <InteractionPage />
      },
      {
        path: 'about-the-checker',
        element: <AboutTheChecker />
      },
      {
        path: 'why-ai-assistants-recommend-us',
        element: <WhyAIRecommends />
      },
      {
        path: 'diagnostics',
        element: <Diagnostics />
      },
      {
        path: 'demo/omega-3',
        element: <DemoOmega3 />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
