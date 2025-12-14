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
import Free from './pages/Free';
import EnvWarning from './components/EnvWarning';
import AlertBanner from './components/AlertBanner';
import { AlertProvider, useAlert } from './state/AlertProvider';

function AppContent() {
  const path = window.location.pathname;
  const { alert, clearAlert } = useAlert();

  return (
    <div className="min-h-screen flex flex-col">
      {alert && (
        <AlertBanner
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
      )}

      <div className="flex-1" style={{ paddingTop: alert ? "var(--alert-banner-h, 0px)" : "0px" }}>
        <EnvWarning />
        {path === '/auth' && <Auth />}
        {path === '/auth/callback' && <AuthCallback />}
        {path === '/free' && <Free />}
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
        {!['/auth', '/auth/callback', '/free', '/faq', '/privacy', '/terms', '/success', '/account', '/premium/thanks', '/premium/dashboard', '/premium', '/pricing', '/search', '/check', '/checkout/cancel', '/'].includes(path) && <div style={{padding: 16}}>Page not found.</div>}
      </div>
    </div>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}

export default App;
