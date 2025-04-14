import { History, SquarePlus } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { cn } from '@/lib/cn';

import Container from './Container';

const Dashboard = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#F2F1FF] from-50% to-white to-50%">
      <div className="border-b-2 border-prompto-gray-light bg-white p-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/">
            <img src="/logo-color.png" />
          </Link>
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
