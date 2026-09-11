const rounds = [
  {
    title: 'Thanksgiving Convenience Foods',
    instruction: 'Put These in Time Order',
    cards: [
      { id: 'cranberry-sauce', text: 'Canned cranberry sauce introduced' },
      { id: 'tv-dinner', text: 'Swanson turkey TV dinner appears' },
      { id: 'green-bean-casserole', text: 'Green bean casserole is created' },
      { id: 'stove-top', text: 'Stove Top Stuffing arrives' }
    ],
    correctOrder: ['cranberry-sauce', 'tv-dinner', 'green-bean-casserole', 'stove-top'],
    reveal: 'From canned cranberry sauce to boxed stuffing, some familiar Thanksgiving foods arrived decades apart.'
  },
  {
    title: 'Parade Progress',
    instruction: 'Put These in Time Order',
    cards: [
      { id: 'macys-first-parade', text: "Macy's first parade" },
      { id: 'giant-balloons', text: 'Giant character balloons arrive' },
      { id: 'mickey-balloon', text: 'Mickey Mouse appears as a parade balloon' },
      { id: 'network-tv', text: 'The parade reaches network television' }
    ],
    correctOrder: ['macys-first-parade', 'giant-balloons', 'mickey-balloon', 'network-tv'],
    reveal: 'The parade came first. Those famous giant balloons joined the celebration a few years later.'
  },
  {
    title: 'Turkey Transformation',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'season-turkey', text: 'Season the turkey' },
      { id: 'roast-turkey', text: 'Roast the turkey' },
      { id: 'serving-platter', text: 'Place it on a serving platter' },
      { id: 'carve-turkey', text: 'Carve the turkey' }
    ],
    correctOrder: ['season-turkey', 'roast-turkey', 'serving-platter', 'carve-turkey'],
    reveal: 'Dinner is served! The turkey has made it from preparation to the table.'
  },
  {
    title: 'Cranberry Journey',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'grow-vines', text: 'Cranberries grow on vines' },
      { id: 'harvested', text: 'Cranberries are harvested' },
      { id: 'store', text: 'Cranberries reach the store' },
      { id: 'made-sauce', text: 'Cranberries are made into sauce' }
    ],
    correctOrder: ['grow-vines', 'harvested', 'store', 'made-sauce'],
    reveal: 'Those little red berries take quite a trip before reaching the Thanksgiving table.'
  },
  {
    title: 'Thanksgiving on Screen',
    instruction: 'Put These in Time Order',
    cards: [
      { id: 'charlie-brown', text: 'A Charlie Brown Thanksgiving' },
      { id: 'planes-trains', text: 'Planes, Trains and Automobiles' },
      { id: 'simpsons', text: 'The Simpsons Thanksgiving episode' },
      { id: 'addams-family', text: 'Addams Family Values' }
    ],
    correctOrder: ['charlie-brown', 'planes-trains', 'simpsons', 'addams-family'],
    reveal: 'Thanksgiving has been showing up on television and movie screens for decades.'
  }
];

const cardList = document.querySelector('#cardList');
const progressText = document.querySelector('#progressText');
const instructionText = document.querySelector('#instructionText');
const roundTitle = document.querySelector('#roundTitle');
const checkButton = document.querySelector('#checkButton');
const feedbackText = document.querySelector('#feedbackText');
const revealBox = document.querySelector('#revealBox');
const revealText = document.querySelector('#revealText');
const nextButton = document.querySelector('#nextButton');
const moveUpButton = document.querySelector('#moveUpButton');
const moveDownButton = document.querySelector('#moveDownButton');
const playScreen = document.querySelector('#playScreen');
const finalScreen = document.querySelector('#finalScreen');
const playAgainButton = document.querySelector('#playAgainButton');

let currentRoundIndex = 0;
let currentOrder = [];
let selectedCardId = null;
let dragCardId = null;
let touchDrag = null;

function startRound(index) {
  currentRoundIndex = index;
  currentOrder = shuffleCards(rounds[index].cards.map(card => card.id));
  selectedCardId = null;
  dragCardId = null;
  touchDrag = null;
  renderRound();
}

function shuffleCards(ids) {
  const shuffled = [...ids];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return arraysMatch(shuffled, ids) ? [shuffled[1], shuffled[0], shuffled[2], shuffled[3]] : shuffled;
}

function renderRound() {
  const round = rounds[currentRoundIndex];
  progressText.textContent = `Round ${currentRoundIndex + 1} of ${rounds.length}`;
  instructionText.textContent = round.instruction;
  roundTitle.textContent = round.title;
  feedbackText.textContent = '';
  feedbackText.className = 'feedback';
  revealBox.hidden = true;
  checkButton.disabled = false;
  renderCards();
}

function renderCards() {
  const round = rounds[currentRoundIndex];
  const fragment = document.createDocumentFragment();

  currentOrder.forEach((cardId, index) => {
    const card = round.cards.find(item => item.id === cardId);
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mix-card';
    button.draggable = true;
    button.dataset.cardId = card.id;
    button.setAttribute('aria-pressed', selectedCardId === card.id ? 'true' : 'false');
    button.setAttribute('aria-label', `${card.text}, position ${index + 1} of ${currentOrder.length}`);
    button.innerHTML = `<span class="card-position">${index + 1}</span><span class="card-text">${card.text}</span>`;
    button.addEventListener('click', () => selectCard(card.id));
    button.addEventListener('keydown', event => handleCardKeydown(event, card.id));
    button.addEventListener('dragstart', event => handleDragStart(event, card.id));
    button.addEventListener('dragend', handleDragEnd);
    button.addEventListener('dragover', event => handleDragOver(event, card.id));
    button.addEventListener('drop', event => handleDrop(event, card.id));
    button.addEventListener('touchstart', event => handleTouchStart(event, card.id), { passive: true });
    button.addEventListener('touchmove', handleTouchMove, { passive: false });
    button.addEventListener('touchend', handleTouchEnd);
    button.addEventListener('touchcancel', handleTouchEnd);
    if (dragCardId === card.id) {
      button.classList.add('dragging');
    }
    item.append(button);
    fragment.append(item);
  });

  cardList.replaceChildren(fragment);
  updateMoveButtons();
}

function selectCard(cardId) {
  selectedCardId = selectedCardId === cardId ? null : cardId;
  renderCards();
}

function handleCardKeydown(event, cardId) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    selectedCardId = cardId;
    moveSelectedCard(-1);
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    selectedCardId = cardId;
    moveSelectedCard(1);
  }
}

function handleDragStart(event, cardId) {
  dragCardId = cardId;
  selectedCardId = cardId;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', cardId);
  event.currentTarget.classList.add('dragging');
}

function handleDragEnd() {
  dragCardId = null;
  renderCards();
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event, targetCardId) {
  event.preventDefault();
  const sourceCardId = event.dataTransfer.getData('text/plain') || dragCardId;
  if (!sourceCardId || sourceCardId === targetCardId) return;
  const targetRect = event.currentTarget.getBoundingClientRect();
  const placement = event.clientY > targetRect.top + targetRect.height / 2 ? 1 : 0;
  moveCardTo(sourceCardId, targetCardId, placement);
  dragCardId = null;
}

function handleTouchStart(event, cardId) {
  const touch = event.touches[0];
  touchDrag = {
    cardId,
    startY: touch.clientY,
    active: false
  };
  selectedCardId = cardId;
}

function handleTouchMove(event) {
  if (!touchDrag) return;
  const touch = event.touches[0];
  if (Math.abs(touch.clientY - touchDrag.startY) < 8 && !touchDrag.active) return;

  event.preventDefault();
  touchDrag.active = true;
  dragCardId = touchDrag.cardId;
  const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.mix-card');

  if (target && target.dataset.cardId && target.dataset.cardId !== touchDrag.cardId) {
    const targetRect = target.getBoundingClientRect();
    const placement = touch.clientY > targetRect.top + targetRect.height / 2 ? 1 : 0;
    moveCardTo(touchDrag.cardId, target.dataset.cardId, placement);
  }
}

function handleTouchEnd() {
  touchDrag = null;
  dragCardId = null;
  renderCards();
}

function moveCardTo(sourceCardId, targetCardId, placement) {
  const nextOrder = currentOrder.filter(id => id !== sourceCardId);
  const targetIndex = nextOrder.indexOf(targetCardId);
  nextOrder.splice(targetIndex + placement, 0, sourceCardId);
  currentOrder = nextOrder;
  selectedCardId = sourceCardId;
  renderCards();
}

function moveSelectedCard(direction) {
  if (!selectedCardId) return;
  const index = currentOrder.indexOf(selectedCardId);
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= currentOrder.length) return;
  [currentOrder[index], currentOrder[nextIndex]] = [currentOrder[nextIndex], currentOrder[index]];
  renderCards();
  cardList.querySelector(`[data-card-id="${selectedCardId}"]`)?.focus();
}

function updateMoveButtons() {
  const index = currentOrder.indexOf(selectedCardId);
  moveUpButton.disabled = index <= 0;
  moveDownButton.disabled = index < 0 || index >= currentOrder.length - 1;
}

function checkMix() {
  const round = rounds[currentRoundIndex];
  if (!arraysMatch(currentOrder, round.correctOrder)) {
    feedbackText.textContent = 'Not quite. Give the mix another try!';
    feedbackText.className = 'feedback retry';
    return;
  }

  feedbackText.textContent = 'You fixed the mix!';
  feedbackText.className = 'feedback success';
  revealText.textContent = round.reveal;
  revealBox.hidden = false;
  checkButton.disabled = true;
  nextButton.textContent = currentRoundIndex === rounds.length - 1 ? 'See Celebration' : 'Next Round';
}

function showNextRound() {
  if (currentRoundIndex === rounds.length - 1) {
    showFinalScreen();
    return;
  }

  startRound(currentRoundIndex + 1);
}

function showFinalScreen() {
  playScreen.hidden = true;
  finalScreen.hidden = false;
  finalScreen.focus?.();
}

function playAgain() {
  finalScreen.hidden = true;
  playScreen.hidden = false;
  startRound(0);
}

function arraysMatch(first, second) {
  return first.length === second.length && first.every((item, index) => item === second[index]);
}

checkButton.addEventListener('click', checkMix);
nextButton.addEventListener('click', showNextRound);
moveUpButton.addEventListener('click', () => moveSelectedCard(-1));
moveDownButton.addEventListener('click', () => moveSelectedCard(1));
playAgainButton.addEventListener('click', playAgain);

startRound(0);
