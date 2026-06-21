const locks = [
  {
    id: 'word',
    title: '4 Word Lock',
    badge: 'Word',
    label: 'Enter the four clue words as one answer.',
    answerHash: '29cca07e',
    hint: 'Look for four standout words in the tree poem.'
  },
  {
    id: 'number',
    title: '4 Number Lock',
    badge: 'Number',
    label: 'Enter the total from the cornucopia clue.',
    answerHash: '0322ff42',
    hint: 'Only the items that belong in the cornucopia are part of the total.'
  },
  {
    id: 'color',
    title: '6 Color Lock',
    badge: 'Color',
    label: 'Use the first letter of each leaf color.',
    answerHash: '0cdd9bcb',
    hint: 'Read the leaf trail from left to right.'
  },
  {
    id: 'direction',
    title: '4 Direction Lock',
    badge: 'Direction',
    label: 'Use U, D, L, and R for the town path.',
    answerHash: 'cdfaf938',
    hint: 'Follow the fall town route in order.'
  }
];

const clues = {
  tree: {
    title: 'Tree Poem',
    body: `
      <div class="poem-lines">
        <p>Leaves <span class="clue-word">BLOW</span> past the window.</p>
        <p>They drift <span class="clue-word">SLOW</span> through the air.</p>
        <p>They twirl <span class="clue-word">AROUND</span> the branches.</p>
        <p>Then rest on the <span class="clue-word">GROUND</span>.</p>
      </div>`
  },
  cornucopia: {
    title: 'Cornucopia Math',
    body: `
      <div class="math-board">
        <p>The cornucopia needs corn, apples, and grapes. Add only those three harvest values.</p>
        <div class="produce-grid">
          <div class="produce-card">Corn<br>300</div>
          <div class="produce-card">Apples<br>400</div>
          <div class="produce-card">Grapes<br>450</div>
        </div>
      </div>`
  },
  leaves: {
    title: 'Leaf Trail',
    body: `
      <div class="leaf-board">
        <p>Read the colors from left to right. Use the first letter of each color.</p>
        <div class="leaf-trail" aria-label="Leaf colors from left to right">
          <div class="leaf yellow">Yellow</div>
          <div class="leaf orange">Orange</div>
          <div class="leaf blue">Blue</div>
          <div class="leaf orange">Orange</div>
          <div class="leaf red">Red</div>
          <div class="leaf yellow">Yellow</div>
        </div>
      </div>`
  },
  map: {
    title: 'Fall Town Map',
    body: `
      <div class="map-board">
        <p>Follow the fall town route. Each card shows one move on the map.</p>
        <div class="route-list" aria-label="Fall town route">
          <div class="route-card"><span>Falls Church to Fall City</span><strong>Left</strong></div>
          <div class="route-card"><span>Fall City to Fallbrook</span><strong>Down</strong></div>
          <div class="route-card"><span>Fallbrook to Fall Branch</span><strong>Right</strong></div>
          <div class="route-card"><span>Fall Branch to Fall River</span><strong>Up</strong></div>
        </div>
      </div>`
  }
};

const state = new Map(locks.map(lock => [lock.id, false]));
const locksList = document.getElementById('locksList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const clueDialog = document.getElementById('clueDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogBody = document.getElementById('dialogBody');
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

function openClue(id) {
  const clue = clues[id];
  dialogTitle.textContent = clue.title;
  dialogBody.innerHTML = clue.body;
  clueDialog.showModal();
}

function resetGame() {
  locks.forEach(lock => state.set(lock.id, false));
  if (winDialog.open) winDialog.close();
  renderLocks();
}

document.addEventListener('click', event => {
  const clueButton = event.target.closest('[data-clue]');
  if (clueButton) openClue(clueButton.dataset.clue);

  const checkButton = event.target.closest('[data-check]');
  if (checkButton) checkLock(checkButton.dataset.check);
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  const input = event.target.closest('.lock-card input');
  if (input) checkLock(input.id.replace('Input', ''));
});

document.getElementById('closeDialog').addEventListener('click', () => clueDialog.close());
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

renderLocks();
