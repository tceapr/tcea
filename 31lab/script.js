const categories = [
  'Math',
  'Time and calendars',
  'Science',
  'Geography',
  'History',
  'Popular culture'
];

const missions = [
  {
    id: 'prime',
    title: 'Prime Scanner',
    symbol: 'P',
    category: 'Math',
    fact: 'Only 1 and 31 divide evenly into 31.'
  },
  {
    id: 'binary',
    title: 'Binary Switchboard',
    symbol: '01',
    category: 'Math',
    fact: '011111 in binary equals 31.'
  },
  {
    id: 'roman',
    title: 'Roman Numeral Builder',
    symbol: 'X',
    category: 'Math',
    fact: 'XXXI is 31 in Roman numerals.'
  },
  {
    id: 'make31',
    title: 'Make 31 Machine',
    symbol: '+',
    category: 'Math',
    fact: '1, 2, 4, 8, and 16 add to 31.'
  },
  {
    id: 'calendar',
    title: 'Calendar Hunt',
    symbol: 'M',
    category: 'Time and calendars',
    fact: 'Seven months have 31 days.'
  },
  {
    id: 'halloween',
    title: 'Halloween Door',
    symbol: 'O',
    category: 'Time and calendars',
    fact: 'Halloween is October 31.'
  },
  {
    id: 'state',
    title: '31st State Case',
    symbol: 'CA',
    category: 'Geography',
    fact: 'California became the 31st state.'
  },
  {
    id: 'gallium',
    title: 'Gallium Lab',
    symbol: 'Ga',
    category: 'Science',
    fact: 'Gallium melts at about 85.6 degrees Fahrenheit.'
  },
  {
    id: 'flavor',
    title: 'Flavor Formula 31',
    symbol: 'F',
    category: 'Math',
    fact: 'Robot Raspberry, Sprinkle Sparks, and Cherry Pop total 31.'
  },
  {
    id: 'president',
    title: 'The Mystery of President 31',
    symbol: 'H',
    category: 'History',
    fact: 'Herbert Hoover was the 31st U.S. president.'
  },
  {
    id: 'phone',
    title: 'International Call',
    symbol: '+31',
    category: 'Geography',
    fact: '+31 is the country calling code for the Netherlands.'
  },
  {
    id: 'bunyan',
    title: 'Paul Bunyan Fact Builder',
    symbol: 'FT',
    category: 'Popular culture',
    fact: 'The Paul Bunyan statue in Bangor, Maine is 31 feet tall.'
  },
  {
    id: 'history',
    title: 'The 13th Amendment Timeline',
    symbol: '1865',
    category: 'History',
    fact: 'Congress approved the 13th Amendment before states ratified it on December 6, 1865.'
  }
];

const solved = new Set();
const missionRing = document.getElementById('missionRing');
const challengeRoot = document.getElementById('challengeRoot');
const challengeTitle = document.getElementById('challengeTitle');
const progressCount = document.getElementById('progressCount');
const progressFill = document.getElementById('progressFill');
const machineMessage = document.getElementById('machineMessage');
const numberCore = document.querySelector('.number-core');
const finalPanel = document.getElementById('finalPanel');
const sortRoot = document.getElementById('sortRoot');
const sortFeedback = document.getElementById('sortFeedback');
const badgeDialog = document.getElementById('badgeDialog');
const closeBadgeButton = document.getElementById('closeBadgeButton');
const scoreCount = document.getElementById('scoreCount');

const scoreStorageKey = 'the31LabScores';
const binaryPlaceValues = [32, 16, 8, 4, 2, 1];
const calendarCorrectMonths = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
const halloweenMoves = [
  { id: 'nextFriday', label: 'Move to the next Friday' },
  { id: 'forward12', label: 'Move forward 12 days' },
  { id: 'nextMonday', label: 'Move to the next Monday' },
  { id: 'forward10', label: 'Move forward 10 days' }
];
const halloweenCorrectRoute = ['nextFriday', 'forward10', 'nextMonday', 'forward12'];
const flavorOptions = {
  base: [
    { id: 'moonbeamVanilla', name: 'Moonbeam Vanilla', value: 11 },
    { id: 'robotRaspberry', name: 'Robot Raspberry', value: 14 },
    { id: 'confettiChocolate', name: 'Confetti Chocolate', value: 17 }
  ],
  mixIn: [
    { id: 'cometCrunch', name: 'Comet Crunch', value: 4 },
    { id: 'brownieBits', name: 'Brownie Bits', value: 7 },
    { id: 'sprinkleSparks', name: 'Sprinkle Sparks', value: 9 }
  ],
  topping: [
    { id: 'caramelSwirl', name: 'Caramel Swirl', value: 3 },
    { id: 'whippedCloud', name: 'Whipped Cloud', value: 6 },
    { id: 'cherryPop', name: 'Cherry Pop', value: 8 }
  ]
};
const flavorCorrectFormula = {
  base: 'robotRaspberry',
  mixIn: 'sprinkleSparks',
  topping: 'cherryPop'
};
const netherlandsQuestions = [
  {
    prompt: 'Amsterdam is the capital of the Netherlands.',
    answer: true
  },
  {
    prompt: 'The Netherlands is located in South America.',
    answer: false
  },
  {
    prompt: 'Bicycles are a popular form of transportation in the Netherlands.',
    answer: true
  }
];
const historyEvents = [
  {
    id: 'ratified',
    date: 'December 6, 1865',
    text: 'Enough states ratified the amendment for it to become part of the Constitution.'
  },
  {
    id: 'senate',
    date: 'April 8, 1864',
    text: 'The Senate approved the proposed 13th Amendment.'
  },
  {
    id: 'house',
    date: 'January 31, 1865',
    text: 'The House approved the amendment, completing congressional passage and sending it to the states.'
  }
];
const historyCorrectOrder = ['senate', 'house', 'ratified'];
const historyMeaningChoices = [
  { id: 'speech', text: 'Protected freedom of speech' },
  { id: 'slavery', text: 'Abolished slavery' },
  { id: 'womenVote', text: 'Gave women the right to vote' },
  { id: 'citizenship', text: 'Established citizenship for everyone born in the United States' }
];
const galliumCorrectItems = ['Computer', 'LED light', 'Phone', 'Solar panel'];
const bunyanChoices = {
  selectedLocation: ['Bangor, Maine', 'Detroit, Michigan', 'Duluth, Minnesota', 'Portland, Oregon'],
  selectedHeight: ['21 feet', '31 feet', '41 feet', '51 feet'],
  selectedYear: ['1931', '1959', '1976', '1984'],
  selectedReason: [
    "To celebrate Bangor's lumber history",
    'To honor basketball history',
    'To mark a state fair opening',
    'To celebrate a winter carnival'
  ]
};
const bunyanCorrectFacts = {
  selectedLocation: 'Bangor, Maine',
  selectedHeight: '31 feet',
  selectedYear: '1959',
  selectedReason: "To celebrate Bangor's lumber history"
};

let activeMission = null;
let romanState = createRomanState();
let romanDrag = null;
let primeState = createPrimeState();
let binaryState = createBinaryState();
let calendarState = createCalendarState();
let halloweenState = createHalloweenState();
let halloweenDrag = null;
let halloweenRouteAnimating = false;
let galliumState = createGalliumState();
let phoneState = createPhoneState();
let flavorState = createFlavorState();
let presidentState = createPresidentState();
let bunyanState = createBunyanState();
let historyState = createHistoryState();
let make31WrongChecks = 0;
let make31Score = null;
let stateScore = null;
const stateRuledOut = new Set();
let missionScores = {};
let historyDrag = null;

resetSavedLabOnOpen();
loadScoreState();

function missionById(id) {
  return missions.find(mission => mission.id === id);
}

function resetSavedLabOnOpen() {
  try {
    localStorage.removeItem(scoreStorageKey);
  } catch {
    // Local storage can be unavailable in some restricted browser modes.
  }
}

function createPrimeState(saved = {}) {
  const submittedAttempts = Number(saved.submittedAttempts || 0);
  return {
    selectedNumbers: Array.isArray(saved.selectedNumbers) ? saved.selectedNumbers : [],
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Number(saved.currentPossibleScore)
      : primePossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function primePossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function createBinaryState(saved = {}) {
  const switchStates = Array.isArray(saved.switchStates)
    ? binaryPlaceValues.map((_, index) => Boolean(saved.switchStates[index]))
    : binaryPlaceValues.map(() => false);
  const submittedAttempts = Number.isFinite(Number(saved.submittedAttempts))
    ? Math.max(0, Number(saved.submittedAttempts))
    : 0;
  const decimalTotal = binaryDecimalTotal(switchStates);
  return {
    switchStates,
    binaryCode: binaryCodeFromStates(switchStates),
    decimalTotal,
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Math.max(0, Number(saved.currentPossibleScore))
      : binaryPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function binaryPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function binaryCodeFromStates(states = binaryState.switchStates) {
  return states.map(isOn => isOn ? '1' : '0').join('');
}

function binaryDecimalTotal(states = binaryState.switchStates) {
  return states.reduce((sum, isOn, index) => sum + (isOn ? binaryPlaceValues[index] : 0), 0);
}

function syncBinaryState() {
  binaryState.binaryCode = binaryCodeFromStates();
  binaryState.decimalTotal = binaryDecimalTotal();
}

function createRomanState(saved = {}) {
  const submittedAttempts = Number(saved.submittedAttempts || 0);
  const placedTiles = Array.isArray(saved.placedTiles)
    ? [0, 1, 2, 3].map(index => ['I', 'V', 'X'].includes(saved.placedTiles[index]) ? saved.placedTiles[index] : '')
    : ['', '', '', ''];
  return {
    placedTiles,
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Number(saved.currentPossibleScore)
      : romanPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function romanPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function submittedAttemptsFromScore(points) {
  if (points === 31) return 1;
  if (points === 13) return 2;
  return 3;
}

function primeStateForStorage() {
  if (primeState.isReplay && primeState.hasAwardedPoints) {
    return {
      ...primeState,
      selectedNumbers: [1, 31],
      submittedAttempts: submittedAttemptsFromScore(primeState.pointsEarned),
      currentPossibleScore: primeState.pointsEarned,
      isReplay: false
    };
  }
  return { ...primeState, isReplay: false };
}

function binaryStateForStorage() {
  if (binaryState.isReplay && binaryState.hasAwardedPoints) {
    const savedPoints = hasAwardedScore('binary') ? savedMissionScore('binary') : binaryState.pointsEarned;
    return createBinaryState({
      switchStates: [false, true, true, true, true, true],
      submittedAttempts: submittedAttemptsFromScore(savedPoints),
      currentPossibleScore: savedPoints,
      pointsEarned: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...binaryState, isReplay: false };
}

function romanStateForStorage() {
  if (romanState.isReplay && romanState.hasAwardedPoints) {
    return {
      ...romanState,
      placedTiles: ['X', 'X', 'X', 'I'],
      submittedAttempts: submittedAttemptsFromScore(romanState.pointsEarned),
      currentPossibleScore: romanState.pointsEarned,
      isReplay: false
    };
  }
  return { ...romanState, isReplay: false };
}

function createGalliumState(saved = {}) {
  const selectedItems = Array.isArray(saved.selectedItems)
    ? [...new Set(saved.selectedItems.filter(item => ['LED light', 'Phone', 'Solar panel', 'Computer', 'Wooden spoon', 'Paper clip'].includes(item)))].sort()
    : [];
  const submittedAttempts = Number.isFinite(Number(saved.submittedAttempts))
    ? Math.max(0, Number(saved.submittedAttempts))
    : 0;
  return {
    currentTemperature: Number.isFinite(Number(saved.currentTemperature)) ? Number(saved.currentTemperature) : 82,
    selectedItems,
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Math.max(0, Number(saved.currentPossibleScore))
      : galliumPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function galliumPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function galliumStateForStorage() {
  if (galliumState.isReplay && galliumState.hasAwardedPoints) {
    const savedPoints = hasAwardedScore('gallium') ? savedMissionScore('gallium') : galliumState.pointsEarned;
    return createGalliumState({
      currentTemperature: 85.6,
      selectedItems: galliumCorrectItems,
      submittedAttempts: submittedAttemptsFromScore(savedPoints),
      currentPossibleScore: savedPoints,
      pointsEarned: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...galliumState, isReplay: false };
}

function createPhoneState(saved = {}) {
  const answers = Array.isArray(saved.answers)
    ? netherlandsQuestions.map((question, index) => {
      const savedAnswer = saved.answers[index] || {};
      const selectedAnswer = typeof savedAnswer.selectedAnswer === 'boolean' ? savedAnswer.selectedAnswer : null;
      const isChecked = Boolean(savedAnswer.isChecked);
      const isCorrect = isChecked && selectedAnswer === question.answer;
      return {
        selectedAnswer,
        isChecked,
        isCorrect,
        pointsEarned: isChecked && isCorrect ? 20 : 0
      };
    })
    : netherlandsQuestions.map(() => ({
      selectedAnswer: null,
      isChecked: false,
      isCorrect: false,
      pointsEarned: 0
    }));
  const answeredCount = answers.filter(answer => answer.isChecked).length;
  return {
    dialed: typeof saved.dialed === 'string' ? saved.dialed.slice(0, 3) : '',
    callConnected: Boolean(saved.callConnected),
    currentQuestionIndex: Math.min(
      netherlandsQuestions.length - 1,
      Math.max(0, Number.isFinite(Number(saved.currentQuestionIndex)) ? Number(saved.currentQuestionIndex) : answeredCount)
    ),
    answers,
    pointsEarned: answers.reduce((sum, answer) => sum + answer.pointsEarned, 0),
    correctCount: answers.filter(answer => answer.isCorrect).length,
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function phoneStateForStorage() {
  return { ...phoneState, isReplay: false };
}

function createCalendarState(saved = {}) {
  const selectedMonths = Array.isArray(saved.selectedMonths) ? saved.selectedMonths.filter(month => typeof month === 'string') : [];
  const correctSelections = Array.isArray(saved.correctSelections)
    ? saved.correctSelections.filter(month => calendarCorrectMonths.includes(month))
    : selectedMonths.filter(month => calendarCorrectMonths.includes(month));
  const incorrectSelections = Array.isArray(saved.incorrectSelections)
    ? saved.incorrectSelections.filter(month => !calendarCorrectMonths.includes(month))
    : selectedMonths.filter(month => !calendarCorrectMonths.includes(month));
  const selectionCount = Math.min(7, correctSelections.length + incorrectSelections.length);
  return {
    selectedMonths: [...new Set([...correctSelections, ...incorrectSelections])].slice(0, 7),
    correctSelections: [...new Set(correctSelections)].slice(0, 7),
    incorrectSelections: [...new Set(incorrectSelections)].slice(0, 7),
    selectionsRemaining: Math.max(0, 7 - selectionCount),
    missionPoints: Number.isFinite(Number(saved.missionPoints)) ? Math.min(91, Number(saved.missionPoints)) : correctSelections.length * 13,
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function calendarStateForStorage() {
  if (calendarState.isReplay && calendarState.hasAwardedPoints) {
    const savedPoints = savedMissionScore('calendar') || calendarState.missionPoints;
    const correctCount = Math.min(7, Math.floor(savedPoints / 13));
    return createCalendarState({
      selectedMonths: calendarCorrectMonths.slice(0, correctCount),
      correctSelections: calendarCorrectMonths.slice(0, correctCount),
      incorrectSelections: Array.from({ length: 7 - correctCount }, (_, index) => `Saved incorrect ${index + 1}`),
      selectionsRemaining: 0,
      missionPoints: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...calendarState, isReplay: false };
}

function createHalloweenState(saved = {}) {
  const allowedCards = new Set(halloweenMoves.map(move => move.id));
  const usedCards = new Set();
  const cardOrder = Array.isArray(saved.cardOrder)
    ? halloweenCorrectRoute.map((_, index) => {
      const card = saved.cardOrder[index];
      if (!allowedCards.has(card) || usedCards.has(card)) return '';
      usedCards.add(card);
      return card;
    })
    : halloweenCorrectRoute.map(() => '');
  const submittedAttempts = Number(saved.submittedAttempts || 0);
  return {
    cardOrder,
    markerDate: Number.isFinite(Number(saved.markerDate)) ? Number(saved.markerDate) : 1,
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Number(saved.currentPossibleScore)
      : halloweenPossibleScore(submittedAttempts),
    routeSolved: Boolean(saved.routeSolved),
    pointsEarned: Number(saved.pointsEarned || 0),
    doorOpened: Boolean(saved.doorOpened),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function halloweenPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function halloweenStateForStorage() {
  if (halloweenState.isReplay && halloweenState.hasAwardedPoints) {
    return createHalloweenState({
      cardOrder: halloweenCorrectRoute,
      markerDate: 31,
      submittedAttempts: submittedAttemptsFromScore(savedMissionScore('halloween') || halloweenState.pointsEarned),
      currentPossibleScore: savedMissionScore('halloween') || halloweenState.pointsEarned,
      routeSolved: true,
      pointsEarned: savedMissionScore('halloween') || halloweenState.pointsEarned,
      doorOpened: true,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...halloweenState, isReplay: false };
}

function flavorOptionById(group, id) {
  return flavorOptions[group]?.find(option => option.id === id);
}

function selectedFlavorValues(state = flavorState) {
  return [
    flavorOptionById('base', state.selectedBase),
    flavorOptionById('mixIn', state.selectedMixIn),
    flavorOptionById('topping', state.selectedTopping)
  ].filter(Boolean).map(option => option.value);
}

function flavorFormulaTotal(state = flavorState) {
  const values = selectedFlavorValues(state);
  return values.length === 3 ? values.reduce((sum, value) => sum + value, 0) : 0;
}

function createFlavorState(saved = {}) {
  const selectedBase = flavorOptionById('base', saved.selectedBase) ? saved.selectedBase : '';
  const selectedMixIn = flavorOptionById('mixIn', saved.selectedMixIn) ? saved.selectedMixIn : '';
  const selectedTopping = flavorOptionById('topping', saved.selectedTopping) ? saved.selectedTopping : '';
  const submittedAttempts = Number(saved.submittedAttempts || 0);
  const draftState = { selectedBase, selectedMixIn, selectedTopping };
  return {
    selectedBase,
    selectedMixIn,
    selectedTopping,
    formulaTotal: Number.isFinite(Number(saved.formulaTotal)) ? Number(saved.formulaTotal) : flavorFormulaTotal(draftState),
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Number(saved.currentPossibleScore)
      : flavorPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function flavorPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function flavorStateForStorage() {
  if (flavorState.isReplay && flavorState.hasAwardedPoints) {
    const savedPoints = hasAwardedScore('flavor') ? savedMissionScore('flavor') : flavorState.pointsEarned;
    return createFlavorState({
      selectedBase: flavorCorrectFormula.base,
      selectedMixIn: flavorCorrectFormula.mixIn,
      selectedTopping: flavorCorrectFormula.topping,
      formulaTotal: 31,
      submittedAttempts: submittedAttemptsFromScore(savedPoints),
      currentPossibleScore: savedPoints,
      pointsEarned: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...flavorState, isReplay: false };
}

function createPresidentState(saved = {}) {
  const candidates = ['Herbert Hoover', 'Woodrow Wilson', 'Theodore Roosevelt', 'Franklin D. Roosevelt'];
  const ruledOutCandidates = Array.isArray(saved.ruledOutCandidates)
    ? [...new Set(saved.ruledOutCandidates.filter(candidate => candidates.includes(candidate) && candidate !== 'Herbert Hoover'))]
    : [];
  const submittedAttempts = Number.isFinite(Number(saved.submittedAttempts))
    ? Math.max(0, Number(saved.submittedAttempts))
    : ruledOutCandidates.length;
  return {
    selectedCandidate: candidates.includes(saved.selectedCandidate) ? saved.selectedCandidate : '',
    ruledOutCandidates,
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Math.max(0, Number(saved.currentPossibleScore))
      : presidentPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function presidentPossibleScore(submittedAttempts) {
  return Math.max(0, 60 - (submittedAttempts * 20));
}

function presidentStateForStorage() {
  if (presidentState.isReplay && presidentState.hasAwardedPoints) {
    const savedPoints = hasAwardedScore('president') ? savedMissionScore('president') : presidentState.pointsEarned;
    return createPresidentState({
      selectedCandidate: 'Herbert Hoover',
      ruledOutCandidates: [],
      submittedAttempts: savedPoints === 60 ? 1 : savedPoints === 40 ? 2 : savedPoints === 20 ? 3 : 4,
      currentPossibleScore: savedPoints,
      pointsEarned: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...presidentState, isReplay: false };
}

function createBunyanState(saved = {}) {
  const submittedAttempts = Number.isFinite(Number(saved.submittedAttempts))
    ? Math.max(0, Number(saved.submittedAttempts))
    : 0;
  const selectedLocation = bunyanChoices.selectedLocation.includes(saved.selectedLocation) ? saved.selectedLocation : '';
  const selectedHeight = bunyanChoices.selectedHeight.includes(saved.selectedHeight) ? saved.selectedHeight : '';
  const selectedYear = bunyanChoices.selectedYear.includes(saved.selectedYear) ? saved.selectedYear : '';
  const selectedReason = bunyanChoices.selectedReason.includes(saved.selectedReason) ? saved.selectedReason : '';
  return {
    selectedLocation,
    selectedHeight,
    selectedYear,
    selectedReason,
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Math.max(0, Number(saved.currentPossibleScore))
      : bunyanPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function bunyanPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function bunyanStateForStorage() {
  if (bunyanState.isReplay && bunyanState.hasAwardedPoints) {
    const savedPoints = hasAwardedScore('bunyan') ? savedMissionScore('bunyan') : bunyanState.pointsEarned;
    return createBunyanState({
      ...bunyanCorrectFacts,
      submittedAttempts: submittedAttemptsFromScore(savedPoints),
      currentPossibleScore: savedPoints,
      pointsEarned: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...bunyanState, isReplay: false };
}

function createHistoryState(saved = {}) {
  const allowedEvents = new Set(historyEvents.map(event => event.id));
  const usedEvents = new Set();
  const eventCardOrder = Array.isArray(saved.eventCardOrder)
    ? historyCorrectOrder.map((_, index) => {
      const eventId = saved.eventCardOrder[index];
      if (!allowedEvents.has(eventId) || usedEvents.has(eventId)) return '';
      usedEvents.add(eventId);
      return eventId;
    })
    : historyCorrectOrder.map(() => '');
  const submittedAttempts = Number.isFinite(Number(saved.submittedAttempts))
    ? Math.max(0, Number(saved.submittedAttempts))
    : 0;
  return {
    eventCardOrder,
    selectedMeaningAnswer: historyMeaningChoices.some(choice => choice.id === saved.selectedMeaningAnswer) ? saved.selectedMeaningAnswer : '',
    submittedAttempts,
    currentPossibleScore: Number.isFinite(Number(saved.currentPossibleScore))
      ? Math.max(0, Number(saved.currentPossibleScore))
      : historyPossibleScore(submittedAttempts),
    pointsEarned: Number(saved.pointsEarned || 0),
    isCompleted: Boolean(saved.isCompleted),
    hasAwardedPoints: Boolean(saved.hasAwardedPoints),
    isReplay: Boolean(saved.isReplay)
  };
}

function historyPossibleScore(submittedAttempts) {
  if (submittedAttempts === 0) return 31;
  if (submittedAttempts === 1) return 13;
  return 0;
}

function historyStateForStorage() {
  if (historyState.isReplay && historyState.hasAwardedPoints) {
    const savedPoints = hasAwardedScore('history') ? savedMissionScore('history') : historyState.pointsEarned;
    return createHistoryState({
      eventCardOrder: historyCorrectOrder,
      selectedMeaningAnswer: 'slavery',
      submittedAttempts: submittedAttemptsFromScore(savedPoints),
      currentPossibleScore: savedPoints,
      pointsEarned: savedPoints,
      isCompleted: true,
      hasAwardedPoints: true
    });
  }
  return { ...historyState, isReplay: false };
}

function loadScoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(scoreStorageKey) || '{}');
    missionScores = saved.missionScores && typeof saved.missionScores === 'object'
      ? saved.missionScores
      : {};
    primeState = createPrimeState(saved.prime);
    binaryState = createBinaryState(saved.binary);
    romanState = createRomanState(saved.roman);
    calendarState = createCalendarState(saved.calendar);
    halloweenState = createHalloweenState(saved.halloween);
    galliumState = createGalliumState(saved.gallium);
    phoneState = createPhoneState(saved.phone);
    flavorState = createFlavorState(saved.flavor);
    presidentState = createPresidentState(saved.president);
    bunyanState = createBunyanState(saved.bunyan);
    historyState = createHistoryState(saved.history);
    if (primeState.hasAwardedPoints && !missionScores.prime) {
      missionScores.prime = {
        pointsEarned: primeState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (romanState.hasAwardedPoints && !missionScores.roman) {
      missionScores.roman = {
        pointsEarned: romanState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!romanState.hasAwardedPoints && missionScores.roman?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.roman.pointsEarned || 0);
      romanState = createRomanState({
        placedTiles: ['X', 'X', 'X', 'I'],
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (binaryState.hasAwardedPoints && !missionScores.binary) {
      missionScores.binary = {
        pointsEarned: binaryState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!binaryState.hasAwardedPoints && missionScores.binary?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.binary.pointsEarned || 0);
      binaryState = createBinaryState({
        switchStates: [false, true, true, true, true, true],
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (calendarState.hasAwardedPoints && !missionScores.calendar) {
      missionScores.calendar = {
        pointsEarned: calendarState.missionPoints,
        hasAwardedPoints: true
      };
    }
    if (!calendarState.hasAwardedPoints && missionScores.calendar?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.calendar.pointsEarned || 0);
      const correctCount = Math.min(7, Math.floor(savedPoints / 13));
      calendarState = createCalendarState({
        selectedMonths: calendarCorrectMonths.slice(0, correctCount),
        correctSelections: calendarCorrectMonths.slice(0, correctCount),
        incorrectSelections: Array.from({ length: 7 - correctCount }, (_, index) => `Saved incorrect ${index + 1}`),
        selectionsRemaining: 0,
        missionPoints: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (halloweenState.hasAwardedPoints && !missionScores.halloween) {
      missionScores.halloween = {
        pointsEarned: halloweenState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!halloweenState.hasAwardedPoints && missionScores.halloween?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.halloween.pointsEarned || 0);
      halloweenState = createHalloweenState({
        cardOrder: halloweenCorrectRoute,
        markerDate: 31,
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        routeSolved: true,
        pointsEarned: savedPoints,
        doorOpened: true,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (galliumState.hasAwardedPoints && !missionScores.gallium) {
      missionScores.gallium = {
        pointsEarned: galliumState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!galliumState.hasAwardedPoints && missionScores.gallium?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.gallium.pointsEarned || 0);
      galliumState = createGalliumState({
        currentTemperature: 85.6,
        selectedItems: galliumCorrectItems,
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (flavorState.hasAwardedPoints && !missionScores.flavor) {
      missionScores.flavor = {
        pointsEarned: flavorState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!flavorState.hasAwardedPoints && missionScores.flavor?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.flavor.pointsEarned || 0);
      flavorState = createFlavorState({
        selectedBase: flavorCorrectFormula.base,
        selectedMixIn: flavorCorrectFormula.mixIn,
        selectedTopping: flavorCorrectFormula.topping,
        formulaTotal: 31,
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (phoneState.hasAwardedPoints && !missionScores.phone) {
      missionScores.phone = {
        pointsEarned: phoneState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!phoneState.hasAwardedPoints && missionScores.phone?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.phone.pointsEarned || 0);
      phoneState = createPhoneState({
        callConnected: true,
        answers: netherlandsQuestions.map((question, index) => ({
          selectedAnswer: index < Math.round(savedPoints / 20) ? question.answer : !question.answer,
          isChecked: true
        })),
        currentQuestionIndex: netherlandsQuestions.length - 1,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (presidentState.hasAwardedPoints && !missionScores.president) {
      missionScores.president = {
        pointsEarned: presidentState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!presidentState.hasAwardedPoints && missionScores.president?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.president.pointsEarned || 0);
      presidentState = createPresidentState({
        selectedCandidate: 'Herbert Hoover',
        submittedAttempts: savedPoints === 60 ? 1 : savedPoints === 40 ? 2 : savedPoints === 20 ? 3 : 4,
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (bunyanState.hasAwardedPoints && !missionScores.bunyan) {
      missionScores.bunyan = {
        pointsEarned: bunyanState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!bunyanState.hasAwardedPoints && missionScores.bunyan?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.bunyan.pointsEarned || 0);
      bunyanState = createBunyanState({
        ...bunyanCorrectFacts,
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (historyState.hasAwardedPoints && !missionScores.history) {
      missionScores.history = {
        pointsEarned: historyState.pointsEarned,
        hasAwardedPoints: true
      };
    }
    if (!historyState.hasAwardedPoints && missionScores.history?.hasAwardedPoints) {
      const savedPoints = Number(missionScores.history.pointsEarned || 0);
      historyState = createHistoryState({
        eventCardOrder: historyCorrectOrder,
        selectedMeaningAnswer: 'slavery',
        submittedAttempts: submittedAttemptsFromScore(savedPoints),
        currentPossibleScore: savedPoints,
        pointsEarned: savedPoints,
        isCompleted: true,
        hasAwardedPoints: true
      });
    }
    if (primeState.isCompleted) solved.add('prime');
    if (binaryState.isCompleted) solved.add('binary');
    if (romanState.isCompleted) solved.add('roman');
    if (calendarState.isCompleted) solved.add('calendar');
    if (halloweenState.isCompleted) solved.add('halloween');
    if (galliumState.isCompleted) solved.add('gallium');
    if (flavorState.isCompleted) solved.add('flavor');
    if (presidentState.isCompleted) solved.add('president');
    if (bunyanState.isCompleted) solved.add('bunyan');
    if (historyState.isCompleted) solved.add('history');
    if (phoneState.isCompleted) solved.add('phone');
    Object.entries(missionScores).forEach(([missionId, score]) => {
      if (score?.hasAwardedPoints) solved.add(missionId);
    });
  } catch {
    primeState = createPrimeState();
    binaryState = createBinaryState();
    romanState = createRomanState();
    calendarState = createCalendarState();
    halloweenState = createHalloweenState();
    galliumState = createGalliumState();
    phoneState = createPhoneState();
    flavorState = createFlavorState();
    presidentState = createPresidentState();
    bunyanState = createBunyanState();
    historyState = createHistoryState();
    missionScores = {};
  }
}

function saveScoreState() {
  try {
    localStorage.setItem(scoreStorageKey, JSON.stringify({
      prime: primeStateForStorage(),
      binary: binaryStateForStorage(),
      roman: romanStateForStorage(),
      calendar: calendarStateForStorage(),
      halloween: halloweenStateForStorage(),
      gallium: galliumStateForStorage(),
      phone: phoneStateForStorage(),
      flavor: flavorStateForStorage(),
      president: presidentStateForStorage(),
      bunyan: bunyanStateForStorage(),
      history: historyStateForStorage(),
      missionScores
    }));
  } catch {
    // Local storage can be unavailable in some restricted browser modes.
  }
}

function updateScoreCount() {
  if (!scoreCount) return;
  const total = Object.values(missionScores)
    .reduce((sum, score) => sum + Number(score?.pointsEarned || 0), 0);
  scoreCount.textContent = `Lab score: ${total} points`;
}

function hasAwardedScore(id) {
  return Boolean(missionScores[id]?.hasAwardedPoints);
}

function savedMissionScore(id) {
  return Number(missionScores[id]?.pointsEarned || 0);
}

function awardMissionScore(id, points) {
  if (hasAwardedScore(id)) return savedMissionScore(id);
  missionScores[id] = {
    pointsEarned: points,
    hasAwardedPoints: true
  };
  saveScoreState();
  updateScoreCount();
  return points;
}

function renderMissionRing() {
  missionRing.innerHTML = missions.map(mission => `
    <button class="mission-button ${solved.has(mission.id) ? 'solved' : ''}" type="button" data-mission="${mission.id}">
      <span class="mission-symbol">${mission.symbol}</span>
      <span class="mission-name">${mission.title}</span>
      <span class="mission-status">${solved.has(mission.id) ? 'Active' : 'Locked'}</span>
    </button>
  `).join('');
}

function updateProgress() {
  const count = solved.size;
  progressCount.textContent = `${count} of ${missions.length} sections active`;
  progressFill.style.width = `${(count / missions.length) * 100}%`;
  machineMessage.textContent = count === missions.length
    ? 'All sections are glowing. Complete the final sort to reveal the badge.'
    : `${missions.length - count} machine sections still need power.`;
  document.querySelectorAll('.spark').forEach((spark, index) => {
    spark.classList.toggle('lit', index < count);
  });
  numberCore.classList.toggle('active', count > 0);
  finalPanel.hidden = count !== missions.length;
  if (count === missions.length && !sortRoot.innerHTML) renderSort();
}

function solveMission(id, message) {
  if (!solved.has(id)) {
    solved.add(id);
    renderMissionRing();
    updateProgress();
  }
  setFeedback(message || 'Section active. The machine is brighter now.', true);
}

function setFeedback(message, success = false) {
  const feedback = challengeRoot.querySelector('.feedback');
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.toggle('success', success);
}

function challengeShell(mission, copy, body) {
  challengeTitle.textContent = mission.title;
  challengeRoot.innerHTML = `
    <p class="mission-copy">${copy}</p>
    ${body}
    <p class="feedback" aria-live="polite">${solved.has(mission.id) ? 'Already active. You can still replay this mission.' : ''}</p>
  `;
}

function renderChallenge(id) {
  activeMission = id;
  const mission = missionById(id);
  cleanupRomanDrag();

  if (id === 'prime') renderPrime(mission);
  if (id === 'binary') renderBinary(mission);
  if (id === 'roman') renderRoman(mission);
  if (id === 'make31') renderMake31(mission);
  if (id === 'calendar') renderCalendar(mission);
  if (id === 'halloween') renderHalloween(mission);
  if (id === 'state') renderState(mission);
  if (id === 'gallium') renderGallium(mission);
  if (id === 'flavor') renderFlavor(mission);
  if (id === 'president') renderPresident(mission);
  if (id === 'phone') renderPhone(mission);
  if (id === 'bunyan') renderBunyan(mission);
  if (id === 'history') renderHistory(mission);
}

function renderPrime(mission) {
  const isReplay = primeState.isCompleted;
  if (isReplay) {
    primeState = {
      ...primeState,
      selectedNumbers: [],
      submittedAttempts: 0,
      currentPossibleScore: 31,
      isReplay: true
    };
  }
  challengeShell(mission, 'Select every number that divides evenly into 31. The scanner only powers up when every divisor is marked.', `
    <div class="tool-card">
      <div class="button-grid">
        ${[1, 2, 3, 4, 5, 6, 31].map(number => `<button class="choice-button ${primeState.selectedNumbers.includes(number) ? 'selected' : ''}" type="button" data-divisor="${number}">${number}</button>`).join('')}
      </div>
    </div>
    <div class="prime-score-row">
      <div class="total-display" id="primePossibleScore">${isReplay ? 'Practice score' : 'Possible score'}: ${primeState.currentPossibleScore} points</div>
      <div class="total-display" id="primeAttemptCount">Submitted attempts: ${primeState.submittedAttempts}</div>
    </div>
    ${isReplay ? `<p class="machine-score-line">Practice replay. Your first score was ${primeState.pointsEarned} points, and no additional points will be awarded.</p>` : ''}
    <button class="primary-button" type="button" data-action="check-prime">Submit Your Divisors</button>
    <p class="machine-score-line" id="primeResultScore" hidden></p>
  `);
}

function renderBinary(mission) {
  const isReplay = binaryState.isCompleted;
  if (isReplay) {
    binaryState = {
      ...binaryState,
      switchStates: binaryPlaceValues.map(() => false),
      binaryCode: '000000',
      decimalTotal: 0,
      submittedAttempts: 0,
      currentPossibleScore: 31,
      isCompleted: false,
      isReplay: true
    };
  }
  const isLocked = binaryState.isCompleted && !binaryState.isReplay;
  const scoreLabel = isLocked ? 'Score earned' : binaryState.isReplay ? 'Practice score' : 'Possible score';
  const displayedScore = isLocked && hasAwardedScore('binary') ? savedMissionScore('binary') : binaryState.currentPossibleScore;
  challengeShell(mission, 'Use the binary switches to build the number 31. An ON switch represents 1, and an OFF switch represents 0.', `
    <div class="tool-card binary-switchboard">
      <div class="switch-row binary-switch-row">
        ${binaryPlaceValues.map((value, index) => renderBinarySwitch(index, value, isLocked)).join('')}
      </div>
    </div>
    <div class="binary-status-row">
      <div class="binary-display" id="binaryDisplay">${binaryState.binaryCode} = ${binaryState.decimalTotal}</div>
      <div class="total-display" id="binaryPossibleScore">${scoreLabel}: ${displayedScore} points</div>
      <div class="total-display" id="binaryAttemptCount">Submitted attempts: ${binaryState.submittedAttempts}</div>
    </div>
    <div class="route-control-row">
      <button class="ghost-button" type="button" data-action="reset-binary" ${isLocked ? 'disabled' : ''}>Reset Switches</button>
      <button class="primary-button" type="button" data-action="check-binary" ${isLocked ? 'disabled' : ''}>Check Binary Code</button>
    </div>
    <p class="machine-score-line" id="binaryResultScore" ${isLocked ? '' : 'hidden'}>${isLocked ? `Points earned: ${displayedScore} points` : ''}</p>
    <div class="binary-explanation" id="binaryExplanation" ${isLocked ? '' : 'hidden'}>
      <p>The switches represent 32, 16, 8, 4, 2, and 1. Turning on 16 + 8 + 4 + 2 + 1 makes 31.</p>
    </div>
    ${binaryState.isReplay ? `<p class="machine-score-line">Practice replay. Your first Binary Switchboard score was ${savedMissionScore('binary')} points, and no additional points will be awarded.</p>` : ''}
  `);
}

function renderBinarySwitch(index, value, isLocked = false) {
  const isOn = binaryState.switchStates[index];
  return `
    <button class="switch binary-switch" type="button" aria-pressed="${isOn}" data-switch="${index}" ${isLocked ? 'disabled' : ''}>
      <span class="switch-value">${value}</span>
      <span class="switch-track" aria-hidden="true"></span>
      <span class="switch-digit">${isOn ? '1' : '0'}</span>
      <span class="switch-state">${isOn ? 'ON' : 'OFF'}</span>
    </button>
  `;
}

function renderRoman(mission) {
  const isReplay = romanState.isCompleted;
  if (isReplay) {
    romanState = {
      ...romanState,
      placedTiles: ['', '', '', ''],
      submittedAttempts: 0,
      currentPossibleScore: 31,
      isReplay: true
    };
  }
  const isLocked = romanState.isCompleted && !romanState.isReplay;
  const scoreLabel = isReplay ? 'Practice score' : isLocked ? 'Score earned' : 'Possible score';
  const displayedScore = isLocked ? romanState.pointsEarned : romanState.currentPossibleScore;
  challengeShell(mission, 'Build 31 as a Roman numeral. Drag the tiles into the four spaces in the correct order.', `
    <div class="tool-card roman-builder">
      <div class="tile-bank roman-supply" id="tileBank" aria-label="Reusable Roman numeral tile bank">
        ${['I', 'V', 'X'].map(tile => `<button class="roman-tile roman-stack" type="button" data-roman-bank-tile="${tile}" data-tile="${tile}" ${isLocked ? 'disabled' : ''} aria-label="Drag ${tile} tile from reusable stack">${tile}</button>`).join('')}
      </div>
      <div class="slot-row" id="slotRow">
        ${[0, 1, 2, 3].map(index => romanSlotMarkup(index, isLocked)).join('')}
      </div>
      <div class="prime-score-row">
        <div class="total-display" id="romanPossibleScore">${scoreLabel}: ${displayedScore} points</div>
        <div class="total-display" id="romanAttemptCount">Submitted attempts: ${romanState.submittedAttempts}</div>
      </div>
      ${isReplay ? `<p class="machine-score-line">Practice replay. Your first Roman Numeral Builder score was ${romanState.pointsEarned} points, and no additional points will be awarded.</p>` : ''}
      <div class="tile-bank">
        <button class="ghost-button" type="button" data-action="reset-roman" ${isLocked ? 'disabled' : ''}>Reset Tiles</button>
        <button class="primary-button" type="button" data-action="check-roman" ${isLocked || !romanState.placedTiles.every(Boolean) ? 'disabled' : ''}>Check Numeral</button>
      </div>
      <p class="machine-score-line" id="romanResultScore" ${isLocked ? '' : 'hidden'}>${isLocked ? `Points earned: ${romanState.pointsEarned}` : ''}</p>
    </div>
  `);
}

function romanSlotMarkup(index, isLocked = false) {
  const tile = romanState.placedTiles[index];
  return `
    <button class="slot ${tile ? 'filled' : ''}" type="button" data-slot="${index}" aria-label="Roman numeral slot ${index + 1}" ${isLocked ? 'disabled' : ''}>
      ${tile ? `<span class="placed-roman-tile" data-placed-tile="${tile}" data-source-slot="${index}">${tile}</span>` : '?'}
    </button>
  `;
}

function renderMake31(mission) {
  const isSolved = solved.has(mission.id);
  const displayedScore = hasAwardedScore('make31')
    ? savedMissionScore('make31')
    : make31Score ?? Math.max(0, 60 - (make31WrongChecks * 20));
  challengeShell(mission, 'Choose the number tiles that add to 31. This machine wants the doubling pattern.', `
    <div class="tool-card">
      <div class="button-grid">
        ${[1, 2, 3, 4, 7, 8, 10, 12, 16].map(number => `<button class="choice-button" type="button" data-number-tile="${number}" ${isSolved ? 'disabled' : ''}>${number}</button>`).join('')}
      </div>
    </div>
    <div class="make31-status">
      <div class="total-display" id="makeTotal">Total: 0</div>
      <div class="case-scoreboard" aria-live="polite">
        <span>${isSolved ? 'Score earned' : 'Possible score'}</span>
        <strong id="make31Score">${displayedScore} points</strong>
      </div>
    </div>
    <button class="primary-button" type="button" data-action="check-make31" ${isSolved ? 'hidden' : ''}>Check total</button>
    <p class="machine-score-line" id="make31ResultScore" ${isSolved ? '' : 'hidden'}>Score earned: ${displayedScore} points</p>
  `);
}

function renderCalendar(mission) {
  const savedScore = savedMissionScore('calendar');
  const isReplay = calendarState.isCompleted;
  if (isReplay) {
    calendarState = {
      selectedMonths: [],
      correctSelections: [],
      incorrectSelections: [],
      selectionsRemaining: 7,
      missionPoints: 0,
      isCompleted: false,
      hasAwardedPoints: true,
      isReplay: true
    };
  }
  const isLocked = calendarState.isCompleted && !calendarState.isReplay;
  const scoreLabel = calendarState.isReplay ? 'Practice score' : isLocked ? 'Score earned' : 'Mission score';
  const displayedScore = isLocked && hasAwardedScore('calendar') ? savedScore : calendarState.missionPoints;
  challengeShell(mission, 'Choose exactly seven months. Each pick counts right away, and each correct 31-day month earns 13 points.', `
    <div class="tool-card">
      <div class="calendar-status-row">
        <div class="total-display" id="calendarRemaining">Selections Remaining: ${calendarState.selectionsRemaining}</div>
        <div class="total-display" id="calendarScore">${scoreLabel}: ${displayedScore} / 91 points</div>
      </div>
      ${calendarState.isReplay ? `<p class="machine-score-line">Practice replay. Your first Calendar Hunt score was ${savedScore} points, and no additional points will be awarded.</p>` : ''}
      <div class="button-grid">
        ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => {
          const isCorrectSelection = calendarState.correctSelections.includes(month);
          const isIncorrectSelection = calendarState.incorrectSelections.includes(month);
          const isDisabled = isLocked || calendarState.selectedMonths.includes(month);
          return `<button class="month-button ${isCorrectSelection ? 'selected' : ''} ${isIncorrectSelection ? 'attempted' : ''}" type="button" data-month="${month}" ${isDisabled ? 'disabled' : ''}>${month}</button>`;
        }).join('')}
      </div>
    </div>
    <div class="calendar-results" id="calendarResults" ${calendarState.isCompleted ? '' : 'hidden'}>
      ${calendarState.isCompleted ? renderCalendarResults() : ''}
    </div>
  `);
}

function renderCalendarResults() {
  const correctCount = calendarState.correctSelections.length;
  const incorrectCount = calendarState.incorrectSelections.length;
  const savedScore = hasAwardedScore('calendar') ? savedMissionScore('calendar') : calendarState.missionPoints;
  const mainMessage = calendarState.isReplay
    ? `Practice complete. Your saved Calendar Hunt score remains ${savedScore} points.`
    : correctCount === 7
      ? 'Calendar confirmed! You found all seven months with 31 days and earned 91 points.'
      : `Calendar hunt complete! You found ${correctCount} of the seven months and earned ${calendarState.missionPoints} points.`;
  return `
    <h3>${mainMessage}</h3>
    <p>Correct months selected: ${correctCount}</p>
    <p>Incorrect months selected: ${incorrectCount}</p>
    <p>Final points earned: ${calendarState.isReplay ? calendarState.missionPoints : savedScore} out of 91</p>
    <p><strong>Correct list:</strong> January, March, May, July, August, October, and December</p>
  `;
}

function updateCalendarStatus() {
  const remaining = challengeRoot.querySelector('#calendarRemaining');
  const score = challengeRoot.querySelector('#calendarScore');
  if (remaining) remaining.textContent = `Selections Remaining: ${calendarState.selectionsRemaining}`;
  if (score) {
    const label = calendarState.isReplay ? 'Practice score' : calendarState.isCompleted ? 'Score earned' : 'Mission score';
    const displayedScore = calendarState.isCompleted && !calendarState.isReplay && hasAwardedScore('calendar')
      ? savedMissionScore('calendar')
      : calendarState.missionPoints;
    score.textContent = `${label}: ${displayedScore} / 91 points`;
  }
}

function finishCalendarHunt() {
  calendarState.isCompleted = true;
  challengeRoot.querySelectorAll('[data-month]').forEach(button => {
    button.disabled = true;
  });
  if (!calendarState.isReplay && !hasAwardedScore('calendar')) {
    const awardedPoints = awardMissionScore('calendar', Math.min(91, calendarState.missionPoints));
    calendarState.missionPoints = awardedPoints;
    calendarState.hasAwardedPoints = true;
    saveScoreState();
  } else if (!calendarState.isReplay) {
    calendarState.missionPoints = savedMissionScore('calendar');
    calendarState.hasAwardedPoints = true;
    saveScoreState();
  }
  const results = challengeRoot.querySelector('#calendarResults');
  if (results) {
    results.innerHTML = renderCalendarResults();
    results.removeAttribute('hidden');
  }
  updateCalendarStatus();
  const message = calendarState.isReplay
    ? `Practice complete. Your saved Calendar Hunt score remains ${savedMissionScore('calendar')} points.`
    : calendarState.correctSelections.length === 7
      ? 'Calendar confirmed! You found all seven months with 31 days and earned 91 points.'
      : `Calendar hunt complete! You found ${calendarState.correctSelections.length} of the seven months and earned ${calendarState.missionPoints} points.`;
  solveMission('calendar', message);
}

function renderHalloween(mission) {
  const isReplay = halloweenState.isCompleted;
  if (isReplay) {
    halloweenState = {
      cardOrder: halloweenCorrectRoute.map(() => ''),
      markerDate: 1,
      submittedAttempts: 0,
      currentPossibleScore: 31,
      routeSolved: false,
      pointsEarned: 0,
      doorOpened: false,
      isCompleted: false,
      hasAwardedPoints: true,
      isReplay: true
    };
  }
  const isLocked = halloweenState.routeSolved || halloweenState.doorOpened;
  halloweenState.markerDate = halloweenState.routeSolved || halloweenState.doorOpened ? 31 : 1;
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  challengeShell(mission, 'Arrange the four movement cards in the correct order. Test your route and open the door when your marker reaches October 31.', `
    <div class="tool-card">
      <div class="tile-bank">
        <div class="calendar-display" id="octDisplay">October ${halloweenState.markerDate}</div>
        <div class="case-scoreboard" aria-live="polite">
          <span>${halloweenState.routeSolved && !halloweenState.isReplay ? 'Score earned' : 'Possible score'}</span>
          <strong id="halloweenScore">${halloweenState.routeSolved && !halloweenState.isReplay ? halloweenState.pointsEarned : halloweenState.currentPossibleScore} points</strong>
        </div>
      </div>
      <div class="calendar-grid" id="octGrid">
        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `<span>${day}</span>`).join('')}
        ${Array.from({ length: 4 }, () => '<span></span>').join('')}
        ${days.map(day => `<span class="day-button ${day === halloweenState.markerDate ? 'current' : ''} ${day === 31 ? 'target' : ''}" data-oct-day="${day}">${day}</span>`).join('')}
      </div>
    </div>
    <div class="tool-card halloween-route-builder">
      <div>
        <h3>Movement Cards</h3>
        <div class="route-card-bank" id="halloweenCardBank">
          ${renderHalloweenCardBank(isLocked)}
        </div>
      </div>
      <div>
        <h3>Route Spaces</h3>
        <div class="route-space-row" id="halloweenRouteSpaces">
          ${halloweenState.cardOrder.map((cardId, index) => renderHalloweenRouteSpace(index, cardId, isLocked)).join('')}
        </div>
      </div>
      <div class="route-control-row">
        <button class="ghost-button" type="button" data-action="reset-halloween-route" ${isLocked ? 'disabled' : ''}>Reset Route</button>
        <button class="primary-button" type="button" data-action="test-halloween-route" ${isLocked || !halloweenState.cardOrder.every(Boolean) ? 'disabled' : ''}>Test Route</button>
        <button class="primary-button" type="button" data-action="open-halloween" ${halloweenState.routeSolved && !halloweenState.doorOpened ? '' : 'disabled'}>Open Door</button>
      </div>
      ${halloweenState.isReplay ? `<p class="machine-score-line">Practice replay. Your first Halloween Door score was ${savedMissionScore('halloween')} points, and no additional points will be awarded.</p>` : ''}
    </div>
    <div class="door ${halloweenState.doorOpened ? 'open' : ''}" id="halloweenDoor">${halloweenState.doorOpened ? 'October 31 door open' : halloweenState.routeSolved ? 'October 31 door ready' : 'October 31 door locked'}</div>
    <p class="machine-score-line" id="halloweenResultScore" ${halloweenState.routeSolved || halloweenState.doorOpened ? '' : 'hidden'}>${halloweenState.routeSolved ? `Points earned: ${halloweenState.pointsEarned}` : ''}</p>
  `);
}

function halloweenMoveById(id) {
  return halloweenMoves.find(move => move.id === id);
}

function renderHalloweenCardBank(isLocked = false) {
  const placed = new Set(halloweenState.cardOrder.filter(Boolean));
  return halloweenMoves
    .filter(move => !placed.has(move.id))
    .map(move => renderHalloweenMoveCard(move.id, null, isLocked))
    .join('');
}

function renderHalloweenMoveCard(cardId, sourceSlot = null, isLocked = false) {
  const move = halloweenMoveById(cardId);
  if (!move) return '';
  const source = Number.isInteger(sourceSlot) ? `data-route-source-slot="${sourceSlot}"` : '';
  return `<button class="route-card" type="button" data-halloween-card="${cardId}" ${source} ${isLocked ? 'disabled' : ''}>${move.label}</button>`;
}

function renderHalloweenRouteSpace(index, cardId, isLocked = false) {
  return `
    <div class="route-space ${cardId ? 'filled' : ''}" data-route-slot="${index}" role="group" aria-label="Route space ${index + 1}">
      <span class="route-space-number">${index + 1}</span>
      ${cardId ? renderHalloweenMoveCard(cardId, index, isLocked) : '<span class="route-placeholder">Drop card here</span>'}
    </div>
  `;
}

function renderState(mission) {
  const isSolved = solved.has(mission.id);
  const displayedScore = hasAwardedScore('state') ? savedMissionScore('state') : stateScore ?? 80;
  const selectedClass = isSolved ? ' selected' : '';
  const ruledOutClass = (group, value) => stateRuledOut.has(`${group}:${value}`) ? ' ruled-out' : '';
  const clueDisabled = (group, value) => (isSolved || stateRuledOut.has(`${group}:${value}`)) ? 'disabled' : '';
  challengeShell(mission, 'Choose the clues that point to the 31st state. When the evidence file is correct, the map will reveal the state.', `
    <div class="tool-card">
      <div class="state-evidence-header">
        <h3>Evidence file</h3>
        <div class="case-scoreboard" aria-live="polite">
          <span>${isSolved ? 'Score earned' : 'Possible score'}</span>
          <strong id="stateScore">${displayedScore} points</strong>
        </div>
      </div>
      <div class="clue-grid">
        <button class="choice-button${selectedClass}" type="button" data-state-clue="coast" data-clue-value="west" ${isSolved ? 'disabled' : ''}>West Coast</button>
        <button class="choice-button${ruledOutClass('coast', 'east')}" type="button" data-state-clue="coast" data-clue-value="east" ${clueDisabled('coast', 'east')}>East Coast</button>
        <button class="choice-button${selectedClass}" type="button" data-state-clue="event" data-clue-value="gold" ${isSolved ? 'disabled' : ''}>Gold Rush</button>
        <button class="choice-button${ruledOutClass('event', 'space')}" type="button" data-state-clue="event" data-clue-value="space" ${clueDisabled('event', 'space')}>Space Coast</button>
        <button class="choice-button${selectedClass}" type="button" data-state-clue="capital" data-clue-value="sacramento" ${isSolved ? 'disabled' : ''}>Sacramento</button>
        <button class="choice-button${ruledOutClass('capital', 'austin')}" type="button" data-state-clue="capital" data-clue-value="austin" ${clueDisabled('capital', 'austin')}>Austin</button>
        <button class="choice-button${selectedClass}" type="button" data-state-clue="date" data-clue-value="1850" ${isSolved ? 'disabled' : ''}>Joined in 1850</button>
        <button class="choice-button${ruledOutClass('date', '1959')}" type="button" data-state-clue="date" data-clue-value="1959" ${clueDisabled('date', '1959')}>Joined in 1959</button>
      </div>
    </div>
    <div class="tool-card state-map-card${isSolved ? ' revealed' : ''}">
      <div class="state-map-frame">
        <img src="assets/state-map-west.png" alt="Western United States map with California highlighted in yellow">
        <div class="state-map-lock" aria-hidden="${isSolved ? 'true' : 'false'}">
          <span>Map locked</span>
          <small>Build the evidence file.</small>
        </div>
        <div class="california-callout" aria-hidden="${isSolved ? 'false' : 'true'}">California</div>
      </div>
      <p class="state-reveal" ${isSolved ? '' : 'hidden'}>The clues reveal California. It joined the United States in 1850 as the 31st state.</p>
      <p class="state-score-line" id="stateResultScore" ${isSolved ? '' : 'hidden'}>Score earned: ${displayedScore} points</p>
    </div>
  `);
}

function renderGallium(mission) {
  const isReplay = galliumState.isCompleted;
  if (isReplay) {
    galliumState = createGalliumState({
      pointsEarned: savedMissionScore('gallium'),
      hasAwardedPoints: true,
      isReplay: true
    });
  }
  const isLocked = galliumState.isCompleted && !galliumState.isReplay;
  const displayedScore = isLocked && hasAwardedScore('gallium')
    ? savedMissionScore('gallium')
    : galliumState.currentPossibleScore;
  const scoreLabel = isLocked ? 'Score earned' : galliumState.isReplay ? 'Practice score' : 'Possible score';
  challengeShell(mission, 'Move the temperature to 85.6 degrees Fahrenheit. Then select the items that may contain gallium-based parts.', `
    <div class="tool-card gallium-lab">
      <div>
        <label for="temperatureSlider">Temperature</label>
        <input class="temperature-slider" id="temperatureSlider" type="range" min="80" max="90" step="0.1" value="${galliumState.currentTemperature.toFixed(1)}" ${isLocked ? 'disabled' : ''}>
        <div class="temperature-display" id="temperatureDisplay">${galliumState.currentTemperature.toFixed(1)} degrees F</div>
      </div>
      <div class="gallium-sample" aria-label="Gallium solid and melted sample">
        <img src="assets/gallium-lab.png" alt="Gallium solid chunks and melted gallium on a lab tray">
        <div class="melt-indicator" id="galliumMetal">warming</div>
      </div>
    </div>
    <div class="tool-card">
      <div class="item-grid">
        ${['LED light', 'Phone', 'Solar panel', 'Computer', 'Wooden spoon', 'Paper clip'].map(item => `
          <label class="item-check"><input type="checkbox" data-gallium-item="${item}" ${galliumState.selectedItems.includes(item) ? 'checked' : ''} ${isLocked ? 'disabled' : ''}> ${item}</label>
        `).join('')}
      </div>
    </div>
    <div class="case-scoreboard" aria-live="polite">
      <span>${scoreLabel}</span>
      <strong id="galliumScore">${displayedScore} points</strong>
    </div>
    ${galliumState.isReplay ? `<p class="machine-score-line">Practice replay. Your first Gallium Lab score was ${savedMissionScore('gallium')} points, and no additional points will be awarded.</p>` : ''}
    <p class="machine-score-line" id="galliumResultScore" ${isLocked ? '' : 'hidden'}>${isLocked ? `Points earned: ${displayedScore} points` : ''}</p>
    <button class="primary-button" type="button" data-action="check-gallium" ${isLocked ? 'disabled' : ''}>Check Lab Results</button>
  `);
  updateGallium();
}

function renderFlavor(mission) {
  const isReplay = flavorState.isCompleted;
  if (isReplay) {
    flavorState = createFlavorState({
      hasAwardedPoints: true,
      isReplay: true
    });
  }
  const isLocked = flavorState.isCompleted;
  const displayedScore = hasAwardedScore('flavor') && !flavorState.isReplay
    ? savedMissionScore('flavor')
    : flavorState.currentPossibleScore;
  challengeShell(mission, 'Choose one base, one mix-in, and one topping. Find the flavor formula that totals exactly 31.', `
    <div class="tool-card select-grid">
      <label>Base
        <select id="baseSelect" data-flavor-select="base" ${isLocked ? 'disabled' : ''}>
          <option value="">Choose a base</option>
          ${renderFlavorOptions('base', flavorState.selectedBase)}
        </select>
      </label>
      <label>Mix-in
        <select id="mixSelect" data-flavor-select="mixIn" ${isLocked ? 'disabled' : ''}>
          <option value="">Choose a mix-in</option>
          ${renderFlavorOptions('mixIn', flavorState.selectedMixIn)}
        </select>
      </label>
      <label>Topping
        <select id="topSelect" data-flavor-select="topping" ${isLocked ? 'disabled' : ''}>
          <option value="">Choose a topping</option>
          ${renderFlavorOptions('topping', flavorState.selectedTopping)}
        </select>
      </label>
    </div>
    <div class="flavor-name" id="flavorName">${renderFlavorDisplay()}</div>
    <div class="flavor-actions">
      <div class="case-scoreboard" aria-live="polite">
        <span>${isLocked && !flavorState.isReplay ? 'Score earned' : 'Possible score'}</span>
        <strong id="flavorScore">${displayedScore} points</strong>
      </div>
      <button class="ghost-button" type="button" data-action="reset-flavor" ${isLocked ? 'disabled' : ''}>Reset Recipe</button>
      <button class="primary-button" type="button" data-action="test-flavor" ${isLocked || !flavorSelectionsComplete() ? 'disabled' : ''}>Test Flavor Formula</button>
    </div>
    ${flavorState.isReplay ? `<p class="machine-score-line">Practice replay. Your first Flavor Formula 31 score was ${savedMissionScore('flavor')} points, and no additional points will be awarded.</p>` : ''}
    <p class="machine-score-line" id="flavorResultScore" ${flavorState.isCompleted ? '' : 'hidden'}>${flavorState.isCompleted ? `Points earned: ${flavorState.pointsEarned} points` : ''}</p>
  `);
}

function renderFlavorOptions(group, selectedId) {
  return flavorOptions[group].map(option => `
    <option value="${option.id}" ${option.id === selectedId ? 'selected' : ''}>${option.name} • ${option.value}</option>
  `).join('');
}

function flavorSelectionsComplete() {
  return Boolean(flavorState.selectedBase && flavorState.selectedMixIn && flavorState.selectedTopping);
}

function currentFlavorEquation() {
  if (!flavorSelectionsComplete()) return '';
  const values = selectedFlavorValues();
  return `${values.join(' + ')} = ${flavorState.formulaTotal}`;
}

function renderFlavorDisplay() {
  if (flavorState.isCompleted) return '<span>14 + 9 + 8 = 31</span> <strong>Robot Raspberry Sprinkle Pop</strong>';
  return flavorSelectionsComplete() ? currentFlavorEquation() : 'Flavor name waiting...';
}

function updateFlavorFormulaDisplay() {
  flavorState.formulaTotal = flavorFormulaTotal();
  const display = challengeRoot.querySelector('#flavorName');
  const testButton = challengeRoot.querySelector('[data-action="test-flavor"]');
  if (display) display.innerHTML = renderFlavorDisplay();
  if (testButton) testButton.disabled = flavorState.isCompleted || !flavorSelectionsComplete();
}

function updateFlavorScoreDisplay() {
  const score = challengeRoot.querySelector('#flavorScore');
  const resultScore = challengeRoot.querySelector('#flavorResultScore');
  if (score) {
    const scoreboard = score.closest('.case-scoreboard');
    const label = scoreboard?.querySelector('span');
    if (label) label.textContent = flavorState.isCompleted && !flavorState.isReplay ? 'Score earned' : 'Possible score';
    score.textContent = `${flavorState.isCompleted && !flavorState.isReplay ? flavorState.pointsEarned : flavorState.currentPossibleScore} points`;
  }
  if (resultScore) {
    if (flavorState.isCompleted) {
      resultScore.textContent = flavorState.isReplay
        ? `Practice complete. Your saved Flavor Formula 31 score remains ${savedMissionScore('flavor')} points.`
        : `Points earned: ${flavorState.pointsEarned} points`;
      resultScore.removeAttribute('hidden');
    } else {
      resultScore.textContent = '';
      resultScore.setAttribute('hidden', '');
    }
  }
}

function resetFlavorRecipe() {
  if (flavorState.isCompleted) return;
  flavorState.selectedBase = '';
  flavorState.selectedMixIn = '';
  flavorState.selectedTopping = '';
  flavorState.formulaTotal = 0;
  challengeRoot.querySelectorAll('[data-flavor-select]').forEach(select => {
    select.value = '';
  });
  updateFlavorFormulaDisplay();
  setFeedback('');
  if (!flavorState.isReplay) saveScoreState();
}

function completeFlavorFormula(pointsForAttempt) {
  flavorState.pointsEarned = pointsForAttempt;
  flavorState.currentPossibleScore = pointsForAttempt;
  flavorState.formulaTotal = 31;
  flavorState.isCompleted = true;
  challengeRoot.querySelectorAll('[data-flavor-select], [data-action="reset-flavor"], [data-action="test-flavor"]').forEach(control => {
    control.disabled = true;
  });
  const display = challengeRoot.querySelector('#flavorName');
  if (display) display.innerHTML = renderFlavorDisplay();
  if (flavorState.isReplay || flavorState.hasAwardedPoints || hasAwardedScore('flavor')) {
    const savedPoints = hasAwardedScore('flavor') ? savedMissionScore('flavor') : flavorState.pointsEarned;
    flavorState.pointsEarned = savedPoints;
    flavorState.hasAwardedPoints = true;
    updateFlavorScoreDisplay();
    setFeedback('Flavor confirmed for practice. No additional points will be awarded.', true);
    return;
  }
  const awardedPoints = awardMissionScore('flavor', pointsForAttempt);
  flavorState.pointsEarned = awardedPoints;
  flavorState.hasAwardedPoints = true;
  updateFlavorScoreDisplay();
  saveScoreState();
  const message = awardedPoints > 0
    ? `Flavor confirmed! Your recipe totals exactly 31. Points earned: ${awardedPoints} points.`
    : 'Flavor confirmed! Your recipe totals exactly 31. Mission complete.';
  solveMission('flavor', message);
}

function renderPresident(mission, forceFresh = false) {
  if (forceFresh && hasAwardedScore('president')) {
    presidentState = createPresidentState({
      hasAwardedPoints: true,
      isReplay: true
    });
  }
  const isSolved = !presidentState.isReplay && presidentState.isCompleted;
  const isPractice = presidentState.isReplay;
  const displayedScore = isSolved && hasAwardedScore('president')
    ? savedMissionScore('president')
    : presidentState.currentPossibleScore;
  const evidence = [
    'He became president in 1929.',
    'The Great Depression began during his presidency.',
    'Before becoming president, he worked as an engineer and served as secretary of commerce.',
    'He was the only U.S. president born in Iowa.'
  ];
  const candidates = [
    { name: 'Herbert Hoover', image: 'assets/presidents/herbert-hoover.jpg' },
    { name: 'Woodrow Wilson', image: 'assets/presidents/woodrow-wilson.jpg' },
    { name: 'Theodore Roosevelt', image: 'assets/presidents/theodore-roosevelt.jpg' },
    { name: 'Franklin D. Roosevelt', image: 'assets/presidents/franklin-d-roosevelt.jpg' }
  ];
  challengeShell(mission, 'A president is missing from the historical timeline. Open the evidence files, study the clues, and identify the 31st president of the United States.', `
    <div class="president-case ${isSolved ? 'case-solved' : ''}">
      <div class="case-timeline" aria-label="Presidential timeline with president 31 missing">
        <div class="timeline-case-card">
          <strong>29</strong>
          <span>Warren G. Harding</span>
        </div>
        <div class="timeline-case-card">
          <strong>30</strong>
          <span>Calvin Coolidge</span>
        </div>
        <div class="timeline-case-card missing">
          <strong>31</strong>
          <span>MISSING</span>
        </div>
        <div class="timeline-case-card">
          <strong>32</strong>
          <span>Franklin D. Roosevelt</span>
        </div>
      </div>

      <div class="case-evidence-header">
        <h3>Evidence files</h3>
        <span id="presidentEvidenceCount">Evidence Found ${isSolved ? 4 : 0} of 4</span>
      </div>
      <div class="evidence-folder-grid">
        ${evidence.map((clue, index) => `
          <button class="evidence-folder ${isSolved ? 'opened' : ''}" type="button" aria-expanded="${isSolved ? 'true' : 'false'}" data-president-evidence="${index}">
            <span class="folder-tab">Evidence ${index + 1}</span>
            <span class="folder-clue">${clue}</span>
          </button>
        `).join('')}
      </div>

      <div class="suspect-section" ${isSolved ? '' : 'hidden'}>
        <div class="suspect-header">
          <h3>Suspect cards</h3>
          <div class="case-scoreboard" aria-live="polite">
            <span>${isSolved ? 'Score earned' : isPractice ? 'Practice score' : 'Possible score'}</span>
            <strong id="presidentScore">${displayedScore} points</strong>
          </div>
        </div>
        <div class="suspect-grid">
          ${candidates.map(candidate => `
            <button class="suspect-card ${(isSolved && candidate.name === 'Herbert Hoover') || presidentState.selectedCandidate === candidate.name ? 'selected' : ''} ${presidentState.ruledOutCandidates.includes(candidate.name) ? 'ruled-out' : ''}" type="button" data-president-candidate="${candidate.name}" ${isSolved || presidentState.ruledOutCandidates.includes(candidate.name) ? 'disabled' : ''}>
              <img class="portrait" src="${candidate.image}" alt="" loading="lazy">
              <span>${candidate.name}</span>
              <span class="ruled-out-label">Ruled out</span>
            </button>
          `).join('')}
        </div>
        <button class="primary-button solve-case-button" type="button" data-action="solve-president" ${isSolved ? 'hidden' : ''}>Solve the Case</button>
      </div>

      <div class="case-result" ${isSolved ? '' : 'hidden'}>
        <h3>Case Solved!</h3>
        <p>Herbert Hoover was the 31st president of the United States. He served from 1929 to 1933.</p>
        <p class="score-line" id="presidentResultScore">${isSolved ? `Score earned: ${displayedScore} points` : ''}</p>
        <p class="badge-line">Presidential Timeline Investigator Badge Earned</p>
        <ul>
          <li>He served between Calvin Coolidge and Franklin D. Roosevelt.</li>
          <li>He became president in 1929.</li>
          <li>The Great Depression began during his presidency.</li>
        </ul>
      </div>

      <button class="ghost-button reset-case-button" type="button" data-action="reset-president">Reset Mission</button>
    </div>
  `);
}

function renderPhone(mission) {
  if (phoneState.isCompleted && hasAwardedScore('phone')) {
    phoneState = {
      ...phoneState,
      callConnected: true,
      pointsEarned: savedMissionScore('phone'),
      hasAwardedPoints: true
    };
  }
  const keypadLocked = phoneState.callConnected || phoneState.isCompleted;
  challengeShell(mission, 'Use the pretend telephone keypad to dial the country code +31.', `
    <div class="tool-card phone-console">
      <div class="dial-display" id="dialDisplay">Dial: ${phoneState.dialed}</div>
      <div class="keypad" ${keypadLocked ? 'hidden' : ''}>
        ${['+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Clear'].map(key => `<button class="key-button" type="button" data-key="${key}">${key}</button>`).join('')}
      </div>
      <button class="primary-button" type="button" data-action="place-call" ${keypadLocked ? 'hidden' : ''}>Place Call</button>
      <p class="phone-feedback" id="phoneCallFeedback" aria-live="polite">${phoneState.callConnected ? 'The call is going to the Netherlands!' : ''}</p>
    </div>
    <section class="tool-card netherlands-panel" id="netherlandsPanel" ${phoneState.callConnected ? '' : 'hidden'}>
      ${renderNetherlandsConnection()}
    </section>
  `);
}

function renderNetherlandsConnection() {
  if (phoneState.isCompleted) {
    return renderPhoneFinalResults();
  }
  const index = phoneState.currentQuestionIndex;
  const question = netherlandsQuestions[index];
  const answer = phoneState.answers[index];
  const checked = answer.isChecked;
  const feedback = checked
    ? answer.isCorrect
      ? 'Correct! You earned 20 points.'
      : `Not quite. The correct answer is ${question.answer ? 'True' : 'False'}.`
    : '';
  return `
    <div class="netherlands-header">
      <div>
        <h3>Netherlands Connection</h3>
        <p class="mission-copy">Question ${index + 1} of ${netherlandsQuestions.length}</p>
      </div>
      <div class="case-scoreboard" aria-live="polite">
        <span>Mission score</span>
        <strong id="phoneScore">${phoneState.pointsEarned} / 60</strong>
      </div>
    </div>
    <div class="netherlands-question">
      <p>${question.prompt}</p>
      <div class="true-false-row">
        ${[true, false].map(value => `
          <button class="choice-button true-false-button ${answer.selectedAnswer === value ? 'selected' : ''}" type="button" data-phone-answer="${value}" ${checked ? 'disabled' : ''}>
            ${value ? 'True' : 'False'}
          </button>
        `).join('')}
      </div>
      <div class="phone-action-row">
        <button class="primary-button" type="button" data-action="check-phone-answer" ${checked || typeof answer.selectedAnswer !== 'boolean' ? 'disabled' : ''}>Check Answer</button>
        ${checked && index < netherlandsQuestions.length - 1 ? '<button class="ghost-button" type="button" data-action="next-phone-question">Next Question</button>' : ''}
      </div>
      <p class="phone-feedback ${checked && answer.isCorrect ? 'success' : ''}" id="phoneQuestionFeedback" aria-live="polite">${feedback}</p>
      ${checked ? `<p class="machine-score-line">Question points: ${answer.pointsEarned}</p>` : ''}
    </div>
  `;
}

function renderPhoneFinalResults() {
  const savedScore = hasAwardedScore('phone') ? savedMissionScore('phone') : phoneState.pointsEarned;
  return `
    <div class="netherlands-header">
      <div>
        <h3>Netherlands Connection</h3>
        <p class="mission-copy">Mission results</p>
      </div>
      <div class="case-scoreboard" aria-live="polite">
        <span>Score earned</span>
        <strong>${savedScore} / 60</strong>
      </div>
    </div>
    <div class="phone-results">
      <h3>International Call Complete</h3>
      <p>You earned ${savedScore} out of 60 points.</p>
      <p>You answered ${phoneState.correctCount} out of 3 questions correctly.</p>
      <button class="primary-button" type="button" data-action="continue-phone">Continue Mission</button>
    </div>
  `;
}

function updateNetherlandsPanel() {
  const panel = challengeRoot.querySelector('#netherlandsPanel');
  if (!panel) return;
  panel.hidden = !phoneState.callConnected;
  if (phoneState.callConnected) {
    panel.innerHTML = renderNetherlandsConnection();
  }
}

function renderBunyan(mission) {
  const isReplay = bunyanState.isCompleted;
  if (isReplay) {
    bunyanState = createBunyanState({
      hasAwardedPoints: true,
      isReplay: true
    });
  }
  const isLocked = bunyanState.isCompleted && !bunyanState.isReplay;
  const displayedScore = isLocked && hasAwardedScore('bunyan')
    ? savedMissionScore('bunyan')
    : bunyanState.currentPossibleScore;
  const scoreLabel = isLocked ? 'Score earned' : bunyanState.isReplay ? 'Practice score' : 'Possible score';
  challengeShell(mission, 'Repair the missing museum plaque by choosing the correct facts about the 31-foot Paul Bunyan statue.', `
    <div class="bunyan-research-actions">
      <button class="ghost-button" type="button" data-action="toggle-bunyan-research" aria-expanded="false" aria-controls="bunyanResearchPanel">Open Research Graphic</button>
    </div>
    <div class="tool-card bunyan-research-panel" id="bunyanResearchPanel" hidden>
      <img src="assets/paul-bunyan-infographic.png" alt="Paul Bunyan infographic with facts about the 31-foot statue in Bangor, Maine">
    </div>
    <div class="tool-card bunyan-plaque">
      <div class="plaque-header">
        <span aria-hidden="true">31</span>
        <h3>Paul Bunyan Museum Plaque</h3>
      </div>
      <div class="plaque-fields">
        ${renderBunyanSelect('selectedLocation', 'Location', 'Choose location', isLocked)}
        ${renderBunyanSelect('selectedHeight', 'Height', 'Choose height', isLocked)}
        ${renderBunyanSelect('selectedYear', 'Year unveiled', 'Choose year', isLocked)}
        ${renderBunyanSelect('selectedReason', 'Why it was built', 'Choose reason', isLocked)}
      </div>
      <p class="bunyan-world-line" id="bunyanWorldLine" ${isLocked ? '' : 'hidden'}>Bangor was known as the Lumber Capital of the World.</p>
    </div>
    <div class="case-scoreboard" aria-live="polite">
      <span>${scoreLabel}</span>
      <strong id="bunyanScore">${displayedScore} points</strong>
    </div>
    ${bunyanState.isReplay ? `<p class="machine-score-line">Practice replay. Your first Paul Bunyan Fact Builder score was ${savedMissionScore('bunyan')} points, and no additional points will be awarded.</p>` : ''}
    <p class="machine-score-line" id="bunyanResultScore" ${isLocked ? '' : 'hidden'}>${isLocked ? `Points earned: ${displayedScore} points` : ''}</p>
    <div class="tile-bank">
      <button class="ghost-button" type="button" data-action="reset-bunyan" ${isLocked ? 'disabled' : ''}>Reset Plaque</button>
      <button class="primary-button" type="button" data-action="check-bunyan" ${isLocked || !bunyanPlaqueComplete() ? 'disabled' : ''}>Check Facts</button>
    </div>
  `);
}

function renderBunyanSelect(key, label, placeholder, isLocked) {
  return `
    <label class="plaque-field">
      <span>${label}</span>
      <select data-bunyan-select="${key}" ${isLocked ? 'disabled' : ''}>
        <option value="">${placeholder}</option>
        ${bunyanChoices[key].map(choice => `<option value="${choice}" ${bunyanState[key] === choice ? 'selected' : ''}>${choice}</option>`).join('')}
      </select>
    </label>
  `;
}

function bunyanPlaqueComplete() {
  return Boolean(
    bunyanState.selectedLocation
    && bunyanState.selectedHeight
    && bunyanState.selectedYear
    && bunyanState.selectedReason
  );
}

function bunyanPlaqueIsCorrect() {
  return Object.entries(bunyanCorrectFacts).every(([key, value]) => bunyanState[key] === value);
}

function updateBunyanScoreDisplay() {
  const score = challengeRoot.querySelector('#bunyanScore');
  if (!score) return;
  const label = score.closest('.case-scoreboard')?.querySelector('span');
  const isLocked = bunyanState.isCompleted && !bunyanState.isReplay;
  if (label) label.textContent = isLocked ? 'Score earned' : bunyanState.isReplay ? 'Practice score' : 'Possible score';
  score.textContent = `${isLocked && hasAwardedScore('bunyan') ? savedMissionScore('bunyan') : bunyanState.currentPossibleScore} points`;
}

function updateBunyanControls() {
  const checkButton = challengeRoot.querySelector('[data-action="check-bunyan"]');
  if (checkButton) checkButton.disabled = (bunyanState.isCompleted && !bunyanState.isReplay) || !bunyanPlaqueComplete();
}

function resetBunyanPlaque() {
  bunyanState.selectedLocation = '';
  bunyanState.selectedHeight = '';
  bunyanState.selectedYear = '';
  bunyanState.selectedReason = '';
  challengeRoot.querySelectorAll('[data-bunyan-select]').forEach(select => {
    select.value = '';
  });
  updateBunyanControls();
  const resultScore = challengeRoot.querySelector('#bunyanResultScore');
  if (resultScore) {
    resultScore.hidden = true;
    resultScore.textContent = '';
  }
  const worldLine = challengeRoot.querySelector('#bunyanWorldLine');
  if (worldLine) worldLine.hidden = true;
  setFeedback('');
  if (!bunyanState.isReplay && !bunyanState.isCompleted) saveScoreState();
}

function lockBunyanPlaque() {
  challengeRoot.querySelectorAll('[data-bunyan-select], [data-action="reset-bunyan"], [data-action="check-bunyan"]').forEach(control => {
    control.disabled = true;
  });
}

function completeBunyanPlaque(pointsForAttempt) {
  if (bunyanState.isReplay || bunyanState.hasAwardedPoints || hasAwardedScore('bunyan')) {
    const savedPoints = savedMissionScore('bunyan') || bunyanState.pointsEarned;
    bunyanState.pointsEarned = savedPoints;
    bunyanState.isCompleted = true;
    bunyanState.hasAwardedPoints = true;
    updateBunyanScoreDisplay();
    lockBunyanPlaque();
    const resultScore = challengeRoot.querySelector('#bunyanResultScore');
    if (resultScore) {
      resultScore.hidden = false;
      resultScore.textContent = `Practice complete. Your saved Paul Bunyan Fact Builder score remains ${savedPoints} points.`;
    }
    const worldLine = challengeRoot.querySelector('#bunyanWorldLine');
    if (worldLine) worldLine.hidden = false;
    setFeedback('Plaque repaired for practice. No additional points will be awarded.', true);
    saveScoreState();
    return;
  }

  const awardedPoints = awardMissionScore('bunyan', pointsForAttempt);
  bunyanState.pointsEarned = awardedPoints;
  bunyanState.currentPossibleScore = awardedPoints;
  bunyanState.isCompleted = true;
  bunyanState.hasAwardedPoints = true;
  updateBunyanScoreDisplay();
  lockBunyanPlaque();
  const resultScore = challengeRoot.querySelector('#bunyanResultScore');
  if (resultScore) {
    resultScore.hidden = false;
    resultScore.textContent = `Points earned: ${awardedPoints} points`;
  }
  const worldLine = challengeRoot.querySelector('#bunyanWorldLine');
  if (worldLine) worldLine.hidden = false;
  const message = awardedPoints > 0
    ? `Plaque repaired! The Paul Bunyan statue in Bangor, Maine is 31 feet tall and was unveiled in 1959. Bangor was known as the Lumber Capital of the World. Points earned: ${awardedPoints} points.`
    : 'Plaque repaired! Mission complete. Bangor was known as the Lumber Capital of the World.';
  solveMission('bunyan', message);
  saveScoreState();
}

function renderHistory(mission) {
  const isReplay = historyState.isCompleted;
  if (isReplay) {
    historyState = createHistoryState({
      hasAwardedPoints: true,
      isReplay: true
    });
  }
  const isLocked = historyState.isCompleted && !historyState.isReplay;
  const scoreLabel = isLocked ? 'Score earned' : historyState.isReplay ? 'Practice score' : 'Possible score';
  const scoreValue = isLocked && hasAwardedScore('history') ? savedMissionScore('history') : historyState.currentPossibleScore;
  challengeShell(mission, 'Arrange the three events in order from earliest to latest. Then choose the statement that correctly explains the 13th Amendment.', `
    <div class="tool-card history-timeline-builder">
      <div class="history-panel-heading">
        <h3>Event Cards</h3>
        <div class="case-scoreboard" aria-live="polite">
          <span>${scoreLabel}</span>
          <strong id="historyScore">${scoreValue} points</strong>
        </div>
      </div>
      <div class="route-card-bank history-event-bank" id="historyEventBank">
        ${renderHistoryCardBank(isLocked)}
      </div>
      <h3>Timeline Spaces</h3>
      <div class="route-space-row history-space-row" id="historyTimelineSpaces">
        ${historyState.eventCardOrder.map((eventId, index) => renderHistoryTimelineSpace(index, eventId, isLocked)).join('')}
      </div>
    </div>
    <div class="tool-card history-meaning-card">
      <h3>What did the 13th Amendment do?</h3>
      <div class="button-grid history-meaning-grid">
        ${historyMeaningChoices.map(choice => `
          <button class="choice-button ${historyState.selectedMeaningAnswer === choice.id ? 'selected' : ''}" type="button" data-history-meaning="${choice.id}" ${isLocked ? 'disabled' : ''}>${choice.text}</button>
        `).join('')}
      </div>
    </div>
    <div class="route-control-row">
      <button class="ghost-button" type="button" data-action="reset-history" ${isLocked ? 'disabled' : ''}>Reset Timeline</button>
      <button class="primary-button" type="button" data-action="check-history" ${isLocked || !historyResponseComplete() ? 'disabled' : ''}>Check Timeline</button>
    </div>
    <p class="machine-score-line" id="historyResultScore" ${isLocked ? '' : 'hidden'}>${isLocked ? `Points earned: ${scoreValue} points` : ''}</p>
    <div class="history-explanation" id="historyExplanation" ${isLocked ? '' : 'hidden'}>
      <h3>Timeline complete!</h3>
      <p>Congress approved the proposed 13th Amendment on January 31, 1865. The states ratified it on December 6, 1865, making it part of the Constitution.</p>
      <p>The 13th Amendment made slavery illegal throughout the United States. Its text includes an exception for punishment after a criminal conviction.</p>
    </div>
    ${historyState.isReplay ? `<p class="machine-score-line">Practice replay. Your first 13th Amendment Timeline score was ${savedMissionScore('history')} points, and no additional points will be awarded.</p>` : ''}
  `);
}

function historyEventById(id) {
  return historyEvents.find(event => event.id === id);
}

function renderHistoryCardBank(isLocked = false) {
  const placed = new Set(historyState.eventCardOrder.filter(Boolean));
  return historyEvents
    .filter(event => !placed.has(event.id))
    .map(event => renderHistoryEventCard(event.id, null, isLocked))
    .join('');
}

function renderHistoryEventCard(eventId, sourceSlot = null, isLocked = false) {
  const event = historyEventById(eventId);
  if (!event) return '';
  const source = Number.isInteger(sourceSlot) ? `data-history-source-slot="${sourceSlot}"` : '';
  return `
    <button class="route-card history-event-card" type="button" data-history-event-card="${eventId}" ${source} ${isLocked ? 'disabled' : ''}>
      <strong>${event.date}</strong>
      <span>${event.text}</span>
    </button>
  `;
}

function renderHistoryTimelineSpace(index, eventId, isLocked = false) {
  const labels = ['Earliest', 'Next', 'Latest'];
  return `
    <div class="route-space history-space ${eventId ? 'filled' : ''}" data-history-slot="${index}" role="group" aria-label="${labels[index]} timeline space">
      <span class="route-space-number">${index + 1}. ${labels[index]}</span>
      ${eventId ? renderHistoryEventCard(eventId, index, isLocked) : '<span class="route-placeholder">Drop event here</span>'}
    </div>
  `;
}

function historyResponseComplete() {
  return historyState.eventCardOrder.every(Boolean) && Boolean(historyState.selectedMeaningAnswer);
}

function updateHistoryUI() {
  const isLocked = historyState.isCompleted && !historyState.isReplay;
  const bank = challengeRoot.querySelector('#historyEventBank');
  const spaces = challengeRoot.querySelector('#historyTimelineSpaces');
  const score = challengeRoot.querySelector('#historyScore');
  const checkButton = challengeRoot.querySelector('[data-action="check-history"]');
  const resetButton = challengeRoot.querySelector('[data-action="reset-history"]');
  if (bank) bank.innerHTML = renderHistoryCardBank(isLocked);
  if (spaces) {
    spaces.innerHTML = historyState.eventCardOrder
      .map((eventId, index) => renderHistoryTimelineSpace(index, eventId, isLocked))
      .join('');
  }
  if (score) {
    const label = isLocked ? 'Score earned' : historyState.isReplay ? 'Practice score' : 'Possible score';
    const wrapper = score.closest('.case-scoreboard');
    const labelElement = wrapper?.querySelector('span');
    if (labelElement) labelElement.textContent = label;
    score.textContent = `${isLocked && hasAwardedScore('history') ? savedMissionScore('history') : historyState.currentPossibleScore} points`;
  }
  if (checkButton) checkButton.disabled = isLocked || !historyResponseComplete();
  if (resetButton) resetButton.disabled = isLocked;
}

function resetHistoryTimeline() {
  if (historyState.isCompleted && !historyState.isReplay) return;
  historyState.eventCardOrder = historyCorrectOrder.map(() => '');
  historyState.selectedMeaningAnswer = '';
  challengeRoot.querySelectorAll('[data-history-meaning]').forEach(button => button.classList.remove('selected'));
  updateHistoryUI();
  setFeedback('');
  if (!historyState.isReplay && !historyState.isCompleted) saveScoreState();
}

function completeHistoryTimeline(pointsForAttempt) {
  const alreadyAwarded = historyState.isReplay || historyState.hasAwardedPoints || hasAwardedScore('history');
  historyState.submittedAttempts += 1;
  historyState.currentPossibleScore = pointsForAttempt;
  historyState.pointsEarned = alreadyAwarded
    ? hasAwardedScore('history') ? savedMissionScore('history') : historyState.pointsEarned
    : pointsForAttempt;
  historyState.isCompleted = true;
  historyState.hasAwardedPoints = true;
  const earnedScore = alreadyAwarded ? historyState.pointsEarned : awardMissionScore('history', pointsForAttempt);
  historyState.pointsEarned = earnedScore;
  updateHistoryUI();
  challengeRoot.querySelectorAll('[data-history-event-card], [data-history-meaning], [data-action="reset-history"], [data-action="check-history"]').forEach(control => {
    control.disabled = true;
  });
  const resultScore = challengeRoot.querySelector('#historyResultScore');
  if (resultScore) {
    resultScore.textContent = alreadyAwarded
      ? `Practice complete. Saved score: ${earnedScore} points`
      : `Points earned: ${earnedScore} points`;
    resultScore.removeAttribute('hidden');
  }
  challengeRoot.querySelector('#historyExplanation')?.removeAttribute('hidden');
  saveScoreState();
  const message = alreadyAwarded
    ? `Practice complete. Your saved 13th Amendment Timeline score remains ${earnedScore} points.`
    : earnedScore > 0
      ? `Timeline complete! Congress approved the proposed 13th Amendment on January 31, 1865. The states ratified it on December 6, 1865, making it part of the Constitution. Score earned: ${earnedScore} points.`
      : 'Timeline complete! The 13th Amendment is in place. Mission complete.';
  solveMission('history', message);
}

function updateBinary() {
  syncBinaryState();
  const display = challengeRoot.querySelector('#binaryDisplay');
  if (display) display.textContent = `${binaryState.binaryCode} = ${binaryState.decimalTotal}`;
  challengeRoot.querySelectorAll('[data-switch]').forEach(button => {
    const index = Number(button.dataset.switch);
    const isOn = Boolean(binaryState.switchStates[index]);
    button.setAttribute('aria-pressed', String(isOn));
    const digit = button.querySelector('.switch-digit');
    const state = button.querySelector('.switch-state');
    if (digit) digit.textContent = isOn ? '1' : '0';
    if (state) state.textContent = isOn ? 'ON' : 'OFF';
  });
  updateBinaryScoreboard();
}

function updateBinaryScoreboard() {
  const possibleScoreDisplay = challengeRoot.querySelector('#binaryPossibleScore');
  const attemptDisplay = challengeRoot.querySelector('#binaryAttemptCount');
  const isLocked = binaryState.isCompleted && !binaryState.isReplay;
  if (possibleScoreDisplay) {
    const showSavedReplayScore = binaryState.isReplay && binaryState.hasAwardedPoints && binaryState.isCompleted;
    const label = isLocked || showSavedReplayScore ? 'Score earned' : binaryState.isReplay ? 'Practice score' : 'Possible score';
    const score = (isLocked || showSavedReplayScore) && hasAwardedScore('binary') ? savedMissionScore('binary') : binaryState.currentPossibleScore;
    possibleScoreDisplay.textContent = `${label}: ${score} points`;
  }
  if (attemptDisplay) attemptDisplay.textContent = `Submitted attempts: ${binaryState.submittedAttempts}`;
}

function resetBinarySwitches() {
  if (binaryState.isCompleted && !binaryState.isReplay) return;
  binaryState.switchStates = binaryPlaceValues.map(() => false);
  binaryState.binaryCode = '000000';
  binaryState.decimalTotal = 0;
  updateBinary();
  setFeedback('');
  if (!binaryState.isReplay && !binaryState.isCompleted) saveScoreState();
}

function completeBinarySwitchboard(pointsForAttempt) {
  const alreadyAwarded = binaryState.isReplay || binaryState.hasAwardedPoints || hasAwardedScore('binary');
  binaryState.submittedAttempts += 1;
  binaryState.currentPossibleScore = pointsForAttempt;
  binaryState.pointsEarned = alreadyAwarded
    ? hasAwardedScore('binary') ? savedMissionScore('binary') : binaryState.pointsEarned
    : pointsForAttempt;
  binaryState.isCompleted = true;
  binaryState.hasAwardedPoints = true;
  const earnedScore = alreadyAwarded ? binaryState.pointsEarned : awardMissionScore('binary', pointsForAttempt);
  binaryState.pointsEarned = earnedScore;
  if (alreadyAwarded) binaryState.currentPossibleScore = earnedScore;
  challengeRoot.querySelectorAll('[data-switch], [data-action="reset-binary"], [data-action="check-binary"]').forEach(control => {
    control.disabled = true;
  });
  updateBinary();
  const resultScore = challengeRoot.querySelector('#binaryResultScore');
  if (resultScore) {
    resultScore.textContent = alreadyAwarded
      ? `Practice complete. Saved score: ${earnedScore} points`
      : `Points earned: ${earnedScore} points`;
    resultScore.removeAttribute('hidden');
  }
  challengeRoot.querySelector('#binaryExplanation')?.removeAttribute('hidden');
  saveScoreState();
  const message = alreadyAwarded
    ? `Practice complete. Your saved Binary Switchboard score remains ${earnedScore} points.`
    : earnedScore > 0
      ? `Switchboard activated! In binary, 31 is written as 011111. Points earned: ${earnedScore}.`
      : 'Switchboard activated! You built 31 in binary. Mission complete.';
  solveMission('binary', message);
}

function updateRomanSlots() {
  challengeRoot.querySelectorAll('button[data-slot]').forEach(slot => {
    const index = Number(slot.dataset.slot);
    const tile = romanState.placedTiles[index];
    slot.innerHTML = tile ? `<span class="placed-roman-tile" data-placed-tile="${tile}" data-source-slot="${index}">${tile}</span>` : '?';
    slot.classList.toggle('filled', Boolean(tile));
  });
  const checkButton = challengeRoot.querySelector('[data-action="check-roman"]');
  if (checkButton) {
    checkButton.disabled = Boolean(romanState.isCompleted && !romanState.isReplay) || !romanState.placedTiles.every(Boolean);
  }
}

function updateRomanScoreboard() {
  const possibleScoreDisplay = challengeRoot.querySelector('#romanPossibleScore');
  const attemptDisplay = challengeRoot.querySelector('#romanAttemptCount');
  if (possibleScoreDisplay) {
    const label = romanState.isReplay ? 'Practice score' : romanState.isCompleted ? 'Score earned' : 'Possible score';
    const score = romanState.isCompleted && !romanState.isReplay ? romanState.pointsEarned : romanState.currentPossibleScore;
    possibleScoreDisplay.textContent = `${label}: ${score} points`;
  }
  if (attemptDisplay) attemptDisplay.textContent = `Submitted attempts: ${romanState.submittedAttempts}`;
}

function cleanupRomanDrag() {
  if (romanDrag?.ghost) romanDrag.ghost.remove();
  romanDrag = null;
  document.body.classList.remove('roman-dragging');
  challengeRoot.querySelectorAll('.roman-drop-target').forEach(element => {
    element.classList.remove('roman-drop-target');
  });
}

function startRomanDrag(source, sourceSlot, pointerEvent) {
  if (romanState.isCompleted && !romanState.isReplay) return;
  const value = source.dataset.tile || source.dataset.placedTile;
  if (!value) return;
  cleanupRomanDrag();
  const ghost = document.createElement('div');
  ghost.className = 'roman-drag-ghost';
  ghost.textContent = value;
  document.body.appendChild(ghost);
  romanDrag = {
    value,
    sourceSlot,
    ghost,
    pointerId: pointerEvent.pointerId,
    lastX: pointerEvent.clientX,
    lastY: pointerEvent.clientY
  };
  document.body.classList.add('roman-dragging');
  source.setPointerCapture?.(pointerEvent.pointerId);
  moveRomanGhost(pointerEvent.clientX, pointerEvent.clientY);
}

function moveRomanGhost(clientX, clientY) {
  if (!romanDrag) return;
  romanDrag.lastX = clientX;
  romanDrag.lastY = clientY;
  romanDrag.ghost.style.transform = `translate(${clientX - 29}px, ${clientY - 29}px)`;
  challengeRoot.querySelectorAll('.roman-drop-target').forEach(element => {
    element.classList.remove('roman-drop-target');
  });
  const element = document.elementFromPoint(clientX, clientY);
  const slot = element?.closest?.('button[data-slot]');
  if (slot) slot.classList.add('roman-drop-target');
}

function finishRomanDrag(clientX, clientY) {
  if (!romanDrag) return;
  const element = document.elementFromPoint(clientX, clientY);
  const targetSlot = element?.closest?.('button[data-slot]');
  const droppedOnBank = Boolean(element?.closest?.('#tileBank'));
  const sourceSlot = romanDrag.sourceSlot;
  if (targetSlot) {
    const targetIndex = Number(targetSlot.dataset.slot);
    if (Number.isInteger(sourceSlot) && sourceSlot !== targetIndex) {
      romanState.placedTiles[sourceSlot] = '';
    }
    romanState.placedTiles[targetIndex] = romanDrag.value;
  } else if (Number.isInteger(sourceSlot) && (droppedOnBank || !targetSlot)) {
    romanState.placedTiles[sourceSlot] = '';
  }
  cleanupRomanDrag();
  updateRomanSlots();
  updateRomanScoreboard();
  if (!romanState.isReplay && !romanState.isCompleted) saveScoreState();
}

function updateMakeTotal() {
  const total = [...challengeRoot.querySelectorAll('[data-number-tile].selected')]
    .reduce((sum, button) => sum + Number(button.dataset.numberTile), 0);
  challengeRoot.querySelector('#makeTotal').textContent = `Total: ${total}`;
}

let octoberDay = 1;

function updateOctober(day) {
  octoberDay = Math.max(1, Math.min(31, day));
  challengeRoot.querySelector('#octDisplay').textContent = `October ${octoberDay}`;
  challengeRoot.querySelectorAll('[data-oct-day]').forEach(button => {
    button.classList.toggle('current', Number(button.dataset.octDay) === octoberDay);
  });
  challengeRoot.querySelector('#halloweenDoor').textContent = octoberDay === 31
    ? 'October 31 door ready'
    : 'October 31 door locked';
}

function updateHalloweenMarker(day, visitedDays = []) {
  halloweenState.markerDate = day;
  const display = challengeRoot.querySelector('#octDisplay');
  if (display) {
    display.textContent = day >= 1 && day <= 31 ? `October ${day}` : 'Outside October';
  }
  const visited = new Set(visitedDays);
  challengeRoot.querySelectorAll('[data-oct-day]').forEach(date => {
    const dateNumber = Number(date.dataset.octDay);
    date.classList.toggle('current', dateNumber === day);
    date.classList.toggle('visited', visited.has(dateNumber) && dateNumber !== day);
  });
}

function updateHalloweenRouteUI() {
  const isLocked = halloweenState.routeSolved || halloweenState.doorOpened;
  const bank = challengeRoot.querySelector('#halloweenCardBank');
  const spaces = challengeRoot.querySelector('#halloweenRouteSpaces');
  const score = challengeRoot.querySelector('#halloweenScore');
  const testButton = challengeRoot.querySelector('[data-action="test-halloween-route"]');
  const resetButton = challengeRoot.querySelector('[data-action="reset-halloween-route"]');
  const openButton = challengeRoot.querySelector('[data-action="open-halloween"]');
  const resultScore = challengeRoot.querySelector('#halloweenResultScore');
  const door = challengeRoot.querySelector('#halloweenDoor');
  if (bank) bank.innerHTML = renderHalloweenCardBank(isLocked);
  if (spaces) {
    spaces.innerHTML = halloweenState.cardOrder
      .map((cardId, index) => renderHalloweenRouteSpace(index, cardId, isLocked))
      .join('');
  }
  if (score) {
    const label = halloweenState.routeSolved && !halloweenState.isReplay ? 'Score earned' : 'Possible score';
    const wrapper = score.closest('.case-scoreboard');
    const labelElement = wrapper?.querySelector('span');
    if (labelElement) labelElement.textContent = label;
    score.textContent = `${halloweenState.routeSolved && !halloweenState.isReplay ? halloweenState.pointsEarned : halloweenState.currentPossibleScore} points`;
  }
  if (testButton) testButton.disabled = isLocked || halloweenRouteAnimating || !halloweenState.cardOrder.every(Boolean);
  if (resetButton) resetButton.disabled = isLocked || halloweenRouteAnimating;
  if (openButton) openButton.disabled = !halloweenState.routeSolved || halloweenState.doorOpened;
  if (door) {
    door.classList.toggle('open', halloweenState.doorOpened);
    door.textContent = halloweenState.doorOpened
      ? 'October 31 door open'
      : halloweenState.routeSolved
        ? 'October 31 door ready'
        : 'October 31 door locked';
  }
  if (resultScore) {
    if (halloweenState.routeSolved || halloweenState.doorOpened) {
      resultScore.textContent = halloweenState.isReplay
        ? `Practice route solved. Your saved Halloween Door score remains ${savedMissionScore('halloween')} points.`
        : `Points earned: ${halloweenState.pointsEarned} points`;
      resultScore.removeAttribute('hidden');
    } else {
      resultScore.setAttribute('hidden', '');
      resultScore.textContent = '';
    }
  }
}

function resetHalloweenRoute() {
  if (halloweenState.routeSolved || halloweenState.doorOpened || halloweenRouteAnimating) return;
  halloweenState.cardOrder = halloweenCorrectRoute.map(() => '');
  halloweenState.markerDate = 1;
  updateHalloweenMarker(1);
  updateHalloweenRouteUI();
  setFeedback('');
  if (!halloweenState.isReplay && !halloweenState.isCompleted) saveScoreState();
}

function halloweenDayOfWeek(day) {
  return (day + 3) % 7;
}

function nextHalloweenWeekday(day, weekday) {
  let daysToMove = (weekday - halloweenDayOfWeek(day) + 7) % 7;
  if (daysToMove === 0) daysToMove = 7;
  return day + daysToMove;
}

function applyHalloweenMove(day, moveId) {
  if (moveId === 'forward10') return day + 10;
  if (moveId === 'forward12') return day + 12;
  if (moveId === 'nextFriday') return nextHalloweenWeekday(day, 5);
  if (moveId === 'nextMonday') return nextHalloweenWeekday(day, 1);
  return day;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testHalloweenRoute() {
  if (halloweenRouteAnimating || halloweenState.routeSolved || !halloweenState.cardOrder.every(Boolean)) return;
  halloweenRouteAnimating = true;
  updateHalloweenRouteUI();
  let day = 1;
  const visitedDays = [1];
  updateHalloweenMarker(day, visitedDays);
  setFeedback('Testing your route...');
  await wait(350);

  for (const moveId of halloweenState.cardOrder) {
    day = applyHalloweenMove(day, moveId);
    if (day < 1 || day > 31) {
      halloweenState.submittedAttempts += 1;
      halloweenState.currentPossibleScore = halloweenPossibleScore(halloweenState.submittedAttempts);
      halloweenState.markerDate = 1;
      halloweenRouteAnimating = false;
      updateHalloweenMarker(1);
      updateHalloweenRouteUI();
      setFeedback('Your route moved outside the October calendar. Rearrange the movement cards and try again.');
      if (!halloweenState.isReplay && !halloweenState.isCompleted) saveScoreState();
      return;
    }
    visitedDays.push(day);
    updateHalloweenMarker(day, visitedDays);
    await wait(550);
  }

  halloweenState.submittedAttempts += 1;
  const isCorrectRoute = day === 31;
  if (isCorrectRoute) {
    halloweenState.routeSolved = true;
    halloweenState.pointsEarned = halloweenPossibleScore(halloweenState.submittedAttempts - 1);
    halloweenState.currentPossibleScore = halloweenState.pointsEarned;
    halloweenState.markerDate = 31;
    halloweenRouteAnimating = false;
    updateHalloweenMarker(31, visitedDays);
    updateHalloweenRouteUI();
    setFeedback('Path confirmed! Your marker reached October 31.', true);
    if (!halloweenState.isReplay && !halloweenState.isCompleted) saveScoreState();
    return;
  }

  halloweenState.currentPossibleScore = halloweenPossibleScore(halloweenState.submittedAttempts);
  halloweenState.markerDate = 1;
  halloweenRouteAnimating = false;
  updateHalloweenMarker(1);
  updateHalloweenRouteUI();
  setFeedback(`Your marker landed on October ${day}. Rearrange the movement cards and try again.`);
  if (!halloweenState.isReplay && !halloweenState.isCompleted) saveScoreState();
}

function openHalloweenDoor() {
  if (!halloweenState.routeSolved || halloweenState.doorOpened) return;
  const savedScore = savedMissionScore('halloween');
  const pointsToShow = halloweenState.isReplay || hasAwardedScore('halloween')
    ? savedScore
    : halloweenState.pointsEarned;
  halloweenState.doorOpened = true;
  halloweenState.isCompleted = true;
  halloweenState.markerDate = 31;
  const door = challengeRoot.querySelector('#halloweenDoor');
  if (door) {
    door.classList.add('open');
    door.textContent = 'October 31 door open';
  }
  updateHalloweenMarker(31);
  if (!halloweenState.isReplay && !halloweenState.hasAwardedPoints && !hasAwardedScore('halloween')) {
    const awardedPoints = awardMissionScore('halloween', halloweenState.pointsEarned);
    halloweenState.pointsEarned = awardedPoints;
    halloweenState.hasAwardedPoints = true;
  } else {
    halloweenState.pointsEarned = pointsToShow;
    halloweenState.hasAwardedPoints = true;
  }
  updateHalloweenRouteUI();
  saveScoreState();
  const message = halloweenState.isReplay
    ? `Practice complete. Your saved Halloween Door score remains ${savedMissionScore('halloween')} points.`
    : halloweenState.pointsEarned > 0
      ? `The October 31 door is open! You earned ${halloweenState.pointsEarned} points.`
      : 'The October 31 door is open! Mission complete.';
  solveMission('halloween', message);
}

function cleanupHalloweenDrag() {
  if (!halloweenDrag) return;
  halloweenDrag.source.classList.remove('route-dragging');
  halloweenDrag.ghost.remove();
  halloweenDrag = null;
  challengeRoot.querySelectorAll('.route-drop-target').forEach(slot => slot.classList.remove('route-drop-target'));
}

function startHalloweenDrag(card, sourceSlot, event) {
  if (halloweenState.routeSolved || halloweenState.doorOpened || halloweenRouteAnimating) return;
  const rect = card.getBoundingClientRect();
  const ghost = card.cloneNode(true);
  ghost.classList.add('route-drag-ghost');
  ghost.style.width = `${rect.width}px`;
  ghost.style.left = `${event.clientX - (rect.width / 2)}px`;
  ghost.style.top = `${event.clientY - (rect.height / 2)}px`;
  document.body.appendChild(ghost);
  card.classList.add('route-dragging');
  halloweenDrag = {
    cardId: card.dataset.halloweenCard,
    sourceSlot,
    pointerId: event.pointerId,
    source: card,
    ghost
  };
  card.setPointerCapture?.(event.pointerId);
}

function moveHalloweenGhost(clientX, clientY) {
  if (!halloweenDrag) return;
  halloweenDrag.ghost.style.left = `${clientX - (halloweenDrag.ghost.offsetWidth / 2)}px`;
  halloweenDrag.ghost.style.top = `${clientY - (halloweenDrag.ghost.offsetHeight / 2)}px`;
  challengeRoot.querySelectorAll('[data-route-slot]').forEach(slot => {
    const rect = slot.getBoundingClientRect();
    slot.classList.toggle(
      'route-drop-target',
      clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    );
  });
}

function finishHalloweenDrag(clientX, clientY) {
  if (!halloweenDrag) return;
  const element = document.elementFromPoint(clientX, clientY);
  const targetSlot = element?.closest?.('[data-route-slot]');
  const droppedOnBank = Boolean(element?.closest?.('#halloweenCardBank'));
  const sourceSlot = halloweenDrag.sourceSlot;
  if (targetSlot) {
    const targetIndex = Number(targetSlot.dataset.routeSlot);
    const replacedCard = halloweenState.cardOrder[targetIndex];
    if (Number.isInteger(sourceSlot)) {
      halloweenState.cardOrder[sourceSlot] = replacedCard || '';
    }
    halloweenState.cardOrder[targetIndex] = halloweenDrag.cardId;
  } else if (Number.isInteger(sourceSlot) && (droppedOnBank || !targetSlot)) {
    halloweenState.cardOrder[sourceSlot] = '';
  }
  cleanupHalloweenDrag();
  updateHalloweenRouteUI();
  if (!halloweenState.isReplay && !halloweenState.isCompleted) saveScoreState();
}

function cleanupHistoryDrag() {
  if (!historyDrag) return;
  historyDrag.source.classList.remove('route-dragging');
  historyDrag.ghost.remove();
  historyDrag = null;
  challengeRoot.querySelectorAll('.route-drop-target').forEach(slot => slot.classList.remove('route-drop-target'));
}

function startHistoryDrag(card, sourceSlot, event) {
  if (historyState.isCompleted && !historyState.isReplay) return;
  const rect = card.getBoundingClientRect();
  const ghost = card.cloneNode(true);
  ghost.classList.add('route-drag-ghost');
  ghost.style.width = `${rect.width}px`;
  ghost.style.left = `${event.clientX - (rect.width / 2)}px`;
  ghost.style.top = `${event.clientY - (rect.height / 2)}px`;
  document.body.appendChild(ghost);
  card.classList.add('route-dragging');
  historyDrag = {
    eventId: card.dataset.historyEventCard,
    sourceSlot,
    pointerId: event.pointerId,
    source: card,
    ghost
  };
  card.setPointerCapture?.(event.pointerId);
}

function moveHistoryGhost(clientX, clientY) {
  if (!historyDrag) return;
  historyDrag.ghost.style.left = `${clientX - (historyDrag.ghost.offsetWidth / 2)}px`;
  historyDrag.ghost.style.top = `${clientY - (historyDrag.ghost.offsetHeight / 2)}px`;
  challengeRoot.querySelectorAll('[data-history-slot]').forEach(slot => {
    const rect = slot.getBoundingClientRect();
    slot.classList.toggle(
      'route-drop-target',
      clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    );
  });
}

function finishHistoryDrag(clientX, clientY) {
  if (!historyDrag) return;
  const element = document.elementFromPoint(clientX, clientY);
  const targetSlot = element?.closest?.('[data-history-slot]');
  const droppedOnBank = Boolean(element?.closest?.('#historyEventBank'));
  const sourceSlot = historyDrag.sourceSlot;
  if (targetSlot) {
    const targetIndex = Number(targetSlot.dataset.historySlot);
    const replacedCard = historyState.eventCardOrder[targetIndex];
    if (Number.isInteger(sourceSlot)) {
      historyState.eventCardOrder[sourceSlot] = replacedCard || '';
    }
    historyState.eventCardOrder[targetIndex] = historyDrag.eventId;
  } else if (Number.isInteger(sourceSlot) && (droppedOnBank || !targetSlot)) {
    historyState.eventCardOrder[sourceSlot] = '';
  }
  cleanupHistoryDrag();
  updateHistoryUI();
  setFeedback('');
  if (!historyState.isReplay && !historyState.isCompleted) saveScoreState();
}

function updateGallium() {
  const slider = challengeRoot.querySelector('#temperatureSlider');
  if (!slider) return;
  const value = Number(slider.value);
  galliumState.currentTemperature = value;
  challengeRoot.querySelector('#temperatureDisplay').textContent = `${value.toFixed(1)} degrees F`;
  const indicator = challengeRoot.querySelector('#galliumMetal');
  indicator.classList.toggle('melted', value >= 85.6);
  indicator.textContent = value >= 85.6 ? 'melted' : 'warming';
}

function syncGalliumSelectedItems() {
  galliumState.selectedItems = [...challengeRoot.querySelectorAll('[data-gallium-item]:checked')]
    .map(input => input.dataset.galliumItem)
    .sort();
}

function galliumLabIsCorrect() {
  const temperatureIsCorrect = Number(galliumState.currentTemperature.toFixed(1)) === 85.6;
  const selected = [...galliumState.selectedItems].sort();
  const target = [...galliumCorrectItems].sort();
  return temperatureIsCorrect
    && selected.length === target.length
    && selected.every((item, index) => item === target[index]);
}

function updateGalliumScoreDisplay() {
  const score = challengeRoot.querySelector('#galliumScore');
  if (!score) return;
  const label = score.closest('.case-scoreboard')?.querySelector('span');
  const isLocked = galliumState.isCompleted && !galliumState.isReplay;
  if (label) label.textContent = isLocked ? 'Score earned' : galliumState.isReplay ? 'Practice score' : 'Possible score';
  score.textContent = `${isLocked && hasAwardedScore('gallium') ? savedMissionScore('gallium') : galliumState.currentPossibleScore} points`;
}

function lockGalliumLab() {
  challengeRoot.querySelector('#temperatureSlider')?.setAttribute('disabled', '');
  challengeRoot.querySelectorAll('[data-gallium-item]').forEach(input => {
    input.disabled = true;
  });
  challengeRoot.querySelector('[data-action="check-gallium"]')?.setAttribute('disabled', '');
}

function completeGalliumLab(pointsForAttempt) {
  if (galliumState.isReplay) {
    galliumState.isCompleted = true;
    galliumState.hasAwardedPoints = true;
    galliumState.pointsEarned = savedMissionScore('gallium');
    updateGalliumScoreDisplay();
    lockGalliumLab();
    const resultScore = challengeRoot.querySelector('#galliumResultScore');
    if (resultScore) {
      resultScore.hidden = false;
      resultScore.textContent = `Practice complete. Your saved Gallium Lab score remains ${galliumState.pointsEarned} points.`;
    }
    setFeedback('Lab confirmed for practice. No additional points will be awarded.', true);
    saveScoreState();
    return;
  }

  const awardedPoints = awardMissionScore('gallium', pointsForAttempt);
  galliumState.pointsEarned = awardedPoints;
  galliumState.currentPossibleScore = awardedPoints;
  galliumState.isCompleted = true;
  galliumState.hasAwardedPoints = true;
  updateGalliumScoreDisplay();
  lockGalliumLab();
  const resultScore = challengeRoot.querySelector('#galliumResultScore');
  if (resultScore) {
    resultScore.hidden = false;
    resultScore.textContent = `Points earned: ${awardedPoints} points`;
  }
  solveMission('gallium', `Lab confirmed! Gallium melts at about 85.6 degrees Fahrenheit and may be used in electronic components found in LED lights, phones, solar panels, and computers. Points earned: ${awardedPoints} points.`);
  saveScoreState();
}

let dialed = '';

function updateDialDisplay() {
  const display = challengeRoot.querySelector('#dialDisplay');
  if (display) display.textContent = `Dial: ${phoneState.dialed}`;
}

function updatePhoneCallFeedback(message, success = false) {
  const feedback = challengeRoot.querySelector('#phoneCallFeedback');
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.toggle('success', success);
}

function completePhoneMission() {
  phoneState.pointsEarned = phoneState.answers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
  phoneState.correctCount = phoneState.answers.filter(answer => answer.isCorrect).length;
  phoneState.isCompleted = true;
  phoneState.hasAwardedPoints = true;
  const earnedScore = awardMissionScore('phone', phoneState.pointsEarned);
  phoneState.pointsEarned = earnedScore;
  saveScoreState();
  if (!solved.has('phone')) {
    solved.add('phone');
    renderMissionRing();
    updateProgress();
  }
}

let stack = [];

function updateStack() {
  const total = stack.reduce((sum, item) => sum + item.feet, 0);
  challengeRoot.querySelector('#heightTotal').textContent = `Total: ${total} ft`;
  challengeRoot.querySelector('#stackList').innerHTML = stack.map(item => `<span class="stack-item">${item.name} (${item.feet} ft)</span>`).join('');
}

function renderSort() {
  sortRoot.innerHTML = missions.map(mission => `
    <div class="sort-row">
      <label for="sort-${mission.id}">${mission.fact}</label>
      <select id="sort-${mission.id}" data-sort="${mission.id}">
        <option value="">Choose category</option>
        ${categories.map(category => `<option>${category}</option>`).join('')}
      </select>
    </div>
  `).join('');
}

missionRing.addEventListener('click', event => {
  const button = event.target.closest('[data-mission]');
  if (!button) return;
  renderChallenge(button.dataset.mission);
});

challengeRoot.addEventListener('click', async event => {
  const divisor = event.target.closest('[data-divisor]');
  if (divisor) {
    divisor.classList.toggle('selected');
    primeState.selectedNumbers = [...challengeRoot.querySelectorAll('[data-divisor].selected')]
      .map(button => Number(button.dataset.divisor))
      .sort((a, b) => a - b);
    if (!primeState.isReplay && !primeState.isCompleted) saveScoreState();
  }

  const switchButton = event.target.closest('[data-switch]');
  if (switchButton) {
    if (switchButton.disabled || (binaryState.isCompleted && !binaryState.isReplay)) return;
    const index = Number(switchButton.dataset.switch);
    binaryState.switchStates[index] = !binaryState.switchStates[index];
    updateBinary();
    setFeedback('');
    if (!binaryState.isReplay && !binaryState.isCompleted) saveScoreState();
  }

  const numberTile = event.target.closest('[data-number-tile]');
  if (numberTile) {
    numberTile.classList.toggle('selected');
    updateMakeTotal();
  }

  const monthButton = event.target.closest('[data-month]');
  if (monthButton) {
    const month = monthButton.dataset.month;
    if (monthButton.disabled || calendarState.selectedMonths.includes(month) || calendarState.selectionsRemaining <= 0) return;
    const isCorrectMonth = calendarCorrectMonths.includes(month);
    calendarState.selectedMonths.push(month);
    calendarState.selectionsRemaining = Math.max(0, 7 - calendarState.selectedMonths.length);
    if (isCorrectMonth) {
      calendarState.correctSelections.push(month);
      calendarState.missionPoints = Math.min(91, calendarState.missionPoints + 13);
      monthButton.classList.add('selected');
      monthButton.disabled = true;
      setFeedback('Correct! That month has 31 days. You earned 13 points.', true);
    } else {
      calendarState.incorrectSelections.push(month);
      monthButton.classList.add('wrong');
      setTimeout(() => {
        monthButton.classList.remove('wrong');
        monthButton.classList.add('attempted');
        monthButton.disabled = true;
      }, 320);
      setFeedback('That month does not have 31 days. No points were earned for that selection.');
    }
    updateCalendarStatus();
    if (!calendarState.isReplay && !calendarState.isCompleted) saveScoreState();
    if (calendarState.selectionsRemaining === 0) {
      finishCalendarHunt();
    }
  }

  const stateClue = event.target.closest('[data-state-clue]');
  if (stateClue) {
    if (stateClue.disabled) return;
    const requiredClues = {
      coast: 'west',
      event: 'gold',
      capital: 'sacramento',
      date: '1850'
    };
    const group = stateClue.dataset.stateClue;
    const isCorrect = requiredClues[group] === stateClue.dataset.clueValue;
    if (!isCorrect) {
      stateClue.classList.add('wrong');
      setTimeout(() => stateClue.classList.remove('wrong'), 320);
      stateClue.classList.add('ruled-out');
      stateClue.disabled = true;
      stateRuledOut.add(`${group}:${stateClue.dataset.clueValue}`);
      stateScore = Math.max(0, (stateScore ?? 80) - 10);
      const scoreDisplay = challengeRoot.querySelector('#stateScore');
      if (scoreDisplay) scoreDisplay.textContent = `${stateScore} points`;
      setFeedback(`That clue points to another place. ${stateScore} points still possible.`);
      return;
    }

    challengeRoot.querySelectorAll(`[data-state-clue="${group}"]`).forEach(button => button.classList.remove('selected'));
    stateClue.classList.add('selected');
    const selectedClues = [...challengeRoot.querySelectorAll('[data-state-clue].selected')];
    const evidenceReady = Object.entries(requiredClues).every(([group, value]) => (
      selectedClues.some(button => button.dataset.stateClue === group && button.dataset.clueValue === value)
    ));

    if (evidenceReady) {
      challengeRoot.querySelector('.state-map-card')?.classList.add('revealed');
      challengeRoot.querySelector('.state-reveal')?.removeAttribute('hidden');
      const callout = challengeRoot.querySelector('.california-callout');
      if (callout) callout.setAttribute('aria-hidden', 'false');
      const lock = challengeRoot.querySelector('.state-map-lock');
      if (lock) lock.setAttribute('aria-hidden', 'true');
      stateScore = stateScore ?? 80;
      const earnedScore = awardMissionScore('state', stateScore);
      challengeRoot.querySelectorAll('[data-state-clue]').forEach(button => {
        button.disabled = true;
      });
      const scoreDisplay = challengeRoot.querySelector('#stateScore');
      if (scoreDisplay) scoreDisplay.textContent = `${earnedScore} points`;
      const resultScore = challengeRoot.querySelector('#stateResultScore');
      if (resultScore) {
        resultScore.textContent = `Score earned: ${earnedScore} points`;
        resultScore.removeAttribute('hidden');
      }
      solveMission('state', `The clues point to California, the 31st state. Score earned: ${earnedScore} points.`);
    } else {
      setFeedback('Good clue. Keep building the evidence file.');
    }
  }

  const presidentEvidence = event.target.closest('[data-president-evidence]');
  if (presidentEvidence) {
    presidentEvidence.classList.add('opened');
    presidentEvidence.setAttribute('aria-expanded', 'true');
    const openedEvidence = challengeRoot.querySelectorAll('[data-president-evidence].opened').length;
    const evidenceCount = challengeRoot.querySelector('#presidentEvidenceCount');
    if (evidenceCount) evidenceCount.textContent = `Evidence Found ${openedEvidence} of 4`;
    if (openedEvidence === 4) {
      challengeRoot.querySelector('.suspect-section')?.removeAttribute('hidden');
      setFeedback('All evidence files are open. Choose a suspect and solve the case.');
    } else {
      setFeedback('Evidence file opened. Keep investigating.');
    }
  }

  const presidentCandidate = event.target.closest('[data-president-candidate]');
  if (presidentCandidate) {
    if (presidentCandidate.disabled) return;
    challengeRoot.querySelectorAll('[data-president-candidate]').forEach(button => button.classList.remove('selected'));
    presidentCandidate.classList.add('selected');
    presidentState.selectedCandidate = presidentCandidate.dataset.presidentCandidate;
    if (!presidentState.isReplay && !presidentState.isCompleted) saveScoreState();
  }

  const keyButton = event.target.closest('[data-key]');
  if (keyButton) {
    if (phoneState.callConnected || phoneState.isCompleted) return;
    if (keyButton.dataset.key === 'Clear') {
      phoneState.dialed = '';
    } else if (phoneState.dialed.length < 3) {
      phoneState.dialed += keyButton.dataset.key;
    }
    updateDialDisplay();
    updatePhoneCallFeedback('');
    saveScoreState();
  }

  const phoneAnswer = event.target.closest('[data-phone-answer]');
  if (phoneAnswer) {
    const index = phoneState.currentQuestionIndex;
    const answer = phoneState.answers[index];
    if (answer.isChecked || phoneState.isCompleted) return;
    answer.selectedAnswer = phoneAnswer.dataset.phoneAnswer === 'true';
    challengeRoot.querySelectorAll('[data-phone-answer]').forEach(button => {
      button.classList.toggle('selected', button === phoneAnswer);
    });
    const checkButton = challengeRoot.querySelector('[data-action="check-phone-answer"]');
    if (checkButton) checkButton.disabled = false;
    saveScoreState();
  }

  const historyMeaning = event.target.closest('[data-history-meaning]');
  if (historyMeaning) {
    if (historyMeaning.disabled || (historyState.isCompleted && !historyState.isReplay)) return;
    challengeRoot.querySelectorAll('[data-history-meaning]').forEach(button => button.classList.remove('selected'));
    historyMeaning.classList.add('selected');
    historyState.selectedMeaningAnswer = historyMeaning.dataset.historyMeaning;
    updateHistoryUI();
    setFeedback('');
    if (!historyState.isReplay && !historyState.isCompleted) saveScoreState();
  }

  const actionButton = event.target.closest('[data-action]');
  const action = actionButton?.dataset.action;
  if (!action) return;

  if (action === 'place-call') {
    if (phoneState.dialed !== '+31') {
      updatePhoneCallFeedback('That call did not connect. Check the country code and try again.');
      return;
    }
    phoneState.callConnected = true;
    updatePhoneCallFeedback('The call is going to the Netherlands!', true);
    challengeRoot.querySelector('.keypad')?.setAttribute('hidden', '');
    challengeRoot.querySelector('[data-action="place-call"]')?.setAttribute('hidden', '');
    updateNetherlandsPanel();
    saveScoreState();
  }

  if (action === 'check-phone-answer') {
    const index = phoneState.currentQuestionIndex;
    const question = netherlandsQuestions[index];
    const answer = phoneState.answers[index];
    if (answer.isChecked || typeof answer.selectedAnswer !== 'boolean') return;
    answer.isChecked = true;
    answer.isCorrect = answer.selectedAnswer === question.answer;
    answer.pointsEarned = answer.isCorrect ? 20 : 0;
    phoneState.pointsEarned = phoneState.answers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
    phoneState.correctCount = phoneState.answers.filter(answer => answer.isCorrect).length;
    if (index === netherlandsQuestions.length - 1) {
      completePhoneMission();
    } else {
      saveScoreState();
    }
    updateNetherlandsPanel();
  }

  if (action === 'next-phone-question') {
    if (!phoneState.answers[phoneState.currentQuestionIndex].isChecked) return;
    phoneState.currentQuestionIndex = Math.min(netherlandsQuestions.length - 1, phoneState.currentQuestionIndex + 1);
    updateNetherlandsPanel();
    saveScoreState();
  }

  if (action === 'continue-phone') {
    updateNetherlandsPanel();
  }

  if (action === 'check-prime') {
    const selected = [...challengeRoot.querySelectorAll('[data-divisor].selected')].map(button => Number(button.dataset.divisor)).sort((a, b) => a - b);
    const isCorrect = selected.length === 2 && selected[0] === 1 && selected[1] === 31;
    const possibleScoreDisplay = challengeRoot.querySelector('#primePossibleScore');
    const attemptDisplay = challengeRoot.querySelector('#primeAttemptCount');
    const resultScore = challengeRoot.querySelector('#primeResultScore');
    if (isCorrect) {
      const pointsForAttempt = primePossibleScore(primeState.submittedAttempts);
      challengeRoot.querySelectorAll('[data-divisor]').forEach(button => {
        button.disabled = true;
      });
      challengeRoot.querySelector('[data-action="check-prime"]')?.setAttribute('disabled', '');
      if (primeState.isReplay || primeState.hasAwardedPoints) {
        if (resultScore) {
          resultScore.textContent = `Practice complete. Your saved Prime Scanner score remains ${primeState.pointsEarned} points.`;
          resultScore.removeAttribute('hidden');
        }
        setFeedback('Scanner activated for practice. No additional points will be awarded.', true);
        return;
      }

      primeState = {
        selectedNumbers: selected,
        submittedAttempts: primeState.submittedAttempts + 1,
        currentPossibleScore: pointsForAttempt,
        pointsEarned: pointsForAttempt,
        isCompleted: true,
        hasAwardedPoints: true,
        isReplay: false
      };
      awardMissionScore('prime', pointsForAttempt);
      saveScoreState();
      updateScoreCount();
      if (possibleScoreDisplay) possibleScoreDisplay.textContent = `Score earned: ${pointsForAttempt} points`;
      if (attemptDisplay) attemptDisplay.textContent = `Submitted attempts: ${primeState.submittedAttempts}`;
      if (resultScore) {
        resultScore.textContent = `Points earned: ${pointsForAttempt}`;
        resultScore.removeAttribute('hidden');
      }
      solveMission('prime', 'Scanner activated! The only divisors of 31 are 1 and 31.');
    } else {
      primeState.submittedAttempts += 1;
      primeState.currentPossibleScore = primePossibleScore(primeState.submittedAttempts);
      primeState.selectedNumbers = [];
      if (!primeState.isReplay && !primeState.isCompleted) saveScoreState();
      challengeRoot.querySelectorAll('[data-divisor].selected').forEach(button => button.classList.remove('selected'));
      if (possibleScoreDisplay) possibleScoreDisplay.textContent = `${primeState.isReplay ? 'Practice score' : 'Possible score'}: ${primeState.currentPossibleScore} points`;
      if (attemptDisplay) attemptDisplay.textContent = `Submitted attempts: ${primeState.submittedAttempts}`;
      setFeedback('That set does not include exactly all the divisors of 31. Try again.');
    }
  }

  if (action === 'reset-binary') {
    resetBinarySwitches();
  }

  if (action === 'check-binary') {
    if (binaryState.isCompleted && !binaryState.isReplay) return;
    const pointsForAttempt = binaryPossibleScore(binaryState.submittedAttempts);
    syncBinaryState();
    if (binaryState.binaryCode === '011111' && binaryState.decimalTotal === 31) {
      completeBinarySwitchboard(pointsForAttempt);
    } else {
      binaryState.submittedAttempts += 1;
      binaryState.currentPossibleScore = binaryPossibleScore(binaryState.submittedAttempts);
      updateBinaryScoreboard();
      if (!binaryState.isReplay && !binaryState.isCompleted) saveScoreState();
      setFeedback(`Your binary code equals ${binaryState.decimalTotal}. Adjust the switches to make exactly 31.`);
    }
  }

  if (action === 'reset-roman') {
    romanState.placedTiles = ['', '', '', ''];
    updateRomanSlots();
    updateRomanScoreboard();
    setFeedback('');
    if (!romanState.isReplay && !romanState.isCompleted) saveScoreState();
  }

  if (action === 'check-roman') {
    if (!romanState.placedTiles.every(Boolean)) return;
    const isCorrect = romanState.placedTiles.join('') === 'XXXI';
    const pointsForAttempt = romanPossibleScore(romanState.submittedAttempts);
    const possibleScoreDisplay = challengeRoot.querySelector('#romanPossibleScore');
    const resultScore = challengeRoot.querySelector('#romanResultScore');
    if (isCorrect) {
      romanState.submittedAttempts += 1;
      romanState.currentPossibleScore = pointsForAttempt;
      challengeRoot.querySelectorAll('[data-roman-bank-tile], [data-action="reset-roman"], [data-action="check-roman"], [data-slot]').forEach(button => {
        button.disabled = true;
      });
      if (romanState.isReplay || romanState.hasAwardedPoints || hasAwardedScore('roman')) {
        const savedPoints = savedMissionScore('roman') || romanState.pointsEarned;
        if (resultScore) {
          resultScore.textContent = `Practice complete. Your saved Roman Numeral Builder score remains ${savedPoints} points.`;
          resultScore.removeAttribute('hidden');
        }
        updateRomanScoreboard();
        setFeedback('Number confirmed for practice. No additional points will be awarded.', true);
        return;
      }

      romanState.pointsEarned = pointsForAttempt;
      romanState.isCompleted = true;
      romanState.hasAwardedPoints = true;
      romanState.isReplay = false;
      const awardedPoints = awardMissionScore('roman', pointsForAttempt);
      romanState.pointsEarned = awardedPoints;
      if (possibleScoreDisplay) possibleScoreDisplay.textContent = `Score earned: ${awardedPoints} points`;
      updateRomanScoreboard();
      if (resultScore) {
        resultScore.textContent = `Points earned: ${awardedPoints} points`;
        resultScore.removeAttribute('hidden');
      }
      solveMission('roman', `Number confirmed! XXXI is the Roman numeral for 31. Points earned: ${awardedPoints}.`);
    } else {
      romanState.submittedAttempts += 1;
      romanState.currentPossibleScore = romanPossibleScore(romanState.submittedAttempts);
      updateRomanScoreboard();
      if (!romanState.isReplay && !romanState.isCompleted) saveScoreState();
      setFeedback('That numeral does not equal 31. Check the order of your tiles and try again.');
    }
  }

  if (action === 'check-make31') {
    const selected = [...challengeRoot.querySelectorAll('[data-number-tile].selected')].map(button => Number(button.dataset.numberTile)).sort((a, b) => a - b);
    const target = [1, 2, 4, 8, 16];
    const isCorrect = selected.length === target.length && selected.every((value, index) => value === target[index]);
    if (isCorrect) {
      make31Score = Math.max(0, 60 - (make31WrongChecks * 20));
      const earnedScore = awardMissionScore('make31', make31Score);
      const scoreDisplay = challengeRoot.querySelector('#make31Score');
      if (scoreDisplay) scoreDisplay.textContent = `${earnedScore} points`;
      const resultScore = challengeRoot.querySelector('#make31ResultScore');
      if (resultScore) {
        resultScore.textContent = `Score earned: ${earnedScore} points`;
        resultScore.removeAttribute('hidden');
      }
      challengeRoot.querySelectorAll('[data-number-tile]').forEach(button => {
        button.disabled = true;
      });
      challengeRoot.querySelector('[data-action="check-make31"]')?.setAttribute('hidden', '');
      solveMission('make31', `1 + 2 + 4 + 8 + 16 = 31. Score earned: ${earnedScore} points.`);
    } else {
      make31WrongChecks += 1;
      const remainingScore = Math.max(0, 60 - (make31WrongChecks * 20));
      const scoreDisplay = challengeRoot.querySelector('#make31Score');
      if (scoreDisplay) scoreDisplay.textContent = `${remainingScore} points`;
      setFeedback(`The lab wants the doubling pattern that totals 31. ${remainingScore} points still possible.`);
    }
  }

  if (action === 'reset-halloween-route') resetHalloweenRoute();
  if (action === 'test-halloween-route') await testHalloweenRoute();
  if (action === 'open-halloween') {
    openHalloweenDoor();
  }

  if (action === 'solve-president') {
    const selectedCard = challengeRoot.querySelector('[data-president-candidate].selected');
    const selectedCandidate = selectedCard?.dataset.presidentCandidate || presidentState.selectedCandidate;
    if (!selectedCandidate) {
      setFeedback('Choose a suspect card before you solve the case.');
      return;
    }
    const pointsForAttempt = presidentPossibleScore(presidentState.submittedAttempts);
    if (selectedCandidate === 'Herbert Hoover') {
      const alreadyAwarded = presidentState.isReplay || presidentState.hasAwardedPoints || hasAwardedScore('president');
      presidentState.submittedAttempts += 1;
      presidentState.currentPossibleScore = pointsForAttempt;
      presidentState.pointsEarned = alreadyAwarded
        ? hasAwardedScore('president') ? savedMissionScore('president') : presidentState.pointsEarned
        : pointsForAttempt;
      presidentState.selectedCandidate = 'Herbert Hoover';
      presidentState.isCompleted = true;
      presidentState.hasAwardedPoints = true;
      const earnedScore = alreadyAwarded ? presidentState.pointsEarned : awardMissionScore('president', pointsForAttempt);
      presidentState.pointsEarned = earnedScore;
      challengeRoot.querySelector('.president-case')?.classList.add('case-solved');
      challengeRoot.querySelector('.case-result')?.removeAttribute('hidden');
      challengeRoot.querySelector('.solve-case-button')?.setAttribute('hidden', '');
      challengeRoot.querySelectorAll('[data-president-candidate]').forEach(button => {
        button.disabled = true;
      });
      const scoreDisplay = challengeRoot.querySelector('#presidentScore');
      if (scoreDisplay) scoreDisplay.textContent = `${earnedScore} points`;
      const resultScore = challengeRoot.querySelector('#presidentResultScore');
      if (resultScore) resultScore.textContent = `Score earned: ${earnedScore} points`;
      const feedback = !alreadyAwarded
        ? `Case solved. Herbert Hoover was president number 31. Score earned: ${earnedScore} points.`
        : `Practice complete. Your saved President score remains ${earnedScore} points.`;
      saveScoreState();
      solveMission('president', feedback);
    } else {
      presidentState.submittedAttempts += 1;
      presidentState.currentPossibleScore = presidentPossibleScore(presidentState.submittedAttempts);
      presidentState.selectedCandidate = '';
      if (!presidentState.ruledOutCandidates.includes(selectedCandidate)) {
        presidentState.ruledOutCandidates.push(selectedCandidate);
      }
      selectedCard.classList.remove('selected');
      selectedCard.classList.add('ruled-out');
      selectedCard.disabled = true;
      const scoreDisplay = challengeRoot.querySelector('#presidentScore');
      if (scoreDisplay) scoreDisplay.textContent = `${presidentState.currentPossibleScore} points`;
      if (!presidentState.isReplay && !presidentState.isCompleted) saveScoreState();
      setFeedback(`Not quite. ${selectedCandidate} is ruled out. ${presidentState.currentPossibleScore} points still possible.`);
    }
  }

  if (action === 'check-gallium') {
    if (galliumState.isCompleted && !galliumState.isReplay) return;
    updateGallium();
    syncGalliumSelectedItems();
    const pointsForAttempt = galliumPossibleScore(galliumState.submittedAttempts);
    galliumState.submittedAttempts += 1;
    if (galliumLabIsCorrect()) {
      completeGalliumLab(pointsForAttempt);
    } else {
      galliumState.currentPossibleScore = galliumPossibleScore(galliumState.submittedAttempts);
      updateGalliumScoreDisplay();
      if (!galliumState.isReplay && !galliumState.isCompleted) saveScoreState();
      setFeedback('The lab results are not quite right. Check both the temperature and the selected items.');
    }
  }

  if (action === 'reset-flavor') {
    resetFlavorRecipe();
  }

  if (action === 'test-flavor') {
    if (!flavorSelectionsComplete() || flavorState.isCompleted) return;
    const pointsForAttempt = flavorPossibleScore(flavorState.submittedAttempts);
    flavorState.submittedAttempts += 1;
    flavorState.formulaTotal = flavorFormulaTotal();
    if (flavorState.formulaTotal === 31) {
      completeFlavorFormula(pointsForAttempt);
    } else {
      flavorState.currentPossibleScore = flavorPossibleScore(flavorState.submittedAttempts);
      updateFlavorScoreDisplay();
      setFeedback(`Your flavor formula totals ${flavorState.formulaTotal}. Adjust the ingredients and try to make exactly 31.`);
      if (!flavorState.isReplay) saveScoreState();
    }
  }

  if (action === 'reset-bunyan') {
    if (bunyanState.isCompleted && !bunyanState.isReplay) return;
    resetBunyanPlaque();
  }

  if (action === 'toggle-bunyan-research') {
    const panel = challengeRoot.querySelector('#bunyanResearchPanel');
    if (!panel) return;
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    actionButton.textContent = willOpen ? 'Close Research Graphic' : 'Open Research Graphic';
    actionButton.setAttribute('aria-expanded', String(willOpen));
  }

  if (action === 'check-bunyan') {
    if (!bunyanPlaqueComplete() || (bunyanState.isCompleted && !bunyanState.isReplay)) return;
    const pointsForAttempt = bunyanPossibleScore(bunyanState.submittedAttempts);
    bunyanState.submittedAttempts += 1;
    if (bunyanPlaqueIsCorrect()) {
      bunyanState.currentPossibleScore = pointsForAttempt;
      completeBunyanPlaque(pointsForAttempt);
    } else {
      bunyanState.currentPossibleScore = bunyanPossibleScore(bunyanState.submittedAttempts);
      updateBunyanScoreDisplay();
      setFeedback('Some facts are still incorrect. Revise the plaque and try again.');
      if (!bunyanState.isReplay && !bunyanState.isCompleted) saveScoreState();
    }
  }

  if (action === 'reset-president') {
    const hadGuesses = presidentState.submittedAttempts > 0 && !presidentState.isCompleted;
    if (presidentState.isCompleted || hasAwardedScore('president')) {
      renderPresident(missionById('president'), true);
      setFeedback('Practice replay. Your first President score is saved, and no additional points will be awarded.');
    } else {
      presidentState.selectedCandidate = '';
      renderPresident(missionById('president'));
      setFeedback(hadGuesses
        ? `Mission reset. Your used guesses stay ruled out, and ${presidentState.currentPossibleScore} points are still possible.`
        : 'Mission reset. Open the evidence files to replay the case.');
      saveScoreState();
    }
  }

  if (action === 'reset-history') {
    resetHistoryTimeline();
  }

  if (action === 'check-history') {
    if (!historyResponseComplete() || (historyState.isCompleted && !historyState.isReplay)) return;
    const pointsForAttempt = historyPossibleScore(historyState.submittedAttempts);
    const orderCorrect = historyState.eventCardOrder.every((eventId, index) => eventId === historyCorrectOrder[index]);
    const meaningCorrect = historyState.selectedMeaningAnswer === 'slavery';
    if (orderCorrect && meaningCorrect) {
      completeHistoryTimeline(pointsForAttempt);
    } else {
      historyState.submittedAttempts += 1;
      historyState.currentPossibleScore = historyPossibleScore(historyState.submittedAttempts);
      updateHistoryUI();
      if (!historyState.isReplay && !historyState.isCompleted) saveScoreState();
      setFeedback('Something is not yet in place. Check the event order and the meaning of the amendment.');
    }
  }
});

challengeRoot.addEventListener('input', event => {
  if (event.target.id === 'temperatureSlider') {
    if (galliumState.isCompleted && !galliumState.isReplay) return;
    updateGallium();
    setFeedback('');
    if (!galliumState.isReplay && !galliumState.isCompleted) saveScoreState();
  }
});

challengeRoot.addEventListener('change', event => {
  const galliumItem = event.target.closest('[data-gallium-item]');
  if (galliumItem) {
    if (galliumState.isCompleted && !galliumState.isReplay) return;
    syncGalliumSelectedItems();
    setFeedback('');
    if (!galliumState.isReplay && !galliumState.isCompleted) saveScoreState();
    return;
  }

  const bunyanSelect = event.target.closest('[data-bunyan-select]');
  if (bunyanSelect) {
    if (bunyanState.isCompleted && !bunyanState.isReplay) return;
    const key = bunyanSelect.dataset.bunyanSelect;
    if (Object.prototype.hasOwnProperty.call(bunyanChoices, key)) {
      bunyanState[key] = bunyanSelect.value;
      updateBunyanControls();
      setFeedback('');
      if (!bunyanState.isReplay && !bunyanState.isCompleted) saveScoreState();
    }
    return;
  }

  const flavorSelect = event.target.closest('[data-flavor-select]');
  if (!flavorSelect || flavorState.isCompleted) return;
  const group = flavorSelect.dataset.flavorSelect;
  if (group === 'base') flavorState.selectedBase = flavorSelect.value;
  if (group === 'mixIn') flavorState.selectedMixIn = flavorSelect.value;
  if (group === 'topping') flavorState.selectedTopping = flavorSelect.value;
  updateFlavorFormulaDisplay();
  setFeedback('');
  if (!flavorState.isReplay) saveScoreState();
});

challengeRoot.addEventListener('pointerdown', event => {
  if (activeMission === 'history') {
    const card = event.target.closest('[data-history-event-card]');
    if (!card || card.disabled) return;
    event.preventDefault();
    const sourceSlot = card.dataset.historySourceSlot === undefined ? null : Number(card.dataset.historySourceSlot);
    startHistoryDrag(card, sourceSlot, event);
    return;
  }

  if (activeMission === 'halloween') {
    const card = event.target.closest('[data-halloween-card]');
    if (!card || card.disabled) return;
    event.preventDefault();
    const sourceSlot = card.dataset.routeSourceSlot === undefined ? null : Number(card.dataset.routeSourceSlot);
    startHalloweenDrag(card, sourceSlot, event);
    return;
  }

  if (activeMission !== 'roman') return;
  const bankTile = event.target.closest('[data-roman-bank-tile]');
  const placedTile = event.target.closest('[data-placed-tile]');
  const draggableTile = bankTile || placedTile;
  if (!draggableTile || draggableTile.disabled) return;
  event.preventDefault();
  const sourceSlot = placedTile ? Number(placedTile.dataset.sourceSlot) : null;
  startRomanDrag(draggableTile, sourceSlot, event);
});

challengeRoot.addEventListener('pointermove', event => {
  if (historyDrag && historyDrag.pointerId === event.pointerId) {
    event.preventDefault();
    moveHistoryGhost(event.clientX, event.clientY);
    return;
  }

  if (halloweenDrag && halloweenDrag.pointerId === event.pointerId) {
    event.preventDefault();
    moveHalloweenGhost(event.clientX, event.clientY);
    return;
  }

  if (!romanDrag || romanDrag.pointerId !== event.pointerId) return;
  event.preventDefault();
  moveRomanGhost(event.clientX, event.clientY);
});

challengeRoot.addEventListener('pointerup', event => {
  if (historyDrag && historyDrag.pointerId === event.pointerId) {
    event.preventDefault();
    finishHistoryDrag(event.clientX, event.clientY);
    return;
  }

  if (halloweenDrag && halloweenDrag.pointerId === event.pointerId) {
    event.preventDefault();
    finishHalloweenDrag(event.clientX, event.clientY);
    return;
  }

  if (!romanDrag || romanDrag.pointerId !== event.pointerId) return;
  event.preventDefault();
  finishRomanDrag(event.clientX, event.clientY);
});

challengeRoot.addEventListener('pointercancel', event => {
  if (historyDrag && historyDrag.pointerId === event.pointerId) {
    cleanupHistoryDrag();
    return;
  }

  if (halloweenDrag && halloweenDrag.pointerId === event.pointerId) {
    cleanupHalloweenDrag();
    return;
  }

  if (!romanDrag || romanDrag.pointerId !== event.pointerId) return;
  cleanupRomanDrag();
});

document.getElementById('checkSortButton').addEventListener('click', () => {
  const allCorrect = missions.every(mission => {
    const select = sortRoot.querySelector(`[data-sort="${mission.id}"]`);
    return select && select.value === mission.category;
  });
  if (allCorrect) {
    sortFeedback.textContent = '31 Is Everywhere. Badge unlocked.';
    sortFeedback.classList.add('success');
    badgeDialog.showModal();
  } else {
    sortFeedback.textContent = 'Some facts are still in the wrong category. Try again.';
    sortFeedback.classList.remove('success');
  }
});

closeBadgeButton.addEventListener('click', () => badgeDialog.close());

renderMissionRing();
updateProgress();
updateScoreCount();
