const locks = [
  {
    id: 'year',
    title: 'Year Lock',
    label: 'Enter the 4-digit year. Example: 1234',
    answerHash: '1b58a7b6'
  },
  {
    id: 'wordOne',
    title: '1 Word Lock',
    label: 'One word. Example: WORD',
    answerHash: '1581f3bd'
  },
  {
    id: 'colorFive',
    title: '5 Color Lock',
    label: 'First initial of each color. Use all capital letters. Example: ABCDE',
    answerHash: 'e5ca8f8f'
  },
  {
    id: 'directionFour',
    title: '4 Direction Lock',
    label: 'Use U, D, L, and R with no spaces. Example: UDLR',
    answerHash: '4ee7990e'
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
const imageFallback = document.getElementById('imageFallback');
const winDialog = document.getElementById('winDialog');
const snackCelebration = document.getElementById('snackCelebration');
const bgMusic = document.getElementById('bgMusic');
const musicButton = document.getElementById('musicButton');
let celebrationTimer;
let winTimer;
let winQueued = false;

const clueGraphics = [
  {
    id: 'ingredients',
    title: '5 Main Ingredients',
    icon: 'assets/icon-popcorn-box.png',
    image: 'assets/clue-main-ingredients.png',
    alt: 'Five main ingredients clue graphic for Cracker Jack'
  },
  {
    id: 'tantalizing',
    title: 'Tasty Treat',
    icon: 'assets/icon-peanuts.png',
    image: 'assets/clue-tantalizing.png',
    alt: 'Cracker Jack tasty treat clue graphic'
  },
  {
    id: 'sailor',
    title: 'Sailor Jack and Bingo',
    icon: 'assets/icon-sailor-bingo.png',
    image: 'assets/clue-sailor-jack-bingo.png',
    alt: 'Sailor Jack and Bingo clue graphic'
  },
  {
    id: 'song',
    title: 'Song Story',
    icon: 'assets/icon-baseball.png',
    image: 'assets/clue-song-story.png',
    alt: 'Take Me Out to the Ball Game clue graphic'
  },
  {
    id: 'origins',
    title: 'Chicago Origins',
    icon: 'assets/icon-popcorn-clusters.png',
    image: 'assets/clue-chicago-origins.png',
    alt: 'Cracker Jack began in Chicago clue graphic'
  },
  {
    id: 'facts',
    title: 'Fun Facts',
    icon: 'assets/icon-jackbox.png',
    image: 'assets/clue-fun-facts.png',
    alt: 'Cracker Jack fun facts clue graphic'
  }
];

function renderClues() {
  clueScene.innerHTML = clueGraphics.map(clue => `
    <button class="clue-card-button" type="button" data-image="${clue.image}" data-title="${clue.title}" data-alt="${clue.alt}" aria-label="Open ${clue.title}">
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
    startSnackCelebration();
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
  dialogImage.hidden = false;
  imageFallback.hidden = true;
  imageFallback.textContent = '';
  imageDialog.showModal();
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  winQueued = false;
  clearTimeout(winTimer);
  clearSnackCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
}

function startSnackCelebration() {
  clearSnackCelebration();

  for (let i = 0; i < 50; i += 1) {
    const snack = document.createElement('span');
    snack.className = i % 3 === 0 ? 'snack-fall baseball-fall' : 'snack-fall popcorn-fall';
    snack.style.setProperty('--x', `${Math.random() * 100}vw`);
    snack.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    snack.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    snack.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    snack.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    snackCelebration.appendChild(snack);
  }

  celebrationTimer = setTimeout(clearSnackCelebration, 8200);
}

function clearSnackCelebration() {
  clearTimeout(celebrationTimer);
  snackCelebration.replaceChildren();
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play()
      .then(() => {
        musicButton.textContent = 'Pause Music';
        musicButton.setAttribute('aria-pressed', 'true');
        musicButton.classList.add('is-playing');
      })
      .catch(() => {
        musicButton.textContent = 'Play Music';
        musicButton.setAttribute('aria-pressed', 'false');
      });
    return;
  }

  bgMusic.pause();
  musicButton.textContent = 'Play Music';
  musicButton.setAttribute('aria-pressed', 'false');
  musicButton.classList.remove('is-playing');
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
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);
musicButton.addEventListener('click', toggleMusic);

dialogImage.addEventListener('error', () => {
  imageDialog.classList.add('is-missing-image');
  dialogImage.hidden = true;
  imageFallback.hidden = false;
  imageFallback.textContent = `This clue is ready for ${dialogImage.getAttribute('src')}. Add the graphic to the assets folder, and it will open here.`;
});

renderClues();
renderLocks();
