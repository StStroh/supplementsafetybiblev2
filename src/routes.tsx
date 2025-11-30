import { createBrowserRouter } from 'react-router-dom';
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

function NotFound() {
  return <div style={{padding: 40}}>Page not found</div>;
}

function CheckoutCancel() {
  return <div style={{padding: 40}}>Checkout canceled.</div>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/interaction/:id',
    element: <InteractionDetails />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/success',
    element: <Success />
  },
  {
    path: '/pricing',
    element: <Pricing />
  },
  {
    path: '/premium',
    element: <Premium />
  },
  {
    path: '/premium/thanks',
    element: <PremiumThanks />
  },
  {
    path: '/premium/dashboard',
    element: <PremiumDashboard />
  },
  {
    path: '/faq',
    element: <FAQ />
  },
  {
    path: '/privacy',
    element: <Privacy />
  },
  {
    path: '/terms',
    element: <Terms />
  },
  {
    path: '/check',
    element: <Check />
  },
  {
    path: '/account',
    element: <Account />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />
  },
  {
    path: '/free',
    element: <Free />
  },
  {
    path: '/free/thanks',
    element: <FreeThanks />
  },
  {
    path: '/landing',
    element: <Landing />
  },
  {
    path: '/checkout/cancel',
    element: <CheckoutCancel />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
