const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
// Small DOM fixture runs the production app, not a duplicate of its algorithms.
// Browser layout and native event behavior are checked separately in Chrome.
class Element{
 constructor(value=''){this.style={};this.value=value;this.textContent='';this.dataset={};this.attributes={};this.events={};this.hidden=false;this.disabled=false;this.open=false;this.children=[];this.classes=new Set();this.classList={toggle:(k,v)=>v?this.classes.add(k):this.classes.delete(k),add:k=>this.classes.add(k),contains:k=>this.classes.has(k)};}
 get valueAsNumber(){return this.value===''?NaN:Number(this.value)}
 checkValidity(){return Number.isFinite(this.valueAsNumber)&&this.valueAsNumber>=0&&(this.max===undefined||this.valueAsNumber<=this.max)}
 addEventListener(k,fn){(this.events[k]??=[]).push(fn)}
 fire(k){for(const fn of this.events[k]||[])fn({preventDefault(){}})}
 click(){this.fire('click')}
 setAttribute(k,v){this.attributes[k]=v}
 append(...children){this.children.push(...children)}
 replaceChildren(){this.children=[]}
 querySelector(){return this.details}
}
function fixture(hash=''){
 const html=fs.readFileSync('docs/index.html','utf8'),projects=JSON.parse(fs.readFileSync('docs/projects.json')),elements={};
 for(const [,id] of html.matchAll(/id="([^"]+)"/g))elements[id]=new Element();
 for(const [,id,value] of html.matchAll(/<input id="([^"]+)"[^>]* value="([^"]*)"/g))elements[id].value=value;
 elements.realization.max=100;elements['project-data'].textContent=JSON.stringify(projects);elements.experiment.value='love';
 const cards=projects.map(p=>{const c=new Element();c.dataset={category:p.category,search:[p.name,p.category,p.problem,p.analogy].join(' ').toLowerCase()};return c});
 const buttons=['All','Cooperation','AI systems','Decision science','Operations','Ethics'].map(cat=>{const b=new Element();b.dataset.category=cat;return b});
 for(const p of projects){elements['lesson-'+p.id].classes.add('lesson');elements['lesson-'+p.id].details=new Element()}
 const downloads=[];const context={Intl,Number,JSON,Blob,RangeError,location:{hash},setTimeout:()=>{},URL:{createObjectURL:b=>{downloads.push(b);return 'blob:test'},revokeObjectURL:()=>{}},document:{getElementById:id=>elements[id],querySelectorAll:s=>s==='[data-project]'?cards:buttons,createElement:()=>new Element(),createTextNode:t=>({textContent:t}),documentElement:new Element()},window:{LabModels:require('../docs/assets/models.js'),addEventListener:()=>{}}};
 vm.runInNewContext(fs.readFileSync('docs/assets/app.js','utf8'),context);
 return {elements,cards,buttons,downloads};
}
test('calculator UI updates, rejects invalid scenarios and restores defaults',()=>{
 const {elements:e}=fixture();assert.equal(e['out-firstyear'].textContent,'-$1,400');
 e.realization.value='100';e.realization.fire('input');assert.equal(e['out-firstyear'].textContent,'$14,000');
 e.realization.value='101';e.realization.fire('input');assert.equal(e['out-firstyear'].textContent,'—');assert.equal(e.export.disabled,true);assert.equal(e['calc-error'].hidden,false);
 e.reset.click();assert.equal(e['out-firstyear'].textContent,'-$1,400');assert.equal(e.export.disabled,false);
});
test('export retains category and exports the current valid model, not stale assumptions',async()=>{
 const {elements:e,buttons,downloads,cards}=fixture();buttons[1].click();assert.equal(cards.filter(c=>!c.hidden).length,3);
 e.realization.value='100';e.realization.fire('input');e.export.click();assert.equal(cards.filter(c=>!c.hidden).length,3);assert.equal(e.count.textContent,'3 research systems shown');
 const data=JSON.parse(await downloads[0].text());assert.equal(data.assumptions.realization,100);assert.equal(data.outputs.firstYear,14000);
 assert.equal(data.kind,'scenario, not measured business results');
});
test('search intersects category and provides an honest empty state',()=>{
 const {elements:e,buttons,cards}=fixture();buttons[1].click();e.search.value='LOVE';e.search.fire('input');assert.equal(cards.filter(c=>!c.hidden).length,1);
 e.search.value='not-a-project';e.search.fire('input');assert.equal(e['empty-search'].hidden,false);assert.equal(e.count.textContent,'0 research systems shown');
 e.search.value='';buttons[0].click();assert.equal(cards.filter(c=>!c.hidden).length,12);
});
test('direct lesson links open the native disclosure and experiment briefs change',()=>{
 const {elements:e}=fixture('#lesson-love');assert.equal(e['lesson-love'].details.open,true);
 e.experiment.value='freight';e.experiment.fire('change');assert.equal(e['experiment-brief'].children[0].textContent,'Freight RFQ Optimization');
 assert.equal(e['experiment-brief'].children.length,6);
});
test('teaching controls update population, posterior and opportunity cost',()=>{
 const {elements:e}=fixture();e.population.value='90';e.population.fire('input');assert.match(e['evolution-result'].textContent,/100.0% after 30 steps/);
 e.prior.value='50';e.prior.fire('input');assert.match(e['posterior-result'].textContent,/80.0%/);
 e.daily.value='0';e.daily.fire('input');assert.match(e['purchase-result'].textContent,/Shipped is \$15 lower/);
});
test('fixed population endpoints do not falsely claim growth or decline',()=>{
 const {elements:e}=fixture();e.population.value='100';e.population.fire('input');assert.match(e['evolution-result'].textContent,/already fixed/);
 e.population.value='0';e.population.fire('input');assert.match(e['evolution-result'].textContent,/cannot appear without mutation/);
});
