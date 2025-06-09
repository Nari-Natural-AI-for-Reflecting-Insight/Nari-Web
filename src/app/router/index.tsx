import { createBrowserRouter } from 'react-router';
import PrivateRoute from '@/app/router/PrivateRoute';
import { RouterErrorBoundary } from '@/app/providers/RouterErrorBoundary';
import AppLayout from '@/shared/layout/AppLayout';
import Home from '@/pages/Home';
import My from '@/pages/My';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    ErrorBoundary: RouterErrorBoundary,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/my',
            element: <My />,
          },
        ],
      },
    ],
  },
]);
