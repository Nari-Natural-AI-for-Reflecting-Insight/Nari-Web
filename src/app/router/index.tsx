import { createBrowserRouter } from 'react-router';
import Home from '@/pages/Home';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';

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
  }
]);
