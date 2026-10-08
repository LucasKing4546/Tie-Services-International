// Homepage content as data, so a copywriter can edit it without touching a component.
// Source: RTG_Website_Copy_Concise.docx, Draft 1, October 2026.
import { PROOF } from './site.js';

export const HERO = {
  /** Mirrors the H-01 h1 in the Page Map. The middle part is the accented one. */
  h1: ['Custom', 'deck machinery', 'for research, survey and offshore vessels'],
  lede: `Winches, launch and recovery systems, tensioners and cranes, engineered to the vessel and the duty, load tested to ${PROOF.loadTestTe} Te in our own facility and supported for the full service life.`,
  ctas: [
    { label: 'Find your sector', href: '/sectors/' },
    { label: 'Equipment range', href: '/equipment/' },
  ],
  note: `Family-owned deck machinery specialists since ${PROOF.since}`,
};

/** The four figures just under the waterline. Values come from PROOF only. */
export const HERO_PROOF = [
  { value: `${PROOF.since}`, label: 'Family business founded' },
  { value: PROOF.machines.toLocaleString('en-GB'), label: 'Machines delivered' },
  { value: `${PROOF.cptDepthM.toLocaleString('en-GB')} m`, label: 'CPT working-depth record' },
  { value: `${PROOF.loadTestTe} Te`, label: 'In-house load testing' },
];

/** Client names here are published on the user's instruction of 2026-10-08
 *  (see CLAUDE.md §5.7). */
export const STORY = {
  heading: `A family business in deck machinery since ${PROOF.since}`,
  body: `In ${PROOF.since} Robert Turner, a qualified electrical engineer, entered the deck machinery industry. In 2003 the family business continued as Romica Tie Group under his son Mike Turner, combining British design with Romanian manufacturing. Today a team of around ${PROOF.staff} engineers, welders, fabricators and technicians designs, builds, tests and supports RTG equipment working worldwide.`,
  trustedHeading: 'Trusted by industry leaders',
  trusted: 'Fugro has used RTG handling systems on seven vessels over fourteen years. Other clients include Gardline, Geoquip Marine, MMT, IHC, Hyundai Heavy Industries and Damen.',
  link: { label: 'Clients and references', href: '/proof/references/' },
};

export const CONDITIONS = {
  heading: 'Engineered for offshore conditions',
  points: [
    'A-frames rated to 3.9 m significant wave height',
    'Spring-applied fail-safe brakes: minimum 1.5 × WLL on winches, 1.8 × SWL on tensioners',
    'Lebus grooved drums and controlled level wind as standard',
    'Every machine proof load, brake, render and speed tested before dispatch; class witness on request',
  ],
};

/** Machines in the showroom. Order drives the carousel; home-scroll.ts reads
 *  the same list, so the text beside the model can never drift from it. */
export const MACHINES = [
  { key: 'winch', label: 'Winch', name: 'Winches',
    desc: 'Geotechnical, survey, seismic, ROV and umbilical, mooring and utility.',
    spec: [['240 kg to 30 t', 'Working load limit'], ['1.5 × WLL', 'Static brake holding, minimum'],
           [`${PROOF.cptDepthM.toLocaleString('en-GB')} m`, 'Proven working depth']] },
  { key: 'aframe', label: 'A-frame LARS', name: 'Launch &amp; recovery systems',
    desc: 'A-frames and LARS engineered to the deck arrangement and the sea state.',
    spec: [['20 to 40 Te', 'Working load limit'], ['3.9 m Hs', 'Rated sea state']] },
  { key: 'hpu', label: 'Power unit', name: 'Power units',
    desc: 'Hydraulic power units built and flushed to a defined cleanliness class.',
    spec: [['2 × 55 kW', 'Example unit'], ['Function tested', 'With the machine it drives']] },
];

/** Mirrors S-01…S-07 in the Page Map. */
export const SECTORS = [
  { id: 'S-01', ref: 'IMG-S01-C', name: 'Ocean Survey & Hydrography', href: '/sectors/ocean-survey-hydrography/',
    blurb: 'CTD, side scan, magnetometer, sub-bottom profiler and deep-tow handling, 300 to 4,000 m.' },
  { id: 'S-02', ref: 'IMG-S02-C', name: 'Marine Geotechnical', href: '/sectors/marine-geotechnical/',
    blurb: `Corer, CPT and vibrocorer handling with constant tension control. Proven to ${PROOF.cptDepthM.toLocaleString('en-GB')} m.` },
  { id: 'S-03', ref: 'IMG-E10-A', name: 'Offshore Wind & Subsea Cables', href: '/sectors/offshore-wind-subsea-cables/',
    blurb: 'Site-investigation handling and 5 to 20 Te cable tensioners.' },
  { id: 'S-04', ref: 'IMG-S04-D', name: 'Seismic', href: '/sectors/seismic/',
    blurb: 'Source and streamer handling for continuous-duty acquisition.' },
  { id: 'S-05', ref: 'IMG-S05-C', name: 'Oceanographic Research', href: '/sectors/oceanographic-research/',
    blurb: 'Electric and hydraulic winches for precise, repeatable CTD and coring casts.' },
  { id: 'S-06', ref: 'IMG-S06-B', name: 'Subsea, ROV & Diving', href: '/sectors/subsea-rov-diving/',
    blurb: 'ROV LARS, umbilical winches and personnel-rated handling.' },
  { id: 'S-07', ref: 'IMG-S07-B', name: 'Defence & Government', href: '/sectors/defence-government/',
    blurb: 'Class-certified handling with full material and weld traceability.' },
];

/** Equipment families — mirrors E-01…E-12. */
export const EQUIPMENT = [
  { title: 'Winches', href: '/equipment/winches/',
    blurb: 'Geotechnical, survey, seismic, ROV and umbilical, mooring and utility; 240 kg to 30 t WLL.' },
  { title: 'Launch & recovery systems', href: '/equipment/launch-recovery-systems/',
    blurb: 'A-frames and LARS, 20 to 40 Te WLL.' },
  { title: 'Cranes & lifting', href: '/equipment/cranes-lifting/',
    blurb: 'Knuckle boom, telescopic and utility cranes, and davits.' },
  { title: 'Handling systems', href: '/equipment/handling-systems/',
    blurb: 'Cable and pipe tensioners, 5 to 20 Te.' },
  { title: 'Power units', href: '/equipment/power-units/',
    blurb: 'Hydraulic power units built and flushed to a defined cleanliness class.' },
  { title: 'Portable & containerised', href: '/equipment/portable-containerised/',
    blurb: 'Self-contained spreads for chartered vessels.' },
];

export const MANUFACTURING = {
  heading: 'Contract manufacturing',
  body: 'Your design, built and tested in our factory. Four cumulative scopes, from structural fabrication to a commissioned machine.',
  link: { label: 'Contract manufacturing', href: '/contract-manufacturing/' },
};

/** The four-tier contract-manufacturing scope ladder — C-01…C-04. */
export const TIERS = [
  { n: '01', title: 'Structural fabrication', href: '/contract-manufacturing/structural-fabrication/',
    lede: 'Welded structures to your drawings.',
    points: ['EN ISO 3834 discipline', 'NDT to ISO 9712 level 2', '100% traceability on main structural welds',
             'Machining to 12 m and 10 t in one setup'] },
  { n: '02', title: 'Mechanical assembly', href: '/contract-manufacturing/mechanical-assembly/',
    lede: 'Drums, shafts, bearings, gearboxes, brakes, sheaves and level wind.',
    points: ['Torqued, aligned and rotation checked'] },
  { n: '03', title: 'Hydraulic & electrical build', href: '/contract-manufacturing/hydraulic-electrical-build/',
    lede: 'Power units, pipework, panels and instrumentation.',
    points: ['Pipework flushed to class', 'Valve blocks', 'Panels, cabling and instrumentation'] },
  { n: '04', title: 'Automation, test & commissioning', href: '/contract-manufacturing/automation-test-commissioning/',
    lede: 'PLC and HMI loading, then proof under load.',
    points: ['Interlock proving', `Load test to ${PROOF.loadTestTe} Te under class witness`,
             'Certification dossier', 'Vessel commissioning'] },
];

export const SERVICE = {
  heading: 'Service life support',
  body: 'Condition assessment, refurbishment, upgrade, re-certification and spares for RTG equipment and machines from other manufacturers. A traction winch built by RTG in 2009 returned to offshore service in 2021 after refurbishment and re-certification.',
  ctas: [
    { label: 'Book a condition assessment', href: '/lifecycle/condition-assessment/' },
    { label: 'Talk to an engineer', href: '/contact/' },
  ],
};
