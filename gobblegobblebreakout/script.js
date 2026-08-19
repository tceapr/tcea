const locks = [
  {
    id: 'colorSix',
    title: '6 Color Lock',
    label: 'First initial of each color. Use all capital letters. Example: RBYG',
    answerHashes: ['47d2faed', '6528f510']
  },
  {
    id: 'date',
    title: 'Date Lock',
    label: 'Use MM/DD/YYYY. Example: 01/31/2026',
    answerHash: '6cb4061d'
  },
  {
    id: 'letterFour',
    title: '4 Letter Lock',
    label: 'Use all capital letters. Example: ABCD',
    answerHash: '00abe6d7'
  },
  {
    id: 'numberEight',
    title: '8 Number Lock',
    label: 'No spaces or commas. Example: 12345678',
    answerHash: 'a875638a'
  },
  {
    id: 'directionSix',
    title: '6 Direction Lock',
    label: 'L = left, R = right, U = up, D = down. Example: LRUD',
    answerHash: 'd89438d8'
  }
];

const state = new Map(locks.map(lock => [lock.id, false]));
const locksList = document.getElementById('locksList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const clueScene = document.getElementById('clueScene');
const turkeyPictureGrid = document.getElementById('turkeyPictureGrid');
const turkeyNameTray = document.getElementById('turkeyNameTray');
const turkeyTalkStatus = document.getElementById('turkeyTalkStatus');
const turkeyTalkPuzzle = document.getElementById('turkeyTalkPuzzle');
const turkeyTalkDialog = document.getElementById('turkeyTalkDialog');
const clueDialog = document.getElementById('clueDialog');
const clueDialogTitle = document.getElementById('clueDialogTitle');
const clueDialogImage = document.getElementById('clueDialogImage');
const clueImageFallback = document.getElementById('clueImageFallback');
const winDialog = document.getElementById('winDialog');
const harvestCelebration = document.getElementById('harvestCelebration');
let celebrationTimer;
let winTimer;
let winQueued = false;

const turkeyTalkData = [
  {
    id: 'hen',
    term: 'HEN',
    image: 'assets/turkey-hen.png',
    alt: 'One adult female turkey standing calmly'
  },
  {
    id: 'tom',
    term: 'TOM',
    image: 'assets/turkey-tom.png',
    alt: 'One adult male turkey with sound marks near its beak'
  },
  {
    id: 'poult',
    term: 'POULT',
    image: 'assets/turkey-poult.png',
    alt: 'One young baby turkey'
  },
  {
    id: 'flock',
    term: 'FLOCK',
    image: 'assets/turkey-flock.png',
    alt: 'A group of several wild turkeys together'
  }
];

const turkeyTalkState = {
  selectedTerm: null,
  matches: new Map(),
  trayTerms: []
};

const clueTiles = [
  {
    id: 'turkeyTalk',
    title: 'Turkey Talk',
    icon: 'assets/gobbleicon5.png',
    action: 'turkeyTalk',
    alt: 'Roast turkey icon for Turkey Talk'
  },
  {
    id: 'pumpkinRecipe',
    title: 'Pumpkin Pie Recipe',
    icon: 'assets/gobble2icon.png',
    image: 'assets/pumpkin-pie-recipe.png',
    alt: 'Pumpkin pie slice icon for Pumpkin Pie Recipe',
    wide: true
  },
  {
    id: 'townTour',
    title: 'Thanksgiving Town Tour',
    icon: 'assets/gobble4icon.png',
    image: 'assets/thanksgiving-town-tour.png',
    alt: 'Map icon for Thanksgiving Town Tour',
    wide: true
  },
  {
    id: 'turkeyLineup',
    title: 'Turkey Lineup',
    icon: 'assets/gobble1icon.png',
    image: 'assets/turkey-lineup.png',
    alt: 'Fall leaves icon for Turkey Lineup'
  },
  {
    id: 'cornucopia',
    title: 'Harvest Symbol',
    icon: 'assets/gobble3icon.png',
    image: 'assets/cornucopia.png',
    alt: 'Cornucopia icon for Harvest Symbol'
  },
  {
    id: 'macysParade',
    title: "Macy's Day Parade",
    icon: 'assets/gobbleicon6.png',
    image: 'assets/macys-thanksgiving-parade.png',
    alt: "November calendar icon for Macy's Day Parade",
    clueAlt: "Macy's Thanksgiving Day Parade clue graphic",
    wide: true
  }
];

function shuffleItems(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderClues() {
  clueScene.innerHTML = clueTiles.map(clue => `
    <button class="clue-card-button" type="button" ${clue.action ? `data-action="${clue.action}"` : `data-image="${clue.image}"`} data-title="${clue.title}" data-alt="${clue.clueAlt || clue.alt}" ${clue.pending ? 'data-pending="true"' : ''} ${clue.wide ? 'data-wide="true"' : ''} aria-label="Open ${clue.title}">
      <span class="clue-thumb-wrap">
        <img class="clue-thumb" src="${clue.icon}" alt="" loading="lazy">
        <span class="clue-thumb-fallback" aria-hidden="true">
          <span>${clue.title}</span>
          <small>Add ${clue.icon.replace('assets/', '')}</small>
        </span>
      </span>
      <span class="clue-card-title">${clue.title}</span>
    </button>
  `).join('');

  clueScene.querySelectorAll('.clue-thumb').forEach(image => {
    image.addEventListener('error', () => {
      image.closest('.clue-card-button').classList.add('is-missing-image');
    });
  });
}

function renderTurkeyTalk() {
  turkeyPictureGrid.innerHTML = turkeyTalkData.map(item => {
    const matched = turkeyTalkState.matches.get(item.id);
    return `
      <button class="turkey-picture-card ${matched ? 'is-matched' : ''}" type="button" data-turkey-target="${item.id}" aria-label="Place a name on this turkey picture">
        <span class="turkey-image-frame">
          <img src="${item.image}" alt="${item.alt}" draggable="false">
        </span>
        <span class="turkey-drop-zone ${matched ? 'filled' : ''}">
          ${matched ? `<span class="placed-term">${matched.term}</span>` : '<span>Drop name here</span>'}
        </span>
      </button>
    `;
  }).join('');

  const availableTerms = turkeyTalkState.trayTerms.filter(item => !turkeyTalkState.matches.has(item.id));
  turkeyNameTray.innerHTML = availableTerms.map(item => `
    <button class="turkey-name-card ${turkeyTalkState.selectedTerm === item.id ? 'selected' : ''}" type="button" draggable="true" data-turkey-term="${item.id}" aria-pressed="${turkeyTalkState.selectedTerm === item.id}">
      ${item.term}
    </button>
  `).join('');
}

function resetTurkeyTalk() {
  turkeyTalkState.selectedTerm = null;
  turkeyTalkState.matches.clear();
  turkeyTalkState.trayTerms = shuffleItems(turkeyTalkData);
  turkeyTalkStatus.textContent = 'Drag or select a name, then choose a picture.';
  renderTurkeyTalk();
}

function setSelectedTurkeyTerm(termId) {
  if (turkeyTalkState.matches.has(termId)) return;
  turkeyTalkState.selectedTerm = turkeyTalkState.selectedTerm === termId ? null : termId;
  const selected = turkeyTalkData.find(item => item.id === turkeyTalkState.selectedTerm);
  turkeyTalkStatus.textContent = selected ? `${selected.term} selected. Choose a turkey picture.` : 'Drag or select a name, then choose a picture.';
  renderTurkeyTalk();
}

function markTurkeyPuzzleComplete() {
  turkeyTalkStatus.textContent = 'All matches are placed.';
  turkeyPictureGrid.classList.add('complete');
  setTimeout(() => turkeyPictureGrid.classList.remove('complete'), 1200);
}

function rejectTurkeyMatch(termId) {
  turkeyTalkState.selectedTerm = null;
  renderTurkeyTalk();
  const card = turkeyNameTray.querySelector(`[data-turkey-term="${termId}"]`);
  if (card) {
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }
  turkeyTalkStatus.textContent = 'Try another turkey.';
}

function placeTurkeyTerm(termId, targetId) {
  const term = turkeyTalkData.find(item => item.id === termId);
  const target = turkeyTalkData.find(item => item.id === targetId);
  if (!term || !target || turkeyTalkState.matches.has(targetId)) return;

  if (term.id !== target.id) {
    rejectTurkeyMatch(termId);
    return;
  }

  turkeyTalkState.matches.set(targetId, term);
  turkeyTalkState.selectedTerm = null;
  turkeyTalkStatus.textContent = `${term.term} placed.`;
  renderTurkeyTalk();

  if (turkeyTalkState.matches.size === turkeyTalkData.length) {
    markTurkeyPuzzleComplete();
  }
}

function normalize(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function hashValue(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function lockIconSvg(isOpen) {
  if (isOpen) {
    return `
      <svg class="lock-icon-svg open-lock" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path class="lock-shackle" d="M24 30V20c0-8 5-14 13-14s13 6 13 14v8" fill="none" stroke="#25170f" stroke-width="8" stroke-linecap="round" />
        <rect x="12" y="29" width="40" height="27" rx="7" fill="#f5b041" stroke="#25170f" stroke-width="5" />
        <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff6d7" stroke-width="4" stroke-linecap="round" opacity="0.95" />
      </svg>`;
  }

  return `
    <svg class="lock-icon-svg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path class="lock-shackle" d="M18 30v-8c0-10 6-16 14-16s14 6 14 16v8" fill="none" stroke="#25170f" stroke-width="8" stroke-linecap="round" />
      <rect x="12" y="29" width="40" height="27" rx="7" fill="#f5b041" stroke="#25170f" stroke-width="5" />
      <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff6d7" stroke-width="4" stroke-linecap="round" opacity="0.95" />
    </svg>`;
}

function renderLocks() {
  locksList.innerHTML = locks.map(lock => `
    <article class="lock-card ${state.get(lock.id) ? 'solved' : ''}" data-lock="${lock.id}">
      <div class="lock-top">
        <div class="lock-title">
          ${lockIconSvg(state.get(lock.id))}
          <h3>${lock.title}</h3>
        </div>
      </div>
      <label for="${lock.id}Input">${lock.label}</label>
      <div class="lock-row">
        <input id="${lock.id}Input" autocomplete="off" ${state.get(lock.id) ? 'disabled' : ''} value="${state.get(lock.id) ? 'Unlocked' : ''}">
        <button type="button" data-check="${lock.id}" ${state.get(lock.id) ? 'disabled' : ''}>Check</button>
      </div>
      <p class="feedback" id="${lock.id}Feedback">${state.get(lock.id) ? 'Unlocked.' : ''}</p>
    </article>
  `).join('');
  updateProgress();
}

function updateProgress() {
  const solved = [...state.values()].filter(Boolean).length;
  progressText.textContent = `${solved} of ${locks.length} locks open`;
  progressFill.style.width = `${(solved / locks.length) * 100}%`;
  if (solved === locks.length && !winDialog.open && !winQueued) {
    winQueued = true;
    startHarvestCelebration();
    winTimer = setTimeout(() => winDialog.showModal(), 1300);
  }
}

function checkLock(lockId) {
  const lock = locks.find(item => item.id === lockId);
  const input = document.getElementById(`${lockId}Input`);
  const feedback = document.getElementById(`${lockId}Feedback`);
  const hashes = lock.answerHashes || [lock.answerHash];

  if (hashes.includes(hashValue(normalize(input.value)))) {
    state.set(lockId, true);
    renderLocks();
    return;
  }

  feedback.textContent = 'Not yet. Keep searching the harvest clues.';
  input.select();
}

function openClueImage(trigger) {
  clueDialogTitle.textContent = trigger.dataset.title;
  clueDialog.classList.toggle('wide-clue-dialog', trigger.dataset.wide === 'true');
  if (trigger.dataset.pending === 'true') {
    clueDialogImage.removeAttribute('src');
    clueDialogImage.hidden = true;
    clueImageFallback.hidden = false;
    clueImageFallback.textContent = 'This clue graphic is still being prepared.';
    clueDialog.showModal();
    return;
  }

  clueDialogImage.src = trigger.dataset.image;
  clueDialogImage.alt = trigger.dataset.alt || trigger.dataset.title || '';
  clueDialogImage.hidden = false;
  clueImageFallback.hidden = true;
  clueImageFallback.textContent = '';
  clueDialog.showModal();
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  winQueued = false;
  clearTimeout(winTimer);
  clearHarvestCelebration();
  if (winDialog.open) winDialog.close();
  resetTurkeyTalk();
  renderLocks();
}

function startHarvestCelebration() {
  clearHarvestCelebration();

  for (let i = 0; i < 48; i += 1) {
    const piece = document.createElement('span');
    piece.className = `fall-piece ${i % 3 === 0 ? 'leaf-piece' : i % 3 === 1 ? 'corn-piece' : 'pie-piece'}`;
    piece.style.setProperty('--x', `${Math.random() * 100}vw`);
    piece.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    piece.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    piece.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    piece.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    harvestCelebration.appendChild(piece);
  }

  celebrationTimer = setTimeout(clearHarvestCelebration, 8200);
}

function clearHarvestCelebration() {
  clearTimeout(celebrationTimer);
  harvestCelebration.replaceChildren();
}

document.addEventListener('click', event => {
  const turkeyTermButton = event.target.closest('[data-turkey-term]');
  if (turkeyTermButton) {
    setSelectedTurkeyTerm(turkeyTermButton.dataset.turkeyTerm);
    return;
  }

  const turkeyTarget = event.target.closest('[data-turkey-target]');
  if (turkeyTarget && turkeyTalkState.selectedTerm) {
    placeTurkeyTerm(turkeyTalkState.selectedTerm, turkeyTarget.dataset.turkeyTarget);
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (actionButton && actionButton.dataset.action === 'turkeyTalk') {
    resetTurkeyTalk();
    turkeyTalkDialog.showModal();
    turkeyTalkPuzzle.focus();
    return;
  }

  const imageButton = event.target.closest('[data-image]');
  if (imageButton) {
    openClueImage(imageButton);
    return;
  }

  const checkButton = event.target.closest('[data-check]');
  if (checkButton) checkLock(checkButton.dataset.check);
});

document.addEventListener('dragstart', event => {
  const termButton = event.target.closest('[data-turkey-term]');
  if (!termButton) return;
  event.dataTransfer.setData('text/plain', termButton.dataset.turkeyTerm);
  event.dataTransfer.effectAllowed = 'move';
  turkeyTalkState.selectedTerm = termButton.dataset.turkeyTerm;
});

document.addEventListener('dragover', event => {
  const target = event.target.closest('[data-turkey-target]');
  if (!target) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
});

document.addEventListener('drop', event => {
  const target = event.target.closest('[data-turkey-target]');
  if (!target) return;
  event.preventDefault();
  const termId = event.dataTransfer.getData('text/plain');
  placeTurkeyTerm(termId, target.dataset.turkeyTarget);
});

document.addEventListener('keydown', event => {
  const turkeyTermButton = event.target.closest('[data-turkey-term]');
  if (turkeyTermButton && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    setSelectedTurkeyTerm(turkeyTermButton.dataset.turkeyTerm);
    return;
  }

  const turkeyTarget = event.target.closest('[data-turkey-target]');
  if (turkeyTarget && turkeyTalkState.selectedTerm && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    placeTurkeyTerm(turkeyTalkState.selectedTerm, turkeyTarget.dataset.turkeyTarget);
    return;
  }

  if (event.key !== 'Enter') return;
  const input = event.target.closest('.lock-card input');
  if (input) checkLock(input.id.replace('Input', ''));
});

document.getElementById('closeClueDialog').addEventListener('click', () => clueDialog.close());
document.getElementById('closeTurkeyTalkDialog').addEventListener('click', () => turkeyTalkDialog.close());
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('turkeyTalkReset').addEventListener('click', resetTurkeyTalk);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

clueDialogImage.addEventListener('error', () => {
  clueDialogImage.hidden = true;
  clueImageFallback.hidden = false;
  clueImageFallback.textContent = `This clue is ready for ${clueDialogImage.getAttribute('src')}. Add the graphic to the assets folder, and it will open here.`;
});

resetTurkeyTalk();
renderClues();
renderLocks();
