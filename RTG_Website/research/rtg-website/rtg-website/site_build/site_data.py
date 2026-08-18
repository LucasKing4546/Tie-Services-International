#!/usr/bin/env python3
"""Page definitions and content for the RTG site.

CONTENT RULES ENFORCED HERE (see Build Specification §06):
  - No dimensioned GA drawings anywhere public.
  - No drum core diameter, drum length or flange diameter. Bounding envelope only.
  - No component makes or part numbers.
  - Everything RTG must verify is wrapped in <span class="gap"> and listed in README.
"""

HOST = "https://www.romicatiegroup.com"

ORG = {
    "name": "Romica Tie Group",
    "desc": ("Custom deck equipment for research, survey and offshore vessels. "
             "Winches, launch and recovery systems and handling systems, designed "
             "in the UK and manufactured in Satu Mare, Romania."),
    "founded": "2003",
    "uk_city": "United Kingdom",
    "ro_city": "Satu Mare",
    "sameAs": ["https://www.linkedin.com/company/romica-engineering"],
}

NAV = [
    ("Sectors", "/sectors/"),
    ("Equipment", "/equipment/"),
    ("Lifecycle", "/lifecycle/"),
    ("Contract Manufacturing", "/contract-manufacturing/"),
    ("Yards", "/yards-integrators/"),
    ("Proof", "/proof/"),
    ("About", "/about/"),
    ("Contact", "/contact/"),
]

# ------------------------------------------------------------------ blocks
def img(ref, brief, cls=""):
    return (f'<div class="imgslot {cls}"><b>{ref}</b><span>{brief}</span></div>')

def hero(eyebrow, h1, lede, imgref=None, imgbrief=None, tall=False, ctas=None):
    c = ""
    if ctas:
        c = '<p style="margin-top:22px">' + " ".join(ctas) + "</p>"
    if imgref:
        return f"""<section class="hero{' tall' if tall else ''}"><div class="wrap"><div class="hero-grid">
<div><p class="eyebrow">{eyebrow}</p><h1>{h1}</h1><p class="lede">{lede}</p>{c}</div>
{img(imgref, imgbrief)}</div></div></section>"""
    return f"""<section class="hero{' tall' if tall else ''}"><div class="wrap">
<p class="eyebrow">{eyebrow}</p><h1>{h1}</h1><p class="lede">{lede}</p>{c}</div></section>"""

def sec(inner, cls=""):
    return f'<section class="{cls}"><div class="wrap">{inner}</div></section>'

def cta(h, p, label, href, second=None):
    s = f'<a class="btn" href="{href}">{label}</a>'
    if second:
        s += f' <a class="btn ghost" href="{second[1]}" style="color:#fff;border-color:#fff">{second[0]}</a>'
    return f'<div class="cta"><div><h3>{h}</h3><p>{p}</p></div><div>{s}</div></div>'

def cards(items):
    out = []
    for href, title, blurb, ref, brief in items:
        out.append(f'<a class="card" href="{href}">{img(ref, brief)}'
                   f'<div class="card-b"><h3>{title}</h3><p>{blurb}</p>'
                   f'<span class="go">Read more &rarr;</span></div></a>')
    return '<div class="cards">' + "".join(out) + '</div>'

def spec_table(caption, rows):
    r = "".join(f'<tr><th scope="row">{k}</th><td>{v}{f" <em>{n}</em>" if n else ""}</td></tr>'
                for k, v, n in rows)
    return f'<table class="spec"><caption>{caption}</caption><tbody>{r}</tbody></table>'

def draft(items, note="Content to be supplied by RTG before launch"):
    li = "".join(f"<li>{i}</li>" for i in items)
    return (f'<div class="draftnote"><h4>Draft page &mdash; {note}</h4>'
            f'<p>This page is built, styled and carries its final metadata. '
            f'The copy below is a working outline. The blocks it needs:</p><ul>{li}</ul></div>')

def proofbar(dark=False):
    return ('<div class="proofbar">'
            '<div><b>22</b><span>years designing deck equipment</span></div>'
            '<div><b>250+</b><span>completed projects</span></div>'
            '<div><b>1,500</b><span>custom deck machines delivered</span></div>'
            '<div><b>50+</b><span>customers and research institutions</span></div>'
            '<div><b>3,000 m</b><span>proven CPT working depth</span></div>'
            '<div><b>150 Te</b><span>in-house load test capability</span></div>'
            '</div>')

def form(fields, submit="Send", intro="", consent=True):
    f = ""
    for label, name, kind, hint, req in fields:
        r = ' <em>*</em>' if req else ''
        rq = ' required' if req else ''
        if kind == "textarea":
            inp = f'<textarea id="{name}" name="{name}"{rq}></textarea>'
        elif isinstance(kind, list):
            opts = "".join(f'<option>{o}</option>' for o in kind)
            inp = f'<select id="{name}" name="{name}"{rq}><option value="">Please choose…</option>{opts}</select>'
        else:
            inp = f'<input type="{kind}" id="{name}" name="{name}"{rq}>'
        h = f'<p class="hint">{hint}</p>' if hint else ''
        f += f'<div class="field"><label for="{name}">{label}{r}</label>{inp}{h}</div>'
    con = ('<div class="consent"><input type="checkbox" id="consent" name="consent" required>'
           '<label for="consent" style="font-family:var(--f-body);text-transform:none;'
           'letter-spacing:0;font-size:14px;font-weight:400">I agree that RTG may contact me '
           'about this enquiry and store my details as set out in the '
           '<a href="../../privacy/">privacy notice</a>.</label></div>') if consent else ''
    return (f'<form class="form" method="post" action="#" novalidate>{intro}{f}'
            f'<input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">'
            f'{con}<button class="btn" type="submit">{submit}</button>'
            f'<p class="hint" style="margin-top:14px">Fields marked * are required. '
            f'We reply to enquiries within one working day.</p></form>')

PAGES = []
def page(**kw):
    PAGES.append(kw)

# ==================================================================== HOME
page(
 id="H-01", slug="/", nav="Home", pri="P1", schema="WebPage",
 title="Deck Equipment for Research & Survey Vessels | RTG",
 meta="Custom winches, launch and recovery systems and deck machinery for research, survey and geotechnical vessels. Designed in the UK, built and tested in the EU.",
 h1="Deck equipment built for the work, not the brochure",
 og_title="Romica Tie Group — Custom Deck Equipment",
 og_alt="An RTG winch working on a survey vessel deck",
 body=f"""
<section class="hero tall"><div class="wrap"><div class="hero-grid">
<div>
<p class="eyebrow">Romica Tie Group &middot; UK design &middot; EU manufacture</p>
<h1>Deck equipment built for the work, not the brochure</h1>
<p class="lede">Winches, launch and recovery systems and handling systems for research,
survey and offshore vessels. Twenty-two years of it &mdash; and the machines we built
at the start are still working.</p>
</div>
{img("IMG-01", "Hero: RTG equipment working on a real deck, crew member in shot for scale, genuine sea state. Not stock. 2400&times;1200.")}
</div></div></section>

{sec('''<div class="sechead"><h2>Start where you are</h2>
<p class="lede">Three routes. Pick the one that describes you and everything you see from
here is filtered to what matters for that job.</p></div>
<div class="doors">
<a class="door" href="sectors/">
<p class="dq">Door 1</p><h3>I operate vessels</h3>
<p>Survey, geotechnical and subsea operators, from a single hull to a global fleet.
New handling equipment, refurbishment, upgrades and support.</p>
<span class="go">Sectors and equipment &rarr;</span></a>
<a class="door" href="contract-manufacturing/">
<p class="dq">Door 2</p><h3>I design equipment</h3>
<p>You own the design and the IP. We build it &mdash; from welded structures to a
complete machine, tested under class and commissioned.</p>
<span class="go">Contract manufacturing &rarr;</span></a>
<a class="door" href="yards-integrators/">
<p class="dq">Door 3</p><h3>I build or refit vessels</h3>
<p>Overflow structural fabrication and deck equipment packages, class certified
and delivered to your build programme.</p>
<span class="go">Yards and integrators &rarr;</span></a>
</div>''')}

{sec('<h2 style="text-align:center;margin-bottom:26px">Twenty-two years, in numbers</h2>' + proofbar(), "dark")}

{sec('''<div class="sechead"><p class="eyebrow">For vessel operators</p>
<h2>Your vessel is worth more working than replaced</h2>
<p>The offshore fleet is older than it has ever been and replacement costs more than the
market will bear. That makes the deck machinery you already own worth looking after
properly &mdash; assessed honestly, rebuilt where it is worth rebuilding, upgraded while
it is apart, and re-certified before it goes back to sea.</p>
<p><a href="lifecycle/"><strong>Refurbishment, upgrade and re-certification &rarr;</strong></a></p></div>''' +
 cards([
  ("lifecycle/refurbishment-upgrade/", "Refurbishment &amp; upgrade",
   "Condition assessment first. Then rework, reuse, upgrade, test and reissue the documentation.",
   "IMG-16", "Before and after of the same machine at a matched angle. 1600&times;900."),
  ("equipment/", "The equipment range",
   "Winches, launch and recovery systems, cranes, handling systems and containerised spreads.",
   "IMG-05", "Grooved drum close-up, shallow depth of field. 1600&times;900."),
  ("sectors/marine-geotechnical/", "Marine geotechnical",
   "Corer and CPT handling with tension control. Proven to a 3,000 m working depth.",
   "IMG-02", "Corer being recovered, wire under visible tension. 1600&times;900."),
 ]), "alt")}

{sec('''<div class="sechead"><p class="eyebrow">For equipment designers</p>
<h2>How much of your machine would you like us to take?</h2>
<p>Your design. Your IP. Our factory. Four levels of scope, and you choose the one that
matches where your own capacity runs out.</p></div>
<div class="ladder">
<div class="rung t1"><div class="rung-h" style="cursor:default"><div class="rung-n">1<small>Steel</small></div>
<div class="rung-t">Structural fabrication<span>Welded structures to your drawings, class surveyed, fully traceable</span></div><div></div></div></div>
<div class="rung t2"><div class="rung-h" style="cursor:default"><div class="rung-n">2<small>+ Mech</small></div>
<div class="rung-t">Mechanical assembly<span>Drums, bearings, gearboxes, brakes, sheaves and level wind, built and aligned</span></div><div></div></div></div>
<div class="rung t3"><div class="rung-h" style="cursor:default"><div class="rung-n">3<small>+ Hyd/El</small></div>
<div class="rung-t">Hydraulic and electrical build<span>Power units, pipework flushed to class, panels, cabling and instrumentation</span></div><div></div></div></div>
<div class="rung t4"><div class="rung-h" style="cursor:default"><div class="rung-n">4<small>+ Test</small></div>
<div class="rung-t">Automation, test and commissioning<span>PLC loading, load testing to 150 tonnes under class witness, commissioning</span></div><div></div></div></div>
</div>
<p><a href="contract-manufacturing/"><strong>See what each tier includes &rarr;</strong></a></p>''')}

{sec('''<div class="two">
<div><p class="eyebrow">What clients say</p>
<blockquote class="pull">Fugro appreciates RTG&rsquo;s willingness to work with our teams during the
design phase to arrive at an optimal deck arrangement.
<cite>Global survey operator <span class="gap">CONFIRM ATTRIBUTION AND CLEARANCE</span></cite></blockquote>
<blockquote class="pull">Design quality, communication with the customer, and on-time delivery.
<cite>Shipyard, newbuild vessel programme <span class="gap">CONFIRM FULL QUOTE</span></cite></blockquote>
</div>
<div><p class="eyebrow">Featured case study</p>
''' + img("IMG-16", "Before and after of the 21REL-05 traction winch. Matched angle. 1600&times;900.") + '''
<h3 style="margin-top:18px">The winch we built in 2009, rebuilt in 2021</h3>
<p>Twelve years of offshore geotechnical work, and the machine had more left in it than the
market assumed. What a proper condition assessment found, what was reused, and what was
worth upgrading while it was apart.</p>
<p><a href="proof/case-studies/traction-winch-refurbishment/"><strong>Read the case study &rarr;</strong></a></p>
</div></div>''', "alt")}

{sec(cta("Not sure which route you need?",
    "Tell us the vessel, the equipment or the drawing you are holding, and we will point you at the right engineer rather than a salesperson.",
    "Talk to us", "contact/", ("See the case studies", "proof/case-studies/")))}
""")

# ==================================================================== SECTORS HUB
page(
 id="S-00", slug="/sectors/", nav="Sectors", pri="P1", schema="CollectionPage",
 title="Sectors We Supply | Survey, Geotechnical, Wind | RTG",
 meta="RTG deck equipment works across ocean survey, marine geotechnical, offshore wind and cables, seismic, research, subsea and defence. Find your sector.",
 h1="The sectors we build for",
 body=hero("Sectors", "The sectors we build for",
   "A sector is the market you work in. An application is what a given machine does. Start here with the first, and every equipment page carries the second.") +
 sec(cards([
  ("ocean-survey-hydrography/", "Ocean survey &amp; hydrography",
   "Winches and LARS for CTD, side scan, magnetometer, sub-bottom profiler and deep tow.",
   "IMG-03", "Towfish going over the stern through an A-frame. 1600&times;900."),
  ("marine-geotechnical/", "Marine geotechnical",
   "Corer, CPT and vibrocorer handling with tension control. Proven to 3,000 m.",
   "IMG-02", "Corer recovery, wire under visible tension. 1600&times;900."),
  ("offshore-wind-subsea-cables/", "Offshore wind &amp; subsea cables",
   "Site investigation handling, and cable tensioners from 5 to 20 tonnes.",
   "IMG-04", "Tensioner on deck with cable running through. 1600&times;900."),
  ("seismic/", "Seismic",
   "Source and streamer handling built for continuous duty at sea.",
   "IMG-S5", "Seismic deck spread, multiple winches in frame. 1600&times;900."),
  ("oceanographic-research/", "Oceanographic research",
   "Research winches from 300 to 4,000 m with precise slow-speed control.",
   "IMG-S6", "Research vessel A-frame at sea, scientists on deck. 1600&times;900."),
  ("subsea-rov-diving/", "Subsea, ROV &amp; diving",
   "ROV LARS, umbilical winches, diver basket handling and man-riding systems.",
   "IMG-S7", "ROV LARS mid-deployment. 1600&times;900."),
  ("defence-government/", "Defence &amp; government",
   "Deck machinery for naval, coastguard and government research programmes.",
   "IMG-S8", "Grey hull deck equipment, restrained composition. 1600&times;900."),
 ])) +
 sec(proofbar(), "dark"))

# ==================================================================== GEOTECH SECTOR
page(
 id="S-02", slug="/sectors/marine-geotechnical/", nav="Marine Geotechnical", pri="P1", schema="Service",
 title="Geotechnical Handling Systems & CPT Winches | RTG",
 meta="Corer, CPT and vibrocorer handling systems with tension control for seabed sampling. Proven to a 3,000 m working depth on a CPT sampling system.",
 h1="When the tool is fixed to the seabed and the ship is not",
 og_alt="A corer being recovered over the side of a survey vessel",
 body=hero("Sectors &middot; Marine geotechnical",
   "When the tool is fixed to the seabed and the ship is not",
   "Every metre of relative motion between a captive tool and a moving vessel is absorbed by the cable. Handling systems that manage that are the difference between a completed campaign and a lost tool.",
   "IMG-02", "Corer being recovered over the side, wire under visible tension. 1600&times;900.") +
 sec("""<div class="sechead"><p class="eyebrow">The problem</p>
<h2>A captive tool is a hostile geometry</h2></div>
<div class="two"><div>
<p>When a corer or a CPT unit is fixed in the seabed, the two ends of your cable are doing
completely different things. The tool does not move. The vessel heaves, surges and drifts.
Everything in between is taken by the umbilical.</p>
<p>If the system cannot pay out or absorb that motion, the outcome is not a delayed cast. It
is a parted umbilical, a tool stuck or lost on the bottom, a campaign stopped, and an
intervention that costs far more than the equipment that failed.</p>
<p>The handling system is not an accessory to a geotechnical spread. It is the thing that
decides whether the spread survives the day.</p>
</div><div>
<h3>What we build for it</h3>
<ul>
<li>Corer handling systems &mdash; piston, gravity, box and vibrocorer</li>
<li>CPT deployment and recovery systems</li>
<li>Tension control winches with continuous line-in, line-out and tension readout</li>
<li>A-frames and launch and recovery systems sized to the tool and the deck</li>
<li>Containerised and skid-mounted spreads for chartered vessels</li>
</ul>
<p><a href="../../equipment/winches/geotechnical-coring/"><strong>Geotechnical and coring winches &rarr;</strong></a></p>
</div></div>""") +
 sec("""<div class="sechead"><p class="eyebrow">Proof</p><h2>Three thousand metres</h2></div>
<p class="lede">A tension control solution engineered by RTG, proven in the field and in
operation with a leading operator, set a working depth record of 3,000 m for a CPT
sampling system.</p>
<p>It is the deepest thing we have done and the clearest demonstration of why the
engineering matters. <span class="gap">RTG TO SUPPLY: operator name if clearance is granted,
vessel, year, and one line on what made the depth possible.</span></p>
<div class="note"><h4>Why tension control, specifically</h4>
<p>Constant tension keeps load on the wire within a band rather than letting it spike as the
vessel moves. Continuous tension readout on the HMI means the deck crew can see the margin
they are working inside, not infer it. And when the load has to come off the winch entirely,
the drum flange is drilled so it can be stoppered off with chain and shackles &mdash; a small
detail that only makes sense to someone who has watched equipment used badly at sea.</p></div>""",
 "alt") +
 sec("""<div class="sechead"><p class="eyebrow">Technical note</p>
<h2>Why your winch gets weaker and faster as it spools in</h2></div>
<p>A hydraulic motor delivers torque. The drum converts that torque into line pull through a
moment arm equal to the wound radius. As layers build on the drum the radius grows, so line
pull falls and line speed rises in the same proportion. On one of our multifunctional winches
that means roughly 2,545 kg working load limit on the first layer against 1,500 kg on the top
layer, while line speed goes the other way &mdash; about 50 m/min first layer against
90 m/min top layer.</p>
<p>Which is why a geotechnical winch has to be sized against the layer you will actually be
working on at depth, not the one on the datasheet headline. If you are sampling at 3,000 m,
the first-layer figure is the one that matters.</p>
<p><a href="../../resources/technical-notes/"><strong>More technical notes &rarr;</strong></a></p>""") +
 sec(cta("Working out what a geotechnical spread needs?",
   "Send us the tool, the target depth and the vessel. We will come back with a configuration and tell you what we still need to know.",
   "Talk to a geotechnical engineer", "../../contact/request-a-quotation/",
   ("Request the datasheets", "../../resources/datasheets/"))))

# ==================================================================== GEOTECH WINCH (Tier 1 spec exemplar)
page(
 id="E-02", slug="/equipment/winches/geotechnical-coring/", nav="Geotechnical & Coring", pri="P1",
 schema="Product",
 title="Geotechnical & Coring Winches | CPT, Corer | RTG",
 meta="Winches for piston, gravity and box coring and CPT deployment, with constant tension control to protect the umbilical when the tool is captive in the seabed.",
 h1="Geotechnical and coring winches",
 og_alt="An RTG geotechnical coring winch with wire under load",
 specs=[("Working load limit, first layer","2,545 kg",""),
        ("Working load limit, top layer","1,500 kg",""),
        ("Line speed, first layer","50 m/min",""),
        ("Line speed, top layer","90 m/min",""),
        ("Static brake holding","1.5 &times; WLL",""),
        ("Cable lead-off angle","0&deg; to 45&deg;","vertical plane")],
 body=hero("Equipment &middot; Winches", "Geotechnical and coring winches",
   "Built for the moment the tool stops moving and the ship does not. Lebus grooved drums, controlled level wind, and tension control that protects the cable rather than the schedule.",
   "IMG-05", "Grooved drum close-up with wire under load. Shallow depth of field. 1600&times;900.") +
 sec("""<div class="two"><div>""" +
 spec_table("Representative specification", [
   ("Working load limit, first layer", "2,545 kg", ""),
   ("Working load limit, top layer", "1,500 kg", ""),
   ("Line speed, first layer", "50 m/min", ""),
   ("Line speed, top layer", "90 m/min", ""),
   ("Cable capacity", "up to 3,000 m", "application dependent"),
   ("Static brake holding", "1.5 &times; WLL", "minimum"),
   ("Cable lead-off angle", "0&deg; to 45&deg;", "vertical plane"),
   ("Drive", "Electric or hydraulic", ""),
   ("Overall envelope L&times;W&times;H", "<span class='gap'>TO SUPPLY</span>", "per configuration"),
   ("Dry weight, without cable", "<span class='gap'>TO SUPPLY</span>", ""),
 ]) + """
<p class="small">Figures are representative of one configuration in this family. Every unit is
engineered to the duty, the cable and the deck. Full specifications including the general
arrangement drawing are issued on request.</p>
<p><a class="btn" href="../../../resources/datasheets/">Request the full datasheet</a></p>
</div><div>
<h3>Why it is built this way</h3>
<p><strong>Lebus shell drums.</strong> A plain drum lets rope wander, cross over and crush the
layers beneath it &mdash; the fastest way to destroy an expensive umbilical. A Lebus grooved
shell forces each turn into a parallel path and moves the crossover into a controlled zone.</p>
<p><strong>Level wind that places the rope.</strong> The rope is placed rather than allowed to
land, which matters most at the low speeds a geotechnical deployment actually runs at.</p>
<p><strong>Tension control.</strong> Continuous line-in, line-out and tension readings on the
HMI, so the deck crew can see the margin rather than guess it.</p>
<p><strong>A drum you can stopper off.</strong> The flange is drilled so the load can be taken
off the winch entirely with chain and shackles when the tool is captive.</p>
<h3>Applications</h3>
<div class="taglist"><span class="tag">Piston coring</span><span class="tag">Gravity coring</span>
<span class="tag">Box coring</span><span class="tag">Vibrocoring</span><span class="tag">CPT deployment</span>
<span class="tag">Seabed sampling</span></div>
</div></div>""") +
 sec("""<h2>Proven</h2>
<div class="two"><div>
<ul>
<li>A tension control solution engineered by RTG set a working depth record of 3,000 m for a CPT sampling system</li>
<li>Every machine load tested before dispatch on our own stands, up to 150 tonnes</li>
<li>Static proof load, dynamic functional, brake holding, render and speed tests as standard</li>
<li>Class certification and survey during build where required</li>
</ul>
<p><a href="../../../proof/test-facility/"><strong>How we test &rarr;</strong></a></p>
</div>""" + img("IMG-07", "Machine under load on the test stand, certified weights and instrumentation visible. 2000&times;1125.") + "</div>", "alt") +
 sec(cta("Tell us the duty and we will size it",
   "Working depth, cable type and load. Three things, and we can come back with a configuration.",
   "Request a quotation", "../../../contact/request-a-quotation/",
   ("Talk to the engineer who designed it", "../../../contact/"))))

# ==================================================================== CONTRACT MANUFACTURING (ladder)
TIERS = [
 ("t1","1","Steel","Structural fabrication",
  "Welded structures to your drawings, class surveyed, fully traceable",
  """<h4>What we do</h4>
<p>LARS bodies, stern and side frames, A-frames, drums, gantries, sea-fastenings and
sub-assemblies, welded to your drawings and your procedures. Large-dimension machining up to
12 metres and 10 tonnes in a single setup.</p>
<h4>What you no longer do</h4>
<p>Hold welding capacity you cannot staff. Welders are a structural shortage across Europe and
that is not a cyclical problem.</p>
<h4>What we need from you</h4>
<ul><li>Fabrication drawings and a weld map</li><li>Your welding procedure specifications, or ours for approval</li>
<li>Material specification and any origin requirement</li><li>NDT scope and acceptance criteria</li>
<li>Class society and survey requirement</li></ul>
<h4>How it is proven</h4>
<p>Welding coordinated by International Welding Engineers. Welders qualified to ISO 9606-1 and
to DNV and Lloyd&rsquo;s Register standards. Procedures approved with T&Uuml;V, DNV and LR.
NDT by engineers certified to ISO 9712 level 2 for ultrasonic, magnetic particle and penetrant
testing. Workshop recognised under the Bureau Veritas Mode II scheme.
<strong>100% traceability on all main structural welds</strong> &mdash; weld number, welder
marking punch, procedure specification and inspection record.</p>"""),
 ("t2","2","+ Mech","Mechanical assembly",
  "Drums, bearings, gearboxes, brakes, sheaves and level wind, built and aligned",
  """<h4>What we do</h4>
<p>The machine built up, not just the structure: drums and shafts, bearings, gearboxes, brakes,
sheaves, level wind, guards and covers. Fasteners to your torque specification, alignment
checked, rotation proven.</p>
<h4>What you no longer do</h4>
<p>Hold an assembly bay, a crane and a fitting team for work that arrives in bursts.</p>
<h4>What we need from you</h4>
<ul><li>Assembly drawings and the bill of materials</li><li>Torque and alignment specifications</li>
<li>Free-issue components, or a purchasing schedule for us to work to</li>
<li>Inspection and hold points</li></ul>
<h4>How it is proven</h4>
<p>Dimensional inspection against your drawings, alignment records, rotation and free-running
checks, and a signed assembly record for every hold point you specify.</p>"""),
 ("t3","3","+ Hyd/El","Hydraulic and electrical build",
  "Power units, pipework flushed to class, panels, cabling and instrumentation",
  """<h4>What we do</h4>
<p>Power units, hydraulic pipework and hose routing, valve blocks and manifolds, flushing to a
defined cleanliness class, control panels, cabling, glanding and terminations, sensors and
instrumentation, continuity and insulation testing.</p>
<h4>What you no longer do</h4>
<p>This is the tier most equipment designers are quietly shortest of. Hydraulic fitters and
panel builders are as hard to recruit as welders, and the work does not parallelise.</p>
<h4>What we need from you</h4>
<ul><li>Hydraulic and electrical schematics</li><li>Cleanliness class and flushing requirement</li>
<li>Panel general arrangement and component schedule</li><li>Cable schedule and termination detail</li>
<li>Any ATEX or zone requirement</li></ul>
<h4>How it is proven</h4>
<p>Fluid cleanliness verified against the specified class before dispatch, pressure and flow
checks, voltage and current checks, insulation and continuity records. Most hydraulic failures
offshore are contamination failures &mdash; catching them in the factory is the whole point.</p>"""),
 ("t4","4","+ Test","Automation, test and commissioning",
  "PLC loading, load testing to 150 tonnes under class witness, commissioning",
  """<h4>What we do</h4>
<p>Your PLC and HMI software loaded and configured, function and interlock proving, then the
machine tested on our own stands: static structural proof load, dynamic functional load, static
brake holding, render and speed tests, up to 150 tonnes with calibrated equipment and certified
test weights. Class witness where required. Full certification dossier. Then commissioning on
site or on the vessel, with operator familiarisation.</p>
<h4>What you no longer do</h4>
<p>Receive a machine and find out what is wrong with it on the quay. A factory acceptance test
moves that discovery to a place where it is cheap to fix.</p>
<h4>What we need from you</h4>
<ul><li>PLC and HMI software, and the control philosophy</li><li>Test procedure and acceptance criteria</li>
<li>Class society witness requirement</li><li>Documentation format for the dossier</li>
<li>Commissioning location, dates and vessel access arrangements</li></ul>
<h4>How it is proven</h4>
<p>A signed test record against your acceptance criteria, load test certificates, the class
surveyor&rsquo;s endorsement where applicable, and a complete certification and documentation
dossier issued with the machine.</p>
<div class="note warn"><h4>Be straight with us about scope</h4>
<p>Tier 4 commits our controls and commissioning engineers to your programme, sometimes
offshore. We would rather agree Tier 3 and a defined witness scope than promise a commissioning
date we cannot hold. Ask us what our current commissioning capacity looks like before you plan
around it.</p></div>"""),
]

_ladder = ""
for cls, n, lbl, title, sub, body in TIERS:
    _ladder += f"""<div class="rung {cls}">
<button class="rung-h" aria-expanded="false"><div class="rung-n">{n}<small>{lbl}</small></div>
<div class="rung-t">{title}<span>{sub}</span></div><div class="rung-x" aria-hidden="true">+</div></button>
<div class="rung-b">{body}
<p style="margin-top:16px"><a href="{['structural-fabrication','mechanical-assembly','hydraulic-electrical-build','automation-test-commissioning'][int(n)-1]}/"><strong>Full detail on Tier {n} &rarr;</strong></a></p></div></div>"""

page(
 id="C-00", slug="/contract-manufacturing/", nav="Contract Manufacturing", pri="P1", schema="Service",
 title="Contract Manufacturing to Your Drawings | RTG",
 meta="Your design, your IP, our factory. From welded structures to complete machines, assembled, piped, wired, programmed, load tested under class and commissioned.",
 h1="How much of your machine would you like us to take?",
 og_title="Contract Manufacturing — Your Design, Our Factory | RTG",
 og_alt="A machine part-built on the RTG shop floor",
 body=hero("Contract manufacturing", "How much of your machine would you like us to take?",
   "You own the design and the intellectual property at every level. What changes is how much of the build leaves your floor — and how much capacity you stop having to hold.",
   "IMG-12", "Machine part-built on the shop floor, client branding absent. 1600&times;900.") +
 sec(f"""<div class="sechead"><h2>Four tiers. Cumulative.</h2>
<p class="lede">Each one contains everything below it. Most relationships start at Tier 1 with a
single sub-assembly and move up as trust is earned &mdash; which is the sensible way to do it.</p></div>
<div class="ladder">{_ladder}</div>""") +
 sec("""<div class="two"><div>
<h2>Your design stays yours</h2>
<p>NDA before drawings. Project files segregated. No derivative products developed from a
client design, ever.</p>
<p>RTG also sells its own equipment range, so you are entitled to ask how that separation is
maintained. The answer is contractual, not a reassurance &mdash; and we would rather you asked
before you send drawings than after.</p>
<p><a href="your-ip-protected/"><strong>How we protect your design &rarr;</strong></a></p>
</div><div>
<h2>Built inside the EU</h2>
<p>Our factory is in Satu Mare, Romania. For an EU customer that means structure fabricated
inside the customs union, with melt-and-pour origin documentation supplied alongside our
standard weld traceability pack.</p>
<p>The July 2026 safeguard changes made origin documentation a live issue for every buyer in
the chain. We can supply ours. We cannot advise on your position &mdash; that is a question for
a customs adviser.</p>
<p><a href="eu-origin-fabrication/"><strong>EU-origin fabrication &rarr;</strong></a></p>
</div></div>""", "alt") +
 sec("""<h2>Start small</h2>
<p class="lede">Changing fabricator is a programme risk and we know it. One sub-assembly, at one
tier, against one agreed date. Measure it. Then decide.</p>""" +
 cta("Send us your documentation",
   "Under NDA. Tell us which tier you are short of capacity in — that, more than the drawing, is what tells us how to help.",
   "Send documentation", "send-documentation/",
   ("See current capacity", "capacity-lead-times/"))))

# ---------------- tier detail pages
for i, (cls, n, lbl, title, sub, body) in enumerate(TIERS):
    slugs = ["structural-fabrication","mechanical-assembly","hydraulic-electrical-build","automation-test-commissioning"]
    titles = ["Certified Structural Fabrication & Welding | RTG",
              "Mechanical Assembly to Client Drawings | RTG",
              "Hydraulic & Electrical Build to Your Design | RTG",
              "Automation, Load Testing & Commissioning | RTG"]
    metas = ["Welded structures to your drawings with EN ISO 3834 discipline, coded welders, NDT to ISO 9712 level 2 and 100 percent traceability on structural welds.",
             "Drums, shafts, bearings, gearboxes, brakes, sheaves and level wind assembled to your specification, torqued, aligned and rotation checked before dispatch.",
             "Power units, pipework flushed to a defined cleanliness class, valve blocks, control panels, cabling, terminations and instrumentation, built to your schematics.",
             "PLC and HMI loading, interlock proving, load testing to 150 tonnes under class witness, full certification dossier and commissioning on the vessel."]
    imgs = [("IMG-08","Welder at work, arc light, correct PPE, honest not staged. 1600&times;900."),
            ("IMG-12","Drum and shaft being lowered into bearings, hoist in frame. 1600&times;900."),
            ("IMG-13","Hydraulic pipework and manifolds, clean and ordered. 1600&times;900."),
            ("IMG-15","HMI live during function testing, engineer at the console. 1600&times;900.")]
    page(id=f"C-0{i+1}", slug=f"/contract-manufacturing/{slugs[i]}/", nav=title, pri="P1", schema="Service",
     title=titles[i], meta=metas[i], h1=f"Tier {n}: {title.lower()}",
     og_alt=f"RTG {title.lower()}",
     body=hero(f"Contract manufacturing &middot; Tier {n}", f"Tier {n}: {title}", sub, imgs[i][0], imgs[i][1]) +
      sec(body) +
      sec("""<h2>Where this sits</h2><p>Every tier contains the ones below it. If you need this
level, you also get everything before it under one contract, one project file and one point of
contact.</p><p><a href="../"><strong>Back to the full scope ladder &rarr;</strong></a></p>""" +
       cta("Talk about a package at this tier",
        "Send the documentation and tell us the date you need to hold. We will tell you honestly whether we can hold it.",
        "Send documentation", "../send-documentation/"), "alt"))

# ==================================================================== IP
page(
 id="C-06", slug="/contract-manufacturing/your-ip-protected/", nav="Your IP, Protected", pri="P1", schema="Article",
 title="How We Protect Your Design and IP | RTG",
 meta="NDA before drawings, segregated project files, no derivative products from client designs, and a clear contractual separation from our own equipment range.",
 h1="Your design stays yours",
 body=hero("Contract manufacturing", "Your design stays yours",
   "That should not need saying. We are saying it anyway, because almost nobody in this market does — and because we sell our own equipment too, which means you are entitled to ask.") +
 sec("""<div class="two"><div>
<h3>What we commit to</h3>
<ul>
<li><strong>NDA before drawings.</strong> Not after the first quotation. Ask and we will send our standard form the same day.</li>
<li><strong>Segregated project files.</strong> Client documentation is held separately, with access limited to the people building the job.</li>
<li><strong>No derivative products.</strong> Nothing developed from a client design has ever entered, or will enter, the RTG range.</li>
<li><strong>Your documentation returns or is destroyed</strong> at the end of the contract, to whichever you specify.</li>
</ul>
</div><div>
<h3>The question you are actually asking</h3>
<p>RTG designs and sells its own deck equipment. So the real question is not whether we will
respect an NDA &mdash; everyone says yes to that &mdash; it is what stops your design informing
our next product.</p>
<p>The answer is that it is written into the contract, with a defined scope and a defined
remedy, rather than asserted in a brochure. If the wording matters to you, and it should, raise
it before drawings move and we will agree it in writing.</p>
<p>Our largest contract-manufacturing relationships have run for years on that basis.</p>
</div></div>
<div class="note"><h4>Our own drawings, incidentally</h4>
<p>We apply the same discipline to our own general arrangement drawings. They are not published,
they are issued to a named recipient against a named project, and every copy is watermarked and
serialised. A supplier who is careless with their own IP will be careless with yours.</p></div>""" +
 cta("Ask for the NDA first", "We will send our standard mutual NDA before you send anything. That is the right order.",
     "Request the NDA", "../send-documentation/")))

# ==================================================================== LIFECYCLE
page(
 id="L-00", slug="/lifecycle/", nav="Lifecycle", pri="P1", schema="Service",
 title="Refurbishment, Upgrade & Support | Lifecycle | RTG",
 meta="Your vessel is worth more working than replaced. Condition assessment, refurbishment, capability upgrade, re-certification and spares for deck machinery.",
 h1="Keeping equipment working",
 og_title="Refurbishment and Life Extension | RTG",
 og_alt="A winch stripped for refurbishment with components laid out",
 body=hero("Lifecycle", "Keeping equipment working",
   "The offshore fleet is older than it has ever been, and replacing a vessel costs more than the market will bear. That makes the deck machinery already on it worth looking after properly.",
   "IMG-16", "Stripped winch mid-refurbishment, components laid out and labelled. 1600&times;900.") +
 sec("""<div class="sechead"><h2>Why this matters more than it used to</h2></div>
<div class="two"><div>
<p>More than half the operational offshore support fleet is over fifteen years old, and average
platform supply and anchor handling vessel ages now exceed twenty years. Scrapping has almost
stopped &mdash; a handful of vessels in a year, against 130 at the peak &mdash; because newbuild
costs sit far above what the current market sustains.</p>
<p>So ships that would once have been retired are being dry-docked and kept working. Which means
the winch, the A-frame and the crane on them have to keep working too, on a hull that is earning
more days than it used to.</p>
<p>Rebuilding a machine is an operating decision with a short lead time. Replacing it is a
capital decision with a long one. In this market that difference is the whole argument.</p>
</div><div>
<h3>What we do</h3>
<ul>
<li><a href="refurbishment-upgrade/">Refurbishment and upgrade</a> &mdash; assess, rework, reuse, upgrade, test, document</li>
<li><a href="refurbish-upgrade-or-replace/">The decision guide</a> &mdash; six questions, honestly answered</li>
<li><a href="recertification-class-renewal/">Re-certification and class renewal</a> &mdash; including equipment we did not build</li>
<li><a href="spares-support/">Spares and support</a> &mdash; including obsolete and third-party machines</li>
</ul>
<p style="margin-top:20px"><a class="btn" href="condition-assessment/">Book a condition assessment</a></p>
</div></div>""") +
 sec("""<h2>Start with an honest assessment</h2>
<p class="lede">Not a sales visit. A written answer to three questions: what is sound and can be
reused, what must be reworked or replaced, and what is worth upgrading while the machine is
already apart.</p>
<p>Sometimes that answer is that the machine is not worth rebuilding. We would rather tell you
that than sell you a refurbishment you regret in two seasons.</p>""" +
 cta("Book a condition assessment",
  "Tell us the equipment, the vessel and the maintenance window. We will tell you what is worth doing.",
  "Book an assessment", "condition-assessment/", ("Read the decision guide", "refurbish-upgrade-or-replace/")), "alt"))

page(
 id="L-01", slug="/lifecycle/refurbishment-upgrade/", nav="Refurbishment & Upgrade", pri="P1", schema="Service",
 title="Winch & LARS Refurbishment and Upgrade | RTG",
 meta="Full refurbishment of winches, LARS and deck machinery: condition assessment, rework, component reuse, capability upgrade, testing and reissued documentation.",
 h1="Refurbishment and upgrade",
 og_alt="A refurbished RTG winch before and after",
 body=hero("Lifecycle", "Refurbishment and upgrade",
   "A machine that is already stripped is the cheapest moment in its life to improve. The work is worth doing properly, and it is worth documenting properly.",
   "IMG-16", "Before and after of the same machine at a matched angle. 1600&times;900.") +
 sec("""<h2>How it runs</h2>
<div class="two"><div>
<h3>1. Condition assessment</h3>
<p>The machine is stripped and assessed before anything is quoted: drum and shaft condition,
bearing wear, brake condition, hydraulic system, structural NDT, control system obsolescence.
You get a written report with a recommendation, including the case for not proceeding.</p>
<h3>2. Rework and reuse</h3>
<p>What is sound goes back in. That matters commercially as well as technically &mdash; an
assessment that finds everything unserviceable is not an assessment, it is a quotation.</p>
<h3>3. Upgrade while it is apart</h3>
<p>Control system, instrumentation, brake, hydraulic circuit, safety systems, or a capability
increase if the work the vessel is winning has moved. Doing this during a rebuild costs a
fraction of doing it as a separate project.</p>
</div><div>
<h3>4. Test to the same regime as a new machine</h3>
<p>Static proof load, dynamic functional load, static brake holding, render and speed tests on
our own stands, up to 150 tonnes. A refurbished machine that has not been proven under load is
a promise, not a product.</p>
<h3>5. Reissue the documentation</h3>
<p>This is the part most refurbishments skip. The machine goes back with a reissued Quality
Record Book and reissued User and Maintenance Manuals reflecting the machine as it now is
&mdash; not as it was when it was built. Years of undocumented modification is a real problem
at the next class survey, and this closes it.</p>
<h3>6. A spares recommendation based on what we found</h3>
<p>Having had it fully apart, we can tell you which components are approaching the end of their
life rather than handing you a generic list.</p>
</div></div>
<div class="note"><h4>Equipment we did not build</h4>
<p>We refurbish other manufacturers' deck machinery as well as our own. Where we built it
originally we have the drawings and the build record, which shortens everything &mdash; but it
is not a condition of the work.</p></div>""") +
 sec("""<h2>Lead times</h2>
<div class="draftnote"><h4>RTG to supply before launch</h4>
<p>Indicative lead times by scope band &mdash; assessment only, minor refurbishment, full
refurbishment, refurbishment with upgrade. Include what can be done alongside versus what needs
the machine ashore. Operators plan winter windows in August; this table is what they are
looking for.</p></div>""" +
 cta("Book a condition assessment",
  "Equipment, vessel, location and your maintenance window. That is all we need to start.",
  "Book an assessment", "../condition-assessment/",
  ("Read the case study", "../../proof/case-studies/traction-winch-refurbishment/")), "alt"))

page(
 id="L-02", slug="/lifecycle/refurbish-upgrade-or-replace/", nav="Refurbish, Upgrade or Replace?", pri="P1", schema="Article",
 title="Refurbish, Upgrade or Replace? A Decision Guide | RTG",
 meta="Six questions that decide whether deck machinery is worth rebuilding: drum and shaft condition, brakes, hydraulics, capability target, spares and class status.",
 h1="Refurbish, upgrade or replace?",
 body=hero("Lifecycle", "Refurbish, upgrade or replace?",
   "Six questions. Some of the answers point away from buying anything from us, which is rather the point.") +
 sec("""<div class="two"><div>
<h3>1. What is the drum and shaft condition?</h3>
<p>These are the expensive structural elements. Sound drum and shaft, and refurbishment is
almost always the better answer. Significant wear or cracking in either and the economics change
quickly.</p>
<h3>2. What state are the brakes and hydraulics in?</h3>
<p>Both are renewable. Neither should decide the outcome on its own &mdash; but a hydraulic
system that has been contaminated for years tells you something about how the machine has been
run.</p>
<h3>3. Has the capability target moved?</h3>
<p>If the work you are winning now needs more depth, more load or better control than the
machine was built for, an upgrade during rebuild may get you there. Sometimes it will not, and
that is a genuine reason to replace.</p>
</div><div>
<h3>4. Can you still get spares?</h3>
<p>Obsolete control systems are the commonest reason a sound machine is uneconomic. If the
electronics cannot be supported, the rebuild has to include replacing them &mdash; which is
often still cheaper than a new machine, but changes the sum.</p>
<h3>5. What does class say?</h3>
<p>Where the equipment sits in its certification cycle affects both cost and timing. A rebuild
that coincides with a renewal survey is more efficient than one that does not.</p>
<h3>6. How long do you need it for?</h3>
<p>Three more years and five more years are different decisions. Be honest about the vessel's
own remaining life &mdash; there is no sense putting a twenty-year machine into a hull with five
years left.</p>
</div></div>
<div class="note warn"><h4>When we will tell you not to</h4>
<p>Significant structural damage to the drum or main frame, a machine that has been run
contaminated for years and shows it throughout, or a capability gap too large to close by
upgrade. In those cases the honest answer is replacement, and we will say so in the assessment
report whether or not we are quoting for the replacement.</p></div>""") +
 sec(cta("Get the questions answered properly",
  "A condition assessment turns these six questions into a written recommendation with numbers attached.",
  "Book a condition assessment", "../condition-assessment/"), "alt"))

# ==================================================================== CERTIFICATIONS
page(
 id="Y-03", slug="/yards-integrators/certifications-approvals/", nav="Certifications & Approvals", pri="P1", schema="Article",
 title="Certifications & Class Approvals | Welding | RTG",
 meta="Bureau Veritas Mode II recognition, welding procedures approved with TUV, DNV and Lloyd's Register, welders to ISO 9606-1 and NDT to ISO 9712 level 2.",
 h1="Certifications and approvals",
 og_alt="A stamped weld map showing RTG traceability records",
 body=hero("Yards &amp; integrators", "Certifications and approvals",
   "Everything a vendor approval form asks for, in one place, so your procurement and quality teams do not have to email us for it one item at a time.") +
 sec("""<table class="tbl">
<thead><tr><th>Area</th><th>What RTG holds</th><th>Issued by</th></tr></thead>
<tbody>
<tr><td>Workshop recognition</td><td>Bureau Veritas Mode II scheme</td><td>Bureau Veritas</td></tr>
<tr><td>Welding quality system</td><td>EN ISO 3834-2 <span class="gap">CONFIRM STATUS AND DATE</span></td><td><span class="gap">TO SUPPLY</span></td></tr>
<tr><td>Welding coordination</td><td>International Welding Engineers</td><td>&mdash;</td></tr>
<tr><td>Welder qualification</td><td>ISO 9606-1, plus DNV and Lloyd&rsquo;s Register standards</td><td>Third-party examined</td></tr>
<tr><td>Welding procedures</td><td>EN 15614-1 and DNV ship rules Pt.2 Ch.4</td><td>Approved with T&Uuml;V, DNV and Lloyd&rsquo;s Register</td></tr>
<tr><td>Non-destructive testing</td><td>ISO 9712 level 2 &mdash; ultrasonic, magnetic particle, penetrant</td><td>Certified engineers in house</td></tr>
<tr><td>Traceability</td><td>100% on all main structural welds: weld number, welder marking punch, WPS, inspection record</td><td>&mdash;</td></tr>
<tr><td>Load testing</td><td>Two stands, to 150 tonnes, calibrated equipment and certified test weights</td><td>Class witness available</td></tr>
<tr><td>Quality management</td><td><span class="gap">ISO 9001 — CONFIRM CERTIFICATE NUMBER AND EXPIRY</span></td><td><span class="gap">TO SUPPLY</span></td></tr>
<tr><td>Environmental / H&amp;S</td><td><span class="gap">CONFIRM WHICH STANDARDS ARE HELD</span></td><td><span class="gap">TO SUPPLY</span></td></tr>
<tr><td>Insurance</td><td><span class="gap">PUBLIC AND PRODUCT LIABILITY LIMITS — TO SUPPLY</span></td><td>&mdash;</td></tr>
</tbody></table>
<div class="draftnote"><h4>Before this page goes live</h4>
<p>Every gap above must be filled with a certificate number, an issuing body and an expiry date.
This is the page a yard's procurement team will read most carefully, and a vague entry here does
more damage than an omission.</p></div>""") +
 sec("""<div class="two"><div>
<h2>Why traceability is the item that matters</h2>
<p>A yard carries the class exposure for work it did not do itself. That is the real reason a
vendor approval process exists, and it is why the traceability line above is worth more than the
rest put together.</p>
<p>Every main structural weld we make is recorded against a weld number, the marking punch of
the welder who made it, the procedure specification followed, and the inspection record. Your
surveyor can follow any weld in the structure back to the person and the procedure.</p>
</div>""" + img("IMG-09","Macro: welder's punch mark and weld number, stamped numbers legible. 1600&times;1600.") + "</div>", "alt") +
 sec(cta("Download the vendor qualification pack",
  "Everything above with the certificates attached, in one document. Tell us the yard and the programme it is for.",
  "Download the pack", "../vendor-qualification-pack/")))

# ==================================================================== TEST FACILITY
page(
 id="P-06", slug="/proof/test-facility/", nav="Test Facility", pri="P1", schema="Article",
 title="Load Testing to 150 Tonnes | Test Facility | RTG",
 meta="Two test stands, load testing to 150 tonnes with certified weights: proof load, dynamic functional, brake holding, render and speed tests under class witness.",
 h1="Nothing leaves this factory untested",
 og_alt="A machine under load on the RTG test stand",
 body=hero("Proof", "Nothing leaves this factory untested",
   "Two stands, load testing to 150 tonnes, calibrated measuring equipment and certified test weights. Testing here is routine, not exceptional — which is the whole point of it.",
   "IMG-07", "Machine under load on the test stand, certified weights and instrumentation visible. 2000&times;1125.") +
 sec("""<h2>The test suite</h2>
<div class="two"><div>
<h3>Static structural proof load</h3>
<p>The structure taken to its proof load and held, with the machine and its foundations
instrumented. Proves the structure, not the function.</p>
<h3>Dynamic functional load</h3>
<p>The machine operated under load through its working range, at speed. This is where control
problems and interference show up.</p>
<h3>Static brake holding</h3>
<p>Brake holding proven at 1.5 times working load limit as a minimum. The difference between a
controlled recovery and a runaway drum.</p>
</div><div>
<h3>Render test</h3>
<p>Above a set load the brake is designed to slip and pay out line, so that a snatch load takes
wire rather than tearing out a foundation or parting a cable. A designed failure path is a sign
of a mature design, not a weak one &mdash; and it has to be proven, not assumed.</p>
<h3>Speed test</h3>
<p>Line speed verified across the layers, because it changes as the drum fills.</p>
<h3>System checks</h3>
<p>Fluid cleanliness against the specified class, pressure and flow, voltage and current. Most
hydraulic failures offshore are contamination failures. Catching them here is cheap; catching
them three weeks into a campaign is not.</p>
</div></div>""") +
 sec("""<div class="two"><div>
<h2>Class witness and the dossier</h2>
<p>Where class involvement is required, the surveyor witnesses the tests and endorses the
records. The machine ships with a complete certification and documentation dossier &mdash; test
records, load test certificates, material and weld traceability, and the manuals.</p>
<h2>For contract manufacturing clients</h2>
<p>If you hold the design, this facility is the reason Tier 4 exists. We test your machine
against your acceptance criteria, in front of your surveyor if you want one, and hand you the
dossier with it.</p>
<p><a href="../../contract-manufacturing/automation-test-commissioning/"><strong>Tier 4: automation, test and commissioning &rarr;</strong></a></p>
</div><div>
<div class="draftnote"><h4>RTG to supply</h4>
<p>A 60&ndash;90 second video of a machine on the stand under load. This is the single most
valuable piece of content on the site for contract-manufacturing buyers and it needs no script,
no voiceover and no editing beyond a trim. The footage is generated during normal work.</p></div>
</div></div>""", "alt") +
 sec(cta("Ask about factory acceptance testing",
  "Whether the machine is ours or yours, we can test it here before it reaches a quay.",
  "Talk to us", "../../contact/")))

# ==================================================================== YARDS HUB
page(
 id="Y-00", slug="/yards-integrators/", nav="Yards & Integrators", pri="P1", schema="Service",
 title="Subcontract Fabrication & Deck Packages for Yards | RTG",
 meta="European standards, EU capacity, class certified. Overflow structural fabrication and deck equipment packages that protect your delivery date.",
 h1="Capacity that protects your delivery date",
 og_alt="A large fabricated structure in the RTG yard",
 body=hero("Yards &amp; integrators", "Capacity that protects your delivery date",
   "The global orderbook is at its highest share of the world fleet since 2011, and European yards cannot staff all of it. Subcontracting stopped being a peak-management tactic some time ago.",
   "IMG-11", "Large fabricated structure in the bay, scale evident against a person. 2000&times;1125.") +
 sec("""<div class="sechead"><h2>Two different things you might need from us</h2></div>
<table class="tbl">
<thead><tr><th>What</th><th>What it really is</th><th>How we compete for it</th></tr></thead>
<tbody>
<tr><td><a href="structural-subcontracting/">Overflow structural work</a></td>
<td>Commodity steel subcontracting and sea-fastenings, awarded on price, capacity and date.</td>
<td>Schedule certainty, class certification and a documentation pack your surveyor accepts without argument. Not engineering elegance.</td></tr>
<tr><td><a href="deck-equipment-packages/">Deck equipment packages</a></td>
<td>Our own LARS, frames and handling equipment supplied into a vessel you are building.</td>
<td>Usually the requirement came from the owner. If you are writing the spec, talk to us early &mdash; if the owner is, we should be talking to them too.</td></tr>
</tbody></table>""") +
 sec("""<div class="two"><div>
<h2>What a yard is actually buying</h2>
<p>Not steel. Schedule certainty, and a documentation pack that will not cause an argument at
survey. You carry the class exposure for work you did not do yourself, which is why the
paperwork matters at least as much as the machine.</p>
<ul>
<li>Bureau Veritas Mode II recognised workshop</li>
<li>Welding procedures approved with T&Uuml;V, DNV and Lloyd&rsquo;s Register</li>
<li>Welders qualified to ISO 9606-1</li>
<li>NDT by ISO 9712 level 2 certified engineers</li>
<li>100% traceability on all main structural welds</li>
<li>Large-dimension machining to 12 m and 10 tonnes</li>
<li>Load testing to 150 tonnes in house</li>
</ul>
<p><a href="certifications-approvals/"><strong>Full certification detail &rarr;</strong></a></p>
</div><div>
<h2>European standards, EU cost base</h2>
<p>A large platform supply vessel that cost around $28&ndash;32M from a European yard in 2019
now costs $50&ndash;60M, against $40&ndash;48M from a competitive Asian yard. That gap is
material cost, yard labour and specification &mdash; and it is why subcontracting structural
work has become explicit strategy at some of Europe&rsquo;s largest builders.</p>
<p>Our factory is in Romania, inside the EU. For an EU yard that means the cost base without the
customs exposure, and melt-and-pour origin documentation supplied with the structure.</p>
<blockquote class="pull">Design quality, communication with the customer, and on-time delivery.
<cite>Shipyard, newbuild vessel programme <span class="gap">CONFIRM FULL QUOTE AND ATTRIBUTION</span></cite></blockquote>
</div></div>""", "alt") +
 sec(cta("Get us onto your approved vendor list",
  "It takes months and it cannot be done reactively during a tender. The pack has everything your procurement and QA teams need.",
  "Download the vendor pack", "vendor-qualification-pack/",
  ("See our certifications", "certifications-approvals/"))))

# ==================================================================== PROOF + CASE STUDIES
page(
 id="P-00", slug="/proof/", nav="Proof", pri="P1", schema="CollectionPage",
 title="Case Studies, References & Test Evidence | RTG",
 meta="Twenty-two years, more than 250 completed projects and around 1,500 deck machines. Case studies, vessel references, our test facility and what clients say.",
 h1="The evidence",
 body=hero("Proof", "The evidence",
   "Anyone can publish a capability list. These are the things that can be checked.") +
 sec(proofbar(), "dark") +
 sec(cards([
  ("case-studies/", "Case studies", "Four projects, told properly, with the numbers left in.",
   "IMG-16", "Case study lead image. 1600&times;900."),
  ("test-facility/", "Test facility", "Two stands, 150 tonnes, and the reason nothing ships untested.",
   "IMG-07", "Machine under load on the stand. 1600&times;900."),
  ("../yards-integrators/certifications-approvals/", "Certifications", "Class recognitions, welding approvals, NDT levels and traceability.",
   "IMG-09", "Weld map with stamped numbers. 1600&times;900."),
  ("references/", "Vessels &amp; clients", "More than 50 customers and research institutions since 2003.",
   "IMG-P7", "Grid of vessel photographs. 1600&times;900."),
 ])))

page(
 id="P-01", slug="/proof/case-studies/", nav="Case Studies", pri="P1", schema="CollectionPage",
 title="Deck Equipment Case Studies | RTG",
 meta="How RTG standardised handling across a survey fleet, rebuilt a twelve-year-old traction winch, and built complete machines to an OEM's drawings.",
 h1="Case studies",
 body=hero("Proof", "Case studies", "Four projects. One per kind of client we work for.") +
 sec(cards([
  ("traction-winch-refurbishment/", "The winch we built in 2009, rebuilt in 2021",
   "Twelve years of offshore geotechnical work, and the machine had more left in it than the market assumed.",
   "IMG-16", "Before and after, matched angle. 1600&times;900."),
  ("fleet-standardisation/", "Seven vessels. Fourteen years. One handling standard.",
   "How a global survey operator stopped buying handling systems and started buying a standard.",
   "IMG-CS1", "Two vessels from the same fleet, same equipment visible. 1600&times;900."),
  ("contract-manufacturing/", "From a welded frame to a finished machine",
   "How an equipment OEM stopped outsourcing steelwork and started outsourcing machines.",
   "IMG-CS3", "Finished machine on the test stand, client branding removed. 1600&times;900."),
  ("newbuild-yard-programme/", "Delivered to the yard's programme",
   "A shipyard's only real fear is the schedule. Everything else is negotiable.",
   "IMG-CS4", "Vessel at the yard with equipment being installed. 1600&times;900."),
 ])))

page(
 id="P-03", slug="/proof/case-studies/traction-winch-refurbishment/", nav="Traction Winch Refurbishment",
 pri="P1", schema="Article",
 title="Case Study: Rebuilding a 2009 Traction Winch | RTG",
 meta="A twelve-year-old electro-hydraulic traction winch assessed, rebuilt, upgraded and retested for offshore geotechnical work, with documentation reissued.",
 h1="The winch we built in 2009, rebuilt in 2021",
 og_alt="Before and after images of a refurbished RTG traction winch",
 body=hero("Case study &middot; 21REL-05", "The winch we built in 2009, rebuilt in 2021",
   "Twelve years of offshore geotechnical work, and the machine had more left in it than the market assumed.",
   "IMG-16", "Before and after of the same machine at a matched angle. 1600&times;900.") +
 sec("""<div class="dl">
<div><dt>Project</dt><dd>21REL-05</dd></div>
<div><dt>Equipment</dt><dd>Electro-hydraulic traction winch</dd></div>
<div><dt>Original build</dt><dd>2009, by RTG</dd></div>
<div><dt>Application</dt><dd>Offshore geotechnical</dd></div>
<div><dt>Scope</dt><dd>Assess, rebuild, upgrade, test, re-document</dd></div>
</div>
<h2>The situation</h2>
<p>An electro-hydraulic traction winch, supplied by RTG in 2009 for offshore geotechnical work,
came back to Satu Mare after twelve years in service. The question put to us was the one every
operator is asking at the moment: is this worth rebuilding, or is it time to replace it?</p>
<p>It is a more consequential question than it sounds. A replacement is a capital decision with
a lead time attached. A rebuild is an operating cost with a shorter one. Getting it wrong in
either direction is expensive &mdash; replacing a machine with years left in it, or rebuilding
one that will fail again in a season.</p>

<h2>The assessment came first</h2>
<p>Before any work was quoted, the winch was stripped and assessed properly.
<span class="gap">RTG TO SUPPLY: what was measured and inspected &mdash; drum and shaft condition,
bearing wear, brake condition, hydraulic system, structural NDT, control system obsolescence.
This list is the product being sold.</span></p>
<p>The assessment is the service, not the preamble to one. It produces a written answer to three
questions: what is sound and can be reused, what must be reworked or replaced, and what is worth
upgrading while the machine is already apart.</p>

<h2>What was reused</h2>
<p><span class="gap">RTG TO SUPPLY: which major components were found serviceable and returned to
service. This is the most persuasive detail in the whole study &mdash; it proves the assessment
was honest rather than a route to a larger invoice.</span></p>

<h2>What was upgraded</h2>
<p>A machine that is already stripped is the cheapest moment in its life to improve.
<span class="gap">RTG TO SUPPLY: the upgrades carried out and what capability or reliability each
one bought &mdash; control system, instrumentation, brake, hydraulic, safety.</span></p>

<h2>How it was proved</h2>
<p>The rebuilt winch was tested to the same regime as a new machine on our own stands
&mdash; <span class="gap">RTG TO SUPPLY: which tests were performed and to what load</span>
&mdash; because a refurbished machine that has not been proven under load is a promise, not a
product.</p>

<h2>The documentation was reissued</h2>
<p>This is the part most refurbishments skip. The machine went back to sea with a reissued
Quality Record Book and reissued User and Maintenance Manuals reflecting the winch as it now is,
not as it was in 2009. Twelve years of undocumented modification is a real problem at the next
class survey, and this closed it.</p>

<h2>And a spares recommendation</h2>
<p>Having had the machine fully apart, we issued a recommended spares holding based on what was
actually found &mdash; the components approaching the end of their life, not a generic list.
<span class="gap">RTG TO SUPPLY: whether it was taken up, and anything it subsequently
prevented.</span></p>

<blockquote class="pull">Sometimes the right answer is to rebuild the winch you already own.
Sometimes it is not &mdash; and an honest assessment is the only way to know which.</blockquote>

<h2>The result</h2>
<p><span class="gap">RTG TO SUPPLY: cost of the rebuild against the cost of replacement, the
extension of service life achieved, the turnaround time, and whether the vessel made its window.
Percentages are fine if absolute figures are commercially sensitive. A case study without a
number is a brochure.</span></p>""") +
 sec(cta("Book a condition assessment",
  "Tell us the equipment, the vessel and your maintenance window. We will tell you what is worth doing.",
  "Book an assessment", "../../../lifecycle/condition-assessment/",
  ("Refurbishment and upgrade", "../../../lifecycle/refurbishment-upgrade/")), "alt"))

# ==================================================================== ABOUT
page(
 id="A-01", slug="/about/", nav="About", pri="P1", schema="AboutPage",
 title="About RTG | British Design, European Manufacture",
 meta="Founded to combine British deck equipment design with European manufacturing. Twenty-two years, 250 projects and around 1,500 machines delivered.",
 h1="A father, a son, and a factory in Satu Mare",
 og_alt="The RTG facility at Satu Mare",
 body=hero("About", "A father, a son, and a factory in Satu Mare",
   "Romica Tie Group was founded by Mike Turner with his son Bob, to combine British deck equipment design knowledge with manufacturing capability in Eastern Europe. That was twenty-two years ago.",
   "IMG-19", "The Satu Mare facility exterior, honest and unposed, ideally with activity. 2400&times;1200.") +
 sec("""<div class="two"><div>
<h2>The model, and why it was built that way</h2>
<p>The company started deliberately cautious. Steelwork was subcontracted to class-certified
fabricators, while assembly, electro-hydraulic and control system integration and testing stayed
in RTG&rsquo;s own purpose-built factory at Satu Mare &mdash; the parts of the process where
getting it wrong is most expensive.</p>
<p>Machine tools were then bought back year after year, until fabrication came in-house too.
That is a twenty-year strategy told in three sentences, and it is the reason RTG is structured
the way it is: design authority in the UK, manufacturing depth in Romania, and no part of the
process that we cannot see.</p>
<p>It also answers the question a large client is entitled to ask of a company of eighty
people: will you still be here in ten years? A business that has reinvested its own money
annually for two decades answers that better than a balance sheet extract does.</p>
</div><div>
<h2>What we believe</h2>
<blockquote class="pull">Together we can achieve more.</blockquote>
<p>Which sounds like a slogan until you look at how the company is put together &mdash; a
British design office and a Romanian factory that have had to genuinely work as one thing for
two decades, and client relationships that run for fourteen years because someone kept turning
up.</p>
<h3>Where we are</h3>
<ul>
<li>Design and commercial teams in the United Kingdom</li>
<li>Manufacturing, assembly, integration and test at Satu Mare, Romania</li>
<li>Agents across the Americas and Asia Pacific</li>
<li>Around 80 engineers, welders, fitters and technicians</li>
</ul>
<p><a href="people-facility/"><strong>The people and the place &rarr;</strong></a></p>
</div></div>""") +
 sec(proofbar(), "dark") +
 sec(cta("Come and see it",
  "The best way to assess a manufacturer is to walk their floor. We are twenty minutes from Satu Mare airport and we would rather show you than tell you.",
  "Arrange a visit", "../contact/", ("See who works here", "people-facility/"))))

# ==================================================================== REMAINING PAGES
# Built, styled, metadata final. Copy is a working outline for the copywriter.
# (id, slug, nav, pri, schema, title, meta, h1, lede, blocks[], cta(h,p,label,href))
REST = [
 ("S-01","/sectors/ocean-survey-hydrography/","Ocean Survey & Hydrography","P1","Service",
  "Survey & Hydrographic Winches and LARS | RTG",
  "Winches and launch and recovery systems for hydrographic and geophysical survey: CTD, side scan, magnetometer, sub-bottom profiler and deep tow, 300 to 4,000 m.",
  "Handling systems for survey and hydrographic work",
  "Cable capacities from 300 to 4,000 metres, electric or hydraulic, with or without level wind — configured to the sensor rather than to a catalogue.",
  ["The problem, in the survey superintendent's own words — sensor availability, cable fatigue, mobilisation between hulls",
   "Equipment filtered to this sector: survey winches, mini survey LARS, A-frames, deep tow",
   "Proof: named research and survey vessels, permission cleared",
   "Technical note: why a low-speed level wind matters more than top-layer line speed",
   "Two asks: request the survey datasheets, talk to an engineer"],
  ("Request the survey range datasheets","Tell us the sensor, the depth and the vessel.","Request datasheets","../../resources/datasheets/")),

 ("S-03","/sectors/offshore-wind-subsea-cables/","Offshore Wind & Subsea Cables","P1","Service",
  "Offshore Wind & Subsea Cable Handling Equipment | RTG",
  "Site investigation handling, cable tensioners from 5 to 20 tonnes and containerised cable spreads for offshore wind arrays, export cables and interconnectors.",
  "Every turbine starts with a core sample. Every array ends with a cable.",
  "Two quite different jobs, both of which need deck handling: the geotechnical spread that sites the foundation, and the tensioner that lays the cable.",
  ["Site investigation: the geotechnical spread behind every monopile",
   "Cable handling: tensioners at 5, 10, 15 and 20 tonnes, self-contained on a common skid",
   "Why self-contained skids suit vessels of opportunity and conversions",
   "Squeeze tension versus line tension — the concept most people get wrong",
   "Availability: state current lead times honestly against a market where complete packages run past 24 months"],
  ("Check tensioner availability","Lead times in this market are the whole conversation. Ask us what ours are.","Check availability","../../contact/request-a-quotation/")),

 ("S-04","/sectors/seismic/","Seismic","P2","Service",
  "Seismic Source and Streamer Handling Systems | RTG",
  "Seismic winches, source handling and streamer deployment systems for 2D and 3D marine seismic acquisition, designed for continuous duty at sea.",
  "Seismic handling built for continuous duty",
  "Seismic acquisition runs the deck equipment harder than any other survey work. Duty cycle, not peak load, is what the design has to answer.",
  ["The duty-cycle problem and what it does to bearings, brakes and hydraulics",
   "Equipment: seismic winches, source handling, streamer deployment",
   "Reliability and maintainability at sea",
   "Proof and references in this sector"],
  ("Request the seismic range","Tell us the spread and the acquisition profile.","Request datasheets","../../resources/datasheets/")),

 ("S-05","/sectors/oceanographic-research/","Oceanographic Research","P1","Service",
  "Oceanographic Research Winches | CTD & Deep Tow | RTG",
  "Research winches for CTD, coring and deep tow work, from 300 to 4,000 m, electric or hydraulic, with precise slow-speed control for repeatable casts.",
  "A CTD cast is a measurement, not a lift",
  "Descent rate affects the data. Cable strum affects the sensor. Repeatability across casts is the entire point. The winch is part of the instrument.",
  ["Why a research winch is an instrument, not a lifting device",
   "Slow-speed control and level wind behaviour at 2 m/min",
   "The range: 300 to 4,000 m, electric or hydraulic, level wind options",
   "Institutions and research vessels served",
   "What RTG's equipment enables — the science side of the story"],
  ("Request the research winch datasheets","Tell us the sensor package and the depth.","Request datasheets","../../resources/datasheets/")),

 ("S-06","/sectors/subsea-rov-diving/","Subsea, ROV & Diving","P2","Service",
  "ROV LARS, Umbilical Winches & Dive Systems | RTG",
  "ROV launch and recovery systems, umbilical and tow winches, diver basket handling and man-riding systems built to class and proven under load.",
  "An ROV is only as available as its umbilical winch",
  "Downtime on a small subsea fleet is not recoverable, and the handling system is a more common failure point than the vehicle.",
  ["Availability framing — cost of a lost ROV day",
   "The slip ring boundary: why RTG designs the winch to accept your slip ring rather than dictating it",
   "Cable and umbilical protection — Lebus grooving and controlled level wind",
   "Man-riding and abandonment systems: design margins, handled soberly and without promotional language",
   "Class and certification"],
  ("Talk to an engineer","Tell us the vehicle, the umbilical and the deck.","Talk to us","../../contact/")),

 ("S-07","/sectors/defence-government/","Defence & Government","P2","Service",
  "Deck Handling Equipment for Defence & Government | RTG",
  "Deck machinery and handling systems for naval, coastguard and government research vessels, built to class with full material and weld traceability.",
  "Built for government and naval programmes",
  "Government and naval programmes buy documentation and security of supply as much as they buy machinery.",
  ["Programme requirements and how RTG works to them",
   "Traceability and documentation — the differentiator in this sector",
   "Security of supply: EU manufacture, UK design authority",
   "Class and certification",
   "Note: confirm what RTG may and may not say publicly about defence work before this page goes live"],
  ("Enquire about a programme","Tell us the programme and the timescale.","Enquire","../../contact/")),

 ("E-00","/equipment/","Equipment","P1","CollectionPage",
  "Winches, LARS & Deck Machinery | Equipment | RTG",
  "The RTG equipment range: winches, launch and recovery systems, cranes, handling systems, power units and containerised spreads for survey and subsea work.",
  "The equipment range",
  "Everything here is engineered to a duty rather than picked from a shelf. The specifications shown are representative of a configuration, not a fixed product.",
  ["Range tiles: winches, LARS, cranes, handling systems, power units, containerised",
   "Applications cross-cut — what each family is used for",
   "How to specify: the three things we need to size anything",
   "Link to the product selector once built"],
  ("Not sure which family you need?","Give us the duty, the depth and the deck. We will point you at the right one.","Talk to an engineer","../contact/")),

 ("E-01","/equipment/winches/","Winches","P1","CollectionPage",
  "Marine Winches | Survey, Geotechnical & ROV | RTG",
  "Electric and hydraulic marine winches from 0.3 to 7.4 tonnes working load and 200 to 5,500 m capacity, with Lebus grooved drums and controlled level wind.",
  "Winches",
  "Five families, one set of engineering principles: grooved drums, controlled level wind, honest brake margins and a lead-off angle that suits your deck.",
  ["The five winch families with links",
   "The specification figures that actually matter, and why the first-layer figure is the one to size against",
   "Lebus grooving, level wind and lead-off angle explained",
   "Electric versus hydraulic: the honest trade-off, without steering to a preferred answer"],
  ("Request the winch datasheets","Full specifications including the general arrangement are issued on request.","Request datasheets","../../resources/datasheets/")),

 ("E-03","/equipment/winches/survey-oceanographic/","Survey & Oceanographic","P1","Product",
  "Survey & Oceanographic Winches | 300-4,000 m | RTG",
  "Survey and oceanographic winches in electric or hydraulic drive, with or without level wind, supplied with cable capacities from 300 to 4,000 metres.",
  "Survey and oceanographic winches",
  "Configured around the sensor and the cast, not around a catalogue number.",
  ["Tier 1 specification table in HTML — performance figures and bounding envelope only",
   "Drive comparison: electric versus hydraulic",
   "Level wind options: mechanical, electric or hydraulic actuation",
   "Applications facet",
   "Proof strip and gated full datasheet"],
  ("Request the full datasheet","Including the general arrangement drawing, issued to you by email.","Request the datasheet","../../../resources/datasheets/")),

 ("E-04","/equipment/winches/seismic/","Seismic Winches","P2","Product",
  "Seismic Winches & Source Handling | RTG",
  "Seismic winches and source handling equipment engineered for continuous duty, high line speeds and repeated deployment cycles in marine acquisition.",
  "Seismic winches",
  "Built for the duty cycle rather than the peak load.",
  ["Tier 1 specification table","Duty cycle and maintainability","Applications facet","Gated full datasheet"],
  ("Request the full datasheet","Issued to you by email.","Request the datasheet","../../../resources/datasheets/")),

 ("E-05","/equipment/winches/rov-tow-umbilical/","ROV, Tow & Umbilical","P1","Product",
  "ROV, Tow & Umbilical Winches | Slip Ring Ready | RTG",
  "ROV, deep tow and umbilical winches with Lebus grooved drums, controlled level wind and a slip ring interface to suit your own data and power architecture.",
  "ROV, tow and umbilical winches",
  "Designed to accept your slip ring rather than dictate it — because that component couples to your data and power architecture, not ours.",
  ["Tier 1 specification table",
   "Why we do not supply the slip ring, and what you should specify",
   "Cable and umbilical protection",
   "Applications facet","Gated full datasheet"],
  ("Request the full datasheet","Tell us the vehicle and the umbilical.","Request the datasheet","../../../resources/datasheets/")),

 ("E-06","/equipment/winches/mooring-utility/","Mooring & Utility","P3","Product",
  "Mooring & Utility Winches for Offshore Vessels | RTG",
  "Mooring, capstan and general utility winches for offshore and research vessels, built to class with the same welding and test discipline as the survey range.",
  "Mooring and utility winches",
  "The same build and test discipline as everything else we make.",
  ["Tier 1 specification table","Class and certification","Gated full datasheet"],
  ("Request the full datasheet","Issued to you by email.","Request the datasheet","../../../resources/datasheets/")),

 ("E-07","/equipment/launch-recovery-systems/","Launch & Recovery Systems","P1","Product",
  "Launch and Recovery Systems | A-Frames & LARS | RTG",
  "Stern and side A-frames, mini survey LARS, ROV and CTD launch and recovery systems, engineered around your deck arrangement and sea state requirement.",
  "Launch and recovery systems",
  "A LARS is designed around a deck, a sea state and a tool. Send us the deck arrangement and we can start.",
  ["Configurations: stern A-frame, side frame, mini survey LARS, ROV LARS, CTD LARS",
   "Deck seating design and deck loading calculations — supplied with the equipment, not commissioned separately",
   "Sea state and motion compensation options",
   "Applications facet","Gated GA request"],
  ("Send us your deck arrangement","We will come back with what will fit and what it will need underneath it.","Send a deck arrangement","../../contact/request-a-quotation/")),

 ("E-08","/equipment/cranes-lifting/","Cranes & Lifting","P2","Product",
  "Marine Cranes & Lifting Equipment | RTG",
  "Deck cranes, knuckle boom and telescopic lifting equipment for research and offshore vessels, class certified and proof tested before dispatch.",
  "Cranes and lifting equipment",
  "Class certified and proof tested on our own stands before anything ships.",
  ["Range and configurations","Class and proof load testing","Applications facet","Gated full datasheet"],
  ("Request the full datasheet","Issued to you by email.","Request the datasheet","../../resources/datasheets/")),

 ("E-09","/equipment/handling-systems/","Handling Systems","P1","CollectionPage",
  "Corer, Seismic & Cable Handling Systems | RTG",
  "Complete handling systems for corers, seismic sources, diver baskets and subsea cable, supplied as integrated deck spreads rather than individual machines.",
  "Handling systems",
  "A spread, not a machine. Integration is the work, and it is where most of the risk sits.",
  ["System types with links","How integration is managed","Deck layout and interfaces","Applications facet"],
  ("Talk to an engineer","Send us the deck and the tool.","Talk to us","../../contact/")),

 ("E-10","/equipment/handling-systems/cable-pipe-tensioners/","Cable & Pipe Tensioners","P1","Product",
  "Cable & Pipe Tensioners | 5 to 20 Te | RTG",
  "Self-contained two-track electro-hydraulic tensioners from 5 to 20 tonnes on a common skid, remote console controlled, for cable and pipe laying operations.",
  "Cable and pipe tensioners",
  "One skid, one power supply, one Ethernet cable to the console. Built for vessels of opportunity rather than purpose-built lay barges.",
  ["Tier 1 specification table: 5, 10, 15 and 20 tonne units",
   "Squeeze tension versus line tension — explained properly, with real figures",
   "Fail-safe braking: static parking brake at 1.8 x SWL minimum",
   "Self-contained skid: what mobilisation actually looks like",
   "Availability, stated honestly against a 24-month market"],
  ("Check availability","In this market the lead time is the conversation. Ask us ours.","Check availability","../../../contact/request-a-quotation/")),

 ("E-11","/equipment/power-units/","Power Units","P3","Product",
  "Marine Hydraulic Power Units | HPU | RTG",
  "Hydraulic power units for deck machinery, built and flushed to a defined cleanliness class and function tested with the equipment they will drive.",
  "Hydraulic power units",
  "Flushed to a defined cleanliness class and tested with the machine they will drive, because most hydraulic failures offshore are contamination failures.",
  ["Tier 1 specification table","Cleanliness class and flushing","Testing with the driven equipment","Gated full datasheet"],
  ("Request the full datasheet","Issued to you by email.","Request the datasheet","../../resources/datasheets/")),

 ("E-12","/equipment/portable-containerised/","Portable & Containerised","P1","Product",
  "Containerised & Portable Survey Spreads | RTG",
  "Self-contained, road transportable handling spreads with certified lifting lugs, fork pockets and twist-lock footprints, for vessels you do not own.",
  "Built to move between hulls",
  "If the vessel is chartered, mobilisation is the buying criterion. Everything here is designed around that.",
  ["The charter-hull problem stated in the operator's words",
   "Mobilisation features: crash frames, fork pockets, certified lifting lugs, twist-lock footprint",
   "Deck seating design and deck loading calculations supplied with the equipment",
   "What can be craned on in a single shift versus what needs a dry dock",
   "Case study link"],
  ("Talk about your next mobilisation","Tell us the hull and the window. We will tell you what fits.","Talk to us","../../contact/")),

 ("L-03","/lifecycle/recertification-class-renewal/","Re-certification & Class Renewal","P2","Service",
  "Deck Equipment Re-certification & Class Renewal | RTG",
  "Load testing, inspection and documentation for class renewal on deck machinery, including equipment originally supplied by other manufacturers.",
  "Re-certification and class renewal",
  "Including equipment we did not build. The test stands do not care whose name is on the machine.",
  ["What class requires and when","The test suite applied","Documentation issued","Equipment from other manufacturers","Scheduling around a class renewal window"],
  ("Arrange re-certification","Tell us the equipment and when the survey falls.","Arrange it","../condition-assessment/")),

 ("L-04","/lifecycle/spares-support/","Spares & Support","P2","Service",
  "Marine Deck Machinery Spares & Support | RTG",
  "Spares, technical support and field service for RTG equipment and for deck machinery supplied by others, through UK and EU offices and agents worldwide.",
  "Spares and support",
  "Including obsolete machines and other manufacturers' equipment. Support is often the easiest way to start working together.",
  ["What we hold and what we make to order","Obsolete equipment and reverse engineering of worn parts",
   "Response commitments — state a real number here","Global reach through agents","Out-of-hours route"],
  ("Request a spares quotation","Tell us the equipment and the vessel.","Request spares","../../contact/aftersales/")),

 ("Y-01","/yards-integrators/structural-subcontracting/","Structural Subcontracting","P1","Service",
  "Structural Steel Subcontracting for Shipyards | RTG",
  "Overflow structural fabrication, sea-fastenings and large welded assemblies, class surveyed, delivered to your build programme from an EU facility.",
  "Structural subcontracting",
  "Commodity work, judged on capacity, certification and date. We compete on the second and third.",
  ["Capacity, maximum sizes and machining envelope (12 m, 10 t)",
   "Class survey during build","Programme adherence and how progress is reported",
   "Logistics from Satu Mare — delivered cost, not freight rate",
   "EU origin and melt-and-pour documentation"],
  ("Discuss a package","Send the drawings and the date you need to hold.","Talk to us","../../contact/")),

 ("Y-02","/yards-integrators/deck-equipment-packages/","Deck-Equipment Packages","P2","Service",
  "Deck Equipment Packages for Newbuild Vessels | RTG",
  "Complete deck handling packages specified, built, tested and commissioned for newbuild survey, research and offshore vessels, integrated with your programme.",
  "Deck equipment packages",
  "Usually the requirement came from the owner. If the specification is still open, talk to us before it closes.",
  ["What a package includes","Integration with the build programme","Commissioning and handover",
   "The shipyard testimonial, in context","Note: for the sales team — the leverage is upstream, with the owner or the naval architect"],
  ("Discuss a newbuild programme","Tell us the vessel and the delivery date.","Talk to us","../../contact/")),

 ("P-02","/proof/case-studies/fleet-standardisation/","Fleet Standardisation","P1","Article",
  "Case Study: One Handling Standard, Seven Vessels | RTG",
  "How a survey operator moved from a patchwork of launch and recovery systems to a single handling standard across seven vessels over fourteen years.",
  "Seven vessels. Fourteen years. One handling standard.",
  "How a global survey operator stopped buying handling systems and started buying a standard.",
  ["Situation: how a fleet accumulates a patchwork, and what it costs in mobilisation, spares and retraining",
   "Constraint: RTG TO SUPPLY what the client was solving on the first vessel",
   "What was engineered: the first project, and what made it repeatable",
   "Result: RTG TO SUPPLY one quantified outcome — a case study without a number is a brochure",
   "The client testimonial, once clearance is confirmed",
   "Caution for the writer: this client is currently cutting capex. Frame around operating benefit, not buying more equipment."],
  ("Talk about your fleet","How many different handling systems are there across yours?","Talk to us","../../../contact/")),

 ("P-04","/proof/case-studies/contract-manufacturing/","Contract Manufacturing","P1","Article",
  "Case Study: A Complete Machine, Built to Their Drawings",
  "How an equipment OEM moved from outsourcing steelwork alone to handing RTG a complete machine, assembled, wired, tested under class and delivered.",
  "From a welded frame to a finished machine",
  "How an equipment OEM stopped outsourcing steelwork and started outsourcing machines.",
  ["Situation: full order book, welding shop that could not keep pace, design and IP staying with the client",
   "How it started: one sub-assembly, one date, measured",
   "How the scope grew: RTG TO SUPPLY the real tier progression, and which step they hesitated over",
   "What did not change: the design, the IP, the customer relationship",
   "Result: RTG TO SUPPLY one verifiable number",
   "Works fully anonymised if permission is refused. Do not overclaim the tier reached."],
  ("Send us your documentation","Under NDA. Tell us which tier you are short of capacity in.","Send documentation","../../../contract-manufacturing/send-documentation/")),

 ("P-05","/proof/case-studies/newbuild-yard-programme/","Newbuild Yard Programme","P2","Article",
  "Case Study: Deck Equipment for a Newbuild Programme | RTG",
  "Supplying and commissioning deck handling equipment into a shipyard newbuild programme, delivered to the yard's own schedule and certified to class throughout.",
  "Delivered to the yard's programme",
  "A shipyard's only real fear is the schedule. Everything else is negotiable.",
  ["Situation: what a yard actually wants from an equipment supplier",
   "Constraint: RTG TO SUPPLY programme dates, critical path, and any mid-build change",
   "What RTG supplied and to whose specification",
   "How it was worked: class involvement, traceability, documentation the yard's surveyor accepted",
   "The testimonial in full, once confirmed",
   "Result: delivery against programme — this is the headline the reader wants"],
  ("Download the vendor qualification pack","Everything your procurement and QA teams need.","Download the pack","../../../yards-integrators/vendor-qualification-pack/")),

 ("P-07","/proof/references/","Vessel & Client References","P2","CollectionPage",
  "Vessels and Clients We Have Supplied | RTG",
  "More than 50 global customers and research institutions, over 250 completed projects and around 1,500 custom deck machines delivered since 2003.",
  "Vessels and clients",
  "The list below is limited to clients who have given permission to be named.",
  ["Reference list organised by sector","The headline numbers","Permission-cleared logos only — never publish a logo without written clearance",
   "An offer to supply a reference in the reader's own sector on request"],
  ("Ask for a reference in your sector","We will put you in touch with someone doing your kind of work.","Ask us","../../contact/")),

 ("P-08","/proof/testimonials/","What Clients Say","P2","CollectionPage",
  "What Our Clients Say | Testimonials | RTG",
  "In the words of a global survey operator, a major shipyard and an offshore equipment specialist, on design quality, communication and on-time delivery.",
  "What clients say",
  "Three, with the context around them, because a quote without a project attached is decoration.",
  ["Survey operator — on deck arrangement collaboration",
   "Shipyard — on design quality, communication and on-time delivery",
   "Offshore equipment specialist — on turnkey capability",
   "Each with the project it refers to. Confirm all three remain cleared for use."],
  ("Talk to us","Or ask to speak to one of them directly.","Contact us","../../contact/")),

 ("C-07","/contract-manufacturing/eu-origin-fabrication/","EU-Origin Fabrication","P2","Article",
  "EU-Origin Steel Fabrication & Melt-and-Pour | RTG",
  "Fabrication inside the EU, with melt-and-pour origin documentation supplied alongside our standard weld traceability pack for every structure we build.",
  "Fabricated inside the EU, documented",
  "The July 2026 safeguard changes made origin documentation a live issue for every buyer in the chain. We can supply ours.",
  ["What changed on 1 July 2026, factually and without spin",
   "What RTG supplies: melt-and-pour documentation alongside the weld traceability pack",
   "What RTG cannot advise on — a clear disclaimer pointing the reader to a customs adviser",
   "IMPORTANT: RTG's own tariff position must be confirmed with a customs adviser before this page goes live. An incorrect claim in a quotation is a real commercial risk."],
  ("Ask about origin documentation","We will tell you exactly what we can supply with a structure.","Ask us","../../contact/")),

 ("C-05","/contract-manufacturing/bespoke-design/","Bespoke Design","P2","Service",
  "Bespoke Deck Equipment Design & Build | RTG",
  "Where you do not hold a design, RTG engineers one: concept, general arrangement, calculations, class appraisal, manufacture and test, to your requirement.",
  "Bespoke design",
  "The other direction: where you have a requirement rather than a drawing.",
  ["When bespoke is the right answer and when it is not","The process: concept, GA, calculations, class appraisal, manufacture, test",
   "Timeline expectations","Who owns the resulting design — state this plainly"],
  ("Start a design conversation","Tell us the requirement rather than the specification.","Talk to us","../../contact/")),

 ("A-02","/about/people-facility/","People & Facility","P1","AboutPage",
  "Our People and Our Factory at Satu Mare | RTG",
  "Around 80 engineers, welders, fitters and technicians in a purpose-built facility in Satu Mare, Romania, with design and commercial teams in the UK.",
  "The people and the place",
  "Around eighty people. Mechanical, hydraulic, electrical, automation, welding and design, in one building.",
  ["The facility: bays, machining envelope, test stands","The disciplines under one roof",
   "Portraits with names and what each person does — consent required from each individual",
   "The factory walk-through video: one continuous shot, gate to test stand, ambient sound only",
   "This page does two jobs: it reassures buyers and it recruits welders in a tight market"],
  ("See our vacancies","We are usually hiring in welding, mechanical and automation.","Careers at RTG","../careers/")),

 ("A-03","/about/qhse/","QHSE","P2","Article",
  "Quality, Health, Safety and Environment | RTG",
  "How RTG manages quality, safety and environmental responsibility across design, manufacture, testing and site work, and the standards it is assessed against.",
  "QHSE",
  "How we manage quality, safety and environmental responsibility, and who checks it.",
  ["Policy summary","Standards held, with certificate numbers and expiry dates","How it is audited","Downloadable policy document"],
  ("Download our QHSE policy","The full document, as issued.","Download","../../contact/")),

 ("A-04","/about/sustainability/","Sustainability","P3","Article",
  "Sustainability and Ocean Research | RTG",
  "Equipment designed for long service life and refurbishment rather than replacement, supporting ocean research and offshore renewable energy.",
  "Sustainability, for a company that builds steel",
  "Understatement is the right tone here. The credible claims are design life, refurbishment over replacement, and what the equipment enables.",
  ["Design life and why it matters more than materials claims","Refurbishment over replacement — link to Lifecycle",
   "What the equipment enables: ocean research, site investigation for renewables",
   "No greenwash. If a claim cannot be evidenced it does not go on this page."],
  ("Read about refurbishment","The most sustainable machine is usually the one you already own.","Lifecycle","../../lifecycle/")),

 ("A-05","/about/careers/","Careers","P1","JobPosting",
  "Careers at RTG | Engineering Jobs in Satu Mare and the UK",
  "Welding, mechanical, hydraulic, electrical, automation and design roles in Satu Mare and the UK. See what we build and who you would build it with.",
  "Build things that go to sea",
  "Coded welders are among the scarcest people in European manufacturing. If you are one, you have options — here is our case.",
  ["Why here: what gets built and where it ends up","The disciplines and the progression between them",
   "Training, qualification and re-qualification support","Current vacancies","Application route",
   "This page is competitive defence as much as recruitment — other employers are bidding for exactly these people"],
  ("See current vacancies","Or send us a speculative application.","Vacancies","../../contact/")),

 ("X-01","/contact/","Contact","P1","ContactPage",
  "Contact RTG | UK and Romania Offices",
  "Talk to our UK commercial team or our factory at Satu Mare in Romania, or find your regional agent across the Americas and Asia Pacific. We answer quickly.",
  "Contact us",
  "Two offices, named people, and a stated response time we intend to keep.",
  ["UK office: address, phone, email, named contacts","Satu Mare: address, phone, email, named contacts",
   "Map","How enquiries are routed and who will actually reply","Response commitment — state a real number"],
  ("Send an enquiry","Or call. We would rather talk than exchange forms.","Request a quotation","request-a-quotation/")),

 ("X-02","/contact/agents/","Agents","P1","ContactPage",
  "Our Agents in the Americas and Asia Pacific | RTG",
  "Local representation for sales, support and spares across the Americas and Asia Pacific, backed directly by the engineers who designed and built the equipment.",
  "Where to find us",
  "A mid-sized European manufacturer supporting equipment worldwide. Honest about scale, and stronger for it.",
  ["Agent list by region with real contact details","What an agent can do and what escalates to RTG directly",
   "This page answers a real objection from fleet buyers — that a company of 80 people cannot support globally. Do not leave it thin."],
  ("Find your regional contact","Or come straight to us and we will route it.","Contact RTG","../")),

 ("R-00","/resources/technical-notes/","Technical Notes","P1","CollectionPage",
  "Technical Notes on Deck Machinery Engineering | RTG",
  "Plain explanations of how deck machinery works: layer effect on line pull, Lebus grooving, lead-off angle, render testing, squeeze versus line tension.",
  "Technical notes",
  "How the machinery actually works, explained plainly. These pages are the search engine of this site and the reason technical buyers trust it.",
  ["Why line pull falls and line speed rises as layers build",
   "What Lebus grooving prevents","Lead-off angle and deck layout","What a render test is and why a designed failure path is a good sign",
   "Squeeze tension versus line tension","Deck seating and deck loading calculations",
   "Why we do not supply the slip ring","Fluid cleanliness and why most hydraulic failures are contamination failures",
   "Each note becomes one post in the content calendar and one indexed page here"],
  ("Ask us something technical","If it is a good question we will write it up.","Ask an engineer","../../contact/")),

 ("R-03","/resources/news/","News & Insight","P2","Blog",
  "News and Insight | RTG",
  "Project news, technical insight and market commentary on deck machinery and offshore handling, from RTG's UK and Romanian engineering teams. Updated monthly.",
  "News and insight",
  "Updated monthly, on this domain — not on a separate installation.",
  ["Post list","MIGRATION: the existing WordPress subsite at /news/ must move here, with 301s from every old post URL",
   "Mirror the monthly anchor post from the content calendar so this never goes stale again"],
  ("Subscribe to the technical bulletin","One email a month. Engineering, not marketing.","Subscribe","../../contact/")),
]

for pid, slug, nav, pri, schema, title, meta, h1, lede, blocks, ct in REST:
    up = "../" * len([p for p in slug.strip("/").split("/") if p])
    page(id=pid, slug=slug, nav=nav, pri=pri, schema=schema, title=title, meta=meta, h1=h1,
     body=hero(nav, h1, lede) + sec(draft(blocks)) +
       sec(cta(ct[0], ct[1], ct[2], ct[3]), "alt"))

# ---------------- gated forms
FORMS = [
 ("L-05","/lifecycle/condition-assessment/","Book a Condition Assessment","P1",
  "Book a Deck Machinery Condition Assessment | RTG",
  "Tell us the equipment, the vessel and the maintenance window. We will tell you what is worth rebuilding, what is not, and what the work would involve.",
  "Book a condition assessment",
  "<p>An assessment is a written recommendation, not a sales visit. It tells you what is sound and reusable, what must be reworked, and what is worth upgrading while the machine is apart &mdash; including the cases where the answer is not to proceed.</p>",
  [("Equipment type","equipment","text","Winch, A-frame, crane, LARS — and the manufacturer if it is not ours",True),
   ("Vessel","vessel","text","",True),
   ("Location","location","text","Where the equipment is now, or will be",True),
   ("Maintenance window","window","text","Approximate dates are fine",False),
   ("Your name","name","text","",True),
   ("Company","company","text","",True),
   ("Work email","email","email","",True),
   ("Anything else we should know","notes","textarea","Symptoms, history, previous repairs",False)],
  "Request an assessment"),

 ("C-09","/contract-manufacturing/send-documentation/","Send Us Documentation","P1",
  "Send Us Your Drawings, Under NDA | RTG",
  "Upload your documentation under NDA and we will come back with scope, tier options and an indicative price. Tell us which tier you are short of capacity in.",
  "Send us your documentation",
  "<p><strong>NDA first.</strong> Ask and we will send our standard mutual NDA the same day, before anything moves. What you send after that depends on the tier &mdash; fabrication drawings and a weld map for Tier 1; add assembly drawings and a bill of materials for Tier 2; schematics for Tier 3; software and a test procedure for Tier 4.</p>",
  [("Your name","name","text","",True),
   ("Company","company","text","",True),
   ("Work email","email","email","",True),
   ("Which tier are you short of capacity in?","tier",
    ["Tier 1 — structural fabrication","Tier 2 — plus mechanical assembly",
     "Tier 3 — plus hydraulic and electrical build","Tier 4 — plus automation, test and commissioning",
     "Not sure — advise me"],"This tells us more than the drawing does",True),
   ("What is it?","what","text","Equipment type and rough size",True),
   ("Quantity and date","qty","text","How many, and when you need them",False),
   ("Do you need an NDA before sending anything?","nda",["Yes, send it first","We already have one in place","No"],"",True),
   ("Anything else","notes","textarea","",False)],
  "Send under NDA"),

 ("C-08","/contract-manufacturing/capacity-lead-times/","Capacity & Lead Times","P1",
  "Current Manufacturing Capacity & Lead Times | RTG",
  "A quarterly statement of available fabrication, assembly, hydraulic build and test capacity by tier, with indicative lead times for each. Updated every quarter.",
  "Capacity and lead times",
  "<p>We publish what we actually have available, by tier, once a quarter. Tell us who you are and we will send the current statement and keep you on the quarterly update.</p>",
  [("Your name","name","text","",True),("Company","company","text","",True),
   ("Work email","email","email","",True),
   ("Which tier","tier",["Tier 1","Tier 2","Tier 3","Tier 4","All"],"",False)],
  "Request current capacity"),

 ("Y-04","/yards-integrators/vendor-qualification-pack/","Vendor Qualification Pack","P1",
  "Download Our Vendor Qualification Pack | RTG",
  "Everything your procurement and quality teams need to assess RTG as an approved fabricator, in one document. Tell us the yard and the programme it is for.",
  "Vendor qualification pack",
  "<p>Class recognitions, welding procedure approvals and by whom, welder qualification standards, NDT levels held, traceability method, load test capability, QHSE certification, insurance and capacity &mdash; with the certificates attached.</p>",
  [("Your name","name","text","",True),("Yard or company","company","text","",True),
   ("Your role","role",["Procurement","Quality / QA","Project management","Engineering","Other"],"",True),
   ("Work email","email","email","",True),
   ("Programme","programme","text","What is this assessment for?",False),
   ("When do you need a decision?","timing","text","",False)],
  "Download the pack"),

 ("R-01","/resources/datasheets/","Datasheet Library","P1",
  "Request Equipment Datasheets | RTG",
  "Full datasheets including general arrangement drawings, issued to you by email. Tell us the equipment and the project and we will send the right ones.",
  "Request equipment datasheets",
  "<p>Headline performance figures are published openly on every equipment page. The full datasheet &mdash; including the dimensioned general arrangement, mounting and seating detail and interface envelope &mdash; is issued per request.</p><div class='note'><h4>Why we do it this way</h4><p>Every copy we issue is watermarked with the recipient, the company, the date and a unique serial, and is confidential to you. It means we can hand over real engineering detail to people who need it, rather than publishing it for people who do not.</p></div>",
  [("Your name","name","text","",True),("Company","company","text","",True),
   ("Work email","email","email","We send the datasheet to this address rather than linking it directly",True),
   ("Equipment","equipment","text","What are you looking at?",True),
   ("Vessel or project","project","text","",False),
   ("Your role","role",["Naval architect","Vessel operator","Equipment OEM","Shipyard","Researcher","Other"],"",False)],
  "Request datasheets"),

 ("R-02","/resources/catalogues/","Catalogues","P2",
  "Product Catalogues | RTG",
  "The full RTG deck equipment catalogue, issued on request. Tell us your sector and the work you do and we will send you the relevant volume by email.",
  "Catalogues",
  "<p>Tell us the work you do and we will send the volume that is actually relevant rather than everything.</p>",
  [("Your name","name","text","",True),("Company","company","text","",True),
   ("Work email","email","email","",True),
   ("Sector","sector",["Survey and hydrography","Marine geotechnical","Offshore wind and cables","Seismic",
    "Oceanographic research","Subsea and ROV","Defence and government","Shipyard","Equipment OEM"],"",True)],
  "Request a catalogue"),

 ("X-03","/contact/request-a-quotation/","Request a Quotation","P1",
  "Request a Quotation | RTG",
  "Tell us the duty, the vessel and the timescale. We will come back with a proposed configuration and an indicative price, and say what we still need.",
  "Request a quotation",
  "<p>Three things get us most of the way: the duty, the deck and the date. If you have a deck arrangement, send it &mdash; it saves a round trip.</p>",
  [("Your name","name","text","",True),("Company","company","text","",True),
   ("Work email","email","email","",True),("Phone","phone","tel","",False),
   ("What do you need?","need","textarea","Equipment type, duty, working depth, cable, vessel",True),
   ("Vessel","vessel","text","",False),
   ("When do you need it?","timing","text","",False)],
  "Send enquiry"),

 ("X-04","/contact/aftersales/","Aftersales & Spares","P2",
  "Aftersales, Spares and Field Service | RTG",
  "Existing equipment, urgent spares or a technical problem at sea. Tell us the equipment and the vessel and we will route it to the right engineer.",
  "Aftersales and spares",
  "<p>For equipment we built and equipment we did not. If it is urgent and offshore, call rather than fill this in &mdash; the number is on the <a href='../'>contact page</a>.</p>",
  [("Your name","name","text","",True),("Company","company","text","",True),
   ("Work email","email","email","",True),("Phone","phone","tel","",False),
   ("Equipment","equipment","text","Type, manufacturer and serial number if you have it",True),
   ("Vessel and location","vessel","text","",True),
   ("Urgency","urgency",["Vessel is down","Within a week","Planned maintenance","General enquiry"],"",True),
   ("What is happening?","notes","textarea","",True)],
  "Send request"),
]

for pid, slug, nav, pri, title, meta, h1, intro, fields, submit in FORMS:
    page(id=pid, slug=slug, nav=nav, pri=pri, schema="Service", title=title, meta=meta, h1=h1,
     robots="noindex, follow" if "/send-documentation/" in slug else "index, follow",
     body=hero(nav, h1, "") + sec(form(fields, submit, intro)))

# ---------------- legal
LEGAL = [
 ("Z-01","/privacy/","Privacy Notice","Privacy Notice | RTG",
  "How RTG collects, uses and stores personal data submitted through this website, and your rights under UK and EU data protection law.","Privacy notice",
  ["Identity of the controller and how to contact whoever handles data protection at RTG",
   "What is collected: form data, analytics, company-level visitor identification",
   "Lawful basis for each — legitimate interest for B2B follow-up must be documented, not asserted",
   "Retention periods, stated as real numbers","Data sharing: CRM, email platform, analytics, and where each is hosted",
   "Rights and how to exercise them","LEGAL REVIEW REQUIRED — UK and EU GDPR both apply"]),
 ("Z-02","/cookies/","Cookie Policy","Cookie Policy | RTG",
  "The cookies and similar technologies used on this website, what each is for, and how to change your consent at any time.","Cookie policy",
  ["Categories: strictly necessary, analytics, marketing","Every cookie named individually with purpose and duration",
   "A working link to reopen the consent manager","Analytics must genuinely be withheld until consent is given, not merely declared to be"]),
 ("Z-03","/terms/","Terms of Use","Terms of Use and Copyright | RTG",
  "Terms governing use of this website and of documentation issued through it, including copyright in RTG drawings and technical publications.","Terms of use",
  ["Use of the site","COPYRIGHT IN DRAWINGS AND TECHNICAL PUBLICATIONS — this clause matters commercially, not just legally",
   "Confidentiality of issued documentation and the watermarking regime","Limitation of liability",
   "LEGAL REVIEW REQUIRED — a technical drawing generally attracts copyright in its own right, and a derived drawing can infringe. Get the wording right."]),
 ("Z-04","/accessibility/","Accessibility","Accessibility Statement | RTG",
  "How this website is designed to be usable by everyone, the standard it targets, and how to report a problem.","Accessibility",
  ["Standard targeted: WCAG 2.2 AA","Known issues and when they will be fixed","How to report a problem, with a real contact route"]),
]
for pid, slug, nav, title, meta, h1, blocks in LEGAL:
    page(id=pid, slug=slug, nav=nav, pri="P3", schema="WebPage", title=title, meta=meta, h1=h1,
     robots="index, follow",
     body=hero("Legal", h1, "") + sec(draft(blocks, "legal review required before launch")))

# ==================================================================== REDIRECTS
REDIRECTS = [
 ("/index.php","/"),("/about-us.php","/about/"),("/qhse.php","/about/qhse/"),
 ("/case-studies.php","/proof/case-studies/"),("/sectors.php","/sectors/"),
 ("/standard-products.php","/equipment/"),("/winches.php","/equipment/winches/"),
 ("/mooring-winches.php","/equipment/winches/mooring-utility/"),
 ("/geotechnical.php","/sectors/marine-geotechnical/"),
 ("/coring.php","/equipment/winches/geotechnical-coring/"),
 ("/corer-handling-systems.php","/equipment/handling-systems/"),
 ("/seismic.php","/sectors/seismic/"),
 ("/seismic-handling-systems.php","/sectors/seismic/"),
 ("/oceanographic-survey.php","/sectors/oceanographic-research/"),
 ("/multifunctional-winches.php","/equipment/winches/survey-oceanographic/"),
 ("/man-riding.php","/sectors/subsea-rov-diving/"),
 ("/aerostat.php","/equipment/winches/"),("/lift-winches.php","/equipment/winches/"),
 ("/rov-winches.php","/equipment/winches/rov-tow-umbilical/"),
 ("/tow-winches.php","/equipment/winches/rov-tow-umbilical/"),
 ("/deep-tow.php","/equipment/winches/rov-tow-umbilical/"),
 ("/array-winches.php","/equipment/winches/"),
 ("/hpu.php","/equipment/power-units/"),
 ("/a-frames-cranes-lifting.php","/equipment/launch-recovery-systems/"),
 ("/pipe-and-cable-laying-systems.php","/equipment/handling-systems/cable-pipe-tensioners/"),
 ("/tension-control.php","/equipment/handling-systems/cable-pipe-tensioners/"),
 ("/cable-storage.php","/equipment/handling-systems/"),
 ("/build-to-print.php","/contract-manufacturing/"),
 ("/welding.php","/contract-manufacturing/structural-fabrication/"),
 ("/large-fabrication.php","/contract-manufacturing/structural-fabrication/"),
 ("/large-dimension-cnc-machining.php","/contract-manufacturing/structural-fabrication/"),
 ("/assembly.php","/contract-manufacturing/mechanical-assembly/"),
 ("/integration&test.php","/contract-manufacturing/automation-test-commissioning/"),
 ("/bespoke-design.php","/contract-manufacturing/bespoke-design/"),
 ("/catalogues.php","/resources/catalogues/"),
 ("/contact-us.php","/contact/"),
 ("/news/","/resources/news/"),
]
