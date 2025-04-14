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
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-[256px_1fr]">
          <div className="bg-[#E6E5FF] p-8">
            <ul className="space-y-4 text-lg">
              <li className="relative pl-6">
                <Link
                  to="generate"
                  className="before:absolute before:top-1/2 before:left-0 before:size-4 before:-translate-y-1/2 before:bg-muted-foreground hover:underline"
                >
                  Generate Prompt
                </Link>
              </li>
              <li className="relative pl-6">
                <Link
                  to="history"
                  className="before:absolute before:top-1/2 before:left-0 before:size-4 before:-translate-y-1/2 before:bg-muted-foreground hover:underline"
                >
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
