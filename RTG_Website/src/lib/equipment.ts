/**
 * The finder's vocabulary, shared by the finder itself (EquipmentFinder.astro)
 * and the homepage form that links into it (FinderEntry.astro). The keys are
 * the values the finder reads from the query string.
 */
import type { EquipmentApp } from '@data/equipment';

export const EQUIPMENT_APPS: Record<EquipmentApp, string> = {
  survey: 'Survey',
  geotech: 'Geotechnical',
  seismic: 'Seismic',
  rov: 'ROV and subsea',
  mooring: 'Mooring and tow',
  lift: 'Lift and utility',
  cable: 'Cable lay',
};

/** Minimum working load bands, Te. Bands, not a slider: most designs sit
 *  under 5 Te, so a linear slider would spend nearly all its travel on a
 *  handful of rows. */
export const EQUIPMENT_LOADS = [1, 5, 15, 30];
