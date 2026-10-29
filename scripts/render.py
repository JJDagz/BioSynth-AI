#!/usr/bin/env python3
"""Deterministic HTML renderer. All lessons readable without JavaScript."""
import html,json,pathlib,sys
root=pathlib.Path(__file__).resolve().parents[1]
data=json.loads((root/'docs/projects.json').read_text())
e=lambda x:html.escape(str(x),quote=True)
lessons=[];cards=[];rows=[];roads=[];experiments=[]
for i,p in enumerate(data,1):
 id=e(p['id']); name=e(p['name'])
 cards.append(f'''<a class="project-card" href="#lesson-{id}" data-project data-category="{e(p['category'])}" data-search="{e(' '.join([p['name'],p['category'],p['problem'],p['analogy']])).lower()}"><div class="card-top"><span class="index">{i:02d}</span><span class="tag">{e(p['category'])}</span></div><h3>{name}</h3><p>{e(p['problem'])}</p><div class="card-foot"><span class="status">{e(p['stage'])}</span><span aria-hidden="true">↗</span></div></a>''')
 variables=''.join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k,v in p['variables'])
 background=''.join(f'<p><a href="{e(r["url"])}">{e(r["label"])} ↗</a><br>{e(r["note"])}</p>' for r in p.get('priorArt',[]))
 steps=''.join(f'<li>{e(s)}</li>' for s in p['steps'])
 sources=' · '.join(f'<a href="{e(s["url"])}">{e(s["label"])} ↗</a>' for s in p['sources'])
 lessons.append(f'''<article class="lesson" id="lesson-{id}"><header class="lesson-header"><div><span class="eyebrow">FIELD NOTE {i:02d} / {e(p['category'])}</span><h3>{name}</h3></div><span class="status">{e(p['stage'])} · validation pending</span></header><p class="analogy">{e(p['analogy'])}</p><p><strong>The real question.</strong> {e(p['problem'])}</p><details><summary>Open the lesson: mechanism, mathematics &amp; evidence</summary><div class="lesson-body"><h4>01 / Follow the mechanism</h4><p>{e(p['mechanism'])}</p><ol class="lesson-steps">{steps}</ol><div class="equation" role="math" aria-label="{e(p['formula'])}">{e(p['formula'])}</div><dl class="variables">{variables}</dl><h4>02 / Work through the numbers</h4><p class="worked">{e(p['example'])}</p><div class="evidence-pair"><div><h4>03 / What has been achieved</h4><p>{e(p['achieved'])}</p></div><div><h4>What remains unverified</h4><p>{e(p['unverified'])}</p></div></div><h4>04 / Where it could fail</h4><p>{e(p['failure'])}</p><h4>05 / The economic value channel</h4><p>{e(p['value'])}</p><h4>06 / The next falsifiable experiment</h4><p>{e(p['experiment'])}</p><p><strong>Baseline:</strong> {e(p['baseline'])}</p><p><strong>Measure:</strong> {e(p['metric'])}</p><p><strong>Stop or reject:</strong> {e(p['criterion'])}</p><footer class="lesson-source">{sources}<p>{e(p['sourceNote'])}</p>{background}</footer></div></details><a class="back-link" href="#academy">↑ Back to project index</a></article>''')
 rows.append(f'<tr><th scope="row"><a href="#lesson-{id}">{name}</a></th><td>{e(p["stage"])}</td><td>Not reproduced</td><td>Not validated</td><td>{sources}</td></tr>')
 roads.append(f'<details class="road-item"><summary><span>{i:02d}</span> {name}</summary><p><strong>Next action:</strong> {e(p["experiment"])}</p><p><strong>Deliverable:</strong> Versioned method, baseline comparison and raw result table for: {e(p["metric"])}</p><p><strong>Acceptance gate:</strong> {e(p["criterion"])}</p></details>')
 experiments.append(f'<option value="{id}">{name}</option>')
template=(root/'scripts/template.html').read_text()
for key,val in {'CARDS':''.join(cards),'LESSONS':''.join(lessons),'PORTFOLIO':''.join(rows),'ROADS':''.join(roads),'OPTIONS':''.join(experiments)}.items():template=template.replace('{{'+key+'}}',val)
# Embed public teaching data without network fetch. Escaping prevents script termination.
template=template.replace('{{DATA}}',json.dumps(data,ensure_ascii=False).replace('<','\\u003c'))
out=root/'docs/index.html'
if '--check' in sys.argv:
 if not out.exists() or out.read_text()!=template:sys.exit('Generated HTML is stale: run python scripts/render.py')
 print('Generated HTML is current')
else:out.write_text(template)
