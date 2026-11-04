const assert = require('node:assert/strict');
const {puzzles,simulate,clone,makeBrokenPattern,patternBugIndexes,validPatternStart} = require('../content.js');
let checks=0;
const check=(value,message)=>{assert.ok(value,message);checks++};
const permutations=a=>a.length===0?[[]]:a.flatMap((v,i)=>permutations(a.filter((_,j)=>i!==j)).map(p=>[v,...p]));
for(const p of puzzles){
 check(!simulate(p.id,p.initial).ok,`${p.title}: initial fails`);
 check(simulate(p.id,p.solution).ok,`${p.title}: solution works`);
 check(simulate(p.id,p.solution).frames.length>1,`${p.title}: visual frames`);
 check(!simulate(p.id,null).ok,`${p.title}: invalid input fails`);
 const candidates=[];
 if(['route','drive','maze'].includes(p.type)){
  const opts=p.type==='route'?['Up','Right','Down','Left']:p.type==='drive'?['Forward 1','Forward 2','Forward 3','Turn left','Turn right']:['Turn left','Turn right','Keep facing'];
  p.initial.forEach((_,i)=>opts.forEach(o=>{const d=clone(p.initial);d[i]=o;candidates.push(d)}));
 } else if(p.type==='sort'){
  if(p.id===1) Object.keys(p.steps).forEach(omit=>permutations(Object.keys(p.steps).filter(k=>k!==omit)).forEach(order=>candidates.push({order,unused:[omit]})));
  else permutations(Object.keys(p.steps)).forEach(order=>candidates.push({order,unused:[]}));
 } else {
  for(let a=6;a<11;a++)for(let b=a+1;b<12;b++)for(const shapeA of ['Star','Circle','Diamond'])for(const countA of [1,2,3])for(const shapeB of ['Star','Circle','Diamond'])for(const countB of [1,2,3]){
   const d=clone(p.initial);d[a]={shape:shapeA,count:countA};d[b]={shape:shapeB,count:countB};
   if(JSON.stringify(d[a])!==JSON.stringify(p.initial[a])&&JSON.stringify(d[b])!==JSON.stringify(p.initial[b]))candidates.push(d);
  }
 }
 const winners=candidates.filter(d=>simulate(p.id,d).ok);
 check(winners.length===1,`${p.title}: exactly one allowed repair (${winners.length})`);
 assert.deepEqual(winners[0],p.solution);checks++;
 console.log(`PASS ${p.title}: initial, solution, invalid input, ${candidates.length} candidate repairs, unique solution.`);
}
const coasterOriginal=simulate(0,puzzles[0].initial);
check(coasterOriginal.frames.filter(frame=>frame.active>=0).length===puzzles[0].initial.length,'Roller Coaster Route: original test runs every command');
check(coasterOriginal.frames.at(-1).active===puzzles[0].initial.length-1,'Roller Coaster Route: final command is animated after the bug');
check(coasterOriginal.message.includes('ran all 7 commands'),'Roller Coaster Route: feedback confirms the complete program ran');
const pairs=new Set();
for(let seed=1;seed<=300;seed++){
 let value=(seed*2654435761)>>>0;
 const random=()=>((value=(value*1664525+1013904223)>>>0)/4294967296);
 const broken=makeBrokenPattern(random),bugs=patternBugIndexes(broken);
 check(validPatternStart(broken),`random pattern ${seed}: exactly two valid later bugs`);
 pairs.add(bugs.join(','));
}
check(pairs.size===15,`random pattern generator can reach all 15 tile pairs (${pairs.size})`);
console.log(`${checks} assertions passed. Letters: ${puzzles.map(p=>p.letter).join('')}`);
