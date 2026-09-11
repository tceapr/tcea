const rounds = [
  {
    title: 'Pumpkin Pie Shuffle',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'press-crust', text: 'Press the crust into the pie plate' },
      { id: 'whisk-filling', text: 'Whisk together the pumpkin filling' },
      { id: 'pour-filling', text: 'Pour the filling into the crust' },
      { id: 'bake-pie', text: 'Bake until the filling is set' }
    ],
    correctOrder: ['press-crust', 'whisk-filling', 'pour-filling', 'bake-pie'],
    reveal: 'Crust. Filling. Oven. Pie! The hardest step comes next: waiting for it to cool before adding the whipped cream.'
  },
  {
    title: 'Macy’s Parade Morning',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'balloons-prepared', text: 'Giant balloons are inflated and prepared' },
      { id: 'line-up', text: 'Performers, floats, and balloons line up' },
      { id: 'manhattan-route', text: 'The parade travels through Manhattan' },
      { id: 'santa-finale', text: 'Santa Claus arrives at the grand finale' }
    ],
    correctOrder: ['balloons-prepared', 'line-up', 'manhattan-route', 'santa-finale'],
    reveal: 'Long before Santa closes the parade, hundreds of balloons, floats, performers, and handlers have already spent hours getting ready for the trip through New York City.'
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
    title: 'Cranberry Bog Shuffle',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'bog-flooded', text: 'The cranberry bed is flooded' },
      { id: 'berries-loose', text: 'A machine knocks the berries loose' },
      { id: 'berries-float', text: 'The berries float to the surface' },
      { id: 'berries-corralled', text: 'The floating berries are corralled together' }
    ],
    correctOrder: ['bog-flooded', 'berries-loose', 'berries-float', 'berries-corralled'],
    reveal: 'Cranberries do not grow underwater. During wet harvest, growers flood the beds, loosen the berries from the vines, and the berries float because they contain tiny air pockets. Then they are gathered together for collection.'
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
  },
  {
    title: 'Thanksgiving Becomes Official',
    instruction: 'Put These in Time Order',
    cards: [
      { id: 'washington-proclamation', text: 'George Washington issues a Thanksgiving proclamation', answerText: 'George Washington issues a Thanksgiving proclamation, 1789' },
      { id: 'lincoln-observance', text: 'Abraham Lincoln calls for a national Thanksgiving observance', answerText: 'Abraham Lincoln calls for a national Thanksgiving observance, 1863' },
      { id: 'roosevelt-earlier', text: 'Franklin D. Roosevelt moves Thanksgiving earlier', answerText: 'Franklin D. Roosevelt moves Thanksgiving earlier, 1939' },
      { id: 'congress-fourth-thursday', text: 'Congress establishes Thanksgiving on the fourth Thursday', answerText: 'Congress establishes Thanksgiving on the fourth Thursday, 1941' }
    ],
    correctOrder: ['washington-proclamation', 'lincoln-observance', 'roosevelt-earlier', 'congress-fourth-thursday'],
    reveal: 'It took more than 150 years for Thanksgiving to move from presidential proclamations to the fourth-Thursday date we know today.'
  },
  {
    title: 'Thanksgiving Convenience Foods',
    instruction: 'Put These in Time Order',
    cards: [
      {
        id: 'cranberry-sauce',
        text: 'Canned cranberry sauce introduced',
        clue: 'A shelf-stable holiday shortcut from the early days of canned foods',
        answerText: 'Canned cranberry sauce introduced, 1912'
      },
      {
        id: 'tv-dinner',
        text: 'Swanson turkey TV dinner appears',
        clue: 'A frozen meal created for the new age of eating dinner in front of the television',
        answerText: 'Swanson turkey TV dinner appears, 1953'
      },
      {
        id: 'green-bean-casserole',
        text: 'Green bean casserole is created',
        clue: 'A Campbell’s test-kitchen recipe built around canned soup',
        answerText: 'Green bean casserole is created, 1955'
      },
      {
        id: 'stove-top',
        text: 'Stove Top Stuffing arrives',
        clue: 'A boxed stuffing mix designed to make a holiday side dish much faster',
        answerText: 'Stove Top Stuffing arrives, 1972'
      }
    ],
    correctOrder: ['cranberry-sauce', 'tv-dinner', 'green-bean-casserole', 'stove-top'],
    reveal: 'Thanksgiving convenience foods did not arrive all at once. Canned cranberry sauce came first, followed decades later by frozen dinners, green bean casserole, and boxed stuffing.'
  },
  {
    title: 'Thanksgiving Football',
    instruction: 'Put These in Time Order',
    cards: [
      {
        id: 'princeton-yale',
        text: 'Princeton and Yale play Thanksgiving football',
        clue: 'College football was still a young sport, and the NFL did not even exist yet.',
        answerText: 'Princeton and Yale play Thanksgiving football, 1876'
      },
      {
        id: 'detroit-lions',
        text: 'Detroit Lions begin playing on Thanksgiving',
        clue: 'The tradition starts during the age of national radio broadcasts.',
        answerText: 'Detroit Lions begin playing on Thanksgiving, 1934'
      },
      {
        id: 'dallas-cowboys',
        text: 'Dallas Cowboys begin their Thanksgiving tradition',
        clue: 'The Cowboys were still one of the NFL’s newer teams.',
        answerText: 'Dallas Cowboys begin their Thanksgiving tradition, 1966'
      },
      {
        id: 'third-game',
        text: 'The NFL adds a third Thanksgiving game',
        clue: 'Thanksgiving football expands from an afternoon tradition to include a night game.',
        answerText: 'The NFL adds a third Thanksgiving game, 2006'
      }
    ],
    correctOrder: ['princeton-yale', 'detroit-lions', 'dallas-cowboys', 'third-game'],
    reveal: 'Thanksgiving football started with college teams in the 1800s. Detroit made it an NFL tradition in 1934, Dallas joined in 1966, and a third Thanksgiving game was added in 2006.'
  },
  {
    title: 'Ready, Set, Table',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'tablecloth', text: 'Cover the table with a tablecloth' },
      { id: 'centerpiece', text: 'Add the centerpiece' },
      { id: 'plates', text: 'Set a plate at each seat' },
      { id: 'utensils', text: 'Arrange the utensils, napkins, and glasses' }
    ],
    correctOrder: ['tablecloth', 'centerpiece', 'plates', 'utensils'],
    reveal: 'A Thanksgiving table comes together in layers, starting with the table itself and finishing with the details at each place setting.'
  },
  {
    title: 'Mashed Potato Makeover',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'peel-potatoes', text: 'Peel and cut the potatoes' },
      { id: 'boil-potatoes', text: 'Boil until tender' },
      { id: 'mash-potatoes', text: 'Mash the potatoes' },
      { id: 'butter-milk', text: 'Stir in butter and milk' }
    ],
    correctOrder: ['peel-potatoes', 'boil-potatoes', 'mash-potatoes', 'butter-milk'],
    reveal: 'A few simple steps turn firm potatoes into one of Thanksgiving’s creamiest side dishes.'
  },
  {
    title: 'The Leftover Remix',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'survey-leftovers', text: 'Open the refrigerator and survey the leftovers' },
      { id: 'pick-dishes', text: 'Pick a few dishes that might work together' },
      { id: 'combine-leftovers', text: 'Combine them into something new' },
      { id: 'heat-creation', text: 'Heat it up and give your creation a try' }
    ],
    correctOrder: ['survey-leftovers', 'pick-dishes', 'combine-leftovers', 'heat-creation'],
    reveal: 'Thanksgiving leftovers are a second chance to get creative. Yesterday’s turkey, stuffing, and sides can become an entirely new meal.'
  },
  {
    title: 'Apple Pie Journey',
    instruction: 'Put These in the Right Order',
    cards: [
      { id: 'pick-apples', text: 'Pick ripe apples from the orchard or grocery store' },
      { id: 'slice-apples', text: 'Peel, core, and slice the apples' },
      { id: 'sugar-spices', text: 'Toss the slices with sugar and spices' },
      { id: 'bake-apple-pie', text: 'Fill the crust and bake the pie' }
    ],
    correctOrder: ['pick-apples', 'slice-apples', 'sugar-spices', 'bake-apple-pie'],
    reveal: 'Apple pie starts with fresh fruit, then layers in sugar, spice, and a little patience before it reaches the table.'
  }
];

const cardList = document.querySelector('#cardList');
const progressText = document.querySelector('#progressText');
const instructionText = document.querySelector('#instructionText');
const roundTitle = document.querySelector('#roundTitle');
const roundGraphic = document.querySelector('#roundGraphic');
const checkButton = document.querySelector('#checkButton');
const feedbackText = document.querySelector('#feedbackText');
const revealBox = document.querySelector('#revealBox');
const revealText = document.querySelector('#revealText');
const answerList = document.querySelector('#answerList');
const nextButton = document.querySelector('#nextButton');
const moveUpButton = document.querySelector('#moveUpButton');
const moveDownButton = document.querySelector('#moveDownButton');
const playScreen = document.querySelector('#playScreen');
const finalScreen = document.querySelector('#finalScreen');
const playAgainButton = document.querySelector('#playAgainButton');
const confettiStage = document.querySelector('#confettiStage');

let currentRoundIndex = 0;
let currentOrder = [];
let selectedCardId = null;
let dragCardId = null;
let touchDrag = null;
let confettiTimers = [];

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
  roundGraphic.src = `assets/round-${currentRoundIndex + 1}.png`;
  roundGraphic.alt = `${round.title} round graphic`;
  feedbackText.textContent = '';
  feedbackText.className = 'feedback';
  revealBox.hidden = true;
  answerList.hidden = true;
  answerList.replaceChildren();
  checkButton.disabled = false;
  renderCards();
}

function renderCards(options = {}) {
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
    button.setAttribute('aria-label', `${card.text}${card.clue ? `. ${card.clue}` : ''}, position ${index + 1} of ${currentOrder.length}`);

    const position = document.createElement('span');
    position.className = 'card-position';
    position.textContent = index + 1;

    const copy = document.createElement('span');
    copy.className = 'card-copy';

    const text = document.createElement('span');
    text.className = 'card-text';
    text.textContent = card.text;
    copy.append(text);

    if (card.clue) {
      const clue = document.createElement('span');
      clue.className = 'card-clue';
      clue.textContent = card.clue;
      copy.append(clue);
    }

    button.append(position, copy);
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

  if (options.focusCardId) {
    cardList.querySelector(`[data-card-id="${options.focusCardId}"]`)?.focus();
  }
}

function selectCard(cardId) {
  selectedCardId = selectedCardId === cardId ? null : cardId;
  renderCards({ focusCardId: cardId });
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
  renderAnswerList(round);
  revealBox.hidden = false;
  checkButton.disabled = true;
  nextButton.textContent = currentRoundIndex === rounds.length - 1 ? 'See Celebration' : 'Next Round';
}

function renderAnswerList(round) {
  const answersWithExtraText = round.correctOrder
    .map(cardId => round.cards.find(card => card.id === cardId))
    .filter(card => card?.answerText);

  answerList.replaceChildren();
  answerList.hidden = answersWithExtraText.length === 0;

  answersWithExtraText.forEach(card => {
    const item = document.createElement('li');
    item.textContent = card.answerText;
    answerList.append(item);
  });
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
  runFinalConfetti();
  finalScreen.focus?.();
}

function playAgain() {
  clearConfetti();
  finalScreen.hidden = true;
  playScreen.hidden = false;
  startRound(0);
}

function runFinalConfetti() {
  clearConfetti();

  for (let burst = 0; burst < 8; burst += 1) {
    const timer = window.setTimeout(() => createConfettiBurst(burst), burst * 320);
    confettiTimers.push(timer);
  }
}

function createConfettiBurst(burstIndex) {
  const pieces = ['●', '🫛', '🥔', '🥧'];
  const pieceCount = 30;

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement('span');
    const angle = ((Math.PI * 2) / pieceCount) * index + burstIndex * 0.18;
    const distance = 180 + Math.random() * 360;
    const drift = (Math.random() - 0.5) * 130;
    const symbol = pieces[(index + burstIndex) % pieces.length];

    piece.className = 'confetti-piece';
    piece.textContent = symbol;
    piece.style.setProperty('--burst-x', `${Math.cos(angle) * distance + drift}px`);
    piece.style.setProperty('--burst-y', `${Math.sin(angle) * distance + drift}px`);
    piece.style.setProperty('--burst-rotation', `${Math.floor(Math.random() * 720 - 360)}deg`);

    if (symbol === '●') {
      piece.style.color = '#b93335';
    }

    piece.addEventListener('animationend', () => piece.remove(), { once: true });
    confettiStage.append(piece);
  }
}

function clearConfetti() {
  confettiTimers.forEach(timer => window.clearTimeout(timer));
  confettiTimers = [];
  confettiStage.replaceChildren();
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
