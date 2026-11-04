/* Editable content and the one simulation engine used by both Test and Check Answer. */
(function (root) {
  'use strict';
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const clone = value => JSON.parse(JSON.stringify(value));
  const letters = 'TICKET';
  const directions = ['Up', 'Right', 'Down', 'Left'];
  const vectors = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const snackSteps = {
    cup: 'Place an empty cup on the filling mat.',
    fruit: 'Put fruit into the cup.',
    lid: 'Snap a lid onto the filled cup.',
    label: 'Put a fruit sticker on the lid.',
    serve: 'Move the labeled cup to the serving tray.',
    extra: 'Snap a second lid onto the cup.'
  };
  const wheelSteps = {
    power: 'Turn the toy wheel’s power ON.',
    board: 'Put the toy bear in the blue seat.',
    ride: 'Give the bear one full turn on the wheel.',
    exit: 'Move the bear back onto the platform.',
    off: 'Turn the toy wheel’s power OFF.'
  };
  const patternShapes = ['Star','Circle','Diamond'];
  const patternCounts = [1,2,3,2];
  const pattern = Array.from({ length: 12 }, (_, i) => ({ shape: patternShapes[i % patternShapes.length], count: patternCounts[i % patternCounts.length] }));
  function makeBrokenPattern(random=Math.random) {
    const broken=clone(pattern), available=[6,7,8,9,10,11];
    for(let bug=0;bug<2;bug++) {
      const pick=Math.min(available.length-1,Math.floor(random()*available.length));
      const tileIndex=available.splice(pick,1)[0], tile=broken[tileIndex];
      const bugType=Math.min(2,Math.floor(random()*3));
      if(bugType!==1) {
        const choices=patternShapes.filter(shape=>shape!==tile.shape);
        tile.shape=choices[Math.min(choices.length-1,Math.floor(random()*choices.length))];
      }
      if(bugType!==0) {
        const choices=[1,2,3].filter(count=>count!==tile.count);
        tile.count=choices[Math.min(choices.length-1,Math.floor(random()*choices.length))];
      }
    }
    return broken;
  }
  function patternBugIndexes(candidate) {
    if(!Array.isArray(candidate)||candidate.length!==pattern.length)return [];
    return candidate.map((tile,index)=>same(tile,pattern[index])?-1:index).filter(index=>index>=0);
  }
  function validPatternStart(candidate) {
    const bugs=patternBugIndexes(candidate);
    return bugs.length===2&&bugs.every(index=>index>=6)&&candidate.every(tile=>tile&&patternShapes.includes(tile.shape)&&[1,2,3].includes(tile.count));
  }
  const brokenPattern = makeBrokenPattern(()=>0);
  const puzzles = [
    { title: 'Roller Coaster Route', short: 'Roller Coaster', skill: 'Sequencing • Directions', type: 'route', color: 'coral',
      intro: 'The empty model coaster has one wrong direction. Follow the cream-colored track from START to FINISH. Each command moves one square. Change exactly one command.',
      initial: ['Right', 'Right', 'Up', 'Down', 'Right', 'Right', 'Up'],
      solution: ['Right', 'Right', 'Up', 'Up', 'Right', 'Right', 'Up'],
      hint: 'Trace the commands with your finger. Does any command send the coaster back over a square it just visited?',
      explanation: 'Command 4 must be Up, not Down. The coaster must keep climbing before it travels right.',
      start: [0, 4], goal: [4, 1], size: 5, facing: 1,
      path: [[0,4],[1,4],[2,4],[2,3],[2,2],[3,2],[4,2],[4,1]] },
    { title: 'Snack Shack Scramble', short: 'Snack Shack', skill: 'Algorithms • Remove an extra step', type: 'sort', color: 'peach',
      intro: 'The snack robot is making a fruit cup. Put its instructions in order. Use one cup, one portion of fruit, one lid, and one sticker. The sticker goes on the lid; the finished cup goes on the serving tray. Move the one unnecessary step to Do Not Use.',
      initial: { order: ['lid','fruit','cup','serve','extra','label'], unused: [] },
      solution: { order: ['cup','fruit','lid','label','serve'], unused: ['extra'] }, steps: snackSteps,
      hint: 'What needs to be on the mat before the fruit can go in? Check how many lids the recipe asks for.',
      explanation: 'Cup → fruit → lid → sticker → serving tray. Remove the second lid instruction. Each step needs the result of the previous step.' },
    { title: 'Bumper Car Breakdown', short: 'Bumper Cars', skill: 'Debugging • Turns & orientation', type: 'drive', color: 'blue',
      intro: 'The empty model car must follow the blue floor around the tire island to the P bay. The arrow in the bay points LEFT toward the exit. Forward moves in the direction the car’s nose points; a turn changes the nose direction without moving the car. The program reaches P, but its final turn points the car toward the tires. Change exactly one turn command.',
      initial: ['Forward 3', 'Turn left', 'Forward 3', 'Turn left', 'Forward 2', 'Turn left'],
      solution: ['Forward 3', 'Turn left', 'Forward 3', 'Turn left', 'Forward 2', 'Turn right'],
      hint: 'The car is facing down when it reaches P. Act out the last turn: which way turns its nose toward the left-pointing exit arrow?',
      explanation: 'Change command 6 to Turn right. The car already reaches P; the repair turns its nose left (west), toward the exit arrow instead of toward the tire island.',
      start: [4,4], goal: [1,3], size: 6, facing: 0, goalFacing: 3, arena: true,
      path: Array.from({length:36},(_,n)=>[n%6,Math.floor(n/6)]).filter(([x,y])=>!([2,3].includes(x)&&[2,3].includes(y))) },
    { title: 'Ferris Wheel Fix', short: 'Ferris Wheel', skill: 'Sequencing • A complete ride cycle', type: 'sort', color: 'lavender',
      intro: 'Give the toy bear a ride! This miniature Ferris wheel starts with power OFF, an empty blue seat at the bottom, and the bear waiting on the platform. Arrange all five steps so the bear makes one full turn, returns to the platform, and the model finishes with power OFF. Toy-model rule: its loading and unloading buttons only work while power is ON.',
      initial: { order: ['power','ride','board','off','exit'], unused: [] },
      solution: { order: ['power','board','ride','exit','off'], unused: [] }, steps: wheelSteps,
      hint: 'Who needs to be in the seat before the ride starts? Keep the model powered on until the bear is back on the platform.',
      explanation: 'Power on → seat the bear → one full turn → return the bear to the platform → power off. The original program tried to run an empty seat and switched off before the bear could get out.' },
    { title: 'Midway Mix-Up', short: 'The Midway', skill: 'Patterns • Two repeating rules', type: 'pattern', color: 'pink',
      intro: 'The prize display follows TWO overlapping rules. Shapes repeat Star, Circle, Diamond. Numbers rise and fall: 1, 2, 3, 2, then repeat. The first six tiles begin the pattern, but the next row does NOT copy them. Exactly TWO of tiles 7–12 are wrong. Repair both tiles by changing their shape, number, or both.',
      initial: brokenPattern, solution: pattern,
      hint: 'Do not restart at the second row. Continue from tile 6 to tile 7. First track Star → Circle → Diamond. Then separately track 1 → 2 → 3 → 2.',
      explanation: 'Both broken tiles now match the overlapping rules. Shapes repeat Star, Circle, Diamond, while numbers repeat 1, 2, 3, 2. Because the cycles have different lengths, the second row is not a copy of the first. The two incorrect tiles are chosen again when the activity is reset.' },
    { title: 'The Maze of Mix-Ups', short: 'The Maze', skill: 'Conditionals • If–then rules', type: 'maze', color: 'mint',
      intro: 'Deliver the opening-day flag to the pennant. The buggy starts facing right (east). Each turn is relative to its nose. At each square, use the matching sign rule once, then move forward one square. With no sign, just move forward. One rule is wrong. Fix it so the same program works at BOTH B signs.',
      initial: ['Turn right','Turn right'], solution: ['Turn left','Turn right'],
      hint: 'At the first B sign, the buggy faces east. Which turn points up the path? Try that same rule at the second B sign.',
      explanation: 'IF the sign is B, THEN turn left. Keep Y as turn right. The B rule turns the buggy north at both blue signs.',
      start: [0,5], goal: [4,1], size: 6, facing: 1,
      path: [[0,5],[1,5],[2,5],[2,4],[2,3],[3,3],[4,3],[4,2],[4,1]],
      signs: {'2,5':'B', '2,3':'Y', '4,3':'B'} }
  ];
  puzzles.forEach((p, i) => { p.letter = letters[i]; p.id = i; });
  function validDraft(i, draft) {
    const p = puzzles[i];
    if (p.type === 'sort') return draft && Array.isArray(draft.order) && Array.isArray(draft.unused) && same([...draft.order, ...draft.unused].sort(), Object.keys(p.steps).sort()) && (i === 1 || draft.unused.length === 0);
    if (!Array.isArray(draft) || draft.length !== p.initial.length) return false;
    if (p.type === 'pattern') return draft.every((v,j) => v && patternShapes.includes(v.shape) && [1,2,3].includes(v.count) && (j >= 6 || same(v,p.initial[j])));
    const options = p.type === 'route' ? directions : p.type === 'drive' ? ['Forward 1','Forward 2','Forward 3','Turn left','Turn right'] : ['Turn left','Turn right','Keep facing'];
    return draft.every(v => options.includes(v));
  }
  function simulate(i, draft) {
    const p = puzzles[i];
    if (!validDraft(i, draft)) return {ok: false, frames: [], message: 'Restore the original code and try again.'};
    const frames = [];
    let ok = true, message = '';
    if (p.type === 'route' || p.type === 'drive' || p.type === 'maze') {
      let [x,y] = p.start, facing = p.facing;
      frames.push({x,y,facing,active:-1,text:`Start: row ${y+1}, column ${x+1}, facing ${directions[facing].toLowerCase()}.`});
      const routeVisited = new Set([`${x},${y}`]);
      const push = (active,text) => frames.push({x,y,facing,active,text});
      const move = (active, direction, reverse=false) => {
        const [dx,dy] = vectors[direction];
        const nextX=x+dx,nextY=y+dy;
        if (p.type === 'route') {
          const inside=nextX>=0&&nextX<p.size&&nextY>=0&&nextY<p.size;
          const onTrack=p.path.some(pos=>pos[0]===nextX&&pos[1]===nextY);
          const repeated=routeVisited.has(`${nextX},${nextY}`);
          x=nextX;y=nextY;if(!reverse)facing=direction;
          routeVisited.add(`${x},${y}`);
          let problem='';
          if(repeated)problem=' This command returned to a square the coaster already visited.';
          else if(!inside)problem=' This command sent the coaster beyond the model board.';
          else if(!onTrack)problem=' This command moved the coaster off the cream-colored track.';
          if(problem) {
            ok=false;
            if(!message)message=`Command ${active+1} made the route go wrong.${problem} The test still ran all ${draft.length} commands.`;
          }
          push(active,`Command ${active+1}: moved ${directions[direction].toLowerCase()} to row ${y+1}, column ${x+1}.${problem}${problem?' The program keeps going.':''}`);
          return true;
        }
        if (!p.path.some(pos => pos[0] === nextX && pos[1] === nextY)) {
          ok = false; message = `The model stopped at the edge of the ${p.arena ? 'driving area' : 'lane'} after ${p.type === 'maze' ? 'the sign rule' : `command ${active+1}`}. Trace the direction and try a different edit.`;
          push(active,message); return false;
        }
        x += dx; y += dy; if(!reverse) facing = direction;
        push(active,`${reverse?'Reversed':'Moved'} ${directions[direction].toLowerCase()} to row ${y+1}, column ${x+1}. Nose faces ${directions[facing].toLowerCase()}.`); return true;
      };
      if (p.type === 'maze') {
        for (let n=0;n<24 && ok && !same([x,y],p.goal);n++) {
          const sign = p.signs[`${x},${y}`], ruleIndex = sign === 'B' ? 0 : sign === 'Y' ? 1 : -1;
          if (sign) {
            const action = draft[ruleIndex];
            facing = (facing + (action === 'Turn left' ? 3 : action === 'Turn right' ? 1 : 0)) % 4;
            push(ruleIndex,`Sign ${sign}: ${action.toLowerCase()}. Now facing ${directions[facing].toLowerCase()}.`);
          }
          move(ruleIndex,facing);
        }
      } else {
        for (let j=0;j<draft.length && (ok || p.type==='route');j++) {
          const command = draft[j];
          if (p.type === 'route') move(j,directions.indexOf(command));
          else if (command.startsWith('Turn')) {
            facing = (facing + (command === 'Turn left' ? 3 : 1)) % 4;
            push(j,`Command ${j+1}: ${command.toLowerCase()}. Facing ${directions[facing].toLowerCase()}; position stays the same.`);
          } else for(let n=0;n<Number(command.slice(-1)) && ok;n++) move(j,command.startsWith('Reverse')?(facing+2)%4:facing,command.startsWith('Reverse'));
        }
      }
      ok = ok && same([x,y],p.goal);
      if(ok && p.goalFacing!==undefined && facing!==p.goalFacing){ok=false;message='The car reached P, but its nose points toward the tire island. Change the final turn so the nose points left toward the exit arrow.';}
      if (!ok && !message) message = 'The model finished away from the destination. Follow each command and try again.';
      if (ok && draft.filter((v,j) => v !== p.initial[j]).length !== 1) { ok = false; message = 'The model arrived, but this repair needs exactly one changed command. Compare with the original code.'; }
    } else if (i === 1) {
      let stage=0;
      frames.push({active:-1,stage,text:'An empty filling mat. The fruit, cup, lid, and sticker are ready.'});
      const required = ['cup','fruit','lid','label','serve'];
      const errors = {cup:'The cup belongs on the mat before the other steps.',fruit:'The fruit needs an empty cup on the mat first.',lid:'The cup needs fruit before its lid.',label:'The sticker needs a lid to stick to.',serve:'The cup needs fruit, a lid, and a sticker before serving.',extra:'The recipe uses one lid. A second lid does not help.'};
      for(let j=0;j<draft.order.length;j++) {
        const key = draft.order[j];
        if(key !== required[stage]) { ok=false; message=errors[key]; frames.push({active:j,stage,text:message}); break; }
        stage++; frames.push({active:j,stage,text:p.steps[key]});
      }
      ok = ok && stage === 5 && same(draft.unused,['extra']);
      if(!ok && !message) message='Some needed instructions are missing. Review the recipe and Do Not Use area.';
    } else if (i === 3) {
      let angle=0, powered=false, onboard=false, rode=false, returned=false;
      const push = (active,text) => frames.push({active,angle,powered,onboard,rode,returned,text});
      push(-1,'Power OFF. The bear waits on the platform. The empty blue seat is at the bottom.');
      for(let j=0;j<draft.order.length;j++) {
        const key=draft.order[j];
        if(key==='power' && !powered && !rode) powered=true;
        else if(key==='board' && powered && !onboard && !rode) onboard=true;
        else if(key==='ride' && powered && onboard && !rode){
          for(let turn=1;turn<=8;turn++) {angle=turn*45;push(j,`The bear is riding: ${turn===8?'one full turn complete; back at the bottom':turn+' of 8 parts of a full turn'}.`);}
          rode=true;
        }
        else if(key==='exit' && powered && onboard && rode){onboard=false;returned=true;}
        else if(key==='off' && powered && returned) powered=false;
        else {
          ok=false;
          message=key==='board'?'The model needs power before its loading button can seat the bear.':key==='ride'?'The ride needs power and a bear in the blue seat first.':key==='exit'?'The bear needs to finish one full turn before returning to the platform. Keep the power on for unloading.':key==='off'?'The bear is not back on the platform yet. Keep the model powered on until the ride and unloading are finished.':'That step cannot work yet. Check the power and the bear’s location.';
          push(j,message);break;
        }
        push(j,p.steps[key]);
      }
      ok=ok&&returned&&!powered;
      if(!ok&&!message) message='Finish the bear’s ride and leave the model switched off. Use every step.';
    } else {
      frames.push({active:-1,text:'Checking the shape rule and the number rule, one tile at a time.'});
      for(let j=0;j<draft.length;j++) {
        const match=same(draft[j],p.solution[j]);
        frames.push({active:j,match,text:`Tile ${j+1}: ${draft[j].count} ${draft[j].shape.toLowerCase()}${draft[j].count>1?'s':''}. ${match?'Both rules match.':'This tile breaks a rule. Compare shapes and numbers separately.'}`});
        if(!match) {ok=false;message=`Tile ${j+1} still breaks a repeating rule. The original display has two incorrect tiles. Follow the shapes, then the numbers.`;break;}
      }
    }
    return {ok, frames, message:ok?'The test works! Use Check Answer to collect your letter.':message};
  }
  const api={puzzles,letters,directions,patternShapes,clone,same,makeBrokenPattern,patternBugIndexes,validPatternStart,validDraft,simulate};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.Park=api;
})(typeof globalThis!=='undefined'?globalThis:this);
