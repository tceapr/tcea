const locks = [
  {
    id: 'date',
    title: 'Date Lock',
    badge: 'Date',
    label: 'Use MM/DD format. Example: 01/31',
    answerHash: '78529dc3'
  },
  {
    id: 'numberThree',
    title: '3 Number Lock',
    badge: 'Number',
    label: 'No spaces or commas. Example: 123',
    answerHash: 'c7cf2f40'
  },
  {
    id: 'wordThree',
    title: '3 Word Lock',
    badge: 'Word',
    label: 'No spaces. Example: THEPEANUTPATCH',
    answerHash: 'ac682f12'
  },
  {
    id: 'colorFive',
    title: '5 Color Lock',
    badge: 'Color',
    label: 'First initial of each color. Use all capital letters. Example: RGBWY',
    answerHash: '77404318'
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
const clueDialog = document.getElementById('clueDialog');
const clueDialogTitle = document.getElementById('clueDialogTitle');
const clueDialogBody = document.getElementById('clueDialogBody');
const winDialog = document.getElementById('winDialog');
const leafCelebration = document.getElementById('leafCelebration');
let celebrationTimer;
let winTimer;
let winQueued = false;

const clueGraphics = [
  {
    id: 'date',
    title: 'National PB&J Day',
    icon: 'assets/pbj-icon-sandwich.png',
    image: 'assets/pbj-national-day.png',
    alt: 'National Peanut Butter and Jelly Day clue graphic'
  },
  {
    id: 'states',
    title: 'Growing the Peanuts',
    icon: 'assets/pbj-icon-bread.png',
    image: 'assets/pbj-peanut-states.png',
    alt: 'Top ten peanut-growing states clue graphic'
  },
  {
    id: 'sandwich',
    title: 'Sandwich Shopping',
    icon: 'assets/pbj-icon-bag.png',
    image: 'assets/pbj-sandwich-shopping.png',
    alt: 'Peanut butter and jelly sandwich shopping challenge clue graphic'
  },
  {
    id: 'interesting',
    title: 'Interesting Peanut Fact',
    icon: 'assets/pbj-icon-peanut-butter.png',
    image: 'assets/pbj-interesting.png',
    alt: 'Interesting fact about how many peanuts make a jar of peanut butter'
  },
  {
    id: 'joke',
    title: 'Joke of the Page',
    icon: 'assets/pbj-icon-peanut.png',
    image: 'assets/pbj-joke.png',
    alt: 'Peanut driver joke clue graphic'
  },
  {
    id: 'pantry',
    title: 'Pantry Shelf',
    icon: 'assets/pbj-icon-jelly.png',
    image: 'assets/pbj-pantry-shelf.png',
    alt: 'Organized pantry shelf with jars and colored peanut butter lids'
  }
];

const clueContent = {
  date: {
    title: 'PB&J Day',
    body: `
      <p>National Peanut Butter and Jelly Day is celebrated every year on April 2nd.</p>
      <p>The average American will have eaten over 2000 peanut butter and jelly sandwiches by the time they graduate from high school.</p>
      <p>The first reference of peanut butter paired with jelly in the United States was by Julia Davis Chandler in 1901.</p>`
  },
  peanuts: {
    title: 'Growing the Peanuts',
    body: `
      <p>The United States is the world's third largest producer of peanuts.</p>
      <p>Ten states grow 99% of the U.S. peanut crop. Georgia grows about 42%, followed by Texas, Alabama, Florida, North Carolina, South Carolina, Mississippi, Virginia, Oklahoma, and New Mexico.</p>`
  },
  joke: {
    title: 'PB&J Joke',
    body: `
      <p>Where do peanut drivers go to fill their tanks?</p>
      <p class="blank-line" aria-hidden="true"></p>`
  },
  jars: {
    title: 'Jar Lid Lineup',
    body: `
      <div class="jar-shelf" aria-label="Five jars with colored lids in order">
        <span class="jar blue-lid"><span></span></span>
        <span class="jar green-lid"><span></span></span>
        <span class="jar red-lid"><span></span></span>
        <span class="jar white-lid"><span></span></span>
        <span class="jar yellow-lid"><span></span></span>
      </div>`
  },
  spreads: {
    title: 'Spread Notes',
    body: `
      <p>Jelly is made from the juice of the fruit.</p>
      <p>Jam is made from crushed or chopped fruit.</p>
      <p>Marmalade is usually a jam made from citrus fruit, like oranges, lemons, limes, or grapefruits.</p>
      <p>In 1968, The J.M. Smucker Co. introduced Goober, a jarred product that combined alternating vertical stripes of peanut butter and jelly.</p>`
  }
};

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

function openClue(trigger) {
  const clue = clueContent[trigger.dataset.clue];
  if (!clue) return;
  clueDialogTitle.textContent = clue.title;
  clueDialogBody.innerHTML = clue.body;
  clueDialog.showModal();
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
  clearLeafCelebration();

  for (let i = 0; i < 46; i += 1) {
    const snack = document.createElement('span');
    snack.className = i % 2 === 0 ? 'pbj-fall sandwich-fall' : 'pbj-fall peanut-fall';
    snack.style.setProperty('--x', `${Math.random() * 100}vw`);
    snack.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    snack.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    snack.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    snack.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    leafCelebration.appendChild(snack);
  }

  celebrationTimer = setTimeout(clearLeafCelebration, 8200);
}

function clearLeafCelebration() {
  clearTimeout(celebrationTimer);
  leafCelebration.replaceChildren();
}

document.addEventListener('click', event => {
  const imageButton = event.target.closest('[data-image]');
  if (imageButton) {
    openImage(imageButton);
    return;
  }

  const clueButton = event.target.closest('[data-clue]');
  if (clueButton) openClue(clueButton);

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
document.getElementById('closeClueDialog').addEventListener('click', () => clueDialog.close());
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

dialogImage.addEventListener('error', () => {
  imageDialog.classList.add('is-missing-image');
  dialogImage.hidden = true;
  imageFallback.hidden = false;
  imageFallback.textContent = `This clue is ready for ${dialogImage.getAttribute('src')}. Add the graphic to the assets folder, and it will open here.`;
});

renderClues();
renderLocks();
