(function () {
  'use strict';
  const {puzzles,letters,patternShapes,clone,validDraft,simulate} = Park;
  const STORAGE_KEY = 'tceaThemeParkTrouble.v1';
  const TEACHER_PASSWORD = 'TCEA'; // Classroom courtesy gate, not secure authentication.
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fresh = () => {
    const patternOriginal=Park.makeBrokenPattern(), drafts=puzzles.map(p=>clone(p.initial));
    drafts[4]=clone(patternOriginal);
    return {version:5,drafts,patternOriginal,awards:[],opened:false,view:'home',current:0};
  };
  let storageMessage='', state=load(), runToken=0, running=false, teacherUnlocked=false, showHint=false, visited=[], trace=[], celebrationTimer, lastWheelAngle=0;
  function load() {
    const fallback=fresh();
    try {
      const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return fallback;
      const saved=JSON.parse(raw); if(!saved || ![1,2,3,4,5].includes(saved.version)) throw new Error('Invalid save');
      if(saved.version===5) {
        if(!Park.validPatternStart(saved.patternOriginal))throw new Error('Invalid pattern save');
        fallback.patternOriginal=clone(saved.patternOriginal);fallback.drafts[4]=clone(saved.patternOriginal);
      }
      if(Array.isArray(saved.drafts)) puzzles.forEach((p,i)=>{if(!((saved.version===1 && [2,3].includes(i)) || (saved.version<3 && i===2) || (saved.version<5 && i===4)) && validDraft(i,saved.drafts[i]))fallback.drafts[i]=saved.drafts[i]});
      if(Array.isArray(saved.awards)) for(let i=0;i<Math.min(6,saved.awards.length);i++) {
        let award=saved.awards[i];
        // Keep earned letters from the first prototype while refreshing changed puzzles.
        if(saved.version<3 && i===2) award=puzzles[i].solution;
        if(saved.version===1 && i===3 && Park.same(award,{order:['load','up','stamp','down','unload'],unused:[]})) award=puzzles[i].solution;
        if(saved.version<5 && i===4) award=puzzles[i].solution;
        if(!simulate(i,award).ok)break;
        fallback.awards.push(clone(award));
      }
      if(saved.version<5 && fallback.awards.length>4)fallback.drafts[4]=clone(puzzles[4].solution);
      fallback.opened=fallback.awards.length===6 && saved.opened===true;
      fallback.current=Number.isInteger(saved.current)?Math.max(0,Math.min(saved.current,fallback.awards.length,5)):0;
      fallback.view=['home','map','puzzle','guide','final'].includes(saved.view)?saved.view:'home';
      if(fallback.view==='final' && fallback.awards.length!==6)fallback.view='map';
      if(saved.version<5) {
        try { localStorage.setItem(STORAGE_KEY,JSON.stringify(fallback)); } catch(error) { /* The in-memory migration still works. */ }
      }
      return fallback;
    } catch(error) {storageMessage='Saved progress could not be loaded. You can still play; this tab starts a fresh adventure.';return fallback;}
  }
  function save() {
    try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
    catch(error){storageMessage='Progress is kept in this tab, but this browser cannot save it. Keep the tab open until you finish.';}
    storageNotice();
  }
  function storageNotice(){ $('storageNotice').hidden=!storageMessage;$('storageNotice').textContent=storageMessage; }
  function announce(text){$('announce').textContent=text;}
  function header(){
    $('headerProgress').innerHTML=`<span>${state.awards.length} / 6 attractions fixed</span><div class="mini-letters" aria-label="Letters: ${letters.split('').map((c,i)=>i<state.awards.length?c:'not yet earned').join(', ')}">${letters.split('').map((c,i)=>`<span class="${i<state.awards.length?'earned':''}" aria-hidden="true">${i<state.awards.length?c:'·'}</span>`).join('')}</div>`;
  }
  function stopRun(){runToken++;running=false;clearTimeout(celebrationTimer);}
  function go(view,current=state.current){
    stopRun();state.current=Math.max(0,Math.min(current,state.awards.length,5));
    state.view=view==='final'&&state.awards.length<6?'map':view;showHint=false;save();render();
    $('main').focus();window.scrollTo({top:0,behavior:'instant'});
  }
  function render(){
    header();storageNotice();
    if(state.view==='home')home();
    else if(state.view==='map')map();
    else if(state.view==='puzzle')puzzle();
    else if(state.view==='guide')guide();
    else if(state.view==='final')final();
    else credits();
  }
  function mapMarkup(){return `<div class="park-map"><svg class="map-path" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M130 160H830Q955 160 955 310T830 460H155Q50 460 50 550" fill="none" stroke="#fffaf0" stroke-width="42" stroke-linecap="round"/><path d="M130 160H830Q955 160 955 310T830 460H155Q50 460 50 550" fill="none" stroke="#d9c786" stroke-width="3" stroke-dasharray="10 12"/></svg><div class="map-grid">${puzzles.map((p,i)=>`<button class="attraction ${i<state.awards.length?'complete':i===state.awards.length?'current':''}" data-action="attraction" data-index="${i}" ${i>state.awards.length?'disabled':''} aria-label="Attraction ${i+1}: ${p.title}. ${i<state.awards.length?'Completed. Letter '+p.letter+'. Revisit.':i===state.awards.length?'Ready to debug.':'Locked. Complete attraction '+i+' first.'}"><span class="number">${i+1}</span>${Art.icon(i)}<h3>${p.short}</h3><span class="skill">${p.skill}</span><span class="status">${i<state.awards.length?'✓ Fixed · Letter '+p.letter:i===state.awards.length?'Start debugging →':'Complete stop '+i+' first'}</span></button>`).join('')}</div><div class="map-gate"><div><strong>The opening-day gate</strong><p>${state.awards.length===6?'All six letters collected. Solve the last mystery!':'Repair the attractions in numbered order. Each repair earns one letter.'}</p></div><button class="${state.awards.length===6?'primary':''}" data-action="final" ${state.awards.length<6?'disabled':''}>${state.opened?'Visit the open park':state.awards.length===6?'Unlock the gates →':state.awards.length+' of 6 letters collected'}</button></div></div>`;}
  function home(){
    $('main').innerHTML=`<section class="hero"><div><p class="eyebrow">Opening day needs a little debugging</p><h1>Theme Park<br><em>Trouble!</em></h1><p class="tagline">Six attractions. Six bugs.<br>One big opening day!</p><p class="intro">The park is ready. The programs? Not quite. Join the official <strong>Debugging Crew</strong> to fix six playful glitches, collect secret letters, and open the gates.</p><div class="actions"><button class="primary" data-action="continue">${state.opened?'Visit your open park':state.awards.length?'Continue your adventure →':'Join the crew →'}</button><button data-action="guide">Teacher Guide</button></div><p class="small" style="margin-top:18px">Grades 3–5 &nbsp; · &nbsp; 20–30 minutes &nbsp; · &nbsp; Go at your own pace</p></div><div class="hero-art">${Art.panorama()}<div class="ticket-badge">YOUR MISSION<strong>Think. Test. Fix.</strong></div></div></section><section class="mission-strip" aria-label="How to play"><article><span class="step-dot">1</span><div><strong>Find the glitch</strong>Look closely at the instructions.</div></article><article><span class="step-dot">2</span><div><strong>Try your fix</strong>Change the code and watch it run.</div></article><article><span class="step-dot">3</span><div><strong>Open the park</strong>Collect letters. Solve the mystery.</div></article></section><section class="map-section" aria-labelledby="mapTitle"><div class="section-top"><div><p class="eyebrow">Your debugging adventure</p><h2 id="mapTitle">A park full of possibilities</h2></div><span class="pill">${state.awards.length} of 6 attractions fixed</span></div>${mapMarkup()}</section>`;
  }
  function map(){ $('main').innerHTML=`<div class="section-top"><div><p class="eyebrow">Crew headquarters</p><h1 style="font-size:44px">Your park map</h1><p>Follow stops 1–6. Test an idea, fix a glitch, earn a letter.</p></div><span class="pill">${state.awards.length} of 6 attractions fixed</span></div>${mapMarkup()}`; }
  function originalMarkup(p){
    const original=p.type==='sort'?p.initial.order.map(k=>p.steps[k]):p.type==='pattern'?state.patternOriginal.map((v,i)=>`Tile ${i+1}: ${v.count} ${v.shape}${v.count>1?'s':''}`):p.type==='maze'?[`IF B sign, THEN ${p.initial[0]}.`,`ELSE IF Y sign, THEN ${p.initial[1]}.`,'ELSE keep facing. Then move forward one square. Repeat until the flag.']:p.initial;
    return `<details class="original"><summary>Original program · compare your edits</summary><ol>${original.map(s=>`<li>${s}</li>`).join('')}</ol></details>`;
  }
  function puzzle(){
    const i=state.current,p=puzzles[i];visited=[];trace=[];
    $('main').innerHTML=`<div class="puzzle-head"><div class="small-art">${Art.icon(i)}</div><div><p class="eyebrow">Attraction ${i+1} of 6 &nbsp; · &nbsp; ${p.skill}</p><h1>${p.title}</h1><p>${p.intro}</p></div></div><div class="actions"><button data-action="hint" id="hintButton" aria-expanded="false" aria-controls="hintBox">Hint</button><span class="small">A bug is a mistake in the instructions. You can keep trying!</span></div><div class="hint-box" id="hintBox" hidden>${p.hint}</div><div class="puzzle-layout ${p.type==='pattern'?'pattern-layout':''}" style="margin-top:22px"><section class="panel" aria-labelledby="editorTitle"><h2 id="editorTitle">${p.type==='sort'?'Arrange the instructions':p.type==='pattern'?'Repair the prize pattern':'Your program'}</h2>${originalMarkup(p)}<div id="editor"></div><button class="quiet small" data-action="restore" style="margin-top:13px">Restore original program</button></section><section class="panel" aria-labelledby="testTitle"><h2 id="testTitle">${p.type==='pattern'?'Pattern scanner':'The test zone'}</h2><div id="stage"></div><div id="runLog" class="run-log" role="status" aria-live="polite">Ready when you are. Test the original program or try an edit.</div><div class="test-toolbar"><button class="yellow" data-action="test" id="testButton">▶ Test</button><button data-action="reset-test">Reset Test</button><button class="primary" data-action="check" id="checkButton">Check Answer</button></div><details class="trace"><summary>Read the test steps</summary><ol id="traceList"><li>No test yet.</li></ol></details></section></div><div id="feedback" class="feedback" role="status" aria-live="polite">${i<state.awards.length?`Already repaired! You earned letter ${p.letter}. You can experiment without losing it.`:'Change the instructions, test your idea, then check your answer to earn a letter.'}</div><div class="bottom-nav"><button data-action="map">← Back to Map</button><p id="nextHelp">${i<state.awards.length?'Ready for your next stop?':'Complete this attraction to continue.'}</p><button id="nextButton" data-action="next" class="primary" ${i>=state.awards.length?'disabled':''}>${i===5?'Final mystery →':'Next Attraction →'}</button></div>`;
    renderEditor();paint(simulate(i,state.drafts[i]).frames[0]);
  }
  function renderEditor(){
    const i=state.current,p=puzzles[i],d=state.drafts[i];
    if(p.type==='sort'){
      $('editor').innerHTML=`<p class="editor-help">Use ↑ and ↓ to move a step. ${i===1?'Use Remove for the unnecessary step.':''} No dragging needed.</p><div class="sort-list">${d.order.map((key,j)=>sortRow(key,j,false)).join('')}</div>${i===1?`<div class="unused"><h3>Do Not Use</h3>${d.unused.length?d.unused.map((key,j)=>sortRow(key,j,true)).join(''):'<p>Move one unnecessary instruction here.</p>'}</div>`:''}`;
    } else if(p.type==='pattern'){
      $('editor').innerHTML=`<div class="pattern-rules" aria-label="Pattern rules"><span><strong>Shape cycle</strong> ★ Star → ● Circle → ◆ Diamond</span><span><strong>Number cycle</strong> 1 → 2 → 3 → 2</span></div><div class="pattern-grid">${d.map((v,j)=>`<div class="pattern-tile ${j<6?'reference':''}" data-step="${j}"><strong>TILE ${j+1}${j<6?' · example':''}</strong><div class="pattern-symbols" id="symbols-${j}" aria-hidden="true">${patternSymbol(v.shape).repeat(v.count)}</div>${j<6?`<span>${v.count} ${v.shape.toLowerCase()}${v.count>1?'s':''}</span>`:`<label for="shape-${j}">Shape<select id="shape-${j}" data-edit="shape" data-index="${j}" aria-label="Tile ${j+1} shape">${options(patternShapes,v.shape)}</select></label><label for="count-${j}">Number<select id="count-${j}" data-edit="count" data-index="${j}" aria-label="Tile ${j+1} number">${options([1,2,3],v.count)}</select></label>`}</div>`).join('')}</div><p class="pattern-legend">Read continuously from tile 1 through tile 12; do not restart the rules on the second row. Tiles 1–6 are examples. Exactly two of tiles 7–12 need repairs.</p>`;
    } else {
      const opts=p.type==='route'?Park.directions:p.type==='drive'?['Forward 1','Forward 2','Forward 3','Turn left','Turn right']:['Turn left','Turn right','Keep facing'];
      $('editor').innerHTML=`<div class="commands">${d.map((v,j)=>`<div class="command" data-step="${j}"><span class="idx">${j+1}</span><label for="command-${j}">${p.type==='maze'?`<span class="rule-label">${j===0?'IF the sign is B (blue), THEN':'ELSE IF the sign is Y (yellow), THEN'}</span>`:`<span class="sr-only">Command ${j+1}</span>`}<select id="command-${j}" data-edit="command" data-index="${j}">${options(opts,v)}</select></label></div>`).join('')}</div>${p.type==='maze'?'<p class="editor-help" style="margin-top:16px"><strong>ELSE</strong> keep facing the same way.<br><strong>THEN</strong> move forward one square.<br>Repeat until you reach the flag.</p>':''}`;
    }
  }
  function options(opts,v){return opts.map(o=>`<option ${o===v?'selected':''}>${o}</option>`).join('');}
  function patternSymbol(shape){return ({Star:'★',Circle:'●',Diamond:'◆'})[shape]||'?';}
  function sortRow(key,j,unused){
    const p=puzzles[state.current],d=state.drafts[state.current],text=p.steps[key];
    return `<div class="sort-row" ${unused?'':`data-step="${j}"`}><span class="idx">${unused?'–':j+1}</span><span class="step-text">${text}</span><span class="sort-controls">${unused?`<button data-action="return" data-key="${key}" id="return-${key}" aria-label="Return step: ${text}">Return</button>`:`<button data-action="up" data-key="${key}" id="up-${key}" aria-label="Move up: ${text}" ${j===0?'disabled':''}>↑</button><button data-action="down" data-key="${key}" id="down-${key}" aria-label="Move down: ${text}" ${j===d.order.length-1?'disabled':''}>↓</button>${state.current===1?`<button class="remove" data-action="remove" data-key="${key}" id="remove-${key}" aria-label="Remove step: ${text}">Remove</button>`:''}`}</span></div>`;
  }
  function vehicleMarkup(frame,p){
    if(p.type!=='drive')return `<span class="buggy">${['↑','→','↓','←'][frame.facing]}</span>`;
    return `<span class="buggy bumper-model" style="--car-angle:${frame.facing*90}deg"><svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><ellipse cx="24" cy="25" rx="21" ry="19" fill="#ffcf33" stroke="#24345b" stroke-width="3"/><path d="M12 26c0-10 5-17 12-17s12 7 12 17v10H12Z" fill="#f04472" stroke="#24345b" stroke-width="2.5"/><path d="M17 24c0-5 3-9 7-9s7 4 7 9v5H17Z" fill="#67d4ff" stroke="#24345b" stroke-width="2"/><circle cx="24" cy="25" r="4" fill="#24345b"/><path d="M24 4l-6 8h12Z" fill="#fff" stroke="#24345b" stroke-width="2"/><circle cx="14" cy="34" r="3" fill="#fff4aa"/><circle cx="34" cy="34" r="3" fill="#fff4aa"/></svg></span>`;
  }
  function paint(frame){
    if(!frame || !$('stage'))return;
    const p=puzzles[state.current];
    document.querySelectorAll('[data-step]').forEach(el=>el.classList.toggle('active',Number(el.dataset.step)===frame.active));
    if(['route','drive','maze'].includes(p.type)){
      visited.push(`${frame.x},${frame.y}`);
      $('stage').innerHTML=`<div class="grid-board ${p.arena?'arena-board':''}" style="--n:${p.size}" role="img" aria-label="${escape(frame.text)} Start at row ${p.start[1]+1}, column ${p.start[0]+1}. Destination at row ${p.goal[1]+1}, column ${p.goal[0]+1}. Use the text map below for the ${p.arena?'driving area':'full lane'}.">${Array.from({length:p.size*p.size},(_,n)=>{
        const x=n%p.size,y=Math.floor(n/p.size),road=p.path.some(v=>v[0]===x&&v[1]===y),start=x===p.start[0]&&y===p.start[1],goal=x===p.goal[0]&&y===p.goal[1],here=x===frame.x&&y===frame.y,sign=p.signs?.[`${x},${y}`];
        return `<div class="cell ${road?'road':''} ${visited.includes(`${x},${y}`)?'visited':''}" aria-hidden="true">${p.arena&&!road?'<span class="tire-island">TIRES</span>':''}${goal?`<span class="goal ${p.arena?'parking-bay':''}">${p.type==='drive'?'← P':'⚑'}</span>`:''}${sign?`<span class="sign ${sign==='Y'?'y':''}">${sign}</span>`:''}${here?vehicleMarkup(frame,p):''}${start||goal?`<span class="cell-label">${start?'START':p.type==='drive'?'PARK':'FINISH'}</span>`:''}</div>`;
      }).join('')}</div><p class="grid-caption">${p.arena?'Blue floor = driving area · TIRES = island<br>Blue P bay: finish with the nose pointing ← left.':'Cream squares = lane · Arrow = model’s nose'}<br>Rows count down from the top; columns count across from the left.</p><details class="small"><summary>Text map (all ${p.arena?'drivable':'lane'} squares)</summary><p>${Array.from({length:p.size},(_,y)=>`Row ${y+1}: ${p.path.filter(v=>v[1]===y).sort((a,b)=>a[0]-b[0]).map(v=>`column ${v[0]+1}${p.signs?.[v.join(',')]?' (sign '+p.signs[v.join(',')]+')':''}`).join(', ')||'no lane'}.`).join('<br>')}</p></details>`;
    } else if(state.current===1){
      const s=frame.stage||0;
      $('stage').innerHTML=`<div class="machine-stage"><svg viewBox="0 0 400 280" role="img" aria-label="Fruit cup model: ${['empty mat','empty cup on mat','fruit in cup','lid on cup','sticker on lid','finished cup on serving tray'][s]}"><rect x="24" y="209" width="352" height="18" rx="8" fill="#9dc9b4"/><rect x="${s===5?218:61}" y="202" width="122" height="9" rx="4" fill="${s===5?'#e5936f':'#719d8b'}"/><text x="121" y="255" text-anchor="middle" fill="#193e3b" font-size="16">Filling mat</text><text x="281" y="255" text-anchor="middle" fill="#193e3b" font-size="16">Serving tray</text>${s>0?`<g transform="translate(${s===5?160:0} 0)"><path d="M76 117h92l-12 84H88Z" fill="#fff9e8" stroke="#193e3b" stroke-width="4"/>${s>=2?'<g fill="#ee715f" stroke="#a34434" stroke-width="2"><circle cx="102" cy="166" r="13"/><circle cx="138" cy="177" r="12"/><circle cx="125" cy="149" r="14"/><circle cx="145" cy="143" r="10"/></g>':''}${s>=3?'<rect x="69" y="108" width="105" height="14" rx="7" fill="#6bac9e" stroke="#193e3b" stroke-width="4"/>':''}${s>=4?'<ellipse cx="121" cy="109" rx="22" ry="9" fill="#ffd46e" stroke="#193e3b" stroke-width="2"/><text x="121" y="112" text-anchor="middle" font-size="8" fill="#193e3b">FRUIT</text>':''}</g>`:''}</svg></div><div class="machine-status">${['Cup','Fruit','Lid','Sticker','Served'].map((v,j)=>`<span class="${s>j?'on':''}">${s>j?'✓ ':''}${v}</span>`).join('')}</div>`;
    } else if(state.current===3){
      const fromAngle=frame.active<0?0:lastWheelAngle;lastWheelAngle=frame.angle||0;
      const bear=(x,y)=>`<g transform="translate(${x} ${y})"><circle cx="-10" cy="-10" r="6" fill="#b96526"/><circle cx="10" cy="-10" r="6" fill="#b96526"/><circle cy="-3" r="14" fill="#f9aa52" stroke="#713b18" stroke-width="2"/><circle cx="-5" cy="-5" r="1.8" fill="#252d50"/><circle cx="5" cy="-5" r="1.8" fill="#252d50"/><ellipse cy="3" rx="6" ry="4" fill="#ffe0a1"/><circle cy="1" r="2" fill="#252d50"/><rect x="-11" y="10" width="22" height="15" rx="6" fill="#f9aa52" stroke="#713b18" stroke-width="2"/></g>`;
      $('stage').innerHTML=`<div class="machine-stage wheel-stage"><svg viewBox="0 0 400 330" role="img" aria-label="Toy Ferris wheel. Power ${frame.powered?'on':'off'}. Bear ${frame.onboard?'in the blue seat':frame.returned?'back on the platform':'waiting on the platform'}. ${frame.rode?'One full turn completed.':'Ride not yet completed.'}"><rect x="16" y="16" width="104" height="31" rx="9" fill="${frame.powered?'#ffe23a':'#dbe7f5'}" stroke="#27345a" stroke-width="2"/><text x="68" y="37" text-anchor="middle" font-size="14" font-weight="bold" fill="#27345a">POWER ${frame.powered?'ON':'OFF'}</text><path d="M148 285l52-132 52 132" fill="none" stroke="#4d3ab3" stroke-width="10"/><circle cx="200" cy="153" r="93" fill="#ffffff" stroke="#9c46e8" stroke-width="8"/>${[0,45,90,135,180,225,270,315].map(a=>`<circle cx="${200+93*Math.sin(a*Math.PI/180)}" cy="${153+93*Math.cos(a*Math.PI/180)}" r="5" fill="${frame.powered?'#ffe23a':'#ad92d0'}" stroke="#6d36a9"/>`).join('')}<g class="model-rotor" style="--from:${fromAngle}deg;--to:${frame.angle||0}deg">${[0,60,120].map(a=>`<path d="M200 60v186" transform="rotate(${a} 200 153)" stroke="#c58eff" stroke-width="4"/>`).join('')}<g class="upright-seat" style="--from:${-fromAngle}deg;--to:${-(frame.angle||0)}deg"><rect x="174" y="233" width="52" height="31" rx="10" fill="#159cff" stroke="#1c4677" stroke-width="3"/>${frame.onboard?bear(200,226):''}</g></g><circle cx="200" cy="153" r="14" fill="#ffe23a" stroke="#27345a" stroke-width="3"/><rect x="12" y="283" width="376" height="14" rx="7" fill="#13b7a6"/>${!frame.onboard?bear(76,258):''}<text x="76" y="320" text-anchor="middle" fill="#27345a" font-size="14">PLATFORM</text><text x="250" y="320" text-anchor="middle" fill="#27345a" font-size="14">BLUE SEAT</text></svg></div><div class="machine-status"><span class="${frame.powered?'on':''}">Power ${frame.powered?'ON':'OFF'}</span><span>${frame.onboard?'Bear on wheel':frame.returned?'Bear back on platform':'Bear waiting'}</span><span class="${frame.rode?'on':''}">${frame.rode?'✓ Full turn finished':'Ride not finished'}</span></div>`;
    } else {
      const tile=state.drafts[state.current][frame.active];
      $('stage').innerHTML=tile?`<div class="scanner-tile"><p class="eyebrow">Scanning tile ${frame.active+1}</p><div aria-hidden="true">${patternSymbol(tile.shape).repeat(tile.count)}</div><p>${tile.count} ${tile.shape.toLowerCase()}${tile.count>1?'s':''} · ${frame.match?'Both rules match':'Check this tile'}</p></div>`:'<p>Watch the highlighted tile above. The scanner also shows each tile here as it checks both rules.</p>';
    }
  }
  function feedback(text,kind=''){const el=$('feedback');if(el){el.textContent=text;el.className='feedback '+kind;}}
  function disableEditor(disabled){document.querySelectorAll('#editor select,#editor button,[data-action="restore"],#testButton,#checkButton').forEach(el=>{if(disabled){el.dataset.wasDisabled=el.disabled?'1':'0';el.disabled=true;}else if ('wasDisabled' in el.dataset) {el.disabled=el.dataset.wasDisabled==='1';delete el.dataset.wasDisabled;}});}
  function resetTest(speak=true){
    stopRun();if(!$('stage'))return;disableEditor(false);visited=[];trace=[];paint(simulate(state.current,state.drafts[state.current]).frames[0]);
    $('runLog').textContent='Test reset. Your program edits are still here.';$('traceList').innerHTML='<li>No test yet.</li>';if(speak)announce('Test reset. Your edits are unchanged.');
  }
  function edited(){resetTest(false);save();feedback('Your edit is saved in this session. Test it to see what changes.');}
  async function test(){
    if(running)return;stopRun();const token=runToken;running=true;visited=[];trace=[];disableEditor(true);
    const result=simulate(state.current,clone(state.drafts[state.current]));feedback('Testing your program… Watch each step.');
    const delay=window.matchMedia('(prefers-reduced-motion: reduce)').matches?80:620;
    for(const frame of result.frames){
      if(token!==runToken)return;
      paint(frame);trace.push(frame.text);$('runLog').textContent=frame.text;$('traceList').innerHTML=trace.map(t=>`<li>${escape(t)}</li>`).join('');
      await new Promise(resolve=>setTimeout(resolve,delay));
    }
    if(token!==runToken)return;running=false;disableEditor(false);$('runLog').textContent=result.message;feedback(result.message,result.ok?'success':'error');
  }
  function check(){
    if(running)return;const i=state.current,result=simulate(i,state.drafts[i]);
    if(!result.ok){feedback('Keep investigating! '+result.message+' You can edit and test again.','error');return;}
    if(i>state.awards.length){feedback('Complete the earlier attraction first.');return;}
    if(i===state.awards.length)state.awards.push(clone(state.drafts[i]));
    save();header();$('feedback').className='feedback success';$('feedback').innerHTML=`<span class="letter-award">${puzzles[i].letter}</span><strong>Glitch fixed! Letter ${puzzles[i].letter} earned.</strong><p style="margin:12px 0 0">${puzzles[i].explanation}</p>`;
    $('nextButton').disabled=false;$('nextHelp').textContent=i===5?'All six letters collected!':'Ready for your next stop?';
  }
  function final(){
    if(state.awards.length!==6){go('map');return;}
    $('main').innerHTML=`<section class="final-screen"><p class="eyebrow">The opening-day mystery</p><h1 id="finalTitle">${state.opened?'Congratulations, Debugging Crew!':'One last puzzle. One grand opening.'}</h1><p id="finalMessage">${state.opened?'You fixed every glitch! The theme park is officially OPEN!':'You repaired all six attractions. Now use your letters to open the entrance gates.'}</p><div class="letter-bank" aria-label="Collected letters in attraction order: T I C K E T">${letters.split('').map(c=>`<span>${c}</span>`).join('')}</div>${Art.panorama(true)}<div id="unlockArea" ${state.opened?'hidden':''}><p><strong>I’m your pass to a day of rides and games.<br>Show me at the entrance. What am I?</strong></p><p class="small">Read your letters in attraction order, from 1 to 6.</p><form id="finalForm" class="final-form"><label for="secretWord">Six-letter secret word<input id="secretWord" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="20" required></label><button class="primary" type="submit">Unlock the gates</button></form></div><p id="finalFeedback" role="status" aria-live="polite"></p><div id="celebrationActions" class="actions" ${state.opened?'':'hidden'}><button class="yellow" data-action="replay">Replay celebration</button><button data-action="reset">Restart game</button><button data-action="map">Back to Map</button></div><section id="extension" class="extension" ${state.opened?'':'hidden'}><p class="eyebrow">Bonus mission · With a partner</p><h2>Create Your Own Glitch!</h2><ol><li>Draw or say 4–6 commands. Add one intentional mistake.</li><li>Swap with a partner. Have them find, fix, and test the glitch.</li><li>Explain: “I changed ___ because ___.”</li></ol><p class="small" style="margin-top:15px">Try arrows on a paper grid, a shape pattern, or steps for packing a bag. Pictures and spoken explanations are welcome.</p></section></section>`;
    if(state.opened)celebrate(false);
  }
  function celebrate(replay=true){
    clearTimeout(celebrationTimer);const scene=$('gateScene');if(!scene)return;
    scene.classList.add('rewind');scene.classList.remove('open','celebrating');scene.querySelector('.confetti')?.remove();
    void scene.offsetWidth; // Commit the fully closed gate before replaying its transition.
    scene.setAttribute('aria-label','The park gates are closed, ready to open');
    const token=runToken;
    // A fresh frame makes both the first opening and replay reliable, even after refresh.
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(token!==runToken||!scene.isConnected)return;
      scene.classList.remove('rewind');scene.classList.add('open','celebrating');scene.setAttribute('aria-label','The park gates are open and the park lights are on');
      scene.insertAdjacentHTML('beforeend',`<div class="confetti" aria-hidden="true">${Array.from({length:42},(_,i)=>`<i style="--x:${(i*37)%100}%;--d:${(i%7)*.12}s;--c:${['#e65c4f','#ffd46e','#9060a7','#237d70'][i%4]}"></i>`).join('')}</div>`);
      celebrationTimer=setTimeout(()=>{scene.classList.remove('celebrating');scene.querySelector('.confetti')?.remove();},20000);
      if(replay)announce('Congratulations, Debugging Crew! You fixed every glitch! The theme park is officially OPEN!');
    }));
  }
  function unlock(event){
    event.preventDefault();if(state.awards.length!==6)return;
    if($('secretWord').value.trim().toUpperCase()!==letters){$('finalFeedback').textContent='Not quite! Read the six letters in attraction order and use the clue. Try again.';return;}
    state.opened=true;save();$('finalTitle').textContent='Congratulations, Debugging Crew!';$('finalMessage').textContent='You fixed every glitch! The theme park is officially OPEN!';$('unlockArea').hidden=true;$('celebrationActions').hidden=false;$('extension').hidden=false;$('finalFeedback').textContent='All six glitches fixed. The gates are opening!';
    $('finalTitle').tabIndex=-1;$('finalTitle').focus();celebrate();
  }
  function guide(){
    $('main').innerHTML=`<article class="guide"><p class="eyebrow">For the grown-ups behind the adventure</p><h1>Teacher Guide</h1><p><strong>Grades 3–5 · 20–30 minutes</strong><br>Six short debugging challenges. No logins, timer, penalties, or sound.</p><div class="guide-grid"><section class="panel"><h2 style="margin-top:0">Learning Intention</h2><p>I am learning how to find and fix mistakes in instructions and algorithms.</p></section><section class="panel"><h2 style="margin-top:0">Success Criteria</h2><p>I can find a bug, explain what went wrong, and test a solution.</p></section></div><h2>Run the activity</h2><p>Introduce <strong>algorithm</strong> (a set of instructions), <strong>bug</strong> (a mistake), and <strong>debug</strong> (find and fix it). Model testing the original code before editing. A successful test does not award a letter: students submit with Check Answer.</p><ul><li><strong>Individual:</strong> Ask students to explain one repair aloud before moving on.</li><li><strong>Partners:</strong> Alternate driver (controls) and navigator (traces and explains) at each attraction.</li><li><strong>Whole class:</strong> Project a puzzle. Gather predictions, run the code, then discuss the evidence.</li></ul><h2>The six attractions</h2><ol>${puzzles.map(p=>`<li><strong>${p.title}:</strong> ${p.skill}. ${['Repair one direction in a track route.','Order a fruit-cup recipe and remove a redundant step.','Follow relative turns around an island and fix the car’s final orientation.','Order a toy bear’s ride from power on to power off.','Coordinate repeating shape and number rules.','Reuse an if–then rule at two matching signs.'][p.id]}</li>`).join('')}</ol><h2>Discuss the thinking</h2><ul><li>What did you predict? What happened when you tested?</li><li>Which step first caused the program to go wrong?</li><li>How is turning left or right different from moving up, down, left, or right?</li><li>Why does the same B-sign rule work in two places?</li><li>Can a step be unnecessary even if it is possible?</li></ul><h2>Differentiate</h2><ul><li><strong>Grade 3:</strong> Read instructions together. Trace paths with a finger and act out turns. Use hints and a partner.</li><li><strong>Grade 4:</strong> Predict before testing. Ask for a spoken explanation using “because.”</li><li><strong>Grade 5:</strong> Explain why order matters. Find the combined repeat length in the midway pattern. Compare the two sign rules.</li></ul><h2>Create Your Own Glitch!</h2><p>Students draw or say 4–6 instructions with one mistake, swap with a partner, and explain a repair: “I changed ___ because ___.” Use arrows, pictures, or spoken instructions to keep writing minimal.</p><h2>Answer key</h2><p class="small">The password is a classroom courtesy gate, not secure authentication. Teachers can find the default password in the local README.</p>${teacherUnlocked?answerKey():`<form id="teacherForm" class="password-form"><label for="teacherPassword">Teacher password<input type="password" id="teacherPassword" autocomplete="off" required></label><button type="submit" class="primary">Show answer key</button></form><p id="teacherFeedback" role="status" aria-live="polite"></p>`}<h2>Practical notes</h2><p>Use Tab, Enter, Space, and the arrow keys with native controls. Reordering uses buttons, so no dragging is required. Test steps and grid coordinates also appear as text. Reduced-motion settings are respected. Progress and edits stay on this browser when local storage is available; the game reports when saving is unavailable. Reset Activity clears only this game.</p><div class="actions"><button data-action="home">Home</button><button data-action="map">Back to Map</button><button data-action="print">Print guide</button></div></article>`;
  }
  function answerKey(){return `<div id="answerKey">${puzzles.map(p=>`<section class="answer-item"><h3>${p.id+1}. ${p.title} · Letter ${p.letter}</h3><p>${p.explanation}</p><p class="small"><strong>Complete solution:</strong> ${p.type==='sort'?p.solution.order.map(k=>p.steps[k]).join(' → ')+(p.id===1?' Do Not Use: '+p.steps.extra:''):p.type==='pattern'?p.solution.map((v,i)=>`${i+1}: ${v.count} ${v.shape.toLowerCase()}${v.count>1?'s':''}`).join('; '):p.type==='maze'?'IF B, turn left; ELSE IF Y, turn right; ELSE keep facing. Then move forward one square. Repeat until the flag.':p.solution.join(' → ')}</p></section>`).join('')}<p style="margin-top:20px"><strong>Final word: TICKET.</strong> Letters are earned in attraction order: T, I, C, K, E, T. A ticket is a pass to enter the park.</p><button data-action="lock-key">Hide answer key</button></div>`;}
  function credits(){ $('main').innerHTML=`<article class="guide"><p class="eyebrow">Resource notes</p><h1>Made for curious minds</h1><p><strong>Theme Park Trouble!</strong> is a TCEA computational thinking activity prototype for grades 3–5.</p><p>Structure inspired by <a href="https://tceapr.github.io/tcea/debug-haunted-house/" target="_blank" rel="noopener">Debug the Haunted House</a>. All illustrations here are original SVG artwork. No third-party fonts, images, or runtime libraries are used.</p><p><strong>Proposed licensing, pending TCEA review:</strong> CC0 1.0, consistent with the repository’s <a href="../LICENSE">LICENSE</a>. The attribution wording and licensing note are subject to owner review before publication.</p><button data-action="home">Home</button></article>`; }
  document.addEventListener('change',event=>{
    const el=event.target;if(!el.dataset.edit||running||state.view!=='puzzle')return;
    const j=Number(el.dataset.index),d=state.drafts[state.current];
    if(el.dataset.edit==='command')d[j]=el.value;
    else {d[j][el.dataset.edit]=el.dataset.edit==='count'?Number(el.value):el.value;$('symbols-'+j).textContent=patternSymbol(d[j].shape).repeat(d[j].count);}
    edited();
  });
  document.addEventListener('submit',event=>{
    if(event.target.id==='finalForm')unlock(event);
    if(event.target.id==='teacherForm'){
      event.preventDefault();if($('teacherPassword').value.trim().toUpperCase()===TEACHER_PASSWORD){teacherUnlocked=true;guide();$('answerKey').tabIndex=-1;$('answerKey').focus();}
      else {$('teacherFeedback').textContent='That password did not work. Please check with the teacher.';$('teacherPassword').select();}
    }
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
    event.preventDefault();const action=button.dataset.action;
    if(['home','map','guide','final','credits'].includes(action))return go(action);
    if(action==='continue')return state.awards.length===6?go('final'):go('puzzle',state.awards.length);
    if(action==='attraction')return go('puzzle',Number(button.dataset.index));
    if(action==='next')return state.current<state.awards.length?(state.current===5?go('final'):go('puzzle',state.current+1)):undefined;
    if(action==='hint'){showHint=!showHint;$('hintBox').hidden=!showHint;$('hintButton').setAttribute('aria-expanded',String(showHint));if(showHint)announce(puzzles[state.current].hint);return;}
    if(action==='test')return test();
    if(action==='reset-test')return resetTest();
    if(action==='check')return check();
    if(action==='restore'){if(running)return;state.drafts[state.current]=clone(state.current===4?state.patternOriginal:puzzles[state.current].initial);renderEditor();edited();announce('Original program restored. Earned letters are unchanged.');return;}
    if(['up','down','remove','return'].includes(action)){
      if(running)return;const d=state.drafts[state.current],key=button.dataset.key,j=d.order.indexOf(key);let focus=action+'-'+key;
      if(action==='up'&&j>0)[d.order[j],d.order[j-1]]=[d.order[j-1],d.order[j]];
      if(action==='down'&&j<d.order.length-1)[d.order[j],d.order[j+1]]=[d.order[j+1],d.order[j]];
      if(action==='remove'&&j>=0){d.order.splice(j,1);d.unused.push(key);focus='return-'+key;}
      if(action==='return'){d.unused=d.unused.filter(k=>k!==key);d.order.push(key);focus='remove-'+key;}
      renderEditor();edited();let target=$(focus);if(target?.disabled)target=$((action==='up'?'down':'up')+'-'+key);target?.focus();announce(`${puzzles[state.current].steps[key]} ${action==='remove'?'Moved to Do Not Use.':`Now step ${d.order.indexOf(key)+1}.`}`);return;
    }
    if(action==='reset'){$('resetDialog').showModal();return;}
    if(action==='cancel-reset'){$('resetDialog').close();return;}
    if(action==='confirm-reset'){
      stopRun();$('resetDialog').close();state=fresh();teacherUnlocked=false;
      try{localStorage.removeItem(STORAGE_KEY);}catch(error){storageMessage='This browser cannot clear saved storage. This tab has restarted; stored data may return on refresh.';}
      go('home');announce('Activity reset. All letters and edits cleared.');return;
    }
    if(action==='replay')return celebrate();
    if(action==='lock-key'){teacherUnlocked=false;guide();$('teacherPassword').focus();return;}
    if(action==='print')window.print();
  });
  render();storageNotice();
})();
