import { Outlet } from 'react-router-dom';
import AlertBanner from '../components/AlertBanner';
import EnvWarning from '../components/EnvWarning';
import FloatingStarter from '../components/FloatingStarter';
import { useAlert } from '../state/AlertProvider';

export default function RootLayout() {
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

      <div className="flex-1">
        <EnvWarning />
        <Outlet />
      </div>

      <FloatingStarter />
    </div>
  );
}
