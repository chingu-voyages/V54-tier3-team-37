import { useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { fetchUser } from '@/store/slices/authSlice';

const AuthWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hasFetched = useRef(false);

  const from = location.state?.from;
  const redirectTo = searchParams.get('redirectTo');
  const fallback = from || redirectTo || '/dashboard';

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    dispatch(fetchUser()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled' && location.pathname === '/auth') {
        navigate(fallback, { replace: true });
      }
    });
  }, [dispatch, fallback, location.pathname, navigate]);

  return null;
};

export default AuthWrapper;
