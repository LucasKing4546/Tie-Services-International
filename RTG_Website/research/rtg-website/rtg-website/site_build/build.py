#!/usr/bin/env python3
"""
RTG static site generator.
Reads page definitions from site_data.py and emits directory-style HTML.
Every page carries: unique title, meta description, canonical, Open Graph,
Twitter card, JSON-LD (Organization + page type + BreadcrumbList).
"""
import os, re, html, shutil, datetime
from site_data import PAGES, NAV, ORG, HOST, REDIRECTS

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TODAY = "2026-08-10"

# --------------------------------------------------------------- helpers
def esc(s):
    return html.escape(str(s), quote=True)

def depth_prefix(slug):
    """Relative path back to root from a directory-style slug."""
    if slug == "/":
        return "./"
    n = len([p for p in slug.strip("/").split("/") if p])
    return "../" * n

def crumbs_for(slug):
    """Build breadcrumb trail from slug, matching against known pages."""
    if slug == "/":
        return []
    parts = [p for p in slug.strip("/").split("/") if p]
    trail, acc = [], ""
    for p in parts:
        acc += "/" + p
        cand = acc + "/"
        match = next((pg for pg in PAGES if pg["slug"] == cand), None)
        trail.append({"name": match["nav"] if match else p.replace("-", " ").title(),
                      "slug": cand, "real": match is not None})
    return trail

def ld_json(pg, trail):
    org = {
        "@type": "Organization", "@id": HOST + "/#org", "name": ORG["name"],
        "url": HOST + "/", "description": ORG["desc"],
        "foundingDate": ORG["founded"],
        "address": [
            {"@type": "PostalAddress", "addressCountry": "GB", "addressLocality": ORG["uk_city"]},
            {"@type": "PostalAddress", "addressCountry": "RO", "addressLocality": ORG["ro_city"]},
        ],
        "sameAs": ORG["sameAs"],
    }
    blocks = [org]

    if pg.get("schema") == "Product":
        prod = {"@type": "Product", "name": pg["h1"],
                "description": pg["meta"],
                "category": "Marine deck machinery",
                "manufacturer": {"@id": HOST + "/#org"}}
        if pg.get("specs"):
            prod["additionalProperty"] = [
                {"@type": "PropertyValue", "name": k, "value": v}
                for k, v, _ in pg["specs"] if not str(v).startswith("[")
            ]
        blocks.append(prod)
    elif pg.get("schema") in ("Article", "AboutPage", "ContactPage", "Service",
                              "CollectionPage", "Blog", "JobPosting", "WebPage"):
        blocks.append({"@type": pg["schema"], "name": pg["h1"],
                       "description": pg["meta"], "url": HOST + pg["slug"],
                       "publisher": {"@id": HOST + "/#org"}})

    if trail:
        items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": HOST + "/"}]
        for i, c in enumerate(trail, start=2):
            items.append({"@type": "ListItem", "position": i, "name": c["name"],
                          "item": HOST + c["slug"]})
        blocks.append({"@type": "BreadcrumbList", "itemListElement": items})

    import json
    return json.dumps({"@context": "https://schema.org", "@graph": blocks},
                      indent=2, ensure_ascii=False)

def nav_html(slug, pre):
    out = []
    for label, target in NAV:
        cur = ' aria-current="true"' if slug.startswith(target) and target != "/" else ""
        out.append(f'<a href="{pre}{target.lstrip("/")}"{cur}>{esc(label)}</a>')
    return "\n        ".join(out)

def render(pg):
    slug = pg["slug"]
    pre = depth_prefix(slug)
    trail = crumbs_for(slug)
    canonical = HOST + slug
    og_img = f"{HOST}/assets/og/{pg['id'].lower()}.jpg"

    crumb = ""
    if trail:
        links = [f'<a href="{pre}">Home</a>']
        for c in trail[:-1]:
            if c["real"]:
                links.append(f'<a href="{pre}{c["slug"].lstrip("/")}">{esc(c["name"])}</a>')
            else:
                links.append(f'<span style="color:var(--muted);font-weight:400">{esc(c["name"])}</span>')
        links.append(f'<span>{esc(trail[-1]["name"])}</span>')
        crumb = ('<nav class="crumb" aria-label="Breadcrumb"><div class="wrap">'
                 + '<i>/</i>'.join(links) + '</div></nav>')

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>{esc(pg['title'])}</title>
<meta name="description" content="{esc(pg['meta'])}">
<link rel="canonical" href="{canonical}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(ORG['name'])}">
<meta property="og:title" content="{esc(pg.get('og_title', pg['title']))}">
<meta property="og:description" content="{esc(pg['meta'])}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{og_img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{esc(pg.get('og_alt', pg['h1']))}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(pg.get('og_title', pg['title']))}">
<meta name="twitter:description" content="{esc(pg['meta'])}">
<meta name="twitter:image" content="{og_img}">

<meta name="robots" content="{pg.get('robots', 'index, follow, max-image-preview:large')}">
<meta name="theme-color" content="#12202B">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{pre}assets/css/rtg.css">

<script type="application/ld+json">
{ld_json(pg, trail)}
</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="hdr">
  <div class="hdr-rule"></div>
  <div class="wrap hdr-in">
    <a class="logo" href="{pre}">R<span>T</span>G<small>Romica Tie Group</small></a>
    <button class="navtoggle" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Primary">
        {nav_html(slug, pre)}
    </nav>
  </div>
</header>

{crumb}

<main id="main">
{pg['body']}
</main>

<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div>
        <a class="logo" href="{pre}">R<span>T</span>G<small>Romica Tie Group</small></a>
        <p style="margin-top:14px;max-width:32ch">Custom deck equipment for research, survey and offshore vessels. Designed in the UK, built and tested in Romania.</p>
      </div>
      <div>
        <h4>Buying</h4>
        <ul>
          <li><a href="{pre}sectors/">Sectors</a></li>
          <li><a href="{pre}equipment/">Equipment</a></li>
          <li><a href="{pre}lifecycle/">Lifecycle</a></li>
          <li><a href="{pre}contract-manufacturing/">Contract manufacturing</a></li>
          <li><a href="{pre}yards-integrators/">Yards &amp; integrators</a></li>
        </ul>
      </div>
      <div>
        <h4>Evidence</h4>
        <ul>
          <li><a href="{pre}proof/case-studies/">Case studies</a></li>
          <li><a href="{pre}proof/test-facility/">Test facility</a></li>
          <li><a href="{pre}yards-integrators/certifications-approvals/">Certifications</a></li>
          <li><a href="{pre}resources/technical-notes/">Technical notes</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="{pre}about/">About RTG</a></li>
          <li><a href="{pre}about/careers/">Careers</a></li>
          <li><a href="{pre}contact/">Contact</a></li>
          <li><a href="{pre}contact/agents/">Agents worldwide</a></li>
        </ul>
      </div>
    </div>
    <div class="ftr-b">
      <span>&copy; {TODAY[:4]} Romica Tie Group. All drawings and technical publications remain our copyright.</span>
      <span><a href="{pre}privacy/">Privacy</a> &nbsp;·&nbsp; <a href="{pre}cookies/">Cookies</a> &nbsp;·&nbsp; <a href="{pre}terms/">Terms</a> &nbsp;·&nbsp; <a href="{pre}accessibility/">Accessibility</a></span>
    </div>
  </div>
</footer>

<script src="{pre}assets/js/rtg.js" defer></script>
</body>
</html>
"""

# --------------------------------------------------------------- write
def build():
    for pg in PAGES:
        slug = pg["slug"]
        d = OUT if slug == "/" else os.path.join(OUT, slug.strip("/"))
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
            f.write(render(pg))

    # ---- sitemap.xml (correct host, https, real lastmod)
    urls = []
    for pg in PAGES:
        if "noindex" in pg.get("robots", ""):
            continue
        pri = {"P1": "1.0", "P2": "0.7", "P3": "0.5"}.get(pg.get("pri", "P2"), "0.6")
        if pg["slug"] == "/":
            pri = "1.0"
        urls.append(f"""  <url>
    <loc>{HOST}{pg['slug']}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>{pri}</priority>
  </url>""")
    with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n'
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                + "\n".join(urls) + "\n</urlset>\n")

    # ---- robots.txt
    with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(f"""# Romica Tie Group
# Datasheets are issued per request, watermarked, via signed short-lived URLs.
# There is no public datasheet directory. Any path below is defensive.

User-agent: *
Allow: /
Disallow: /datasheets/
Disallow: /assets/private/
Disallow: /*.pdf$
Disallow: /search
Disallow: /*?

# Generative-AI training crawlers: RTG's technical content and drawings
# are not licensed for model training.
User-agent: GPTBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: anthropic-ai
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: PerplexityBot
Disallow: /

Sitemap: {HOST}/sitemap.xml
""")

    # ---- 301 map, both formats
    ap = ["# Apache — drop into .htaccess. Every legacy .php URL mapped.",
          "RewriteEngine On",
          "RewriteCond %{HTTPS} off [OR]",
          "RewriteCond %{HTTP_HOST} !^" + HOST.split("//")[1].replace(".", r"\.") + "$ [NC]",
          "RewriteRule ^(.*)$ " + HOST + "/$1 [R=301,L]", ""]
    ng = ["# nginx — legacy .php URLs", ""]
    for old, new in REDIRECTS:
        ap.append(f"Redirect 301 {old} {new}")
        ng.append(f"rewrite ^{re.escape(old)}$ {new} permanent;")
    with open(os.path.join(OUT, "redirects-apache.txt"), "w") as f:
        f.write("\n".join(ap) + "\n")
    with open(os.path.join(OUT, "redirects-nginx.txt"), "w") as f:
        f.write("\n".join(ng) + "\n")

    print(f"built {len(PAGES)} pages, {len(urls)} in sitemap, {len(REDIRECTS)} redirects")

if __name__ == "__main__":
    build()
