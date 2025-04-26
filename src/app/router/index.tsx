import { createBrowserRouter } from 'react-router';
import Home from '@/pages/Home';
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
]);
