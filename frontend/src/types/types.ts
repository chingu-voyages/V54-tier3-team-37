/* ------------- */
/* ABOUT SECTION */
/* ------------- */

export type AboutPersona = {
  name: string;
  imgSrc: string;
};

export type AboutFeatureCard = {
  heading: string;
  description: string;
  imgSrc: string;
};

export type AboutReason = {
  heading: string;
  description: string;
};

export type AboutStep = {
  step: number;
  name: string;
  items: {
    heading: string;
    description: React.ReactNode;
  }[];
};

/* ----------- */
/* NAV SECTION */
/* ----------- */

export type NavLink = {
  href: string;
  text: string;
};

/* -------------- */
/* FOOTER SECTION */
/* -------------- */

export type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  github: string;
};
