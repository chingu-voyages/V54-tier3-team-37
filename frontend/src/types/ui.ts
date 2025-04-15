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
  icon: React.ReactNode;
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

export type OAuthButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};
