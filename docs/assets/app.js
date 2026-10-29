'use strict';
(()=>{
const $=id=>document.getElementById(id),model=window.LabModels;
const projects=JSON.parse($('project-data').textContent);
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const number=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(n);
const keys=['volume','manual','auto','rate','realization','ops','build'];
const defaults={volume:400,manual:15,auto:4,rate:35,realization:50,ops:4800,build:12000};
let current=null,category='All';
function updateCalculator(){
 const x={};let invalid=false;
 for(const id of keys){const input=$(id);x[id]=input.valueAsNumber;const valid=input.checkValidity();input.setAttribute('aria-invalid',String(!valid));invalid ||= !valid;}
 try{
 if(invalid)throw new RangeError('Complete every assumption with a nonnegative finite number. Realization must be between 0% and 100%.');
 const r=model.freight(x);current={assumptions:x,outputs:r};
 const values={firstyear:money(r.firstYear),hours:number(r.hours)+' h',capacity:money(r.capacity),realized:money(r.realized),totalcost:money(r.totalCost),annualnet:money(r.annualNet),payback:r.payback===null?'Not reached':number(r.payback)+' months',ratio:r.ratio===null?'Not defined':r.ratio.toFixed(2)+'×'};
 for(const [id,value] of Object.entries(values))$('out-'+id).textContent=value;
 $('out-firstyear').classList.toggle('positive',r.firstYear>=0);
 $('calc-proof').textContent=`${number(x.volume)} × 12 × (${number(x.manual)} − ${number(x.auto)}) ÷ 60 = ${number(r.hours)} hours; × ${money(x.rate)}/hour = ${money(r.capacity)}; × ${number(x.realization)}% = ${money(r.realized)}; − ${money(x.ops)} operating − ${money(x.build)} development = ${money(r.firstYear)}. Payback uses annual recurring net after operating cost.`;
 $('calc-error').hidden=true;$('export').disabled=false;
 }catch(error){current=null;for(const id of ['firstyear','hours','capacity','realized','totalcost','annualnet','payback','ratio'])$('out-'+id).textContent='—';$('calc-proof').textContent='Results unavailable until assumptions are valid.';$('calc-error').textContent=error.message;$('calc-error').hidden=false;$('export').disabled=true;}
}
$('calculator').addEventListener('submit',event=>event.preventDefault());
for(const id of keys)$(id).addEventListener('input',updateCalculator);
$('reset').addEventListener('click',()=>{for(const [id,value] of Object.entries(defaults))$(id).value=value;updateCalculator()});
$('export').addEventListener('click',()=>{if(!current)return;const data={model:'BioSynth illustrative freight capacity model',modelVersion:1,units:'USD, human minutes, annual hours',kind:'scenario, not measured business results',...current,assumptions:{...current.assumptions,realizationUnit:'percent'},limitations:'Capacity is not cash savings. Constant annual volume and even benefit realization; no discounting, tax or financing.',created:new Date().toISOString()};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download='biosynth-freight-scenario.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
function search(){const phrase=$('search').value.trim().toLowerCase();let count=0;for(const card of document.querySelectorAll('[data-project]')){const match=(category==='All'||card.dataset.category===category)&&card.dataset.search.includes(phrase);card.hidden=!match;if(match)count++;}$('count').textContent=`${count} research system${count===1?'':'s'} shown`;$('empty-search').hidden=count!==0;}
$('search').addEventListener('input',search);
// Only category buttons can change category. Export/reset must never affect filters.
for(const button of document.querySelectorAll('button[data-category]'))button.addEventListener('click',()=>{category=button.dataset.category;for(const b of document.querySelectorAll('button[data-category]'))b.setAttribute('aria-pressed',String(b===button));search()});
function brief(){const p=projects.find(p=>p.id===$('experiment').value);const container=$('experiment-brief');container.replaceChildren();const title=document.createElement('h3');title.textContent=p.name;container.append(title);for(const [label,value] of [['Hypothesis to test',p.problem],['Protocol',p.experiment],['Comparison',p.baseline],['Outcome measures',p.metric],['Rejection rule',p.criterion]]){const row=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+': ';row.append(strong,document.createTextNode(value));container.append(row);}}
$('experiment').addEventListener('change',brief);
function evolve(){const p=Number($('population').value)/100,values=model.evolution(p,30);$('population-label').textContent=(p*100).toFixed(0)+'%';$('evolution-line').setAttribute('points',values.map((v,i)=>`${30+i*12},${150-v*140}`).join(' '));$('evolution-result').textContent=`Strategy A: ${(p*100).toFixed(0)}% initially → ${(values.at(-1)*100).toFixed(1)}% after 30 steps. ${p===1?'A is already fixed in the population.':p===0?'A cannot appear without mutation.':p===.75?'At the threshold, shares stay constant.':p>.75?'Above the threshold, A grows.':'Below the threshold, A shrinks.'}`;}
$('population').addEventListener('input',evolve);
function uncertainty(){const p=Number($('prior').value)/100,post=model.posterior(p,.8,.2);$('prior-label').textContent=(p*100).toFixed(0)+'%';$('prior-bar').style.width=p*100+'%';$('posterior-bar').style.width=post*100+'%';$('posterior-result').textContent=`Prior (top): ${(p*100).toFixed(0)}% → posterior (bottom): ${(post*100).toFixed(1)}%. Likelihoods are assumed, not measured.`;}
$('prior').addEventListener('input',uncertainty);
function purchasing(){try{const daily=$('daily').valueAsNumber,cost=model.purchase(75,5,daily),difference=cost-90;const recommendation=difference===0?'Equal modeled cost.':difference>0?`Local is ${money(difference)} lower in modeled cost.`:`Shipped is ${money(-difference)} lower in modeled cost.`;$('purchase-result').textContent=`Shipped: ${money(cost)}. Local: $90. ${recommendation}`;$('daily').setAttribute('aria-invalid','false')}catch{$('daily').setAttribute('aria-invalid','true');$('purchase-result').textContent='Enter a nonnegative finite daily value.'}}
$('daily').addEventListener('input',purchasing);
// Resolve direct lesson links into their details while retaining ordinary anchors.
function revealLesson(){const target=document.getElementById(location.hash.slice(1));if(target?.classList.contains('lesson'))target.querySelector('details').open=true;}
window.addEventListener('hashchange',revealLesson);
$('assumptions').disabled=false;updateCalculator();search();brief();evolve();uncertainty();purchasing();revealLesson();document.documentElement.classList.add('enhanced');
})();
