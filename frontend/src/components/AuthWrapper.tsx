import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { fetchUser } from '@/store/slices/authSlice';

const AuthWrapper = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId)).then(() => {
        navigate('/generate', { replace: true });
      });
    }
  }, [userId, dispatch, navigate]);

  return null;
};

export default AuthWrapper;
