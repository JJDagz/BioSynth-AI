const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
let model; try {model=require('../docs/assets/models.js')} catch {}
const base={volume:400,manual:15,auto:4,rate:35,realization:50,ops:4800,build:12000};
test('freight baseline distinguishes gross capacity and realized net',()=>{
 assert.ok(model,'models must exist'); const x=model.freight(base);
 assert.equal(x.hours,880);assert.equal(x.capacity,30800);assert.equal(x.realized,15400);
 assert.equal(x.annualNet,10600);assert.equal(x.firstYear,-1400);
 assert.ok(Math.abs(x.payback-13.584905660377359)<1e-10);
 assert.equal(x.totalCost,16800);assert.equal(x.grossBenefit,30800);
});
test('100 percent realization yields 14000 first-year net',()=>{assert.equal(model.freight({...base,realization:100}).firstYear,14000)});
test('slower automation preserves negative capacity instead of inventing savings',()=>{
 const x=model.freight({...base,auto:20});assert.equal(x.hours,-400);assert.equal(x.firstYear,-23800);assert.equal(x.payback,null);
});
test('invalid assumptions rejected rather than silently clamped',()=>{
 for(const patch of [{volume:-1},{volume:''},{rate:NaN},{realization:101},{build:Infinity},{volume:1e308}]) assert.throws(()=>model.freight({...base,...patch}),/valid|finite|range/i);
});
test('zero recurring net cannot repay development; no build costs can pay back immediately',()=>{
 assert.equal(model.freight({...base,volume:0,ops:0}).payback,null);
 assert.equal(model.freight({...base,build:0}).payback,0);
 assert.equal(model.freight({...base,volume:0,ops:0,build:0}).ratio,null);
});
test('Bayesian evidence updates two competing hypotheses and rejects impossible evidence',()=>{
 assert.ok(Math.abs(model.posterior(.4,.8,.2)-.7272727272727273)<1e-12);
 assert.throws(()=>model.posterior(.4,0,0));
});
test('population selection shows coordination threshold without claiming LOVE validation',()=>{
 assert.ok(model.evolution(.6,10).at(-1)<.6);assert.ok(model.evolution(.9,10).at(-1)>.9);
 assert.equal(model.evolution(.75,10).at(-1),.75);
});
test('purchasing includes time opportunity cost',()=>{assert.equal(model.purchase(75,5,4),95);assert.equal(model.purchase(90,0,4),90)});
test('twelve projects have complete lessons, source disclosures and falsification plans',()=>{
 assert.ok(fs.existsSync('docs/projects.json'),'project dataset must exist');const p=JSON.parse(fs.readFileSync('docs/projects.json'));
 assert.equal(p.length,12);assert.equal(new Set(p.map(x=>x.id)).size,12);
 for(const x of p){for(const field of ['analogy','problem','mechanism','formula','example','achieved','unverified','failure','value','experiment','baseline','metric','criterion','sourceNote']) assert.ok(x[field]?.length>10,`${x.id}: ${field}`);
 assert.ok(x.name.length>2);assert.ok(x.category.length>2);assert.ok(x.variables.length>=2);assert.equal(x.steps.length,3);assert.ok(x.sources.length);assert.equal(x.validated,false);}
});
test('static website has all sections, no-JS lessons, labels and separated filter controls',()=>{
 const html=fs.readFileSync('docs/index.html','utf8');for(const id of ['home','academy','laboratory','economics','portfolio','roadmap','open-research']) assert.ok(html.includes(`id="${id}"`),id);
 assert.ok(html.includes('Skip to content'));assert.ok(html.includes('id="lesson-love"'));assert.ok(html.includes('id="export"'));
 assert.ok(html.includes('for="realization"'));assert.ok(html.includes('aria-live="polite"'));assert.ok(html.includes('data-category'));
 assert.ok(fs.existsSync('docs/assets/app.js'));assert.ok(!html.includes('66.1%'),'unsupported historical figures belong in the archive and audit record');
});
test('original material is preserved byte for byte',()=>{
 const cp=require('node:child_process');const old=cp.execFileSync('git',['show','da87aab:docs/index.html']);
 assert.deepEqual(fs.readFileSync('docs/archive/index-2026-10-29.html'),old);
});
test('no-script calculator cannot accept edits to fixed default results',()=>{
 const html=fs.readFileSync('docs/index.html','utf8');assert.match(html,/<fieldset id="assumptions" disabled>/);
});
test('established scientific references are separate from project evidence',()=>{
 const p=JSON.parse(fs.readFileSync('docs/projects.json'));for(const id of ['apex','qreason','evolution'])assert.ok(p.find(x=>x.id===id).priorArt?.length,`${id}: background reference missing`);
});
