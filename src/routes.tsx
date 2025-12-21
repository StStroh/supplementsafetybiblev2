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
import Account from './pages/Account';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
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
        element: <Check />
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
        path: 'pregnancy-lactation-safety',
        element: <PregnancyLactation />
      },
      {
        path: 'checkout/cancel',
        element: <CheckoutCancel />
      },
      {
        path: 'post-checkout',
        element: <PostCheckout />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
