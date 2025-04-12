import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { NavLink } from '@/types/ui';

import Container from './Container';
import { Button } from './ui/button';

// const navLinks: NavLink[] = [{ href: '/', text: 'Home' }];

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
        <div className="flex items-center gap-14">
          {/* <ul className="flex items-center gap-12 text-2xl">
            {navLinks.map((link) => (
              <li key={link.text}>
                <Link to={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul> */}

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {user?.displayName && (
                <span className="text-xl text-foreground">Hi, {user.displayName}</span>
              )}
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer rounded-2xl py-6 text-2xl text-foreground"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
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
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
