const locks = [
  {
    id: 'color',
    title: '4 Color Lock',
    badge: 'Color',
    label: 'First initial of each color. Use all capital letters. Example: RGBY',
    answerHash: '4fac617f'
  },
  {
    id: 'letterFive',
    title: '5 Letter Lock',
    badge: 'Letter',
    label: 'No spaces or commas. Example: ABCDE',
    answerHash: '0c624146'
  },
  {
    id: 'directionFive',
    title: '5 Direction Lock',
    badge: 'Direction',
    label: 'No spaces or commas. Example: DLRUD',
    answerHash: 'c2819cac'
  },
  {
    id: 'wordOne',
    title: '1 Word Lock',
    badge: 'Word',
    label: 'One school word. No spaces. Example: BOOK',
    answerHash: '74bd1fb8'
  }
];

const state = new Map(locks.map(lock => [lock.id, false]));
const supplyQuiz = [
  {
    title: '1.',
    image: 'assets/quiz-glue.png',
    alt: 'Bottle of glue school supply clue',
    answerHash: '757b037c'
  },
  {
    title: '2.',
    image: 'assets/quiz-ruler.png',
    alt: 'Wooden ruler school supply clue',
    answerHash: '40846713'
  },
  {
    title: '3.',
    image: 'assets/quiz-scissors.png',
    alt: 'Red scissors school supply clue',
    answerHash: '356dcdb6'
  }
];
const clueGraphics = [
  {
    id: 'rhymingWords',
    title: 'Rhyming Words',
    icon: 'assets/rhyming-words.png',
    image: 'assets/rhyming-words.png',
    alt: 'Rhyming words clue graphic'
  },
  {
    id: 'subjectBooks',
    title: 'Subject Books',
    icon: 'assets/subject-books.png',
    image: 'assets/subject-books.png',
    alt: 'Subject books clue graphic'
  },
  {
    id: 'healthySnacks',
    title: 'Healthy Snacks',
    icon: 'assets/healthy-snacks.png',
    image: 'assets/healthy-snacks.png',
    alt: 'Healthy snacks direction clue graphic'
  },
  {
    id: 'supplyQuiz',
    title: 'Supply Quiz',
    icon: 'assets/quiz-glue.png',
    alt: 'Bottle of glue school supply quiz clue',
    quiz: true
  },
  {
    id: 'eraserBread',
    title: 'Eraser Bread',
    icon: 'assets/distractor-eraser-bread.png',
    image: 'assets/distractor-eraser-bread.png',
    alt: 'Back-to-school fun fact about people using bread before erasers'
  },
  {
    id: 'yellowBus',
    title: 'Yellow Bus',
    icon: 'assets/distractor-yellow-bus.png',
    image: 'assets/distractor-yellow-bus.png',
    alt: 'Back-to-school fun fact about why school buses are yellow'
  }
];
const locksList = document.getElementById('locksList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const clueScene = document.getElementById('clueScene');
const quizStepLabel = document.getElementById('quizStepLabel');
const supplyQuizStage = document.getElementById('supplyQuizStage');
const imageDialog = document.getElementById('imageDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogImage = document.getElementById('dialogImage');
const quizDialog = document.getElementById('quizDialog');
const winDialog = document.getElementById('winDialog');
const schoolCelebration = document.getElementById('schoolCelebration');
let celebrationTimer;
let winTimer;
let winQueued = false;
let quizStep = 0;

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

function renderClues() {
  clueScene.innerHTML = clueGraphics.map(clue => `
    <button class="clue-card-button" type="button" ${clue.quiz ? 'data-quiz-open' : `data-image="${clue.image}" data-title="${clue.title}" data-alt="${clue.alt}"`} aria-label="Open ${clue.title}">
      <span class="clue-thumb-wrap">
        <img class="clue-thumb" src="${clue.icon}" alt="" loading="lazy">
        <span class="clue-thumb-fallback" aria-hidden="true">
          <span>${clue.title}</span>
          <small>Open clue</small>
        </span>
      </span>
      <span class="clue-card-title">${clue.title}</span>
      ${clue.quiz ? '<span class="link-note">Quiz clue</span>' : ''}
    </button>
  `).join('');

  clueScene.querySelectorAll('.clue-thumb').forEach(image => {
    image.addEventListener('error', () => {
      image.closest('.clue-card-button').classList.add('is-missing-image');
    });
  });
}

function renderSupplyQuiz() {
  quizStepLabel.textContent = `Section ${Math.min(quizStep + 1, 4)} of 4`;

  if (quizStep >= supplyQuiz.length) {
    supplyQuizStage.innerHTML = `
      <div class="riddle-card" aria-live="polite">
        <p>I have a flat top.</p>
        <p>Your pencils rest on me.</p>
        <p>You sit in a chair by me.</p>
        <p>You read, write, and learn with me.</p>
        <p>What am I?</p>
      </div>
    `;
    return;
  }

  const clue = supplyQuiz[quizStep];
  supplyQuizStage.innerHTML = `
    <div class="quiz-question">
      <h4>${clue.title}</h4>
      <img class="quiz-image" src="${clue.image}" alt="${clue.alt}" data-image="${clue.image}" data-title="School Supply ${quizStep + 1}" role="button" tabindex="0">
      <label for="supplyQuizInput">Name that school supply.</label>
      <div class="quiz-row">
        <input id="supplyQuizInput" autocomplete="off">
        <button type="button" data-quiz-check>Check</button>
      </div>
      <p id="supplyQuizFeedback" class="quiz-feedback" aria-live="polite"></p>
    </div>
  `;
}

function checkSupplyQuiz() {
  if (quizStep >= supplyQuiz.length) return;

  const input = document.getElementById('supplyQuizInput');
  const feedback = document.getElementById('supplyQuizFeedback');
  const clue = supplyQuiz[quizStep];

  if (hashValue(normalize(input.value)) === clue.answerHash) {
    quizStep += 1;
    renderSupplyQuiz();
    const nextInput = document.getElementById('supplyQuizInput');
    if (nextInput) nextInput.focus();
    return;
  }

  feedback.textContent = 'Not yet. Look closely at the school supply.';
  input.select();
}

function updateProgress() {
  const solved = [...state.values()].filter(Boolean).length;
  progressText.textContent = `${solved} of ${locks.length} locks open`;
  progressFill.style.width = `${(solved / locks.length) * 100}%`;
  if (solved === locks.length && !winDialog.open && !winQueued) {
    winQueued = true;
    startSchoolCelebration();
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

  feedback.textContent = 'Not yet. Keep searching the Back to School clues.';
  input.select();
}

function openImage(trigger) {
  dialogTitle.textContent = trigger.dataset.title;
  dialogImage.src = trigger.dataset.image;
  dialogImage.alt = trigger.dataset.alt || trigger.alt || '';
  imageDialog.showModal();
}

function openQuizDialog() {
  quizDialog.showModal();
  const quizInput = document.getElementById('supplyQuizInput');
  if (quizInput) quizInput.focus();
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  quizStep = 0;
  winQueued = false;
  clearTimeout(winTimer);
  clearSchoolCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
  renderSupplyQuiz();
}

function startSchoolCelebration() {
  const colors = ['#1d6fd1', '#ffd438', '#3b9b4a', '#e13b2d', '#8a4cf6'];
  clearSchoolCelebration();

  for (let i = 0; i < 44; i += 1) {
    const confetti = document.createElement('span');
    confetti.className = 'school-confetti';
    confetti.style.setProperty('--x', `${Math.random() * 100}vw`);
    confetti.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    confetti.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    confetti.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    confetti.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    confetti.style.setProperty('--confetti-color', colors[i % colors.length]);
    schoolCelebration.appendChild(confetti);
  }

  celebrationTimer = setTimeout(clearSchoolCelebration, 8200);
}

function clearSchoolCelebration() {
  clearTimeout(celebrationTimer);
  schoolCelebration.replaceChildren();
}

document.addEventListener('click', event => {
  const imageButton = event.target.closest('[data-image]');
  if (imageButton) openImage(imageButton);

  const checkButton = event.target.closest('[data-check]');
  if (checkButton) checkLock(checkButton.dataset.check);

  const quizButton = event.target.closest('[data-quiz-check]');
  if (quizButton) checkSupplyQuiz();

  const quizOpenButton = event.target.closest('[data-quiz-open]');
  if (quizOpenButton) openQuizDialog();
});

document.addEventListener('keydown', event => {
  const imageTrigger = event.target.closest('[data-image]');
  if (imageTrigger && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openImage(imageTrigger);
    return;
  }

  if (event.key !== 'Enter') return;
  const quizInput = event.target.closest('#supplyQuizInput');
  if (quizInput) {
    checkSupplyQuiz();
    return;
  }

  const input = event.target.closest('.lock-card input');
  if (input) checkLock(input.id.replace('Input', ''));
});

document.getElementById('closeDialog').addEventListener('click', () => imageDialog.close());
document.getElementById('closeQuizDialog').addEventListener('click', () => quizDialog.close());
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

renderClues();
renderLocks();
renderSupplyQuiz();
