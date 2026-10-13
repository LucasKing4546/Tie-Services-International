// Site-level constants. Plain .js so astro.config.mjs can import it too.

export const SITE = {
  /** BLOCKING DECISION before launch — see CLAUDE.md. Every canonical, OG tag,
   *  sitemap entry and schema node depends on this value. */
  origin: 'https://www.romicatiegroup.com',
  name: 'Romica Tie Group',
  shortName: 'RTG',
  tagline: 'Custom deck machinery for research, survey and offshore vessels',
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
  { label: 'Shipyards', href: '/yards-integrators/' },
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
      { label: 'Shipyards & integrators', href: '/yards-integrators/' },
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

/** Consent and the two services it holds back. The same accounts the legacy
 *  site uses, so analytics history and the OneTrust configuration carry
 *  over. OneTrust's category ids are fixed by that configuration:
 *  C0002 Performance, C0003 Functional. */
export const CONSENT = {
  oneTrust: '413a8916-90f2-4a76-a336-3f3839d743d3',
  analytics: 'G-E3LKWVYPMK',
  chatra: 'iraKxKmohhNY38Mu9',
  performance: 'C0002',
  functional: 'C0003',
};

export const LEGAL_NAV = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Cookies', href: '/cookies/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Accessibility', href: '/accessibility/' },
];

/** Verified proof figures. Any number shown on the site comes from here so a
 *  single correction propagates everywhere. */
export const PROOF = {
  /** The family business. Romica Tie Group itself dates from 2003 (SITE.founded). */
  since: 1978,
  staff: 80,
  machines: 1500,
  projects: 250,
  clients: 50,
  cptDepthM: 3000,
  loadTestTe: 150,
};

/**
 * Display form of each PROOF figure — pre-formatted value for the .ct
 * count-up (src/lib/motion.ts) plus a generic label. Used by ProofBar.astro
 * and Fig.astro. The homepage (src/data/home.ts) reads PROOF directly.
 */
export const PROOF_DISPLAY = {
  // 'Since 1978', not a bare 1978: a bare number counts up and prints as 1,978.
  since: { value: `Since ${PROOF.since}`, label: 'Family business' },
  staff: { value: `${PROOF.staff}`, label: 'Engineers, welders, fitters and technicians' },
  machines: { value: PROOF.machines.toLocaleString('en-GB'), label: 'Machines delivered' },
  projects: { value: `${PROOF.projects}+`, label: `Projects for ${PROOF.clients}+ clients` },
  clients: { value: `${PROOF.clients}+`, label: 'Clients served' },
  cptDepthM: { value: `${PROOF.cptDepthM.toLocaleString('en-GB')} m`, label: 'Proven CPT sampling working depth' },
  loadTestTe: { value: `${PROOF.loadTestTe} Te`, label: 'Load tested in-house' },
};
