import { createBrowserRouter } from 'react-router';
import PrivateRoute from '@/app/router/PrivateRoute';
import Home from '@/pages/Home';
import My from '@/pages/My';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';
import Talk from '@/pages/Talk';
import TalkEventHandlerProvider from '../providers/TalkEventHandlerProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
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
  {
    path: '/talk',
    element: 
      <TalkEventHandlerProvider>
        <Talk />
      </TalkEventHandlerProvider>
  }
]);
