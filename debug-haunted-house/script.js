const STORAGE_KEY = 'debugHauntedHouseProgress';
const TEACHER_GUIDE_PASSWORD = 'TCEA';
const DIRECTIONS = ['Up', 'Down', 'Left', 'Right'];
const ARROWS = { Up: '^', Down: 'v', Left: '<', Right: '>' };
const DELAY = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 30 : 420;

const rooms = [
  {
    id: 'path',
    title: 'The Crooked Path',
    letter: 'T',
    hint: 'Watch what happens during the third move.',
    intro: 'The arrows should lead the cat to the haunted house door, but one arrow is wrong. Test the path. Select the incorrect arrow and replace it with the correct direction.'
  },
  {
    id: 'potion',
    title: 'The Potion Room',
    letter: 'R',
    hint: 'Begin by setting up the cauldron. The finished potion should go into the bottle last.',
    intro: 'Put the potion instructions in order. Move the one unnecessary card into Do Not Use.'
  },
  {
    id: 'tower',
    title: "The Witch's Tower",
    letter: 'E',
    hint: 'Check which direction the witch is facing before the final move.',
    intro: "The witch's code contains one bug. Test the code, find the incorrect command, and replace it so the witch reaches the moon."
  },
  {
    id: 'pumpkin',
    title: 'The Pumpkin Workshop',
    letter: 'A',
    hint: 'The pumpkin must be opened and cleaned before the face is cut out.',
    intro: 'This is a pretend sequencing activity. An adult should handle any real cutting. Arrange the steps in a safe and logical order.'
  },
  {
    id: 'hallway',
    title: 'The Banner Blunder',
    letter: 'T',
    hint: 'Look at the first three pictures. That same group should repeat.',
    intro: 'The banner has a repeating pattern, but one picture does not belong. Select the bug and replace it with the correct picture.'
  },
  {
    id: 'escape',
    title: 'The Escape Hall',
    letter: 'S',
    hint: 'After reaching the ghost, decide which turn points toward the trap door.',
    intro: 'Choose the missing if-then command, then test the algorithm to see whether the student reaches the trap door.'
  }
];

const roomExplanations = {
  path: 'A bug is a mistake in an algorithm. Changing the third direction from Down to Up sends the cat to the haunted house door.',
  potion: 'An algorithm needs clear steps in a logical order. The repeated spider-ring step is unnecessary and changes the recipe.',
  tower: 'After flying across the sky, the witch must turn left to face the moon. Turning right sends her toward the chimney.',
  pumpkin: 'We debug everyday processes, not just computer code. The steps must be in an order that is safe and possible to complete.',
  hallway: 'The banner pattern repeats Bat, Pumpkin, Ghost. The cat breaks the pattern and should be replaced with a ghost.',
  escape: 'The condition tells the character what to do when the ghost appears. Turning left points the character toward the trap door.'
};

const initialState = {
  solved: [],
  currentRoom: null,
  finalUnlocked: false
};

resetSavedActivityOnOpen();

let appState = loadState();
let currentRoomIndex = null;
let room1Commands = ['Up', 'Up', 'Down', 'Right', 'Right', 'Right'];
let room3Commands = ['Move forward 3 spaces', 'Turn right', 'Move forward 3 spaces', 'Turn right', 'Move forward 1 space'];
let room5Pattern = ['Bat', 'Pumpkin', 'Ghost', 'Bat', 'Pumpkin', 'Cat', 'Bat', 'Pumpkin', 'Ghost'];
let room6Choice = '';
let sortableStores = {};
let draggedCard = null;

const homeScreen = document.getElementById('homeScreen');
const roomScreen = document.getElementById('roomScreen');
const finalScreen = document.getElementById('finalScreen');
const roomMap = document.getElementById('roomMap');
const roomDots = document.getElementById('roomDots');
const letterSlots = document.getElementById('letterSlots');
const roomEyebrow = document.getElementById('roomEyebrow');
const roomTitle = document.getElementById('roomTitle');
const roomIntro = document.getElementById('roomIntro');
const roomContent = document.getElementById('roomContent');
const hintBox = document.getElementById('hintBox');
const feedbackBox = document.getElementById('feedbackBox');
const testButton = document.getElementById('testButton');
const resetTestButton = document.getElementById('resetTestButton');
const checkButton = document.getElementById('checkButton');
const finalLetters = document.getElementById('finalLetters');
const finalFeedback = document.getElementById('finalFeedback');
const secretInput = document.getElementById('secretInput');
const frontDoor = document.getElementById('frontDoor');
const playAgainButton = document.getElementById('playAgainButton');
const celebration = document.getElementById('celebration');
const teacherPassword = document.getElementById('teacherPassword');
const teacherUnlockButton = document.getElementById('teacherUnlockButton');
const teacherAuthFeedback = document.getElementById('teacherAuthFeedback');
const teacherPasswordPanel = document.getElementById('teacherPasswordPanel');
const teacherGuideContent = document.getElementById('teacherGuideContent');
let teacherGuideUnlocked = false;
let activeTestRun = 0;

document.getElementById('homeButton').addEventListener('click', showHome);
document.getElementById('continueButton').addEventListener('click', () => {
  if (allRoomsSolved()) {
    showFinal();
    return;
  }
  openRoom(nextRoomIndex());
});
document.getElementById('resetButton').addEventListener('click', resetActivity);
document.getElementById('hintButton').addEventListener('click', showHint);
document.getElementById('testButton').addEventListener('click', testCurrentRoom);
resetTestButton.addEventListener('click', resetCurrentTest);
document.getElementById('checkButton').addEventListener('click', checkCurrentRoom);
document.getElementById('unlockButton').addEventListener('click', checkFinalWord);
document.getElementById('playAgainButton').addEventListener('click', () => resetActivity(false));
document.getElementById('teacherToggle').addEventListener('click', toggleTeacherGuide);
teacherUnlockButton.addEventListener('click', unlockTeacherGuide);
teacherPassword.addEventListener('keydown', event => {
  if (event.key === 'Enter') unlockTeacherGuide();
});
secretInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') checkFinalWord();
});

renderProgress();
renderMap();
showHome();

function resetSavedActivityOnOpen() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Local storage may be unavailable in some restricted browser modes.
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...initialState, ...saved, solved: Array.isArray(saved?.solved) ? saved.solved : [] };
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function isSolved(index) {
  return appState.solved.includes(rooms[index].id);
}

function isUnlocked(index) {
  return teacherGuideUnlocked || index === 0 || isSolved(index - 1);
}

function nextRoomIndex() {
  const firstUnsolved = rooms.findIndex(room => !appState.solved.includes(room.id));
  return firstUnsolved === -1 ? 5 : firstUnsolved;
}

function allRoomsSolved() {
  return rooms.every(room => appState.solved.includes(room.id));
}

function renderProgress() {
  roomDots.innerHTML = rooms.map((room, index) => {
    const classes = ['dot'];
    if (isUnlocked(index)) classes.push('unlocked');
    if (isSolved(index)) classes.push('solved');
    return `<span class="${classes.join(' ')}" aria-label="Room ${index + 1} ${isSolved(index) ? 'complete' : isUnlocked(index) ? 'unlocked' : 'locked'}">${index + 1}</span>`;
  }).join('');

  letterSlots.innerHTML = rooms.map(room => {
    const solved = appState.solved.includes(room.id);
    return `<span class="letter-slot" aria-label="${solved ? `Letter ${room.letter}` : 'Empty letter space'}">${solved ? room.letter : '_'}</span>`;
  }).join('');

  finalLetters.textContent = rooms.map(room => appState.solved.includes(room.id) ? room.letter : '_').join(' ');
}

function renderMap() {
  roomMap.innerHTML = rooms.map((room, index) => {
    const locked = !isUnlocked(index);
    const solved = isSolved(index);
    return `
      <button class="room-card ${locked ? '' : 'unlocked'} ${solved ? 'solved' : ''}" type="button" data-room-index="${index}" ${locked ? 'disabled' : ''}>
        ${mapArt(index)}
        <strong>${index + 1}. ${room.title}</strong>
        <span>${solved ? `Complete: letter ${room.letter}` : locked ? 'Locked' : 'Unlocked'}</span>
      </button>
    `;
  }).join('');

  roomMap.querySelectorAll('button[data-room-index]').forEach(button => {
    button.addEventListener('click', () => openRoom(Number(button.dataset.roomIndex)));
  });
}

function showHome() {
  setActiveScreen(homeScreen);
  document.getElementById('continueButton').textContent = allRoomsSolved() ? 'Open Final Unlock' : `Start Room ${nextRoomIndex() + 1}`;
  renderProgress();
  renderMap();
}

function setActiveScreen(screen) {
  [homeScreen, roomScreen, finalScreen].forEach(item => item.classList.toggle('active', item === screen));
}

function openRoom(index) {
  if (!isUnlocked(index)) return;
  currentRoomIndex = index;
  appState.currentRoom = rooms[index].id;
  saveState();
  const room = rooms[index];
  roomEyebrow.textContent = `Room ${index + 1}`;
  roomTitle.textContent = room.title;
  roomIntro.textContent = room.intro;
  hintBox.hidden = true;
  hintBox.textContent = '';
  setFeedback('');
  renderRoom(room.id);
  setActiveScreen(roomScreen);
  roomTitle.focus?.();
}

function showHint() {
  if (currentRoomIndex === null) return;
  hintBox.textContent = rooms[currentRoomIndex].hint;
  hintBox.hidden = false;
}

function setFeedback(message, type = '') {
  feedbackBox.className = `feedback-box ${type}`.trim();
  feedbackBox.innerHTML = message;
}

function completeRoom(roomId) {
  if (!appState.solved.includes(roomId)) {
    appState.solved.push(roomId);
  }
  saveState();
  renderProgress();
  renderMap();
  const allSolved = allRoomsSolved();
  setFeedback(`<strong>Correct!</strong> You earned the letter ${rooms[currentRoomIndex].letter}.<br>${roomExplanations[roomId]}${allSolved ? '<br>All six rooms are complete. The final unlock is ready for the final word.' : ''}`, 'success');
  showSideReveal(roomId);
  if (allSolved) {
    setTimeout(showFinal, DELAY);
  }
}

function showSideReveal(roomId) {
  const revealSlot = document.getElementById(`${roomId}RevealSlot`);
  if (!revealSlot) return;
  if (roomId === 'potion') revealSlot.innerHTML = potionRevealMarkup();
  if (roomId === 'pumpkin') {
    document.querySelector('.pumpkin-sequence-wrap')?.classList.remove('reveal-hidden');
    document.getElementById('pumpkinRevealPanel')?.removeAttribute('hidden');
    revealSlot.innerHTML = pumpkinRevealMarkup();
  }
}

function potionRevealMarkup() {
  return `
    <figure class="side-room-reveal">
      <img src="assets/thepotionroom.png?v=potion-reveal-20260802" alt="Finished green potion in a cauldron with spider rings and a purple feather">
      <figcaption>Potion Room complete!</figcaption>
    </figure>
  `;
}

function pumpkinRevealMarkup() {
  return `
    <figure class="side-room-reveal pumpkin-workshop-reveal">
      <img src="assets/thepumpkinworkshop.png?v=pumpkin-workshop-reveal-20260803" alt="Glowing carved pumpkin with a candle inside">
      <figcaption>Pumpkin Workshop complete!</figcaption>
    </figure>
  `;
}

function showFinal() {
  renderProgress();
  setActiveScreen(finalScreen);
  finalFeedback.textContent = '';
  secretInput.value = '';
  if (appState.finalUnlocked) unlockFinalDoor();
  secretInput.focus();
}

function toggleTeacherGuide() {
  const guide = document.getElementById('teacherGuide');
  const toggle = document.getElementById('teacherToggle');
  const isOpening = guide.hidden;
  guide.hidden = !isOpening;
  toggle.setAttribute('aria-expanded', String(isOpening));
  toggle.textContent = isOpening ? 'Hide Teacher Guide' : 'Teacher Guide';
  if (isOpening) {
    if (teacherGuideUnlocked) {
      teacherGuideContent.hidden = false;
      teacherPasswordPanel.hidden = true;
    } else {
      teacherPasswordPanel.hidden = false;
      teacherGuideContent.hidden = true;
      teacherPassword.focus();
    }
  }
}

function unlockTeacherGuide() {
  const normalizedPassword = teacherPassword.value.trim().toUpperCase();
  if (normalizedPassword !== TEACHER_GUIDE_PASSWORD) {
    teacherAuthFeedback.textContent = 'That password did not work. Please ask your teacher.';
    teacherPassword.select();
    return;
  }
  teacherGuideUnlocked = true;
  teacherPassword.value = '';
  teacherAuthFeedback.textContent = '';
  teacherPasswordPanel.hidden = true;
  teacherGuideContent.hidden = false;
  renderProgress();
  renderMap();
}

function renderRoom(roomId) {
  if (roomId === 'path') renderRoom1();
  if (roomId === 'potion') renderRoom2();
  if (roomId === 'tower') renderRoom3();
  if (roomId === 'pumpkin') renderRoom4();
  if (roomId === 'hallway') renderRoom5();
  if (roomId === 'escape') renderRoom6();
}

function renderRoom1(position = { row: 5, col: 1 }) {
  testButton.hidden = false;
  resetTestButton.hidden = false;
  roomContent.innerHTML = `
    <div class="activity-layout path-layout">
      <div class="scene-panel">
        <h3>Test Area</h3>
        <div class="grid-board" id="pathGrid" aria-label="Five by five path grid"></div>
      </div>
      <div class="work-panel">
        <h3>Buggy Algorithm</h3>
        <div class="commands" id="pathCommands"></div>
      </div>
    </div>
  `;
  renderGrid('pathGrid', position, {
    door: { row: 2, col: 4 },
    decorations: [
      { row: 1, col: 1, type: 'tree' },
      { row: 4, col: 2, type: 'pumpkin' },
      { row: 3, col: 5, type: 'grave' },
      { row: 5, col: 5, type: 'tree' }
    ],
    character: 'cat'
  });
  renderDirectionCommands();
}

function renderDirectionCommands() {
  const wrap = document.getElementById('pathCommands');
  wrap.innerHTML = room1Commands.map((direction, index) => `
    <div class="arrow-card">
      <span class="arrow-symbol" aria-hidden="true">${ARROWS[direction]}</span>
      <label for="pathCommand${index}">Command ${index + 1}</label>
      <select id="pathCommand${index}" data-path-command="${index}">
        ${DIRECTIONS.map(option => `<option value="${option}" ${option === direction ? 'selected' : ''}>${option}</option>`).join('')}
      </select>
    </div>
  `).join('');
  wrap.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
      room1Commands[Number(select.dataset.pathCommand)] = select.value;
      renderDirectionCommands();
    });
  });
}

function renderRoom2() {
  testButton.hidden = true;
  resetTestButton.hidden = true;
  initSortable('potion', [
    'Drop in one purple feather.',
    'Add three more spider rings.',
    'Place the cauldron on the table.',
    'Stir the potion five times.',
    'Pour in two cups of swamp water.',
    'Pour the finished potion into the bottle.',
    'Add three spider rings.'
  ], true);
}

function renderRoom3(position = { row: 5, col: 1 }, facing = 'north') {
  testButton.hidden = false;
  resetTestButton.hidden = false;
  roomContent.innerHTML = `
    <div class="activity-layout">
      <div class="scene-panel">
        <h3>Flight Grid</h3>
        <div class="grid-board" id="towerGrid" aria-label="Five by five flight grid"></div>
      </div>
      <div class="work-panel">
        <h3>Block Code</h3>
        <div class="commands" id="towerCommands"></div>
      </div>
    </div>
  `;
  renderGrid('towerGrid', position, {
    moon: { row: 1, col: 4 },
    chimney: { row: 3, col: 4 },
    decorations: [
      { row: 1, col: 1, type: 'cloud' },
      { row: 2, col: 5, type: 'bat' },
      { row: 4, col: 3, type: 'cloud' }
    ],
    character: 'witch',
    facing
  });
  renderTowerCommands();
}

function renderTowerCommands() {
  const options = ['Move forward 1 space', 'Move forward 2 spaces', 'Move forward 3 spaces', 'Turn left', 'Turn right'];
  const wrap = document.getElementById('towerCommands');
  wrap.innerHTML = room3Commands.map((command, index) => `
    <div class="code-card">
      <label for="towerCommand${index}">Command ${index + 1}</label>
      <select id="towerCommand${index}" data-tower-command="${index}">
        ${options.map(option => `<option value="${option}" ${option === command ? 'selected' : ''}>${option}</option>`).join('')}
      </select>
    </div>
  `).join('');
  wrap.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
      room3Commands[Number(select.dataset.towerCommand)] = select.value;
    });
  });
}

function renderRoom4() {
  testButton.hidden = true;
  resetTestButton.hidden = true;
  initSortable('pumpkin', [
    'Draw a face on the pumpkin.',
    'Place a battery-operated light inside.',
    'Have an adult cut off the top.',
    'Place the pumpkin on a stable table.',
    'Have an adult cut out the face.',
    'Scoop out the seeds.'
  ], false);
}

function renderRoom5() {
  testButton.hidden = true;
  resetTestButton.hidden = true;
  roomContent.innerHTML = `
    <div class="scene-panel">
      <h3>Repeating Picture Pattern</h3>
      <div class="pattern-row" id="patternRow"></div>
    </div>
  `;
  renderPattern();
}

function renderPattern() {
  const choices = ['Bat', 'Pumpkin', 'Ghost', 'Cat'];
  const wrap = document.getElementById('patternRow');
  wrap.innerHTML = room5Pattern.map((item, index) => `
    <div class="pattern-card">
      ${iconSvg(item.toLowerCase())}
      <label for="pattern${index}">Picture ${index + 1}</label>
      <select id="pattern${index}" data-pattern-index="${index}">
        ${choices.map(choice => `<option value="${choice}" ${choice === item ? 'selected' : ''}>${choice}</option>`).join('')}
      </select>
    </div>
  `).join('');
  wrap.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
      room5Pattern[Number(select.dataset.patternIndex)] = select.value;
      renderPattern();
    });
  });
}

function renderRoom6(position = { row: 5, col: 1 }, facing = 'north') {
  testButton.hidden = false;
  resetTestButton.hidden = false;
  roomContent.innerHTML = `
    <div class="activity-layout">
      <div class="scene-panel">
        <h3>Hallway Grid</h3>
        <div class="grid-board" id="escapeGrid" aria-label="Five by five escape hallway grid"></div>
      </div>
      <div class="work-panel">
        <h3>Incomplete Algorithm</h3>
        <ol>
          <li>Move forward until you reach the pumpkin.</li>
          <li>Turn right.</li>
          <li>Move forward 2 spaces.</li>
          <li><strong>Missing command</strong></li>
          <li>Move forward 2 spaces.</li>
          <li>Stop at the trap door.</li>
        </ol>
        <div class="choice-list">
          ${[
            'If you see a ghost, turn left.',
            'If you see a ghost, turn right.',
            'If you see a ghost, move backward.',
            'If you see a ghost, stop.'
          ].map(choice => `
            <label class="choice-card">
              <input type="radio" name="escapeChoice" value="${choice}" ${room6Choice === choice ? 'checked' : ''}>
              <span>${choice}</span>
            </label>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  renderGrid('escapeGrid', position, {
    pumpkin: { row: 3, col: 1 },
    ghost: { row: 3, col: 3 },
    trapdoor: { row: 1, col: 3 },
    character: 'student',
    facing
  });
  roomContent.querySelectorAll('input[name="escapeChoice"]').forEach(input => {
    input.addEventListener('change', () => {
      room6Choice = input.value;
    });
  });
}

function initSortable(kind, cards, hasUnused) {
  if (!sortableStores[kind]) {
    sortableStores[kind] = {
      sequence: cards.slice(),
      unused: []
    };
  }
  roomContent.innerHTML = `
    <div class="sequence-wrap ${kind}-sequence-wrap ${kind === 'pumpkin' && !appState.solved.includes('pumpkin') ? 'reveal-hidden' : ''}">
      ${kind === 'potion' ? `
      <aside class="recipe-guide" aria-label="Potion recipe guide">
        <h3>Potion Clue Card</h3>
        <p>Use these clues to debug the recipe without seeing the answer.</p>
        <ul>
          <li>The cauldron must be ready before anything goes into it.</li>
          <li>The potion needs one liquid step and two ingredient steps before it can be stirred.</li>
          <li>Stir only after all needed ingredients are in the cauldron.</li>
          <li>The finished potion goes into the bottle after it has been stirred.</li>
        </ul>
      </aside>` : ''}
      <div class="work-panel">
        <h3>${kind === 'potion' ? 'Recipe Steps' : 'Pumpkin Steps'}</h3>
        <div class="sequence-list" id="${kind}Sequence"></div>
      </div>
      ${kind === 'pumpkin' ? `
      <div class="work-panel pumpkin-reveal-panel" id="pumpkinRevealPanel" ${appState.solved.includes('pumpkin') ? '' : 'hidden'}>
        <h3>Finished Pumpkin</h3>
        <div class="side-reveal-slot" id="pumpkinRevealSlot">${appState.solved.includes('pumpkin') ? pumpkinRevealMarkup() : ''}</div>
      </div>` : ''}
      ${hasUnused ? `
      <div class="work-panel">
        <p class="drop-title">Do Not Use</p>
        <div class="drop-zone" id="${kind}Unused" data-drop-zone="unused"></div>
        ${kind === 'potion' ? `<div class="side-reveal-slot" id="potionRevealSlot">${appState.solved.includes('potion') ? potionRevealMarkup() : ''}</div>` : ''}
      </div>` : ''}
    </div>
  `;
  renderSortable(kind, hasUnused);
}

function renderSortable(kind, hasUnused) {
  const store = sortableStores[kind];
  document.getElementById(`${kind}Sequence`).innerHTML = store.sequence.map((text, index) => sortableCard(kind, text, index, 'sequence', hasUnused)).join('');
  if (hasUnused) {
    document.getElementById(`${kind}Unused`).innerHTML = store.unused.length
      ? store.unused.map((text, index) => sortableCard(kind, text, index, 'unused', hasUnused)).join('')
      : '<p>Move one unnecessary card here.</p>';
  }
  bindSortable(kind, hasUnused);
}

function sortableCard(kind, text, index, zone, hasUnused) {
  const zoneButton = hasUnused
    ? (zone === 'sequence'
      ? '<button type="button" aria-label="Move card to Do Not Use" data-move="unused">X</button>'
      : '<button type="button" aria-label="Move card back to recipe steps" data-move="sequence">+</button>')
    : '';
  return `
    <div class="sortable-card" tabindex="0" draggable="true" aria-grabbed="false" data-kind="${kind}" data-zone="${zone}" data-index="${index}">
      <span class="card-number">${zone === 'sequence' ? index + 1 : '-'}</span>
      <span>${text}</span>
      <span class="move-buttons">
        <button type="button" aria-label="Move card up" data-move="up">^</button>
        <button type="button" aria-label="Move card down" data-move="down">v</button>
        ${zoneButton}
      </span>
    </div>
  `;
}

function bindSortable(kind, hasUnused) {
  roomContent.querySelectorAll('.sortable-card').forEach(card => {
    card.addEventListener('dragstart', () => {
      draggedCard = {
        kind,
        zone: card.dataset.zone,
        index: Number(card.dataset.index)
      };
      card.setAttribute('aria-grabbed', 'true');
    });
    card.addEventListener('dragend', () => {
      draggedCard = null;
      card.setAttribute('aria-grabbed', 'false');
    });
    card.addEventListener('dragover', event => event.preventDefault());
    card.addEventListener('drop', event => {
      event.preventDefault();
      if (!draggedCard) return;
      moveCard(kind, draggedCard.zone, draggedCard.index, card.dataset.zone, Number(card.dataset.index));
      renderSortable(kind, hasUnused);
    });
  });

  roomContent.querySelectorAll('[data-move]').forEach(button => {
    button.addEventListener('click', event => {
      const card = event.target.closest('.sortable-card');
      const zone = card.dataset.zone;
      const index = Number(card.dataset.index);
      const action = button.dataset.move;
      if (action === 'up') reorderCard(kind, zone, index, index - 1);
      if (action === 'down') reorderCard(kind, zone, index, index + 1);
      if (hasUnused && action === 'unused') moveCard(kind, zone, index, 'unused', sortableStores[kind].unused.length);
      if (hasUnused && action === 'sequence') moveCard(kind, zone, index, 'sequence', sortableStores[kind].sequence.length);
      renderSortable(kind, hasUnused);
    });
  });

  if (hasUnused) {
    const zone = document.getElementById(`${kind}Unused`);
    zone.addEventListener('dragover', event => {
      event.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', event => {
      event.preventDefault();
      zone.classList.remove('drag-over');
      if (!draggedCard) return;
      moveCard(kind, draggedCard.zone, draggedCard.index, 'unused', sortableStores[kind].unused.length);
      renderSortable(kind, hasUnused);
    });
  }
}

function reorderCard(kind, zone, from, to) {
  const list = sortableStores[kind][zone];
  if (to < 0 || to >= list.length) return;
  const [card] = list.splice(from, 1);
  list.splice(to, 0, card);
}

function moveCard(kind, fromZone, fromIndex, toZone, toIndex) {
  const store = sortableStores[kind];
  const [card] = store[fromZone].splice(fromIndex, 1);
  if (!card) return;
  store[toZone].splice(toIndex, 0, card);
}

function renderGrid(gridId, characterPosition, details) {
  const grid = document.getElementById(gridId);
  const cells = [];
  for (let row = 1; row <= 5; row += 1) {
    for (let col = 1; col <= 5; col += 1) {
      const items = [];
      if (details.door?.row === row && details.door?.col === col) items.push(iconSvg('door'));
      if (details.trapdoor?.row === row && details.trapdoor?.col === col) items.push(iconSvg('trapdoor'));
      if (details.moon?.row === row && details.moon?.col === col) items.push(iconSvg('moon'));
      if (details.chimney?.row === row && details.chimney?.col === col) items.push(iconSvg('chimney'));
      if (details.pumpkin?.row === row && details.pumpkin?.col === col) items.push(iconSvg('pumpkin'));
      if (details.ghost?.row === row && details.ghost?.col === col) items.push(iconSvg('ghost'));
      details.decorations?.filter(item => item.row === row && item.col === col).forEach(item => items.push(iconSvg(item.type)));
      if (characterPosition.row === row && characterPosition.col === col) items.push(characterSvg(details.character, details.facing));
      cells.push(`<div class="cell"><span class="cell-label">${row},${col}</span>${items.join('')}</div>`);
    }
  }
  grid.innerHTML = cells.join('');
}

async function testCurrentRoom() {
  if (currentRoomIndex === null) return;
  setFeedback('');
  const roomId = rooms[currentRoomIndex].id;
  const testRun = activeTestRun + 1;
  activeTestRun = testRun;
  testButton.disabled = true;
  resetTestButton.disabled = false;
  try {
    if (roomId === 'path') await animatePath(testRun);
    if (roomId === 'tower') await animateTower(testRun);
    if (roomId === 'escape') await animateEscape(testRun);
  } finally {
    if (activeTestRun === testRun) {
      testButton.disabled = false;
      resetTestButton.disabled = false;
    }
  }
}

function resetCurrentTest() {
  if (currentRoomIndex === null) return;
  activeTestRun += 1;
  setFeedback('');
  const roomId = rooms[currentRoomIndex].id;
  if (roomId === 'path') renderRoom1();
  if (roomId === 'tower') renderRoom3();
  if (roomId === 'escape') renderRoom6();
  testButton.disabled = false;
  resetTestButton.disabled = false;
}

async function animatePath(testRun) {
  let position = { row: 5, col: 1 };
  renderRoom1(position);
  await sleep(DELAY);
  if (activeTestRun !== testRun) return;
  for (const command of room1Commands) {
    position = step(position, command);
    renderRoom1(position);
    await sleep(DELAY);
    if (activeTestRun !== testRun) return;
  }
  const arrived = position.row === 2 && position.col === 4;
  setFeedback(arrived ? 'The cat reached the haunted house door. Now check your answer.' : 'The cat did not reach the door yet. Try changing one arrow.', arrived ? 'success' : 'error');
}

async function animateTower(testRun) {
  let position = { row: 5, col: 1 };
  let facing = 'north';
  renderRoom3(position, facing);
  await sleep(DELAY);
  if (activeTestRun !== testRun) return;
  for (const command of room3Commands) {
    if (command.startsWith('Turn')) {
      facing = turn(facing, command.endsWith('left') ? 'left' : 'right');
    } else {
      const spaces = Number(command.match(/\d+/)[0]);
      for (let i = 0; i < spaces; i += 1) position = forward(position, facing);
    }
    renderRoom3(position, facing);
    await sleep(DELAY);
    if (activeTestRun !== testRun) return;
  }
  const arrived = position.row === 1 && position.col === 4;
  setFeedback(arrived ? 'The witch reached the moon. Now check your answer.' : 'The witch did not reach the moon yet. Check the turn before the final move.', arrived ? 'success' : 'error');
}

async function animateEscape(testRun) {
  let position = { row: 5, col: 1 };
  let facing = 'north';
  renderRoom6(position, facing);
  await sleep(DELAY);
  if (activeTestRun !== testRun) return;
  while (!(position.row === 3 && position.col === 1)) {
    position = forward(position, facing);
    renderRoom6(position, facing);
    await sleep(DELAY);
    if (activeTestRun !== testRun) return;
  }
  facing = turn(facing, 'right');
  renderRoom6(position, facing);
  await sleep(DELAY);
  if (activeTestRun !== testRun) return;
  position = forward(forward(position, facing), facing);
  renderRoom6(position, facing);
  await sleep(DELAY);
  if (activeTestRun !== testRun) return;
  if (position.row === 3 && position.col === 3) {
    if (room6Choice.includes('turn left')) facing = turn(facing, 'left');
    if (room6Choice.includes('turn right')) facing = turn(facing, 'right');
    if (room6Choice.includes('move backward')) position = backward(position, facing);
    if (room6Choice.includes('stop')) {
      renderRoom6(position, facing);
      setFeedback('The student stopped at the ghost, not at the trap door.', 'error');
      return;
    }
  }
  renderRoom6(position, facing);
  await sleep(DELAY);
  if (activeTestRun !== testRun) return;
  position = forward(forward(position, facing), facing);
  renderRoom6(position, facing);
  const arrived = position.row === 1 && position.col === 3;
  setFeedback(arrived ? 'The student reached the trap door. Now check your answer.' : 'That condition does not point the student toward the trap door yet.', arrived ? 'success' : 'error');
}

function checkCurrentRoom() {
  if (currentRoomIndex === null) return;
  const roomId = rooms[currentRoomIndex].id;
  if (isSolved(currentRoomIndex)) {
    setFeedback(`<strong>Already complete.</strong><br>${roomExplanations[roomId]}`, 'success');
    return;
  }
  if (roomId === 'path') {
    if (room1Commands.join('|') === 'Up|Up|Up|Right|Right|Right') return completeRoom(roomId);
    setFeedback('Try again. One direction still sends the cat away from the door.', 'error');
  }
  if (roomId === 'potion') {
    const correct = [
      'Place the cauldron on the table.',
      'Pour in two cups of swamp water.',
      'Add three spider rings.',
      'Drop in one purple feather.',
      'Stir the potion five times.',
      'Pour the finished potion into the bottle.'
    ];
    if (arraysEqual(sortableStores.potion.sequence, correct) && arraysEqual(sortableStores.potion.unused, ['Add three more spider rings.'])) return completeRoom(roomId);
    setFeedback('Try again. Check the first setup step, the last bottle step, and the extra spider-ring card.', 'error');
  }
  if (roomId === 'tower') {
    const correct = ['Move forward 3 spaces', 'Turn right', 'Move forward 3 spaces', 'Turn left', 'Move forward 1 space'];
    if (arraysEqual(room3Commands, correct)) return completeRoom(roomId);
    setFeedback('Try again. The witch needs one different turn before the last move.', 'error');
  }
  if (roomId === 'pumpkin') {
    const correct = [
      'Place the pumpkin on a stable table.',
      'Have an adult cut off the top.',
      'Scoop out the seeds.',
      'Draw a face on the pumpkin.',
      'Have an adult cut out the face.',
      'Place a battery-operated light inside.'
    ];
    if (arraysEqual(sortableStores.pumpkin.sequence, correct)) return completeRoom(roomId);
    setFeedback('Try again. Make sure the pumpkin is opened and cleaned before the face is cut out.', 'error');
  }
  if (roomId === 'hallway') {
    if (room5Pattern.join('|') === 'Bat|Pumpkin|Ghost|Bat|Pumpkin|Ghost|Bat|Pumpkin|Ghost') return completeRoom(roomId);
    setFeedback('Try again. The same group of three pictures should repeat.', 'error');
  }
  if (roomId === 'escape') {
    if (room6Choice === 'If you see a ghost, turn left.') return completeRoom(roomId);
    setFeedback('Try again. Choose the condition that points the student toward the trap door.', 'error');
  }
}

function checkFinalWord() {
  const answer = secretInput.value.toUpperCase().replace(/\s+/g, '');
  if (answer === 'TREATS') {
    appState.finalUnlocked = true;
    saveState();
    unlockFinalDoor();
    return;
  }
  finalFeedback.className = 'feedback-box error';
  finalFeedback.textContent = 'Try again. Use the six letters you collected from the rooms.';
}

function unlockFinalDoor() {
  frontDoor.classList.add('open');
  frontDoor.setAttribute('aria-label', 'Open front door');
  finalFeedback.className = 'feedback-box success';
  finalFeedback.innerHTML = '<strong>You debugged the haunted house!</strong><br>The friendly ghost says, "Thank you for fixing all the bugs. The Halloween treats are hidden behind the purple bookcase."';
  playAgainButton.hidden = false;
  startCelebration();
}

function resetActivity(ask = true) {
  if (ask && !confirm('Reset the activity and clear saved progress?')) return;
  appState = { ...initialState, solved: [] };
  room1Commands = ['Up', 'Up', 'Down', 'Right', 'Right', 'Right'];
  room3Commands = ['Move forward 3 spaces', 'Turn right', 'Move forward 3 spaces', 'Turn right', 'Move forward 1 space'];
  room5Pattern = ['Bat', 'Pumpkin', 'Ghost', 'Bat', 'Pumpkin', 'Cat', 'Bat', 'Pumpkin', 'Ghost'];
  room6Choice = '';
  sortableStores = {};
  localStorage.removeItem(STORAGE_KEY);
  frontDoor.classList.remove('open');
  playAgainButton.hidden = true;
  celebration.innerHTML = '';
  showHome();
}

function step(position, command) {
  const moves = {
    Up: { row: -1, col: 0 },
    Down: { row: 1, col: 0 },
    Left: { row: 0, col: -1 },
    Right: { row: 0, col: 1 }
  };
  const move = moves[command];
  return clampPosition({ row: position.row + move.row, col: position.col + move.col });
}

function forward(position, facing) {
  const map = { north: 'Up', south: 'Down', west: 'Left', east: 'Right' };
  return step(position, map[facing]);
}

function backward(position, facing) {
  const map = { north: 'Down', south: 'Up', west: 'Right', east: 'Left' };
  return step(position, map[facing]);
}

function turn(facing, direction) {
  const order = ['north', 'east', 'south', 'west'];
  const current = order.indexOf(facing);
  return order[(current + (direction === 'right' ? 1 : 3)) % 4];
}

function clampPosition(position) {
  return {
    row: Math.min(5, Math.max(1, position.row)),
    col: Math.min(5, Math.max(1, position.col))
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function startCelebration() {
  celebration.innerHTML = '';
  const shapes = ['star', 'pumpkin', 'candy'];
  const colors = ['#f27b1d', '#9edc45', '#fff6b7', '#fbb6ce', '#6cb6ff'];
  for (let i = 0; i < 34; i += 1) {
    const span = document.createElement('span');
    span.innerHTML = miniShape(shapes[i % shapes.length]);
    span.style.setProperty('--x', `${Math.random() * 100}%`);
    span.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    span.style.setProperty('--turn', `${Math.random() * 520}deg`);
    span.style.setProperty('--duration', `${4 + Math.random() * 2}s`);
    span.style.setProperty('--color', colors[i % colors.length]);
    celebration.appendChild(span);
  }
}

function mapArt(index) {
  const art = ['cat', 'cauldron', 'witch', 'pumpkin', 'ghost', 'trapdoor'][index];
  return iconSvg(art);
}

function characterSvg(type, facing = 'north') {
  const rotation = { north: 0, east: 90, south: 180, west: 270 }[facing] || 0;
  if (type === 'witch') {
    return `<svg viewBox="0 0 100 100" role="img" aria-label="Witch facing ${facing}" style="transform:rotate(${rotation}deg)">${witchBody()}</svg>`;
  }
  if (type === 'student') {
    return '<img class="grid-character-image" src="assets/faceicon.png?v=face-icon-20260803" alt="Student marker">';
  }
  return iconSvg('cat');
}

function iconSvg(type) {
  const icons = {
    cat: '<svg viewBox="0 0 100 100" role="img" aria-label="Black cat"><path d="M22 87 Q30 44 48 39 Q70 38 78 87 Z" fill="#111827" stroke="#211331" stroke-width="4"/><circle cx="52" cy="36" r="22" fill="#111827"/><path d="M35 20 L42 3 L50 20 M60 20 L75 6 L70 28" fill="#111827"/><circle cx="44" cy="36" r="3" fill="#9edc45"/><circle cx="61" cy="36" r="3" fill="#9edc45"/><path d="M65 64 Q96 50 83 20" fill="none" stroke="#111827" stroke-width="8" stroke-linecap="round"/></svg>',
    door: '<svg viewBox="0 0 100 100" role="img" aria-label="Haunted house door"><path d="M22 92 V42 Q22 16 50 16 Q78 16 78 42 V92 Z" fill="#f27b1d" stroke="#211331" stroke-width="6"/><circle cx="64" cy="58" r="4" fill="#fff6b7"/><path d="M32 92 V42 Q32 26 50 26 Q68 26 68 42 V92" fill="none" stroke="#211331" stroke-width="4" opacity=".35"/></svg>',
    tree: '<svg viewBox="0 0 100 100" role="img" aria-label="Spooky tree"><path d="M49 88 V32 M50 50 L24 34 M52 42 L78 25 M50 62 L78 62" fill="none" stroke="#3b2819" stroke-width="9" stroke-linecap="round"/><path d="M16 35 Q26 16 43 28 Q55 8 70 25 Q88 24 88 45 Q64 38 52 50 Q36 40 16 35 Z" fill="#293b2c"/></svg>',
    pumpkin: '<svg viewBox="0 0 100 100" role="img" aria-label="Pumpkin"><ellipse cx="50" cy="58" rx="38" ry="28" fill="#f27b1d" stroke="#211331" stroke-width="5"/><ellipse cx="50" cy="58" rx="18" ry="29" fill="#ff9a2e" opacity=".55"/><path d="M50 30 C44 24 48 16 58 12" fill="none" stroke="#5d421c" stroke-width="7" stroke-linecap="round"/><path d="M30 58 Q50 74 70 58" fill="none" stroke="#211331" stroke-width="5" stroke-linecap="round"/></svg>',
    grave: '<svg viewBox="0 0 100 100" role="img" aria-label="Friendly gravestone"><path d="M25 86 V42 Q25 18 50 18 Q75 18 75 42 V86 Z" fill="#a9b0c3" stroke="#211331" stroke-width="5"/><path d="M38 48 H62 M35 62 H65" stroke="#211331" stroke-width="5" stroke-linecap="round"/></svg>',
    moon: '<svg viewBox="0 0 100 100" role="img" aria-label="Moon"><circle cx="52" cy="48" r="34" fill="#fff6b7" stroke="#211331" stroke-width="5"/><circle cx="38" cy="34" r="5" fill="#e6d994"/><circle cx="62" cy="56" r="7" fill="#e6d994"/></svg>',
    witch: `<svg viewBox="0 0 100 100" role="img" aria-label="Witch">${witchBody()}</svg>`,
    chimney: '<svg viewBox="0 0 100 100" role="img" aria-label="Chimney"><path d="M32 88 V34 H68 V88 Z" fill="#b9442c" stroke="#211331" stroke-width="5"/><path d="M28 34 H72 V20 H28 Z" fill="#f27b1d" stroke="#211331" stroke-width="5"/><path d="M42 20 Q31 4 48 6 M59 20 Q79 6 62 2" fill="none" stroke="#a9b0c3" stroke-width="7" stroke-linecap="round"/></svg>',
    cloud: '<svg viewBox="0 0 100 100" role="img" aria-label="Cloud"><path d="M22 67 Q16 48 35 45 Q39 26 58 34 Q75 32 80 50 Q92 53 88 67 Z" fill="#dfe9ff" stroke="#211331" stroke-width="4"/></svg>',
    bat: '<svg viewBox="0 0 100 100" role="img" aria-label="Bat"><path d="M50 50 Q35 29 16 42 Q26 48 24 62 Q36 54 50 68 Q64 54 76 62 Q74 48 84 42 Q65 29 50 50 Z" fill="#25143d" stroke="#211331" stroke-width="4"/><circle cx="50" cy="53" r="8" fill="#25143d"/><circle cx="46" cy="52" r="2" fill="#fff6b7"/><circle cx="54" cy="52" r="2" fill="#fff6b7"/></svg>',
    cauldron: '<svg viewBox="0 0 100 100" role="img" aria-label="Cauldron"><ellipse cx="50" cy="36" rx="34" ry="14" fill="#9edc45" stroke="#211331" stroke-width="5"/><path d="M20 38 Q22 84 50 84 Q78 84 80 38 Z" fill="#25293e" stroke="#211331" stroke-width="5"/><path d="M32 38 Q50 48 68 38" fill="none" stroke="#d9ff77" stroke-width="6" stroke-linecap="round"/><circle cx="38" cy="23" r="6" fill="#9edc45"/><circle cx="58" cy="16" r="5" fill="#9edc45"/></svg>',
    feather: '<svg viewBox="0 0 100 100" role="img" aria-label="Purple feather"><path d="M28 84 Q44 20 82 14 Q79 58 28 84 Z" fill="#b96cff" stroke="#211331" stroke-width="5"/><path d="M28 84 Q54 54 82 14 M46 60 L31 54 M56 48 L42 40" stroke="#211331" stroke-width="4" stroke-linecap="round"/></svg>',
    bottle: '<svg viewBox="0 0 100 100" role="img" aria-label="Potion bottle"><path d="M40 12 H60 V36 Q76 46 76 68 Q76 90 50 90 Q24 90 24 68 Q24 46 40 36 Z" fill="#9edc45" stroke="#211331" stroke-width="5"/><path d="M36 65 Q50 76 65 63" fill="none" stroke="#fff6b7" stroke-width="5" stroke-linecap="round"/></svg>',
    ghost: '<svg viewBox="0 0 100 100" role="img" aria-label="Friendly ghost"><path d="M22 88 V42 Q22 16 50 16 Q78 16 78 42 V88 L66 78 L56 88 L46 78 L36 88 L28 78 Z" fill="#fff" stroke="#211331" stroke-width="5"/><circle cx="40" cy="45" r="4" fill="#211331"/><circle cx="60" cy="45" r="4" fill="#211331"/><path d="M41 60 Q50 67 59 60" fill="none" stroke="#211331" stroke-width="4" stroke-linecap="round"/></svg>',
    trapdoor: '<img class="grid-icon-image trapdoor-icon" src="assets/trapdoor.png?v=trap-door-20260804" alt="Open trap door">',
    student: '<svg viewBox="0 0 100 100" role="img" aria-label="Student"><circle cx="50" cy="30" r="18" fill="#ffd6a5" stroke="#211331" stroke-width="5"/><path d="M28 88 Q50 52 72 88 Z" fill="#48a9a6" stroke="#211331" stroke-width="5"/><circle cx="44" cy="31" r="3"/><circle cx="56" cy="31" r="3"/></svg>'
  };
  return icons[type] || '';
}

function witchBody() {
  return '<path d="M25 88 Q50 30 75 88 Z" fill="#6f35bf" stroke="#211331" stroke-width="5"/><circle cx="50" cy="38" r="15" fill="#9edc45" stroke="#211331" stroke-width="5"/><path d="M28 30 H72 L55 8 Z" fill="#25143d" stroke="#211331" stroke-width="5" stroke-linejoin="round"/><path d="M24 54 H76" stroke="#211331" stroke-width="5" stroke-linecap="round"/><circle cx="45" cy="38" r="2"/><circle cx="56" cy="38" r="2"/><path d="M44 47 Q50 51 57 47" fill="none" stroke="#211331" stroke-width="3" stroke-linecap="round"/>';
}

function miniShape(type) {
  if (type === 'star') return '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M16 2 L20 12 H30 L22 18 L25 30 L16 23 L7 30 L10 18 L2 12 H12 Z" fill="currentColor"/></svg>';
  if (type === 'candy') return '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M10 12 H22 V20 H10 Z" fill="currentColor"/><path d="M10 12 L2 8 L6 16 L2 24 L10 20 M22 12 L30 8 L26 16 L30 24 L22 20" fill="currentColor"/></svg>';
  return '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><ellipse cx="16" cy="19" rx="13" ry="9" fill="currentColor"/><path d="M16 10 Q14 6 19 4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
}
