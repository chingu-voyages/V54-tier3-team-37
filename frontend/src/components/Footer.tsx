import {
  Github,
  Linkedin,
} from 'lucide-react';

import { TeamMember } from '@/types/types';

import Container from './Container';

const teamMembers: TeamMember[] = [
  {
    name: 'Sarita Jha',
    role: 'Product Owner',
    linkedin: 'https://www.linkedin.com/in/jha-sarita/',
    github: '',
  },
  {
    name: 'Xochitl Farias',
    role: 'Scrum Master',
    linkedin: 'https://www.linkedin.com/in/xfarias-scrum-master/',
    github: 'https://github.com/xochfa',
  },
  {
    name: 'Steffi Saint-Pierre',
    role: 'Scrum Master',
    linkedin: 'https://www.linkedin.com/in/steffisp/',
    github: '',
  },
  {
    name: 'Trupti Shikhare',
    role: 'UI/UX Designer',
    linkedin: 'https://www.linkedin.com/in/truptishikhare/',
    github: 'https://github.com/truptishikhare',
  },
  {
    name: 'Aigul',
    role: 'Web Developer',
    linkedin: 'https://www.linkedin.com/in/aigul-ermak/',
    github: 'https://github.com/aigul-ermak',
  },
  {
    name: 'Nika Kolesnikova',
    role: 'Web Developer',
    linkedin: 'https://www.linkedin.com/in/vekolesnikova/',
    github: 'https://github.com/kweeuhree',
  },
  {
    name: 'Luis Castillo',
    role: 'Web Developer',
    linkedin: 'https://www.linkedin.com/in/luis-castillokc/',
    github: 'https://github.com/LuisCastilloKC',
  },
  {
    name: 'Brendan K. Schatzki',
    role: 'Web Developer',
    linkedin: 'https://www.linkedin.com/in/bkschatzki/',
    github: 'https://github.com/BKSchatzki',
  },
];

const roles = Array.from(new Set(teamMembers.map((member) => member.role)));

const Footer = () => {
  return (
    <footer className="text-background bg-muted-foreground w-full py-16">
      <Container className="flex-row justify-between">
        <div className="flex items-center gap-4">
          <span className="font-keania-one text-7xl lowercase">Prompto</span>
        </div>
        <ul className="flex flex-col gap-4 text-lg">
          {roles.map((role) => (
            <li
              key={role}
              className="flex justify-between gap-8"
            >
              <span className="min-w-32 shrink-0 text-right">{role}</span>
              <ul className="w-full">
                {teamMembers.map((member) => (
                  <li key={member.name}>
                    {member.role === role ? (
                      <div className="flex items-center justify-between gap-8">
                        <span>{member.name}</span>
                        <div className="flex gap-4">
                          <a
                            href={member.linkedin || ''}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            <Linkedin size={18 /* default: 24 */} />
                          </a>
                          <a
                            href={member.github || ''}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            <Github size={18 /* default: 24 */} />
                          </a>
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
