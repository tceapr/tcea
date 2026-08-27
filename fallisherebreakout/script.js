const locks = [
  {
    id: 'letterFive',
    title: '5 Letter Lock',
    label: 'Use all capital letters. Example: ABCD',
    answerHash: '9b0180c9'
  },
  {
    id: 'harvestMoonDirection',
    title: '3 Direction Lock',
    label: 'L = Left, R = Right, U = Up, and D = Down. Example: LRD',
    answerHash: 'aba7c784'
  },
  {
    id: 'numberLock',
    title: '4 Number Lock',
    label: 'Use numbers only. Example: 1234',
    answerHash: '0322ff42'
  },
  {
    id: 'directionFour',
    title: '4 Direction Lock',
    label: 'L = Left, R = Right, U = Up, and D = Down. Example: LRUD',
    answerHash: 'cdfaf938'
  }
];

const clueTiles = [
  {
    id: 'autumnMap',
    title: 'Autumn Town Map',
    icon: 'assets/icons/fallicon-map.png',
    image: 'assets/autumn-town-map.png',
    alt: 'Map of United States towns with fall in their names',
    wide: true
  },
  {
    id: 'fourSeasons',
    title: 'Four Seasons',
    icon: 'assets/icons/fallicon6.png',
    image: 'assets/four-seasons.svg',
    alt: 'Graphic explaining spring, summer, fall, and winter',
    wide: true
  },
  {
    id: 'cornucopiaSort',
    title: 'Cornucopia Sort',
    icon: 'assets/icons/fallicon-cornucopia.png',
    image: 'assets/cornucopia-sort.png',
    alt: 'Puzzle asking what belongs in a cornucopia',
    wide: true
  },
  {
    id: 'fallFactCheck',
    title: 'Fall Fact Check',
    icon: 'assets/icons/fallicon8.png',
    action: 'factCheck'
  },
  {
    id: 'scarecrowFacts',
    title: 'Scarecrow Fun Facts',
    icon: 'assets/icons/fallicon-scarecrow.png',
    image: 'assets/scarecrow-fun-facts.png',
    alt: 'Scarecrow fun facts clue graphic'
  },
  {
    id: 'animalsWinter',
    title: 'Animals Get Ready for Winter',
    icon: 'assets/icons/fallicon5.png',
    image: 'assets/animals-get-ready-for-winter.png',
    alt: 'Animals get ready for winter clue graphic',
    wide: true
  },
  {
    id: 'deciduousTrees',
    title: 'Deciduous Trees',
    icon: 'assets/icons/fallicon-leaf.png',
    image: 'assets/deciduous-trees.png',
    alt: 'Deciduous tree explanation with autumn leaves',
    wide: true
  },
  {
    id: 'harvestMoon',
    title: 'The Harvest Moon',
    icon: 'assets/icons/fallicon7.png',
    image: 'assets/harvest-moon.png',
    alt: 'The Harvest Moon clue graphic',
    wide: true
  }
];

const state = new Map(locks.map(lock => [lock.id, false]));
const locksList = document.getElementById('locksList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const clueScene = document.getElementById('clueScene');
const clueDialog = document.getElementById('clueDialog');
const clueDialogTitle = document.getElementById('clueDialogTitle');
const clueDialogImage = document.getElementById('clueDialogImage');
const clueImageFallback = document.getElementById('clueImageFallback');
const factCheckDialog = document.getElementById('factCheckDialog');
const factCheckList = document.getElementById('factCheckList');
const factCheckStatus = document.getElementById('factCheckStatus');
const factCheckCode = document.getElementById('factCheckCode');
const winDialog = document.getElementById('winDialog');
const fallCelebration = document.getElementById('fallCelebration');
let celebrationTimer;
let winTimer;
let winQueued = false;

const factCheckData = [
  {
    id: 'leafPigment',
    statement: 'Leaves turn yellow because cold weather creates yellow pigment.',
    answerHash: 'c30bf539',
    response: 'Yellow pigment is already inside the leaf but is hidden by green chlorophyll.'
  },
  {
    id: 'appleAir',
    statement: 'Apples float because about 25 percent of an apple is air.',
    answerHash: 'd10c0b43',
    response: 'About 25 percent of an apple is air.'
  },
  {
    id: 'woollyBear',
    statement: 'A woolly bear caterpillar\'s stripes accurately predict the winter weather.',
    answerHash: 'c30bf539',
    response: 'Its coloring is influenced by age, species, and growing conditions.'
  },
  {
    id: 'pumpkinFruit',
    statement: 'Pumpkins are fruits.',
    answerHash: 'd10c0b43',
    response: 'They grow from flowers and contain seeds.'
  },
  {
    id: 'acorns',
    statement: 'Acorns grow on maple trees.',
    answerHash: 'c30bf539',
    response: 'Acorns grow on oak trees.'
  }
];

const factCheckState = new Map();

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

function lockHashes(lock) {
  return lock.answerHashes || (lock.answerHash ? [lock.answerHash] : []);
}

function lockIconSvg(isOpen) {
  if (isOpen) {
    return `
      <svg class="lock-icon-svg open-lock" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path class="lock-shackle" d="M24 30V20c0-8 5-14 13-14s13 6 13 14v8" fill="none" stroke="#25170f" stroke-width="8" stroke-linecap="round" />
        <rect x="12" y="29" width="40" height="27" rx="7" fill="#efb548" stroke="#25170f" stroke-width="5" />
        <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff6d7" stroke-width="4" stroke-linecap="round" opacity="0.95" />
      </svg>`;
  }

  return `
    <svg class="lock-icon-svg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path class="lock-shackle" d="M18 30v-8c0-10 6-16 14-16s14 6 14 16v8" fill="none" stroke="#25170f" stroke-width="8" stroke-linecap="round" />
      <rect x="12" y="29" width="40" height="27" rx="7" fill="#efb548" stroke="#25170f" stroke-width="5" />
      <path d="M18 35c8-3 19 3 29-2" fill="none" stroke="#fff6d7" stroke-width="4" stroke-linecap="round" opacity="0.95" />
    </svg>`;
}

function renderClues() {
  clueScene.innerHTML = clueTiles.map(clue => `
    <button class="clue-card-button" type="button" ${clue.action ? `data-action="${clue.action}"` : clue.pending ? 'data-pending="true"' : `data-image="${clue.image}"`} data-title="${clue.title}" data-alt="${clue.alt || clue.title}" ${clue.wide ? 'data-wide="true"' : ''} aria-label="Open ${clue.title}">
      <span class="clue-thumb-wrap">
        <img class="clue-thumb" src="${clue.icon}" alt="" loading="lazy">
        <span class="clue-thumb-fallback" aria-hidden="true">
          <span>${clue.title}</span>
          <small>Icon pending</small>
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

function renderFactCheck() {
  factCheckList.innerHTML = factCheckData.map((item, index) => {
    const selected = factCheckState.get(item.id);
    return `
      <article class="fact-card">
        <div class="fact-number">${index + 1}</div>
        <div class="fact-content">
          <p>${item.statement}</p>
          <div class="fact-choice-row" role="group" aria-label="Choose true or false for statement ${index + 1}">
            <button type="button" data-fact-id="${item.id}" data-fact-choice="T" aria-pressed="${selected === 'T'}">T</button>
            <button type="button" data-fact-id="${item.id}" data-fact-choice="F" aria-pressed="${selected === 'F'}">F</button>
          </div>
          <p class="fact-response">${selected ? 'Choice recorded.' : 'Choose T or F.'}</p>
        </div>
      </article>
    `;
  }).join('');

  const code = factCheckData.map(item => {
    const selected = factCheckState.get(item.id);
    return selected || '-';
  }).join('');
  const selectedCount = [...code].filter(letter => letter !== '-').length;

  factCheckCode.textContent = code;
  factCheckStatus.textContent = selectedCount === factCheckData.length
    ? 'All choices recorded.'
    : `${selectedCount} of ${factCheckData.length} choices recorded.`;
}

function chooseFact(factId, choice) {
  factCheckState.set(factId, choice);
  renderFactCheck();
}

function resetFactCheck() {
  factCheckState.clear();
  renderFactCheck();
}

function renderLocks() {
  locksList.innerHTML = locks.map(lock => {
    const solved = state.get(lock.id);
    return `
      <article class="lock-card ${solved ? 'solved' : ''}" data-lock="${lock.id}">
        <div class="lock-top">
          <div class="lock-title">
            ${lockIconSvg(solved)}
            <h3>${lock.title}</h3>
          </div>
        </div>
        <label for="${lock.id}Input">${lock.label}</label>
        <div class="lock-row">
          <input id="${lock.id}Input" autocomplete="off" ${solved ? 'disabled' : ''} value="${solved ? 'Unlocked' : ''}">
          <button type="button" data-check="${lock.id}" ${solved ? 'disabled' : ''}>Check</button>
        </div>
        <p class="feedback" id="${lock.id}Feedback">${solved ? 'Unlocked.' : ''}</p>
      </article>
    `;
  }).join('');
  updateProgress();
}

function updateProgress() {
  const solved = [...state.values()].filter(Boolean).length;
  progressText.textContent = `${solved} of ${locks.length} locks open`;
  progressFill.style.width = `${(solved / locks.length) * 100}%`;
  if (solved === locks.length && !winDialog.open && !winQueued) {
    winQueued = true;
    startFallCelebration();
    winTimer = setTimeout(() => winDialog.showModal(), 1300);
  }
}

function checkLock(lockId) {
  const lock = locks.find(item => item.id === lockId);
  const input = document.getElementById(`${lockId}Input`);
  const feedback = document.getElementById(`${lockId}Feedback`);
  const hashes = lockHashes(lock);

  if (!hashes.length) {
    feedback.textContent = 'This lock is waiting for its final answer.';
    input.select();
    return;
  }

  if (hashes.includes(hashValue(normalize(input.value)))) {
    state.set(lockId, true);
    renderLocks();
    return;
  }

  feedback.textContent = 'Not yet. Keep searching the autumn clues.';
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
  resetFactCheck();
  winQueued = false;
  clearTimeout(winTimer);
  clearFallCelebration();
  if (winDialog.open) winDialog.close();
  renderLocks();
}

function startFallCelebration() {
  clearFallCelebration();

  for (let i = 0; i < 48; i += 1) {
    const piece = document.createElement('span');
    piece.className = `fall-piece fall-piece-${i % 4}`;
    piece.style.setProperty('--x', `${Math.random() * 100}vw`);
    piece.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
    piece.style.setProperty('--duration', `${4.8 + Math.random() * 2.8}s`);
    piece.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    piece.style.setProperty('--spin', `${Math.random() * 680 + 240}deg`);
    fallCelebration.appendChild(piece);
  }

  celebrationTimer = setTimeout(clearFallCelebration, 8200);
}

function clearFallCelebration() {
  clearTimeout(celebrationTimer);
  fallCelebration.replaceChildren();
}

document.addEventListener('click', event => {
  const factChoice = event.target.closest('[data-fact-choice]');
  if (factChoice) {
    chooseFact(factChoice.dataset.factId, factChoice.dataset.factChoice);
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (actionButton && actionButton.dataset.action === 'factCheck') {
    renderFactCheck();
    factCheckDialog.showModal();
    return;
  }

  const imageButton = event.target.closest('[data-image], [data-pending]');
  if (imageButton) {
    openClueImage(imageButton);
    return;
  }

  const checkButton = event.target.closest('[data-check]');
  if (checkButton) checkLock(checkButton.dataset.check);
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  const input = event.target.closest('.lock-card input');
  if (input) checkLock(input.id.replace('Input', ''));
});

document.getElementById('closeClueDialog').addEventListener('click', () => clueDialog.close());
document.getElementById('closeFactCheckDialog').addEventListener('click', () => factCheckDialog.close());
document.getElementById('factCheckReset').addEventListener('click', resetFactCheck);
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

clueDialogImage.addEventListener('error', () => {
  clueDialogImage.hidden = true;
  clueImageFallback.hidden = false;
  clueImageFallback.textContent = 'This clue graphic is not available yet.';
});

renderClues();
renderFactCheck();
renderLocks();
