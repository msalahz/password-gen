import { scan } from 'react-scan';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

// Import the generated route tree
import { routeTree } from '@/routeTree.gen';

import '@/styles.css';

if (import.meta.env.MODE === 'development') {
  scan({ enabled: true });
}

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} basepath={'password-gen'} />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>
);
