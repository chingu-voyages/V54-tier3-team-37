import { NavLink } from '@/types/types';

import Container from './Container';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const navLinks: NavLink[] = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
];

const Nav = () => {
  return (
    <nav className="text-background bg-muted-foreground flex w-full items-center justify-between py-8">
      <Container className="flex-row justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={'/'}
            className="font-keania-one text-4xl lowercase"
          >
            Prompto
          </Link>
        </div>
        <div className="flex items-center gap-14">
          <ul className="flex items-center gap-12 text-2xl">
            {navLinks.map((link) => (
              <li key={link.text}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="lg"
            className="text-foreground cursor-pointer rounded-2xl py-6 text-2xl"
          >
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
