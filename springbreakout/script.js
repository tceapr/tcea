const locks = [
  {
    id: 'word',
    title: 'Word Lock',
    badge: 'Word',
    label: 'No spaces or commas. Example: GROW',
    answerHash: 'b4da557c'
  },
  {
    id: 'numberThree',
    title: '3 Number Lock',
    badge: 'Number',
    label: 'No spaces or commas. Example: 123',
    answerHash: 'c0e5140d'
  },
  {
    id: 'directionFiveA',
    title: '5 Direction Lock',
    badge: 'Direction',
    label: 'No spaces or commas. Example: DLRUD',
    answerHash: '65919bd5'
  },
  {
    id: 'colorFive',
    title: '5 Color Lock',
    badge: 'Color',
    label: 'First initial of each color. Use all capital letters. Example: RGB',
    answerHash: '3712631c'
  },
  {
    id: 'numberFourA',
    title: '4 Number Lock',
    badge: 'Number',
    label: 'No spaces or commas. Example: 1234',
    answerHash: '0e29cc58'
  }
];

const state = new Map(locks.map(lock => [lock.id, false]));
const locksList = document.getElementById('locksList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const imageDialog = document.getElementById('imageDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogImage = document.getElementById('dialogImage');
const winDialog = document.getElementById('winDialog');
const leafCelebration = document.getElementById('leafCelebration');
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
        <span class="badge">${state.get(lock.id) ? 'Open' : lock.badge}</span>
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
    startLeafCelebration();
    winTimer = setTimeout(() => winDialog.showModal(), 1300);
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

  feedback.textContent = 'Not yet. Keep searching the graphics.';
  input.select();
}

function openImage(trigger) {
  dialogTitle.textContent = trigger.dataset.title;
  dialogImage.src = trigger.dataset.image;
  dialogImage.alt = trigger.alt;
  imageDialog.showModal();
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  winQueued = false;
  clearTimeout(winTimer);
  clearLeafCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
}

function startLeafCelebration() {
  const colors = ['#ff4fb3', '#8de33f', '#ffe95b', '#7bdcff', '#d56bff'];
  clearLeafCelebration();

  for (let i = 0; i < 44; i += 1) {
    const flower = document.createElement('span');
    flower.className = 'spring-flower';
    flower.style.setProperty('--x', `${Math.random() * 100}vw`);
    flower.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    flower.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    flower.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    flower.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    flower.style.setProperty('--flower-color', colors[i % colors.length]);
    leafCelebration.appendChild(flower);
  }

  celebrationTimer = setTimeout(clearLeafCelebration, 8200);
}

function clearLeafCelebration() {
  clearTimeout(celebrationTimer);
  leafCelebration.replaceChildren();
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

renderLocks();
