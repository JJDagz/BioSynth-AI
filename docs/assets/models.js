/* Pure, dependency-free educational models. CommonJS + browser export. */
(function(root){
'use strict';
function number(x,min=0,max=Number.MAX_VALUE){if(typeof x!=='number'||!Number.isFinite(x)||x<min||x>max)throw new RangeError('Enter a valid finite number in range.');return x;}
function freight(x){
 for(const k of ['volume','manual','auto','rate','ops','build'])number(x[k]);number(x.realization,0,100);
 const annualQuotes=x.volume*12, minutes=x.manual-x.auto,hours=annualQuotes*minutes/60;
 const capacity=hours*x.rate,realized=capacity*x.realization/100,annualNet=realized-x.ops,totalCost=x.ops+x.build;
 const firstYear=annualNet-x.build,payback=annualNet>0?12*x.build/annualNet:null,ratio=totalCost>0?realized/totalCost:null;
 const result={annualQuotes,minutes,hours,capacity,grossBenefit:capacity,realized,annualNet,totalCost,firstYear,payback,ratio};
 for(const v of Object.values(result))if(v!==null&&!Number.isFinite(v))throw new RangeError('Inputs exceed the finite calculation range.');return result;
}
function posterior(prior,likelihoodA,likelihoodB){for(const x of [prior,likelihoodA,likelihoodB])number(x,0,1);const a=prior*likelihoodA,b=(1-prior)*likelihoodB;if(a+b===0)throw new RangeError('Evidence has zero probability under both hypotheses.');return a/(a+b);}
function evolution(share,steps=30){number(share,0,1);number(steps,0,500);if(!Number.isInteger(steps))throw new RangeError('Steps must be an integer.');const values=[share];for(let i=0;i<steps;i++){const a=4*share,b=3,average=share*a+(1-share)*b;share=average===0?share:share*a/average;values.push(share);}return values;}
function purchase(price,days,daily){for(const x of [price,days,daily])number(x);const value=price+days*daily;number(value);return value;}
const api={freight,posterior,evolution,purchase};if(typeof module==='object'&&module.exports)module.exports=api;else root.LabModels=api;
})(typeof globalThis!=='undefined'?globalThis:this);
