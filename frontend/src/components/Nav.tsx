import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

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
        <div className="flex items-center gap-14">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {user?.displayName && (
                <div className="flex items-center gap-8">
                  <span className="text-xl text-white">Hi, {user.displayName}!</span>
                  <Button
                    variant="primary"
                    className="p-0"
                  >
                    <Link
                      to="/dashboard"
                      className="px-5 py-3"
                    >
                      Dashboard
                    </Link>
                  </Button>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="text-button active:prompto-gray-dark inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 place-self-center rounded-lg bg-transparent px-5 py-3 whitespace-nowrap text-white transition-all duration-300 outline-none hover:bg-[#E6E5FF] hover:text-prompto-gray-dark focus-visible:border-white focus-visible:ring-[3px] focus-visible:ring-white/50 active:scale-95 active:bg-[#AEA7FF] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-4 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                Log out
              </button>
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
