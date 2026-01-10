import { Outlet } from 'react-router-dom';
import AlertBanner from '../components/AlertBanner';
import EnvWarning from '../components/EnvWarning';
import FloatingStarter from '../components/FloatingStarter';
import { SalesCTA } from '../components/SalesCTA';
import { DebugFooter } from '../components/DebugFooter';
import { useAlert } from '../state/AlertProvider';
import { useDebugMode } from '../hooks/useDebugMode';

export default function RootLayout() {
  const { alert, clearAlert } = useAlert();
  const isDebug = useDebugMode();

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
      <SalesCTA />
      {isDebug && <DebugFooter />}
    </div>
  );
}
