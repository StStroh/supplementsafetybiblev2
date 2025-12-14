import { createContext, useContext, useState, ReactNode } from 'react';

type AlertType = "error" | "success" | "info" | "warning";

interface Alert {
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (message: string, type?: AlertType) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, type: AlertType = "error") => {
    setAlert({ type, message });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert(): AlertContextType {
  const context = useContext(AlertContext);
  if (context) return context;

  return {
    alert: null,
    showAlert: () => {},
    clearAlert: () => {},
  };
}
