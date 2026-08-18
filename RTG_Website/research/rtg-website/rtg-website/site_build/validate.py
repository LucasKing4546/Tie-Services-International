#!/usr/bin/env python3
"""Validate the built site: metadata, structure, links, content-protection rules."""
import re, os, glob, json, collections, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
files = sorted(glob.glob("**/index.html", recursive=True))
titles, metas, issues = collections.Counter(), collections.Counter(), []
BANNED = [r'drum core', r'flange diameter', r'drum length', r'MOFLON', r'Schleifring', r'Fronius', r'TPS 400']
pages = {"/" + (os.path.dirname(f) + "/" if os.path.dirname(f) else "") for f in files}
for f in files:
    s = open(f, encoding="utf-8").read()
    t = re.search(r"<title>(.*?)</title>", s, re.S).group(1)
    m = re.search(r'name="description" content="(.*?)"', s, re.S).group(1)
    titles[t] += 1; metas[m] += 1
    if len(t) > 60: issues.append(f"{f}: title {len(t)} chars")
    if not 100 <= len(m) <= 170: issues.append(f"{f}: meta {len(m)} chars")
    if s.count("<h1") != 1: issues.append(f"{f}: {s.count('<h1')} h1 tags")
    if 'rel="canonical"' not in s: issues.append(f"{f}: no canonical")
    if "og:image" not in s: issues.append(f"{f}: no open graph")
    for blk in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try: json.loads(blk)
        except Exception as e: issues.append(f"{f}: bad JSON-LD ({e})")
    for b in BANNED:
        if re.search(b, s, re.I): issues.append(f"{f}: PROTECTION RULE — matches '{b}'")
    base = "/" + (os.path.dirname(f) + "/" if os.path.dirname(f) else "")
    for href in re.findall(r'href="([^"#:]+?)"', s):
        if href.startswith(("http", "mailto", "assets/", "../assets", "#")) or href.endswith((".css", ".js", ".xml", ".txt")): continue
        tgt = os.path.normpath(os.path.join(base, href))
        tgt = "/" if tgt == "/" else (tgt if tgt.endswith("/") else tgt + "/")
        if tgt not in pages: issues.append(f"{f}: broken link -> {href}")
for t, c in titles.items():
    if c > 1: issues.append(f"duplicate title: {t}")
for m, c in metas.items():
    if c > 1: issues.append(f"duplicate meta: {m[:50]}")
gaps = sum(len(re.findall(r'class="gap"', open(f, encoding="utf-8").read())) for f in files)
print(f"pages           {len(files)}")
print(f"unique titles   {len(titles)}")
print(f"unique metas    {len(metas)}")
print(f"content gaps    {gaps}  (marked for RTG to fill)")
print(f"issues          {len(issues)}")
for i in issues: print("  -", i)
sys.exit(1 if issues else 0)
