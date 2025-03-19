import Container from './Container';
import { Button } from './ui/button';

interface NavLink {
  href: string;
  text: string;
}

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
    <nav className="text-background bg-muted-foreground flex w-full items-center justify-between py-6">
      <Container className="w-full flex-row justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold lowercase">Prompto</span>
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
            className="text-foreground cursor-pointer py-6 text-2xl"
          >
            Sign In
          </Button>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
