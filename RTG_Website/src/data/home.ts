/**
 * Homepage content. Kept as data rather than markup so the sector, equipment
 * and tier lists stay in step with the Page Map — and so a copywriter can edit
 * them without touching a component.
 */
import { PROOF } from './site.js';

export interface Stat { value: string; label: string; accent?: boolean }

export const HERO_STATS: Stat[] = [
  { value: `${PROOF.years}`, label: 'Years designing and building deck equipment', accent: true },
  { value: `${PROOF.machines.toLocaleString('en-GB')}`, label: 'Custom deck machines delivered' },
  { value: `${PROOF.projects}+`, label: `Completed projects across ${PROOF.clients}+ clients` },
  { value: `${PROOF.cptDepthM.toLocaleString('en-GB')} m`, label: 'Proven CPT sampling working depth', accent: true },
  { value: `${PROOF.loadTestTe} Te`, label: 'In-house load test capability, class witnessed' },
  { value: 'UK/EU', label: 'Designed in the UK, manufactured and tested in Romania' },
];

export const MARQUEE = [
  'Traction & storage winches',
  'Launch & recovery systems',
  'Cable & pipe tensioners',
  'A-frames & deck cranes',
  'Hydraulic power units',
  'Containerised spreads',
];

/** Mirrors S-01…S-07 in the Page Map. */
export const SECTORS = [
  { id: 'S-01', name: 'Ocean Survey & Hydrography', href: '/sectors/ocean-survey-hydrography/',
    blurb: 'CTD, side scan, magnetometer, sub-bottom profiler and deep tow. 300 to 4,000 m.' },
  { id: 'S-02', name: 'Marine Geotechnical', href: '/sectors/marine-geotechnical/',
    blurb: 'When the tool is fixed to the seabed and the ship is not. Corer, CPT and vibrocorer handling.' },
  { id: 'S-03', name: 'Offshore Wind & Subsea Cables', href: '/sectors/offshore-wind-subsea-cables/',
    blurb: 'Every turbine starts with a core sample. Every array ends with a cable.' },
  { id: 'S-04', name: 'Seismic', href: '/sectors/seismic/',
    blurb: 'Handling built for continuous duty, where the winch never really stops.' },
  { id: 'S-05', name: 'Oceanographic Research', href: '/sectors/oceanographic-research/',
    blurb: 'A CTD cast is a measurement, not a lift. Controlled, repeatable, instrument-safe.' },
  { id: 'S-06', name: 'Subsea, ROV & Diving', href: '/sectors/subsea-rov-diving/',
    blurb: 'An ROV is only as available as its umbilical winch.' },
  { id: 'S-07', name: 'Defence & Government', href: '/sectors/defence-government/',
    blurb: 'Built for government and naval programmes, with the documentation to match.' },
];

/** The four-tier contract-manufacturing scope ladder — C-01…C-04. */
export const TIERS = [
  { n: '01', title: 'Structural fabrication', href: '/contract-manufacturing/structural-fabrication/',
    lede: 'Welded structures built to your drawings, class surveyed, fully traceable.',
    points: ['Certified welding procedures and welders', 'Material traceability to mill certificate',
             'NDT and class survey at your nominated hold points'] },
  { n: '02', title: 'Mechanical assembly', href: '/contract-manufacturing/mechanical-assembly/',
    lede: 'Everything in Tier 1, plus the rotating and load-bearing hardware.',
    points: ['Drums, bearings, gearboxes and brakes', 'Sheaves and level wind, built and aligned',
             'Dimensional inspection against your GA'] },
  { n: '03', title: 'Hydraulic & electrical build', href: '/contract-manufacturing/hydraulic-electrical-build/',
    lede: 'The machine becomes powered, plumbed and wired.',
    points: ['Power units built and pipework flushed to class', 'Panels, cabling and instrumentation',
             'Cleanliness certification on every circuit'] },
  { n: '04', title: 'Automation, test & commissioning', href: '/contract-manufacturing/automation-test-commissioning/',
    lede: 'It leaves as a proven machine, not a delivery of parts.',
    points: ['PLC loading and control system integration',
             `Load testing to ${PROOF.loadTestTe} tonnes under class witness`,
             'Commissioning and full documentation pack'] },
];

/** Machines shown in the lifted frame. Order drives the carousel. */
export const MACHINES = [
  { key: 'winch', name: 'Traction &amp; storage winch',
    desc: 'Grooved drum, level wind, hydraulic drive and fail-safe band brake — built as one machine on a single skid.',
    spec: [['Tier 1–4', 'Scope available'], ['150 Te', 'Load tested'], ['3,000 m', 'Proven depth']] },
  { key: 'aframe', name: 'A-frame launch &amp; recovery',
    desc: 'Twin-leg fabricated A-frame with luffing cylinders, head sheave and hook block. Class surveyed as a system.',
    spec: [['Twin ram', 'Luffing'], ['Class', 'Surveyed'], ['Bespoke', 'Geometry']] },
  { key: 'hpu', name: 'Hydraulic power unit',
    desc: 'Tank, motor–pump group, valve manifold and air-blast cooling on one skid. Pipework flushed to class.',
    spec: [['15–110 kW', 'Power range'], ['ATEX', 'On request'], ['Flushed', 'To class']] },
];

/** Equipment families — mirrors E-01…E-12. */
export const EQUIPMENT = [
  { name: 'Winches', href: '/equipment/winches/', cta: 'Six winch families',
    blurb: 'Geotechnical & coring, survey & oceanographic, seismic, ROV/tow/umbilical, mooring & utility.',
    icon: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>' },
  { name: 'Launch & recovery', href: '/equipment/launch-recovery-systems/', cta: 'Read more',
    blurb: 'A-frames and LARS matched to the winch, the tool and the sea state it has to work in.',
    icon: '<path d="M4 20V8l8-4 8 4v12"/><path d="M4 14h16"/>' },
  { name: 'Cranes & lifting', href: '/equipment/cranes-lifting/', cta: 'Read more',
    blurb: 'Deck cranes and lifting equipment for research and survey vessels.',
    icon: '<path d="M3 19h18"/><path d="M6 19V7l9 3"/><path d="M15 10v6"/>' },
  { name: 'Handling systems', href: '/equipment/handling-systems/', cta: 'Read more',
    blurb: 'Cable and pipe tensioners, and general handling built for continuous-duty work.',
    icon: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 7v10M17 7v10"/>' },
  { name: 'Power units', href: '/equipment/power-units/', cta: 'Read more',
    blurb: 'Hydraulic power units sized to the machine, not picked off a catalogue page.',
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>' },
  { name: 'Portable & containerised', href: '/equipment/portable-containerised/', cta: 'Read more',
    blurb: 'Built to move between hulls — mobilise, demobilise, redeploy.',
    icon: '<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M7 6v12M11 6v12M15 6v12"/>' },
];

/** Lifecycle steps — L-05, L-01, L-03. */
export const LIFECYCLE = [
  { step: 'Step 01', title: 'Condition assessment', href: '/lifecycle/condition-assessment/', cta: 'Book an assessment',
    blurb: 'An honest report on what the machine has left in it — before anyone quotes you for a replacement.',
    points: ['Strip, measure and NDT', 'Reuse / rework / replace per component', 'Written report with costed options'],
    icon: '<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>' },
  { step: 'Step 02', title: 'Refurbishment & upgrade', href: '/lifecycle/refurbishment-upgrade/', cta: 'Read more',
    blurb: "Rework, reuse and upgrade while it's apart — the cheapest time to improve the machine.",
    points: ['Drums, bearings, brakes and gearboxes', 'Control system and instrumentation', 'Documentation reissued'],
    icon: '<path d="M14.7 6.3a4 4 0 01-5 5L5 16v3h3l4.7-4.7a4 4 0 015-5z"/>' },
  { step: 'Step 03', title: 'Re-certification', href: '/lifecycle/recertification-class-renewal/', cta: 'Read more',
    blurb: 'Class renewal and load testing, so it goes back to sea with paperwork that stands up.',
    points: [`Load tested to ${PROOF.loadTestTe} Te in house`, 'Class witnessed and certified', 'Full test and traceability pack'],
    icon: '<path d="M12 3l7 3v5c0 4.4-2.9 8.3-7 9.5C7.9 19.3 5 15.4 5 11V6z"/><path d="M9 12l2 2 4-4"/>' },
];
