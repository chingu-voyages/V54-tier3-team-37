import { History, SquarePlus } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

import Container from './Container';

const Dashboard = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#e6e5ff] from-50% to-white to-50%">
      <div className="border-b-2 border-prompto-gray-light bg-white p-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/">
            <img src="/logo-color.png" />
          </Link>
        </div>
      </div>
      <Container className="items-start px-0">
        <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-[256px_1fr]">
          <div className="bg-[#E6E5FF] px-2 py-8">
            <ul className="flex flex-col gap-8 pt-8 text-lg">
              <li className="relative pl-6">
                <Link
                  to="generate"
                  className="flex items-center gap-3"
                >
                  <SquarePlus />
                  Generate Prompt
                </Link>
              </li>
              <li className="relative pl-6">
                <Link
                  to="history"
                  className="flex items-center gap-3"
                >
                  <History />
                  History
                </Link>
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
