import { RouterProvider as BaseRouterProvider } from 'react-router';
import { router } from '@/app/router';

export function RouterProvider() {
  return <BaseRouterProvider router={router} />;
}
