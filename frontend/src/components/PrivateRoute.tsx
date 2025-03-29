import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return null;

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/auth"
      replace
    />
  );
};

export default PrivateRoute;
