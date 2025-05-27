import { createBrowserRouter } from 'react-router';
import { RouterErrorBoundary } from '@/app/providers/RouterErrorBoundary';
import Home from '@/pages/Home';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
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
    ],
  },
]);
