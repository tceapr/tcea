const locks = [
  {
    id: 'word',
    title: 'Word Lock',
    badge: 'Word',
    label: 'No spaces or commas. Example: FALL',
    answerHash: '5d47ef53'
  },
  {
    id: 'color',
    title: '3 Color Lock',
    badge: 'Color',
    label: 'First initial of each color. Use all capital letters. Example: RGB',
    answerHash: 'e1f80c32'
  },
  {
    id: 'numberFour',
    title: '4 Number Lock',
    badge: 'Number',
    label: 'No spaces or commas. Example: 1234',
    answerHash: '5bf9e145'
  },
  {
    id: 'directionFive',
    title: '5 Direction Lock',
    badge: 'Direction',
    label: 'No spaces or commas. Example: DLRUD',
    answerHash: 'bbcf58e8'
  },
  {
    id: 'numberFive',
    title: '5 Number Lock',
    badge: 'Number',
    label: 'No spaces or commas. Example: 12345',
    answerHash: '40b172fe'
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

function renderLocks() {
  locksList.innerHTML = locks.map(lock => `
    <article class="lock-card ${state.get(lock.id) ? 'solved' : ''}" data-lock="${lock.id}">
      <div class="lock-top">
        <div class="lock-title">
          <span class="lock-icon" aria-hidden="true"></span>
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

function openImage(button) {
  dialogTitle.textContent = button.dataset.title;
  dialogImage.src = button.dataset.image;
  dialogImage.alt = button.querySelector('img').alt;
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
  const colors = ['#c25f1f', '#e5a629', '#9b3f25', '#d9822b', '#6f8f3c'];
  clearLeafCelebration();

  for (let i = 0; i < 44; i += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'fall-leaf';
    leaf.style.setProperty('--x', `${Math.random() * 100}vw`);
    leaf.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    leaf.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    leaf.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    leaf.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    leaf.style.setProperty('--leaf-color', colors[i % colors.length]);
    leafCelebration.appendChild(leaf);
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
  if (event.key !== 'Enter') return;
  const input = event.target.closest('.lock-card input');
  if (input) checkLock(input.id.replace('Input', ''));
});

document.getElementById('closeDialog').addEventListener('click', () => imageDialog.close());
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

renderLocks();
