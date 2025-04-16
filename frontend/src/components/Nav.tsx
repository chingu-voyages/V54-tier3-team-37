import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

import AvatarDropdown from './AvatarDropdown';
import Container from './Container';
import { Button } from './ui/button';

const Nav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="flex w-full items-center justify-between py-8 text-background">
      <Container className="flex-row justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-keania-one text-4xl lowercase"
          >
            <img src="/logo-white.png" />
          </Link>
        </div>
        {isLoggedIn ? (
          user?.displayName && (
            <AvatarDropdown
              user={user}
              handleLogout={handleLogout}
            />
          )
        ) : (
          <Button
            variant="secondary"
            className="p-0"
          >
            <Link
              to="/auth"
              className="px-5 py-3"
            >
              Sign In
            </Link>
          </Button>
        )}
      </Container>
    </nav>
  );
};

export default Nav;
