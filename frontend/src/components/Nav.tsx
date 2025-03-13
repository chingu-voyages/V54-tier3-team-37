import { Stars } from 'lucide-react';

import { Button } from './ui/button';

const navLinks = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/template',
    text: 'Template',
  },
  {
    href: '/history',
    text: 'History',
  },
  {
    href: '/about',
    text: 'About',
  },
];

const Nav = () => {
  return (
    <nav className="text-background flex w-full items-center justify-between bg-neutral-700 p-6">
      <div className="flex items-center gap-4">
        <Stars />
        <span className="text-lg font-bold uppercase">Prompto</span>
      </div>
      <div className="flex items-center gap-14">
        <ul className="flex items-center gap-8 text-lg">
          {navLinks.map((link) => (
            <li key={link.text}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
        <Button>Sign Up</Button>
      </div>
    </nav>
  );
};

export default Nav;
