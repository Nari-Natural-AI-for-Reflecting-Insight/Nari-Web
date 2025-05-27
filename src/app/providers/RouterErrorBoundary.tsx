import { useEffect } from 'react';
import { Navigate, useRouteError } from 'react-router';

export const RouterErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  });

  return <Navigate to={'/'} replace />;
};
