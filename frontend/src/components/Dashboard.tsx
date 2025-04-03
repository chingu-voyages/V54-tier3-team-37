import {
  Link,
  Outlet,
} from 'react-router-dom';

import Container from './Container';

const Dashboard = () => {
  return (
    <section className="from-muted to-background w-full bg-gradient-to-r from-50% to-50%">
      <Container>
        <div className="grid w-full grid-cols-[256px_1fr]">
          <div className="bg-muted p-8">
            <Link
              to="/"
              className="font-keania-one text-3xl lowercase"
            >
              Prompto
            </Link>
          </div>
          <div className="bg-background p-8">
            <h2 className="text-3xl font-bold">Dashboard</h2>
          </div>
          <div className="bg-muted p-8">
            <ul className="space-y-4 text-lg">
              <li className="relative pl-6">
                <Link
                  to="generate"
                  className="before:bg-muted-foreground before:absolute before:top-1/2 before:left-0 before:size-4 before:-translate-y-1/2 hover:underline"
                >
                  Generate Prompt
                </Link>
              </li>
              <li className="relative pl-6">
                <Link
                  to="history"
                  className="before:bg-muted-foreground before:absolute before:top-1/2 before:left-0 before:size-4 before:-translate-y-1/2 hover:underline"
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
