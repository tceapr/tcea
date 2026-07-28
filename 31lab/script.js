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
    fact: '11111 in binary equals 31.'
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
    title: 'Flavor Factory',
    symbol: 'F',
    category: 'Popular culture',
    fact: 'A fictional 31st flavor can be invented from a base, mix-in, and topping.'
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
    title: 'Paul Bunyan Measuring Challenge',
    symbol: 'FT',
    category: 'Popular culture',
    fact: 'Three 10-foot basketball hoops plus one foot make 31 feet.'
  },
  {
    id: 'history',
    title: 'History Timeline',
    symbol: '1865',
    category: 'History',
    fact: 'On January 31, 1865, Congress passed the 13th Amendment, which abolished slavery in the United States.'
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

let activeMission = null;
let selectedRomanTile = null;
let romanSlots = ['', '', '', ''];
let presidentScore = null;

function missionById(id) {
  return missions.find(mission => mission.id === id);
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
  selectedRomanTile = null;
  romanSlots = ['', '', '', ''];

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
  challengeShell(mission, 'Select every number that divides evenly into 31. The scanner only powers up when every divisor is marked.', `
    <div class="tool-card">
      <div class="button-grid">
        ${[1, 2, 3, 4, 5, 6, 31].map(number => `<button class="choice-button" type="button" data-divisor="${number}">${number}</button>`).join('')}
      </div>
    </div>
    <button class="primary-button" type="button" data-action="check-prime">Scan divisors</button>
  `);
}

function renderBinary(mission) {
  challengeShell(mission, 'Flip all five switches on. The display should read 11111, which the lab converts into 31.', `
    <div class="tool-card">
      <div class="switch-row">
        ${[0, 1, 2, 3, 4].map(index => `<button class="switch" type="button" aria-pressed="false" data-switch="${index}"><span></span>0</button>`).join('')}
      </div>
    </div>
    <div class="binary-display" id="binaryDisplay">00000 = 0</div>
  `);
}

function renderRoman(mission) {
  challengeShell(mission, 'Build 31 as a Roman numeral. Drag or tap the tiles into the four spaces in the correct order.', `
    <div class="tool-card roman-builder">
      <div class="tile-bank" id="tileBank">
        ${['I', 'X', 'X', 'X'].map((tile, index) => `<button class="roman-tile" type="button" draggable="true" data-tile-index="${index}" data-tile="${tile}">${tile}</button>`).join('')}
      </div>
      <div class="slot-row" id="slotRow">
        ${[0, 1, 2, 3].map(index => `<button class="slot" type="button" data-slot="${index}" aria-label="Roman numeral slot ${index + 1}">?</button>`).join('')}
      </div>
      <div class="tile-bank">
        <button class="ghost-button" type="button" data-action="reset-roman">Reset tiles</button>
        <button class="primary-button" type="button" data-action="check-roman">Check numeral</button>
      </div>
    </div>
  `);
}

function renderMake31(mission) {
  challengeShell(mission, 'Choose the number tiles that add to 31. This machine wants the doubling pattern.', `
    <div class="tool-card">
      <div class="button-grid">
        ${[1, 2, 3, 4, 7, 8, 10, 12, 16].map(number => `<button class="choice-button" type="button" data-number-tile="${number}">${number}</button>`).join('')}
      </div>
    </div>
    <div class="total-display" id="makeTotal">Total: 0</div>
    <button class="primary-button" type="button" data-action="check-make31">Check total</button>
  `);
}

function renderCalendar(mission) {
  challengeShell(mission, 'Tap the seven months that contain 31 days. Incorrect months bounce back.', `
    <div class="tool-card">
      <div class="button-grid">
        ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => `<button class="month-button" type="button" data-month="${month}">${month}</button>`).join('')}
      </div>
    </div>
  `);
}

function renderHalloween(mission) {
  octoberDay = 1;
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  challengeShell(mission, 'Move across the October calendar and open the door when your marker reaches October 31.', `
    <div class="tool-card">
      <div class="tile-bank">
        <button class="ghost-button" type="button" data-action="oct-prev">Back one day</button>
        <div class="calendar-display" id="octDisplay">October 1</div>
        <button class="ghost-button" type="button" data-action="oct-next">Forward one day</button>
      </div>
      <div class="calendar-grid" id="octGrid">
        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `<span>${day}</span>`).join('')}
        ${Array.from({ length: 4 }, () => '<span></span>').join('')}
        ${days.map(day => `<button class="day-button ${day === 1 ? 'current' : ''}" type="button" data-oct-day="${day}">${day}</button>`).join('')}
      </div>
    </div>
    <div class="door" id="halloweenDoor">October 31 door locked</div>
    <button class="primary-button" type="button" data-action="open-halloween">Open door</button>
  `);
}

function renderState(mission) {
  const isSolved = solved.has(mission.id);
  const selectedClass = isSolved ? ' selected' : '';
  challengeShell(mission, 'Choose the clues that point to the 31st state. When the evidence file is correct, the map will reveal the state.', `
    <div class="tool-card">
      <h3>Evidence file</h3>
      <div class="clue-grid">
        <button class="choice-button${selectedClass}" type="button" data-state-clue="coast" data-clue-value="west">West Coast</button>
        <button class="choice-button" type="button" data-state-clue="coast" data-clue-value="east">East Coast</button>
        <button class="choice-button${selectedClass}" type="button" data-state-clue="event" data-clue-value="gold">Gold Rush</button>
        <button class="choice-button" type="button" data-state-clue="event" data-clue-value="space">Space Coast</button>
        <button class="choice-button${selectedClass}" type="button" data-state-clue="capital" data-clue-value="sacramento">Sacramento</button>
        <button class="choice-button" type="button" data-state-clue="capital" data-clue-value="austin">Austin</button>
        <button class="choice-button${selectedClass}" type="button" data-state-clue="date" data-clue-value="1850">Joined in 1850</button>
        <button class="choice-button" type="button" data-state-clue="date" data-clue-value="1959">Joined in 1959</button>
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
    </div>
  `);
}

function renderGallium(mission) {
  challengeShell(mission, 'Move the temperature to 85.6 degrees Fahrenheit. Then select the items that may contain gallium-based parts.', `
    <div class="tool-card gallium-lab">
      <div>
        <label for="temperatureSlider">Temperature</label>
        <input class="temperature-slider" id="temperatureSlider" type="range" min="80" max="90" step="0.1" value="82">
        <div class="temperature-display" id="temperatureDisplay">82.0 degrees F</div>
      </div>
      <div class="gallium-sample" aria-label="Gallium solid and melted sample">
        <img src="assets/gallium-lab.png" alt="Gallium solid chunks and melted gallium on a lab tray">
        <div class="melt-indicator" id="galliumMetal">warming</div>
      </div>
    </div>
    <div class="tool-card">
      <div class="item-grid">
        ${['LED light', 'Phone', 'Solar panel', 'Computer', 'Wooden spoon', 'Paper clip'].map(item => `
          <label class="item-check"><input type="checkbox" data-gallium-item="${item}"> ${item}</label>
        `).join('')}
      </div>
    </div>
    <button class="primary-button" type="button" data-action="check-gallium">Check lab results</button>
  `);
}

function renderFlavor(mission) {
  challengeShell(mission, 'Invent a fictional 31st ice cream flavor by choosing a base, mix-in, and topping.', `
    <div class="tool-card select-grid">
      <label>Base
        <select id="baseSelect">
          <option value="">Choose a base</option>
          <option>Moonbeam Vanilla</option>
          <option>Robot Raspberry</option>
          <option>Confetti Chocolate</option>
        </select>
      </label>
      <label>Mix-in
        <select id="mixSelect">
          <option value="">Choose a mix-in</option>
          <option>Comet Crunch</option>
          <option>Waffle Sparks</option>
          <option>Cookie Meteors</option>
        </select>
      </label>
      <label>Topping
        <select id="topSelect">
          <option value="">Choose a topping</option>
          <option>Rainbow Drizzle</option>
          <option>Marshmallow Bolts</option>
          <option>Caramel Buttons</option>
        </select>
      </label>
    </div>
    <div class="flavor-name" id="flavorName">Flavor name waiting...</div>
    <button class="primary-button" type="button" data-action="make-flavor">Make flavor</button>
  `);
}

function renderPresident(mission, forceFresh = false) {
  const isSolved = !forceFresh && solved.has(mission.id);
  const displayedScore = presidentScore ?? 60;
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
          <span class="magnifier" aria-hidden="true"></span>
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
            <span>${isSolved ? 'Score earned' : 'Possible score'}</span>
            <strong id="presidentScore">${displayedScore} points</strong>
          </div>
        </div>
        <div class="suspect-grid">
          ${candidates.map(candidate => `
            <button class="suspect-card ${isSolved && candidate.name === 'Herbert Hoover' ? 'selected' : ''}" type="button" data-president-candidate="${candidate.name}" ${isSolved ? 'disabled' : ''}>
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
  dialed = '';
  challengeShell(mission, 'Use the pretend telephone keypad to dial the country code +31.', `
    <div class="dial-display" id="dialDisplay">Dial:</div>
    <div class="keypad">
      ${['+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Clear'].map(key => `<button class="key-button" type="button" data-key="${key}">${key}</button>`).join('')}
    </div>
  `);
}

function renderBunyan(mission) {
  stack = [];
  challengeShell(mission, 'Stack familiar objects to estimate 31 feet. Three basketball hoops equal 30 feet, so the statue needs one extra foot.', `
    <div class="tool-card">
      <div class="button-grid">
        <button class="object-button" type="button" data-object="Basketball hoop" data-feet="10">Basketball hoop<br>10 ft</button>
        <button class="object-button" type="button" data-object="One-foot ruler" data-feet="1">One-foot ruler<br>1 ft</button>
        <button class="object-button" type="button" data-object="Door" data-feet="7">Door<br>7 ft</button>
        <button class="object-button" type="button" data-object="Desk" data-feet="3">Desk<br>3 ft</button>
      </div>
    </div>
    <div class="total-display" id="heightTotal">Total: 0 ft</div>
    <div class="stack-list" id="stackList"></div>
    <div class="tile-bank">
      <button class="ghost-button" type="button" data-action="reset-stack">Reset stack</button>
      <button class="primary-button" type="button" data-action="check-stack">Check height</button>
    </div>
  `);
}

function renderHistory(mission) {
  challengeShell(mission, 'Place January 31, 1865, on the timeline. Then finish the sentence about what the 13th Amendment did.', `
    <div class="tool-card history-row">
      <button class="timeline-button" type="button" data-history-place="before">Before April 8, 1864</button>
      <button class="timeline-button" type="button" data-history-place="middle">Between April 8, 1864, and December 6, 1865</button>
      <button class="timeline-button" type="button" data-history-place="after">After December 6, 1865</button>
    </div>
    <div class="tool-card">
      <p class="mission-copy">Congress passed the 13th Amendment, which...</p>
      <div class="button-grid">
        <button class="choice-button" type="button" data-history-phrase="speech">protected free speech.</button>
        <button class="choice-button" type="button" data-history-phrase="slavery">abolished slavery in the United States.</button>
        <button class="choice-button" type="button" data-history-phrase="vote">gave women the right to vote.</button>
      </div>
    </div>
    <button class="primary-button" type="button" data-action="check-history">Check timeline</button>
  `);
}

function updateBinary() {
  const switches = [...challengeRoot.querySelectorAll('[data-switch]')];
  const binary = switches.map(button => button.getAttribute('aria-pressed') === 'true' ? '1' : '0').join('');
  const decimal = parseInt(binary, 2);
  challengeRoot.querySelector('#binaryDisplay').textContent = `${binary} = ${decimal}`;
  if (binary === '11111') solveMission('binary', '11111 converts to 31. Section active.');
}

function updateRomanSlots() {
  challengeRoot.querySelectorAll('[data-slot]').forEach(slot => {
    const index = Number(slot.dataset.slot);
    slot.textContent = romanSlots[index] || '?';
    slot.classList.toggle('filled', Boolean(romanSlots[index]));
  });
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

function updateGallium() {
  const value = Number(challengeRoot.querySelector('#temperatureSlider').value);
  challengeRoot.querySelector('#temperatureDisplay').textContent = `${value.toFixed(1)} degrees F`;
  const indicator = challengeRoot.querySelector('#galliumMetal');
  indicator.classList.toggle('melted', value >= 85.6);
  indicator.textContent = value >= 85.6 ? 'melted' : 'warming';
}

let dialed = '';

function updateDialDisplay() {
  challengeRoot.querySelector('#dialDisplay').textContent = `Dial: ${dialed}`;
  if (dialed === '+31') solveMission('phone', 'The call is going to the Netherlands. Section active.');
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

challengeRoot.addEventListener('click', event => {
  const divisor = event.target.closest('[data-divisor]');
  if (divisor) divisor.classList.toggle('selected');

  const switchButton = event.target.closest('[data-switch]');
  if (switchButton) {
    const pressed = switchButton.getAttribute('aria-pressed') === 'true';
    switchButton.setAttribute('aria-pressed', String(!pressed));
    switchButton.lastChild.textContent = pressed ? '0' : '1';
    updateBinary();
  }

  const tileButton = event.target.closest('[data-tile]');
  if (tileButton) {
    selectedRomanTile = tileButton;
    challengeRoot.querySelectorAll('[data-tile]').forEach(tile => tile.classList.remove('selected'));
    tileButton.classList.add('selected');
  }

  const slotButton = event.target.closest('[data-slot]');
  if (slotButton && selectedRomanTile) {
    romanSlots[Number(slotButton.dataset.slot)] = selectedRomanTile.dataset.tile;
    selectedRomanTile.remove();
    selectedRomanTile = null;
    updateRomanSlots();
  }

  const numberTile = event.target.closest('[data-number-tile]');
  if (numberTile) {
    numberTile.classList.toggle('selected');
    updateMakeTotal();
  }

  const monthButton = event.target.closest('[data-month]');
  if (monthButton) {
    const correctMonths = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
    if (!correctMonths.includes(monthButton.dataset.month)) {
      monthButton.classList.add('wrong');
      setTimeout(() => monthButton.classList.remove('wrong'), 320);
      monthButton.classList.remove('selected');
      setFeedback('That month does not have 31 days. It bounced back.');
    } else {
      monthButton.classList.add('selected');
      const selected = [...challengeRoot.querySelectorAll('[data-month].selected')].map(button => button.dataset.month);
      if (correctMonths.every(month => selected.includes(month))) {
        solveMission('calendar', 'Seven 31-day months found. Section active.');
      }
    }
  }

  const octDay = event.target.closest('[data-oct-day]');
  if (octDay) updateOctober(Number(octDay.dataset.octDay));

  const stateClue = event.target.closest('[data-state-clue]');
  if (stateClue) {
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
      setFeedback('That clue points to another place. Try a clue that fits the 31st state.');
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
      solveMission('state', 'The clues point to California, the 31st state. Section active.');
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
  }

  const keyButton = event.target.closest('[data-key]');
  if (keyButton) {
    if (keyButton.dataset.key === 'Clear') {
      dialed = '';
    } else if (dialed.length < 3) {
      dialed += keyButton.dataset.key;
    }
    updateDialDisplay();
  }

  const objectButton = event.target.closest('[data-object]');
  if (objectButton) {
    stack.push({ name: objectButton.dataset.object, feet: Number(objectButton.dataset.feet) });
    updateStack();
  }

  const historyPlace = event.target.closest('[data-history-place]');
  if (historyPlace) {
    challengeRoot.querySelectorAll('[data-history-place]').forEach(button => button.classList.remove('selected'));
    historyPlace.classList.add('selected');
  }

  const historyPhrase = event.target.closest('[data-history-phrase]');
  if (historyPhrase) {
    challengeRoot.querySelectorAll('[data-history-phrase]').forEach(button => button.classList.remove('selected'));
    historyPhrase.classList.add('selected');
  }

  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;

  if (action === 'check-prime') {
    const selected = [...challengeRoot.querySelectorAll('[data-divisor].selected')].map(button => Number(button.dataset.divisor)).sort((a, b) => a - b);
    selected.length === 2 && selected[0] === 1 && selected[1] === 31
      ? solveMission('prime', 'The scanner found only 1 and 31. Section active.')
      : setFeedback('Not quite. A divisor must split 31 with no remainder.');
  }

  if (action === 'reset-roman') renderRoman(missionById('roman'));

  if (action === 'check-roman') {
    romanSlots.join('') === 'XXXI'
      ? solveMission('roman', 'XXXI is Roman numeral 31. Section active.')
      : setFeedback('Not yet. The three X tiles come before the I tile.');
  }

  if (action === 'check-make31') {
    const selected = [...challengeRoot.querySelectorAll('[data-number-tile].selected')].map(button => Number(button.dataset.numberTile)).sort((a, b) => a - b);
    const target = [1, 2, 4, 8, 16];
    selected.length === target.length && selected.every((value, index) => value === target[index])
      ? solveMission('make31', '1 + 2 + 4 + 8 + 16 = 31. Section active.')
      : setFeedback('The lab wants the doubling pattern that totals 31.');
  }

  if (action === 'oct-prev') updateOctober(octoberDay - 1);
  if (action === 'oct-next') updateOctober(octoberDay + 1);
  if (action === 'open-halloween') {
    octoberDay === 31
      ? solveMission('halloween', 'The October 31 door opened. Section active.')
      : setFeedback('Move your calendar marker to October 31 first.');
  }

  if (action === 'solve-president') {
    const selectedCard = challengeRoot.querySelector('[data-president-candidate].selected');
    const selectedCandidate = selectedCard?.dataset.presidentCandidate;
    if (!selectedCandidate) {
      setFeedback('Choose a suspect card before you solve the case.');
      return;
    }
    const wrongAttempts = challengeRoot.querySelectorAll('[data-president-candidate].ruled-out').length;
    if (selectedCandidate === 'Herbert Hoover') {
      presidentScore = Math.max(0, 60 - (wrongAttempts * 20));
      challengeRoot.querySelector('.president-case')?.classList.add('case-solved');
      challengeRoot.querySelector('.case-result')?.removeAttribute('hidden');
      challengeRoot.querySelector('.solve-case-button')?.setAttribute('hidden', '');
      challengeRoot.querySelectorAll('[data-president-candidate]').forEach(button => {
        button.disabled = true;
      });
      const scoreDisplay = challengeRoot.querySelector('#presidentScore');
      if (scoreDisplay) scoreDisplay.textContent = `${presidentScore} points`;
      const resultScore = challengeRoot.querySelector('#presidentResultScore');
      if (resultScore) resultScore.textContent = `Score earned: ${presidentScore} points`;
      solveMission('president', `Case solved. Herbert Hoover was president number 31. Score earned: ${presidentScore} points.`);
    } else {
      selectedCard.classList.remove('selected');
      selectedCard.classList.add('ruled-out');
      selectedCard.disabled = true;
      const remainingScore = Math.max(0, 60 - ((wrongAttempts + 1) * 20));
      const scoreDisplay = challengeRoot.querySelector('#presidentScore');
      if (scoreDisplay) scoreDisplay.textContent = `${remainingScore} points`;
      setFeedback(`Not quite. ${selectedCandidate} is ruled out. ${remainingScore} points still possible.`);
    }
  }

  if (action === 'check-gallium') {
    const value = Number(challengeRoot.querySelector('#temperatureSlider').value);
    const selected = [...challengeRoot.querySelectorAll('[data-gallium-item]:checked')].map(input => input.dataset.galliumItem).sort();
    const target = ['Computer', 'LED light', 'Phone', 'Solar panel'].sort();
    Math.abs(value - 85.6) < 0.05 && selected.length === target.length && selected.every((item, index) => item === target[index])
      ? solveMission('gallium', 'The gallium melted and the tech items checked out. Section active.')
      : setFeedback('Set the slider to 85.6 degrees F and choose the gallium-based technology items.');
  }

  if (action === 'make-flavor') {
    const base = challengeRoot.querySelector('#baseSelect').value;
    const mix = challengeRoot.querySelector('#mixSelect').value;
    const topping = challengeRoot.querySelector('#topSelect').value;
    if (!base || !mix || !topping) {
      setFeedback('Choose one base, one mix-in, and one topping.');
      return;
    }
    challengeRoot.querySelector('#flavorName').textContent = `${base} ${mix} with ${topping}: the 31st Scoop`;
    solveMission('flavor', 'Flavor invented. Section active.');
  }

  if (action === 'reset-stack') {
    stack = [];
    updateStack();
    setFeedback('Stack reset.');
  }

  if (action === 'reset-president') {
    presidentScore = null;
    renderPresident(missionById('president'), true);
    setFeedback('Mission reset. Open the evidence files to replay the case.');
  }

  if (action === 'check-stack') {
    const total = stack.reduce((sum, item) => sum + item.feet, 0);
    const hoops = stack.filter(item => item.name === 'Basketball hoop').length;
    const rulers = stack.filter(item => item.name === 'One-foot ruler').length;
    total === 31 && hoops === 3 && rulers === 1
      ? solveMission('bunyan', 'Three hoops plus one foot reach 31 feet. Section active.')
      : setFeedback('Try three 10-foot basketball hoops and one extra foot.');
  }

  if (action === 'check-history') {
    const place = challengeRoot.querySelector('[data-history-place].selected')?.dataset.historyPlace;
    const phrase = challengeRoot.querySelector('[data-history-phrase].selected')?.dataset.historyPhrase;
    place === 'middle' && phrase === 'slavery'
      ? solveMission('history', 'January 31, 1865, and the 13th Amendment are in place. Section active.')
      : setFeedback('Check both the timeline position and the amendment sentence.');
  }
});

challengeRoot.addEventListener('input', event => {
  if (event.target.id === 'temperatureSlider') updateGallium();
});

challengeRoot.addEventListener('dragstart', event => {
  const tile = event.target.closest('[data-tile]');
  if (tile) event.dataTransfer.setData('text/plain', tile.dataset.tileIndex);
});

challengeRoot.addEventListener('dragover', event => {
  if (event.target.closest('[data-slot]')) event.preventDefault();
});

challengeRoot.addEventListener('drop', event => {
  const slot = event.target.closest('[data-slot]');
  if (!slot) return;
  event.preventDefault();
  const tileIndex = event.dataTransfer.getData('text/plain');
  const tile = challengeRoot.querySelector(`[data-tile-index="${tileIndex}"]`);
  if (!tile) return;
  romanSlots[Number(slot.dataset.slot)] = tile.dataset.tile;
  tile.remove();
  updateRomanSlots();
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
