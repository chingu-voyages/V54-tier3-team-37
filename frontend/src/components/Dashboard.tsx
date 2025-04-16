import { History, SquarePlus } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/auth';
import { cn } from '@/lib/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

import AvatarDropdown from './AvatarDropdown';
import Container from './Container';

const Dashboard = () => {
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
    <section className="w-full bg-gradient-to-r from-[#F2F1FF] from-50% to-white to-50%">
      <div className="border-b-2 border-prompto-gray-light bg-white p-7">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Link to="/">
            <img src="/logo-color.png" />
          </Link>
          {isLoggedIn && user && (
            <AvatarDropdown
              user={user}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>
      <Container className="items-start px-0">
        <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-[256px_1fr]">
          <div className="bg-[#F2F1FF] px-2 py-8">
            <ul className="flex flex-col items-start gap-2 pt-8 text-lg">
              <li className="relative w-full px-2">
                <NavLink
                  to="generate"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg p-4',
                      isActive && 'bg-[#E6E5FF] text-prompto-primary'
                    )
                  }
                >
                  <SquarePlus />
                  Generate Prompt
                </NavLink>
              </li>
              <li className="relative w-full px-2">
                <NavLink
                  to="history"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg p-4',
                      isActive && 'bg-[#E6E5FF] text-prompto-primary'
                    )
                  }
                >
                  <History />
                  History
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="bg-background px-8">
            <Outlet />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
