const locks = [
  {
    id: 'numberFive',
    title: '5 Number Lock',
    badge: 'Number',
    label: 'Example: 12345',
    answerHash: '86eec040'
  },
  {
    id: 'colorFive',
    title: '5 Color Lock',
    badge: 'Color',
    label: 'First initial of each color. Use all capital letters. Example: RBG',
    answerHash: '63bdd57e'
  },
  {
    id: 'numberFour',
    title: '4 Number Lock',
    badge: 'Number',
    label: 'Example: 1234',
    answerHash: '496eea1a'
  },
  {
    id: 'letterSix',
    title: '6 Letter Lock',
    badge: 'Letter',
    label: 'Example: ABCDEF',
    answerHash: '48dba2c8'
  },
  {
    id: 'word',
    title: '2 Word Lock',
    badge: 'Words',
    label: 'No spaces. Example: WORDWORD',
    answerHash: '3d803404'
  }
];

const clueGraphics = [
  {
    id: 'buildTaco',
    title: 'Build the Taco',
    icon: 'assets/taco-icon-5.png',
    image: 'assets/buildthetaco.png',
    alt: 'Build the taco order clue graphic'
  },
  {
    id: 'tacoTruck',
    title: 'Taco Truck',
    icon: 'assets/taco-icon-3.png',
    image: 'assets/tacotruck.png',
    alt: 'Taco truck order clue graphic'
  },
  {
    id: 'factOpinion',
    title: 'F or O',
    icon: 'assets/taco-icon-6.png',
    image: 'assets/factopinion.png',
    alt: 'Fact or opinion clue graphic'
  },
  {
    id: 'football',
    title: 'Record Breaking',
    icon: 'assets/taco-icon-7.png',
    image: 'assets/football.png',
    alt: 'Record breaking taco clue graphic'
  },
  {
    id: 'scoville',
    title: 'Heat Check',
    icon: 'assets/taco-icon-8.png',
    image: 'assets/scovillescale.png',
    alt: 'Scoville scale clue graphic'
  },
  {
    id: 'yumYum',
    title: 'Yum Yum',
    icon: 'assets/taco-icon-1.png',
    image: 'assets/yumyum.png',
    alt: 'Yum yum taco clue graphic'
  },
  {
    id: 'tacoTuesday',
    title: 'Taco Tuesday',
    icon: 'assets/taco-icon-4.png',
    image: 'assets/tacotuesday.png',
    alt: 'Taco Tuesday clue graphic'
  },
  {
    id: 'palindrome',
    title: 'What is a',
    icon: 'assets/taco-icon-2.png',
    image: 'assets/palindrome.png',
    alt: 'Palindrome clue graphic'
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
const winDialog = document.getElementById('winDialog');
const celebrationLayer = document.getElementById('schoolCelebration');
let celebrationTimer;
let winTimer;
let winQueued = false;

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
        <path class="lock-shackle" d="M24 30V20c0-8 5-14 13-14s13 6 13 14v8" fill="none" stroke="#211331" stroke-width="8" stroke-linecap="round" />
        <rect x="12" y="29" width="40" height="27" rx="7" fill="#ffb33f" stroke="#211331" stroke-width="5" />
        <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff4d6" stroke-width="4" stroke-linecap="round" opacity="0.95" />
      </svg>`;
  }

  return `
    <svg class="lock-icon-svg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path class="lock-shackle" d="M18 30v-8c0-10 6-16 14-16s14 6 14 16v8" fill="none" stroke="#211331" stroke-width="8" stroke-linecap="round" />
      <rect x="12" y="29" width="40" height="27" rx="7" fill="#ffb33f" stroke="#211331" stroke-width="5" />
      <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff4d6" stroke-width="4" stroke-linecap="round" opacity="0.95" />
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
        <span class="badge">${state.get(lock.id) ? 'Open' : lock.badge}</span>
      </div>
      <label for="${lock.id}Input">${lock.label}</label>
      <div class="lock-row">
        <input id="${lock.id}Input" autocomplete="off" ${state.get(lock.id) || !lock.answerHash ? 'disabled' : ''} value="${state.get(lock.id) ? 'Unlocked' : !lock.answerHash ? 'Coming Soon' : ''}">
        <button type="button" data-check="${lock.id}" ${state.get(lock.id) || !lock.answerHash ? 'disabled' : ''}>Check</button>
      </div>
      <p class="feedback" id="${lock.id}Feedback">${state.get(lock.id) ? 'Unlocked.' : !lock.answerHash ? 'Waiting on the final word answer.' : ''}</p>
    </article>
  `).join('');
  updateProgress();
}

function renderClues() {
  clueScene.innerHTML = clueGraphics.map(clue => `
    <button class="clue-card-button" type="button" data-image="${clue.image}" data-title="${clue.title}" data-alt="${clue.alt}" aria-label="Open ${clue.title}">
      <span class="clue-thumb-wrap">
        <img class="clue-thumb" src="${clue.icon}" alt="" loading="lazy">
        <span class="clue-thumb-fallback" aria-hidden="true">
          <span>${clue.title}</span>
          <small>Open clue</small>
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

function updateProgress() {
  const solved = [...state.values()].filter(Boolean).length;
  progressText.textContent = `${solved} of ${locks.length} locks open`;
  progressFill.style.width = `${(solved / locks.length) * 100}%`;
  if (solved === locks.length && !winDialog.open && !winQueued) {
    winQueued = true;
    startTacoCelebration();
    winTimer = setTimeout(() => winDialog.showModal(), 1300);
  }
}

function checkLock(lockId) {
  const input = document.getElementById(`${lockId}Input`);
  const feedback = document.getElementById(`${lockId}Feedback`);
  const lock = locks.find(lockItem => lockItem.id === lockId);

  if (!lock.answerHash) {
    feedback.textContent = 'Waiting on the final word answer.';
    return;
  }

  if (hashValue(normalize(input.value)) === lock.answerHash) {
    state.set(lockId, true);
    dropTinyTacos(18, 3600);
    renderLocks();
    return;
  }

  feedback.textContent = 'Not yet. Keep searching the taco clues.';
  input.select();
}

function openImage(trigger) {
  dialogTitle.textContent = trigger.dataset.title;
  dialogImage.src = trigger.dataset.image;
  dialogImage.alt = trigger.dataset.alt || trigger.alt || '';
  imageDialog.showModal();
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  winQueued = false;
  clearTimeout(winTimer);
  clearTacoCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
}

function startTacoCelebration() {
  clearTacoCelebration();
  dropTinyTacos(76, 8200);

  celebrationTimer = setTimeout(clearTacoCelebration, 8200);
}

function dropTinyTacos(count, longestDuration) {
  for (let i = 0; i < count; i += 1) {
    const taco = document.createElement('span');
    taco.className = 'taco-confetti';
    taco.style.setProperty('--x', `${Math.random() * 100}vw`);
    taco.style.setProperty('--drift', `${Math.random() * 240 - 120}px`);
    taco.style.setProperty('--duration', `${2.8 + Math.random() * 3.2}s`);
    taco.style.setProperty('--delay', `${Math.random() * 0.75}s`);
    taco.style.setProperty('--spin', `${Math.random() * 760 - 380}deg`);
    celebrationLayer.appendChild(taco);
  }

  clearTimeout(celebrationTimer);
  celebrationTimer = setTimeout(clearTacoCelebration, longestDuration);
}

function clearTacoCelebration() {
  clearTimeout(celebrationTimer);
  celebrationLayer.replaceChildren();
}

document.addEventListener('click', event => {
  const imageButton = event.target.closest('[data-image]');
  if (imageButton) openImage(imageButton);

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
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

renderClues();
renderLocks();
