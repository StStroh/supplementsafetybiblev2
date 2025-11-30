import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Success from './pages/Success';
import Account from './pages/Account';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import PremiumThanks from './pages/PremiumThanks';
import Premium from './pages/Premium';
import PremiumDashboard from './pages/PremiumDashboard';
import Search from './pages/Search';
import Check from './pages/Check';
import EnvWarning from './components/EnvWarning';

function App() {
  const path = window.location.pathname;

  return (
    <>
      <EnvWarning />
      {path === '/auth' && <Auth />}
      {path === '/auth/callback' && <AuthCallback />}
      {path === '/faq' && <FAQ />}
      {path === '/privacy' && <Privacy />}
      {path === '/terms' && <Terms />}
      {path === '/success' && <Success />}
      {path === '/account' && <Account />}
      {path === '/premium/thanks' && <PremiumThanks />}
      {path === '/premium/dashboard' && <PremiumDashboard />}
      {path === '/premium' && <Premium />}
      {path === '/pricing' && <Premium />}
      {path === '/search' && <Search />}
      {path === '/check' && <Check />}
      {path === '/checkout/cancel' && <div style={{padding: 16}}>Checkout canceled.</div>}
      {path === '/' && <Home />}
      {!['/auth', '/auth/callback', '/faq', '/privacy', '/terms', '/success', '/account', '/premium/thanks', '/premium/dashboard', '/premium', '/pricing', '/search', '/check', '/checkout/cancel', '/'].includes(path) && <div style={{padding: 16}}>Page not found.</div>}
    </>
  );
}

export default App;
