import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AlertBanner from '../components/AlertBanner';
import EnvWarning from '../components/EnvWarning';
import FloatingStarter from '../components/FloatingStarter';
import { useAlert } from '../state/AlertProvider';
import { trackPageView } from '../lib/tiktok';

export default function RootLayout() {
  const { alert, clearAlert } = useAlert();
  const location = useLocation();

  // Track PageView on route changes (SPA navigation)
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {alert && (
        <AlertBanner
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
      )}

      <div className="flex-1">
        <EnvWarning />
        <Outlet />
      </div>

      <FloatingStarter />
    </div>
  );
}
