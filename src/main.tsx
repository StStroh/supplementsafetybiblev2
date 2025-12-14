import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import './styles/theme.css';
import { router } from './routes';
import { AuthProvider } from './state/AuthProvider';
import { AlertProvider } from './state/AlertProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AlertProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AlertProvider>
    </HelmetProvider>
  </StrictMode>
);
