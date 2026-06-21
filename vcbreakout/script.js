const locks = [
  {
    id: 'word',
    title: 'Word Lock',
    badge: 'Word',
    label: 'Enter the word from the highlighted letters in the poem.',
    answerHash: '5d47ef53',
    hint: 'Look closely at the yellow letters in the poem graphic.'
  },
  {
    id: 'color',
    title: '3 Color Lock',
    badge: 'Color',
    label: 'Enter the first letters of the three bird colors.',
    answerHash: 'e1f80c32',
    hint: 'Use the birds in the garden graphic from left to right.'
  },
  {
    id: 'gourds',
    title: '4 Number Lock',
    badge: 'Number',
    label: 'Enter the numbers from the groups of gourds and pumpkins.',
    answerHash: '5bf9e145',
    hint: 'Count the groups along the bottom of the garden graphic.'
  },
  {
    id: 'acorns',
    title: '5 Direction Lock',
    badge: 'Direction',
    label: 'Enter the acorn directions using U, D, L, and R.',
    answerHash: 'bbcf58e8',
    hint: 'Read the five acorns across the top of the garden graphic.'
  },
  {
    id: 'flowers',
    title: '5 Number Lock',
    badge: 'Number',
    label: 'Enter the numbers from the groups of flower pots.',
    answerHash: '40b172fe',
    hint: 'Count the flower pot groups across the garden graphic.'
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
        <h3>${lock.title}</h3>
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
  if (solved === locks.length && !winDialog.open) {
    setTimeout(() => winDialog.showModal(), 250);
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

  feedback.textContent = `Not yet. ${lock.hint}`;
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
  if (winDialog.open) winDialog.close();
  renderLocks();
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
