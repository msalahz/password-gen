import { scan } from 'react-scan';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react';

import App from '@/app';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

import '@/styles.css';

if (import.meta.env.MODE === 'development') {
  scan({ enabled: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NuqsAdapter>
        <App />
        <Toaster position="top-right" />
      </NuqsAdapter>
    </ThemeProvider>
  </StrictMode>
);
