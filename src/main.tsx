import { scan } from 'react-scan';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from 'react-hot-toast';

import App from './app';

import './styles.css';

scan({ enabled: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
    <Toaster />
  </StrictMode>
);
