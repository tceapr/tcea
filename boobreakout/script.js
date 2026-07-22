const locks = [
  {
    id: 'directionFive',
    title: '5 Direction Lock',
    badge: 'Direction',
    label: 'Use U=Up, D=Down, L=Left, and R=Right. Example: UDLR',
    answerHash: 'cc48553c'
  },
  {
    id: 'date',
    title: 'Date Lock',
    badge: 'Date',
    label: 'Use MM/DD/YYYY format. Example: 01/31/2000 or MM/DD Example: 01/30',
    answerHash: '939f386c'
  },
  {
    id: 'numberFive',
    title: '5 Number Lock',
    badge: 'Number',
    label: 'Example: 12345',
    answerHash: '129e49f1'
  },
  {
    id: 'alliteration',
    title: '3 Word Alliteration Lock',
    badge: 'Words',
    label: 'Example: SHESELLSSEASHELLS',
    answerHash: '92bfdcad'
  },
  {
    id: 'colorSix',
    title: '6 Color Lock',
    badge: 'Color',
    label: 'First initial of each color. Use all capital letters. Example: RBG',
    answerHash: 'c6e3a12f'
  }
];

const clueGraphics = [
  {
    id: 'candy',
    title: 'Big Money',
    icon: 'assets/boo-icon-3.png',
    image: 'assets/candy.png',
    alt: 'Halloween candy spending fun fact graphic'
  },
  {
    id: 'canYouSpot',
    title: 'Can You Spot?',
    icon: 'assets/boo-icon-4.png',
    image: 'assets/can-you-spot.png',
    alt: 'Jack-o-lantern direction clue graphic'
  },
  {
    id: 'didYouKnow',
    title: 'Did You Know?',
    icon: 'assets/boo-icon-6.png',
    image: 'assets/did-you-know.png',
    alt: 'Halloween jack-o-lantern fun fact graphic'
  },
  {
    id: 'pumpkins',
    title: 'Pumpkins Are Squash',
    icon: 'assets/boo-icon-1.png',
    image: 'assets/pumpkins-are-squash.png',
    alt: 'Pumpkin color clue graphic'
  },
  {
    id: 'countingRiddle',
    title: 'Bats, Cats, No Rats, Oh My!',
    icon: 'assets/boo-icon-2.png',
    image: 'assets/counting-riddle.png',
    alt: 'Halloween counting riddle prompt'
  },
  {
    id: 'petCostumes',
    title: 'Pet Costume Parade',
    icon: 'assets/boo-icon-5.png',
    image: 'assets/pet-costumes.png',
    alt: 'Pet costume alliteration clue graphic'
  },
  {
    id: 'halloweenFacts',
    title: 'Halloween Fun Facts',
    icon: 'assets/boo-icon-8.png',
    image: 'assets/halloween-facts.png',
    alt: 'Halloween fun facts clue graphic'
  },
  {
    id: 'hauntedHouse',
    title: 'Spook Scene!',
    icon: 'assets/boo-icon-7.png',
    image: 'assets/haunted-house-counting.png',
    alt: 'Haunted house counting clue graphic'
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
        <input id="${lock.id}Input" autocomplete="off" ${state.get(lock.id) ? 'disabled' : ''} value="${state.get(lock.id) ? 'Unlocked' : ''}">
        <button type="button" data-check="${lock.id}" ${state.get(lock.id) ? 'disabled' : ''}>Check</button>
      </div>
      <p class="feedback" id="${lock.id}Feedback">${state.get(lock.id) ? 'Unlocked.' : ''}</p>
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
    startBooCelebration();
    winTimer = setTimeout(() => winDialog.showModal(), 1300);
  }
}

function checkLock(lockId) {
  const input = document.getElementById(`${lockId}Input`);
  const feedback = document.getElementById(`${lockId}Feedback`);

  if (hashValue(normalize(input.value)) === locks.find(lock => lock.id === lockId).answerHash) {
    state.set(lockId, true);
    renderLocks();
    return;
  }

  feedback.textContent = 'Not yet. Keep searching the Boo clues.';
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
  clearBooCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
}

function startBooCelebration() {
  const colors = ['#ff8a1c', '#6f35bf', '#f6d44b', '#81c341', '#ffffff'];
  clearBooCelebration();

  for (let i = 0; i < 44; i += 1) {
    const confetti = document.createElement('span');
    confetti.className = 'school-confetti';
    confetti.style.setProperty('--x', `${Math.random() * 100}vw`);
    confetti.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    confetti.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    confetti.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    confetti.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    confetti.style.setProperty('--confetti-color', colors[i % colors.length]);
    celebrationLayer.appendChild(confetti);
  }

  celebrationTimer = setTimeout(clearBooCelebration, 8200);
}

function clearBooCelebration() {
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
