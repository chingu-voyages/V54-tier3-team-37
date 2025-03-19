import {
  Github,
  Linkedin,
} from 'lucide-react';

import Container from './Container';

const teamMembers = [
  {
    name: 'Sarita Jha',
    role: 'Product Owner',
    linkedin: '',
    github: '',
  },
  {
    name: 'Xoch',
    role: 'Scrum Master',
    linkedin: '',
    github: '',
  },
  {
    name: 'Stefley',
    role: 'Scrum Master',
    linkedin: '',
    github: '',
  },
  {
    name: 'Trupti',
    role: 'UI/UX Designer',
    linkedin: '',
    github: '',
  },
  {
    name: 'Aigul',
    role: 'Web Developer',
    linkedin: '',
    github: '',
  },
  {
    name: 'Nika',
    role: 'Web Developer',
    linkedin: '',
    github: '',
  },
  {
    name: 'Luis',
    role: 'Web Developer',
    linkedin: '',
    github: '',
  },
  {
    name: 'Brendan K. Schatzki',
    role: 'Web Developer',
    linkedin: '',
    github: '',
  },
];

const roles = Array.from(new Set(teamMembers.map((member) => member.role)));

const Footer = () => {
  return (
    <footer className="text-background bg-muted-foreground w-full py-16">
      <Container className="flex-row justify-between">
        <div className="flex items-center gap-4">
          <span className="text-7xl font-keania-one lowercase">Prompto</span>
        </div>
        <ul className="flex flex-col gap-4 text-lg">
          {roles.map((role) => (
            <li
              key={role}
              className="flex justify-between gap-8"
            >
              <span className="shrink-0 min-w-32 text-right">{role}</span>
              <ul className="w-full">
                {teamMembers.map((member) => (
                  <li key={member.name}>
                    {member.role === role ? (
                      <div className="flex gap-8 justify-between items-center">
                        <span>{member.name}</span>
                        <div className="flex gap-4">
                          <Linkedin size={18 /* default: 24 */} />
                          <Github size={18 /* default: 24 */} />
                        </div>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
