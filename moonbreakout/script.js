const locks = [
  {
    id: 'numberThree',
    title: '3 Number Lock',
    label: 'Numbers may include a decimal. Example: 12.3',
    answerHash: 'd2578aee'
  },
  {
    id: 'colorFive',
    title: '5 Color Lock',
    label: 'First initial of each color. Use all capital letters. Example: ABCDE',
    answerHash: '682ecea6'
  },
  {
    id: 'date',
    title: 'Date Lock',
    label: 'Use MM/DD/YYYY format. Example: 01/31/2000',
    answerHash: '5fd3aa29'
  },
  {
    id: 'directionFour',
    title: '4 Direction Lock',
    label: 'Use U, D, L, and R with no spaces. Example: UDLR',
    answerHash: '30d3e21c'
  }
];

const state = new Map(locks.map(lock => [lock.id, false]));
const locksList = document.getElementById('locksList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const clueScene = document.getElementById('clueScene');
const imageDialog = document.getElementById('imageDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogImage = document.getElementById('dialogImage');
const footprintHotspot = document.getElementById('footprintHotspot');
const dialogActions = document.getElementById('dialogActions');
const dialogLink = document.getElementById('dialogLink');
const imageFallback = document.getElementById('imageFallback');
const winDialog = document.getElementById('winDialog');
const spaceCelebration = document.getElementById('spaceCelebration');
let celebrationTimer;
let winTimer;
let winQueued = false;

const moonMaze = {
  title: 'Moon Maze',
  image: 'assets/clue-moon-maze.png',
  alt: 'Moon maze direction clue graphic'
};

const clueGraphics = [
  {
    id: 'sneakingAway',
    title: 'Sneaking Away',
    icon: 'assets/icon-earth-moon.png',
    image: 'assets/clue-sneaking-away.png',
    alt: 'The Moon is sneaking away clue graphic'
  },
  {
    id: 'googleDoodle',
    title: 'Google Doodle',
    icon: 'assets/icon-rocket.png',
    image: 'assets/clue-google-doodle.png',
    alt: '50th Moon Landing Google Doodle clue graphic with QR code',
    link: 'https://doodles.google/doodle/50th-anniversary-of-the-moon-landing/',
    linkText: 'Open Google Doodle'
  },
  {
    id: 'goodnightMoon',
    title: 'Goodnight Moon',
    icon: 'assets/icon-moon.png',
    image: 'assets/clue-goodnight-moon.png',
    alt: 'Goodnight Moon clue graphic'
  },
  {
    id: 'apollo11',
    title: 'Apollo 11',
    icon: 'assets/icon-astronaut.png',
    image: 'assets/clue-apollo-11.png',
    alt: 'Apollo 11 mission timeline clue graphic'
  },
  {
    id: 'moonTv',
    title: 'Moon on TV',
    icon: 'assets/icon-tv.png',
    image: 'assets/clue-600-million.png',
    alt: 'Moon landing watched by 600 million people clue graphic'
  },
  {
    id: 'footprint',
    title: 'First Footprint',
    icon: 'assets/icon-footprint.png',
    image: 'assets/clue-footprint.png',
    alt: 'Neil Armstrong first footprint clue graphic',
    hotspot: 'footprint'
  }
];

function renderClues() {
  clueScene.innerHTML = clueGraphics.map(clue => `
    <button class="clue-card-button" type="button" data-image="${clue.image}" data-title="${clue.title}" data-alt="${clue.alt}" ${clue.link ? `data-link="${clue.link}" data-link-text="${clue.linkText}"` : ''} ${clue.hotspot ? `data-hotspot="${clue.hotspot}"` : ''} aria-label="Open ${clue.title}">
      <span class="clue-thumb-wrap">
        <img class="clue-thumb" src="${clue.icon}" alt="" loading="lazy">
        <span class="clue-thumb-fallback" aria-hidden="true">
          <span>${clue.title}</span>
          <small>Add ${clue.icon.replace('assets/', '')}</small>
        </span>
      </span>
      <span class="clue-card-title">${clue.title}</span>
      ${clue.link ? '<span class="link-note">Video link</span>' : ''}
    </button>
  `).join('');

  clueScene.querySelectorAll('.clue-thumb').forEach(image => {
    image.addEventListener('error', () => {
      image.closest('.clue-card-button').classList.add('is-missing-image');
    });
  });
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
        <path class="lock-shackle" d="M24 30V20c0-8 5-14 13-14s13 6 13 14v8" fill="none" stroke="#202123" stroke-width="8" stroke-linecap="round" />
        <rect x="12" y="29" width="40" height="27" rx="7" fill="#ffd13b" stroke="#202123" stroke-width="5" />
        <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff8d8" stroke-width="4" stroke-linecap="round" opacity="0.95" />
      </svg>`;
  }

  return `
    <svg class="lock-icon-svg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path class="lock-shackle" d="M18 30v-8c0-10 6-16 14-16s14 6 14 16v8" fill="none" stroke="#202123" stroke-width="8" stroke-linecap="round" />
      <rect x="12" y="29" width="40" height="27" rx="7" fill="#ffd13b" stroke="#202123" stroke-width="5" />
      <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff8d8" stroke-width="4" stroke-linecap="round" opacity="0.95" />
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
    startSpaceCelebration();
    winTimer = setTimeout(() => winDialog.showModal(), 1200);
  }
}

function checkLock(lockId) {
  const lock = locks.find(item => item.id === lockId);
  const input = document.getElementById(`${lockId}Input`);
  const feedback = document.getElementById(`${lockId}Feedback`);

  if (hashValue(normalize(input.value)) === lock.answerHash) {
    state.set(lockId, true);
    renderLocks();
    return;
  }

  feedback.textContent = 'Not yet. Keep searching the clues.';
  input.select();
}

function openImage(trigger) {
  dialogTitle.textContent = trigger.dataset.title;
  dialogImage.src = trigger.dataset.image;
  dialogImage.alt = trigger.dataset.alt || trigger.alt || trigger.getAttribute('aria-label') || '';
  imageDialog.classList.remove('is-missing-image');
  imageDialog.classList.toggle('has-footprint-hotspot', trigger.dataset.hotspot === 'footprint');
  footprintHotspot.hidden = trigger.dataset.hotspot !== 'footprint';
  dialogImage.hidden = false;
  imageFallback.hidden = true;
  imageFallback.textContent = '';

  if (trigger.dataset.link) {
    dialogActions.hidden = false;
    dialogLink.href = trigger.dataset.link;
    dialogLink.textContent = trigger.dataset.linkText || 'Open Link';
  } else {
    dialogActions.hidden = true;
    dialogLink.href = '#';
  }

  imageDialog.showModal();
}

function openMoonMaze() {
  dialogTitle.textContent = moonMaze.title;
  dialogImage.src = moonMaze.image;
  dialogImage.alt = moonMaze.alt;
  imageDialog.classList.remove('has-footprint-hotspot', 'is-missing-image');
  footprintHotspot.hidden = true;
  dialogImage.hidden = false;
  imageFallback.hidden = true;
  imageFallback.textContent = '';
  dialogActions.hidden = true;
  dialogLink.href = '#';
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  winQueued = false;
  clearTimeout(winTimer);
  clearSpaceCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
}

function startSpaceCelebration() {
  clearSpaceCelebration();

  for (let i = 0; i < 54; i += 1) {
    const piece = document.createElement('span');
    piece.className = i % 3 === 0 ? 'space-fall moon-fall' : 'space-fall star-fall';
    piece.style.setProperty('--x', `${Math.random() * 100}vw`);
    piece.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    piece.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    piece.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    piece.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    spaceCelebration.appendChild(piece);
  }

  celebrationTimer = setTimeout(clearSpaceCelebration, 8200);
}

function clearSpaceCelebration() {
  clearTimeout(celebrationTimer);
  spaceCelebration.replaceChildren();
}

document.addEventListener('click', event => {
  const imageButton = event.target.closest('[data-image]');
  if (imageButton) {
    openImage(imageButton);
    return;
  }

  const checkButton = event.target.closest('[data-check]');
  if (checkButton) checkLock(checkButton.dataset.check);
});

document.addEventListener('keydown', event => {
  const imageTrigger = event.target.closest('[data-image]');
  if (imageTrigger && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openImage(imageTrigger);
    return;
  }

  if (event.key !== 'Enter') return;
  const input = event.target.closest('.lock-card input');
  if (input) checkLock(input.id.replace('Input', ''));
});

document.getElementById('closeDialog').addEventListener('click', () => imageDialog.close());
footprintHotspot.addEventListener('click', openMoonMaze);
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

dialogImage.addEventListener('error', () => {
  imageDialog.classList.add('is-missing-image');
  footprintHotspot.hidden = true;
  dialogImage.hidden = true;
  imageFallback.hidden = false;
  imageFallback.textContent = `This clue is ready for ${dialogImage.getAttribute('src')}. Add the graphic to the assets folder, and it will open here.`;
});

renderClues();
renderLocks();
