// Site-level constants. Plain .js so astro.config.mjs can import it too.

export const SITE = {
  /** BLOCKING DECISION before launch — see CLAUDE.md. Every canonical, OG tag,
   *  sitemap entry and schema node depends on this value. */
  origin: 'https://www.romicatiegroup.com',
  name: 'Romica Tie Group',
  shortName: 'RTG',
  tagline: 'Custom deck equipment for research, survey and offshore vessels',
  founded: '2003',
  locations: [
    { country: 'GB', locality: 'United Kingdom', role: 'Design' },
    { country: 'RO', locality: 'Satu Mare', role: 'Manufacture' },
  ],
  sameAs: ['https://www.linkedin.com/company/romica-engineering'],
  ogImageDir: '/assets/og',
};

/** Primary navigation. Order is deliberate: the three buyer routes first. */
export const NAV = [
  { label: 'Sectors', href: '/sectors/' },
  { label: 'Equipment', href: '/equipment/' },
  { label: 'Lifecycle', href: '/lifecycle/' },
  { label: 'Manufacturing', href: '/contract-manufacturing/' },
  { label: 'Yards', href: '/yards-integrators/' },
  { label: 'Proof', href: '/proof/' },
];

export const FOOTER_NAV = [
  {
    heading: 'Buying',
    links: [
      { label: 'Sectors', href: '/sectors/' },
      { label: 'Equipment', href: '/equipment/' },
      { label: 'Lifecycle', href: '/lifecycle/' },
      { label: 'Contract manufacturing', href: '/contract-manufacturing/' },
      { label: 'Yards & integrators', href: '/yards-integrators/' },
    ],
  },
  {
    heading: 'Evidence',
    links: [
      { label: 'Case studies', href: '/proof/case-studies/' },
      { label: 'Test facility', href: '/proof/test-facility/' },
      { label: 'Certifications', href: '/yards-integrators/certifications-approvals/' },
      { label: 'Technical notes', href: '/resources/technical-notes/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About RTG', href: '/about/' },
      { label: 'Careers', href: '/about/careers/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Agents worldwide', href: '/contact/agents/' },
    ],
  },
];

export const LEGAL_NAV = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Cookies', href: '/cookies/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Accessibility', href: '/accessibility/' },
];

/** Verified proof figures. Any number shown on the site comes from here so a
 *  single correction propagates everywhere. */
export const PROOF = {
  years: 22,
  machines: 1500,
  projects: 250,
  clients: 50,
  cptDepthM: 3000,
  loadTestTe: 150,
};
