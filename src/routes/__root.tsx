import { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@/components/tan-stack-router-devtools.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
