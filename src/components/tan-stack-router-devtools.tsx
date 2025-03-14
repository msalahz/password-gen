import * as React from 'react';

export const TanStackRouterDevtools =
  import.meta.env.MODE === 'development'
    ? React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )
    : () => null; // Render nothing in production
