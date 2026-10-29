# Application information (archived 2026-10-29)

Collected before the "Applications" lists were removed from the product pages.
Copied exactly from the repo, for reuse in social posts and sales material.
The equipment finder keeps its Application filter, so the finder tags below
are still live in `src/data/equipment.ts`.

## Finder application labels (`src/lib/equipment.ts`)

| key | label | workbook categories mapped to it (`scripts/build-equipment.mjs`) |
|---|---|---|
| survey | Survey | survey, mini survey lars, ctd, ctd lars, sonar pole |
| geotech | Geotechnical | geotechnical, corer handling systems |
| seismic | Seismic | seismic, array winches, gun storage, gun storage and handling, seismic gun storage |
| rov | ROV and subsea | rov, rov winches, rov lars, diver tool basket system |
| mooring | Mooring and tow | mooring, tow |
| lift | Lift and utility | lift, man riding, auxiliary/tugger, aerostat, man-riding abandonment system, boom crane |
| cable | Cable lay | pipe and cable laying systems, cable storage and cable spooler |

Categories that name a machine type (A-Frame, HPU) get no application.

---

## By equipment family

### E-01 Winches (hub): "Marine Winches | Survey, Geotechnical, Seismic & ROV | RTG"
- **Page list:** none.
- **Finder, no tag:** DS07 800 m & 2,000 m - hydraulic winch; DS49A Hydraulic winch.

### E-02 Geotechnical & Coring Winches: "Geotechnical & Coring Winches | CPT & Piston Corer | RTG"
- **Page list:** Piston coring, Gravity coring, Box coring, Vibrocoring, CPT deployment, Seabed sampling.
- **Finder:**
  - DS30 Electric CT winch with LW (Geotechnical, Seismic)
  - DS31 Electric CT winch (Geotechnical, Seismic)
  - DS79 Electric winch (Geotechnical, Seismic)
  - DS08 Electric winch (Geotechnical, Seismic)
  - DS01 Electric winch (Geotechnical, Survey)
  - DS13 Hydraulic winch (Geotechnical)
  - DS37 / DS37A Hydraulic winch + HPU (Geotechnical)
  - DS38 / DS38A Hydraulic winch + HPU (Geotechnical)
  - DS39 / DS39A Hydraulic winch + HPU (Geotechnical)

### E-03 Survey & Oceanographic Winches: "Survey & Oceanographic Winches | 300 to 4,000 m | RTG"
- **Page list:** Side-scan sonar towing, Magnetometer systems, Sub-bottom profiler, Water samplers, CTD deployment, Drop-down cameras.
- **Finder, all tagged Survey:**
  - DS83 2.2 kW - 700 m - 1 Ø electric winch
  - DS27 4x200 m - dual drum electric winch
  - DS23 Electric ADCP LARS winch
  - DS92 Electro-hydraulic winch with integral 7.5 kW HPU
  - DS32 Electric winch
  - DS84 7.5 kW - 2,000 m - electric winch
  - DS18 Electric winch
  - DS87 11 kW - 2,000 m - electric winch
  - DS109 Electric winch
  - DS12 Electric winch
  - DS88 15 kW - 2,000 m - electric winch
  - DS51 Electric winch
  - DS89 Hydraulic winch
  - DS90 Electric winch
  - DS93 Hydraulic winch
  - DS06 Hydraulic winch
  - DS91 Electro-hydraulic winch with integral 37 kW HPU
  - DS107 Hydraulic winch
  - DS10 Hydraulic winch
  - DS05 Electric winch

### E-04 Seismic Winches: "Seismic Winches & Source Handling | RTG"
- **Page list:** Source handling, Streamer handling, Continuous-duty spread deployment.
- **Finder:**
  - DS03 Electric winch (Seismic)
  - DS28 HV electric winch (Seismic)
  - DS14 Hydraulic winch (Seismic)
  - DS29 Hydraulic winch (Seismic)
  - DS11 Hydraulic winch (Seismic)
  - DS17 Electric winch (Seismic, ROV and subsea)
  - DS76 Hydraulic winch (Seismic)

### E-05 ROV, Tow & Umbilical Winches: "ROV, Tow & Umbilical Winches | RTG"
- **Page list:** ROV launch and recovery, Deep tow, Umbilical handling.
- **Finder:**
  - DS02 Electric winch (ROV and subsea, Seismic)
  - DS53 3 x 400 m - hydraulic winch & HPU (ROV and subsea)

### E-06 Mooring & Utility Winches: "Mooring & Utility Winches for Offshore Vessels | RTG"
- **Page list:** Mooring, Towing, General deck utility handling.
- **Finder, Mooring and tow:** DS34 Hydraulic winch; DS60 Hydraulic winch; DS70 Hydraulic traction winch; DS71 Dual hydraulic traction winch.
- **Finder, Lift and utility** (22 designs):
  - DS105 Hydraulic CT winch
  - DS86 1,000 m - hydraulic winch (also Geotechnical)
  - DS80 Hydraulic winch W/O LW
  - DS04, DS40 and DS85 Hydraulic winch (each also Geotechnical)
  - Hydraulic winch: DS44, DS56, DS55, DS66, DS22, DS16, DS48, DS20, DS24, DS101, DS21, DS73, DS82, DS112, DS74, DS75

### E-07 Launch & Recovery Systems: "Launch and Recovery Systems | A-Frames & LARS | RTG"
- **Page list:** Stern and side A-frames, ROV launch and recovery, Survey spread deployment, Cable and umbilical handling.
- **Finder:**
  - DS69 ADCP LARS (Survey)
  - DS62 ROV LARS & HPU (ROV and subsea)
  - DS54 Tooling basket LARS & HPU (ROV and subsea)
- **Finder, no tag:** DS36, DS94, DS98, DS35, DS96, DS95 and DS33 A-frame; DS97 Telescopic A-frame; DS65 Z-frame.

### E-08 Cranes & Lifting: "Marine Cranes & Lifting Equipment | Class Certified | RTG"
- **Page list:** Over-the-side deployment, Moonpool handling, Container and equipment transfer, Stores and mobilisation, Deck maintenance, Personnel and basket handling.
- **Finder:** no designs.

### E-09 Handling Systems: "Corer, Seismic & Cable Handling Systems | RTG"
- **Page list:** none (the workbook asks for an "applications" block, but none was authored).
- **Finder:**
  - DS67 Man riding abandonment system (Lift and utility)
  - DS43 11 m modular over-the-side deployment pole (Survey)
  - DS49 4.4 m - side deployment boom (Seismic)
  - DS42 9 m - over stern boom (Seismic)
  - DS47 8.5 m - over stern boom (Seismic)
  - DS61 Hydraulic gravity corer chute (Geotechnical)

### E-10 Cable & Pipe Tensioners: "Cable & Pipe Tensioners | 5 to 20 Te | RTG"
- **Page list:** Inter-array cable lay, Export cable and interconnector lay, Pull-in and J-tube entry, Shore-end pulls, Cable recovery and repair, Umbilical and dynamic cable handling, Flexible pipe lay, Spooling and FAT, Recovery and abandonment.
- **Finder:**
  - DS15 2 x 600 m - electric winch (Cable lay, Seismic)
  - DS59 Shipboard hydraulic cable spooler system (Cable lay)
  - DS57 Electro-hydraulic 2 track tensioner & HPU (Cable lay)

### E-11 Power Units and E-12 Portable & Containerised Systems
- **Page lists:** none.
- **E-11 finder, no tag:** DS25 55 kW HPU, DS50 75 kW HPU, DS64 4 x 90 kW open loop HPU, DS106 75 kW HPU.

---

## Related copy that is useful for posts (still on the site)

- **Homepage equipment band** (`src/data/home.ts`): "Geotechnical, survey, seismic, ROV and umbilical, mooring and utility"; "…; 240 kg to 48 t WLL."
- **Homepage sector blurbs** (`src/data/home.ts`):
  - Survey: "CTD, side scan, magnetometer, sub-bottom profiler and deep-tow handling, 300 to 4,000 m."
  - Geotechnical: "Corer, CPT and vibrocorer handling with constant tension control. Proven to {cptDepthM} m."
  - Offshore wind and cables: "Site-investigation handling and 5 to 20 Te cable tensioners."
  - Seismic: "Source and streamer handling for continuous-duty acquisition."
  - Oceanographic research: "Electric and hydraulic winches for precise, repeatable CTD and coring casts."
  - Subsea, ROV and diving: "ROV LARS, umbilical winches and personnel-rated handling."
  - Defence and government: "Class-certified handling with full material and weld traceability."
- **P-03 case study:** spec row "Application: Offshore geotechnical" (kept on the page).
- **Old static build** (`research/rtg-website/rtg-website/site_build/site_data.py:224`): "A sector is the market you work in. An application is what a given machine does. Start here with the first, and every equipment page carries the second."

---

## Claude plugins for social media posts (searched 2026-10-29)

| Plugin | What it does | Install | Official? |
|---|---|---|---|
| [marketing](https://github.com/anthropics/knowledge-work-plugins/tree/main/marketing) (knowledge-work-plugins) | `/draft-content` writes social posts, blogs, newsletters and case studies. Also `/brand-review`, `/campaign-plan` and a brand-voice skill. | `claude plugin marketplace add anthropics/knowledge-work-plugins`, then `claude plugin install marketing@knowledge-work-plugins` | Anthropic |
| [linkedin-skills](https://github.com/sergebulaev/linkedin-skills) | 12 LinkedIn skills: Post Writer, Repurposer (turns existing content into posts), Hook Extractor, Post Audit, Content Planner. Drafts only; posting needs a third-party API. MIT. | `/plugin marketplace add sergebulaev/linkedin-skills`, then `/plugin install linkedin-skills@linkedin-skills` | Community |
| [marketingskills](https://github.com/coreyhaines31/marketingskills), `social` skill | Creates and optimises posts for LinkedIn, X and Instagram. | `/plugin marketplace add coreyhaines31/marketingskills`, then `/plugin install marketing-skills` | Community |
| [social-media-posts](https://claudemarketplaces.com/skills/jezweb/claude-skills/social-media-posts) (jezweb) | Writes a separate version for each platform. Only the listing was checked, not the repo. | `npx -y skills add jezweb/claude-skills --skill social-media-posts --agent claude-code` | Community |
