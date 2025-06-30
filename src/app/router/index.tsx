import { createBrowserRouter } from 'react-router';
import { RouterErrorBoundary } from '@/app/providers/RouterErrorBoundary';
import PrivateRoute from '@/app/router/PrivateRoute';
import AppLayout from '@/shared/layout/AppLayout';
import Home from '@/pages/Home';
import My from '@/pages/My';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';
import Talk from '@/pages/Talk';
import TalkEventHandlerProvider from '../providers/TalkEventHandlerProvider';

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
        path: 'talk',
        element: <Talk />,
      },
      {
        children: [
          {
            path: '/my',
            element: <My />,
          },
        ],
      },
    ],
  },
  {
    path: '/talk',
    element: (
      <TalkEventHandlerProvider>
        <Talk />
      </TalkEventHandlerProvider>
    ),
  },
]);
