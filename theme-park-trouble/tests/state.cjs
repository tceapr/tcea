// Exercise the real app's persistence and navigation handlers in a tiny DOM stub.
// Browser rendering and interaction are covered separately by the browser QA log.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const Park=require('../content.js');
const app=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const key='tceaThemeParkTrouble.v1';let checks=0;
function boot(raw,fail=false){
 const nodes={},handlers={},records=new Map(raw==null?[]:[[key,raw]]);
 const element=id=>nodes[id]??=( {innerHTML:'',textContent:'',hidden:false,dataset:{},offsetWidth:1,isConnected:true,classList:{add(){},remove(){}},focus(){},setAttribute(){},close(){},showModal(){},querySelector(){return null},insertAdjacentHTML(){}} );
 const localStorage={getItem(k){if(fail)throw Error('denied');return records.get(k)||null},setItem(k,v){if(fail)throw Error('quota');records.set(k,v)},removeItem(k){if(fail)throw Error('denied');records.delete(k)}};
 const document={getElementById:element,addEventListener(name,fn){handlers[name]=fn},querySelectorAll(){return []}};
 const context={Park,Art:{icon:()=>'',panorama:()=>''},document,localStorage,window:{scrollTo(){},matchMedia(){return {matches:true}}},setTimeout,clearTimeout,requestAnimationFrame(){}};
 vm.runInNewContext(app,context);
 const click=action=>handlers.click({target:{closest:()=>({dataset:{action}})},preventDefault(){}});
 return {nodes,records,click};
}
function check(v,m){assert.ok(v,m);checks++;}
let a=boot();check(a.nodes.headerProgress.innerHTML.includes('0 / 6'),'fresh zero progress');
a.click('final');check(a.nodes.main.innerHTML.includes('Your park map'),'final navigation guarded');
let saved=JSON.parse(a.records.get(key));check(saved.view==='map','guarded view saved');
saved.awards=Park.puzzles.map(p=>p.solution);saved.drafts=Park.puzzles.map(p=>p.solution);saved.opened=true;saved.view='home';
a=boot(JSON.stringify(saved));check(a.nodes.headerProgress.innerHTML.includes('6 / 6'),'all earned letters restore');check(a.nodes.main.innerHTML.includes('Visit your open park'),'unlocked park restores');
a.click('confirm-reset');saved=JSON.parse(a.records.get(key));check(saved.awards.length===0&&!saved.opened,'reset clears completion');check(saved.drafts.every((draft,i)=>i===4?Park.validPatternStart(draft):JSON.stringify(draft)===JSON.stringify(Park.puzzles[i].initial)),'reset clears drafts and creates a valid two-bug pattern');check(JSON.stringify(saved.drafts[4])===JSON.stringify(saved.patternOriginal),'reset stores the new Midway original');
a=boot('{malformed');check(!a.nodes.storageNotice.hidden,'corrupt storage visible recovery');check(a.nodes.headerProgress.innerHTML.includes('0 / 6'),'corrupt data fresh state');
a=boot(null,true);a.click('continue');check(a.nodes.main.innerHTML.includes('Roller Coaster Route'),'blocked storage still playable');check(!a.nodes.storageNotice.hidden,'blocked storage warning');a.click('confirm-reset');check(a.nodes.headerProgress.innerHTML.includes('0 / 6'),'reset works with blocked storage');
saved={version:1,drafts:[null],awards:[Park.puzzles[0].initial],opened:true,view:'final',current:99};
a=boot(JSON.stringify(saved));check(a.nodes.headerProgress.innerHTML.includes('0 / 6'),'invalid awards rejected');check(a.nodes.main.innerHTML.includes('Your park map'),'unearned final gate rejected on load');
saved.awards=[Park.puzzles[0].solution,Park.puzzles[1].initial,Park.puzzles[2].solution];
a=boot(JSON.stringify(saved));check(a.nodes.headerProgress.innerHTML.includes('1 / 6'),'noncontiguous awards cannot bypass');
const legacy={
 version:1,
 drafts:[Park.puzzles[0].solution,Park.puzzles[1].solution,['Forward 2','Turn left','Forward 2','Turn right','Forward 1'],{order:['load','up','stamp','down','unload'],unused:[]},Park.puzzles[4].solution,Park.puzzles[5].solution],
 awards:[Park.puzzles[0].solution,Park.puzzles[1].solution,['Forward 2','Turn left','Forward 2','Turn right','Forward 1'],{order:['load','up','stamp','down','unload'],unused:[]},Park.puzzles[4].solution,Park.puzzles[5].solution],
 opened:true,view:'final',current:5
};
a=boot(JSON.stringify(legacy));
check(a.nodes.headerProgress.innerHTML.includes('6 / 6'),'legacy earned letters migrate to revised puzzles');
check(a.nodes.main.innerHTML.includes('Congratulations'),'legacy opened park remains open');
let migrated=JSON.parse(a.records.get(key));
check(migrated.version===5,'legacy save is rewritten at current version');
check(JSON.stringify(migrated.awards[2])===JSON.stringify(Park.puzzles[2].solution),'legacy bumper award maps to revised repair');
check(JSON.stringify(migrated.awards[3])===JSON.stringify(Park.puzzles[3].solution),'legacy wheel award maps to revised cycle');
const versionTwo={version:2,drafts:Park.puzzles.map(p=>p.initial),awards:[Park.puzzles[0].solution,Park.puzzles[1].solution,['Forward 2','Turn left','Forward 2','Turn right','Reverse 2']],opened:false,view:'map',current:2};
a=boot(JSON.stringify(versionTwo));
check(a.nodes.headerProgress.innerHTML.includes('3 / 6'),'version 2 bumper award keeps its earned letter');
migrated=JSON.parse(a.records.get(key));
check(migrated.version===5,'version 2 save is rewritten at current version');
check(JSON.stringify(migrated.awards[2])===JSON.stringify(Park.puzzles[2].solution),'version 2 bumper award maps to clearer repair');
const versionThree={version:3,drafts:Park.puzzles.map(p=>p.initial),awards:Park.puzzles.slice(0,5).map(p=>p.solution),opened:false,view:'map',current:4};
a=boot(JSON.stringify(versionThree));migrated=JSON.parse(a.records.get(key));
check(a.nodes.headerProgress.innerHTML.includes('5 / 6'),'version 3 progress survives the random Midway upgrade');
check(migrated.version===5&&Park.validPatternStart(migrated.patternOriginal),'version 3 save receives a valid two-bug Midway pattern');
check(JSON.stringify(migrated.drafts[4])===JSON.stringify(Park.puzzles[4].solution),'completed Midway solution survives migration');
const oldMidwaySolution=Array.from({length:12},(_,i)=>({shape:i%2?'Circle':'Star',count:i%3+1}));
const oldMidwayOriginal=JSON.parse(JSON.stringify(oldMidwaySolution));
oldMidwayOriginal[7].count=3;oldMidwayOriginal[10].shape='Circle';
const versionFour={version:4,drafts:Park.puzzles.map(p=>p.initial),patternOriginal:oldMidwayOriginal,awards:[Park.puzzles[0].solution,Park.puzzles[1].solution,Park.puzzles[2].solution,Park.puzzles[3].solution,oldMidwaySolution],opened:false,view:'map',current:4};
versionFour.drafts[4]=oldMidwaySolution;
a=boot(JSON.stringify(versionFour));migrated=JSON.parse(a.records.get(key));
check(a.nodes.headerProgress.innerHTML.includes('5 / 6'),'version 4 progress survives the harder Midway upgrade');
check(migrated.version===5&&Park.validPatternStart(migrated.patternOriginal),'version 4 save receives the new overlapping-cycle puzzle');
check(JSON.stringify(migrated.awards[4])===JSON.stringify(Park.puzzles[4].solution),'version 4 Midway award maps to the revised solution');
check(JSON.stringify(migrated.drafts[4])===JSON.stringify(Park.puzzles[4].solution),'completed version 4 Midway draft survives migration');
console.log(`${checks} state assertions passed (storage unavailable, corrupt saves, valid refresh, reset, guarded progression).`);
