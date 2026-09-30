/*
  Snowed In! content guide for teachers:
  - Edit challenge titles, directions, clues, choices, answers, and feedback in SNOWED_IN_GAME.
  - Each challenge section is labeled below.
  - Artwork filenames are listed with each challenge below.
*/

const SNOWED_IN_GAME = {
  openingImage: "snowedin.png",
  clues: {
    mitten: { label: "Mitten", value: "3" },
    thermometer: { label: "Thermometer", value: "7" },
    flashlight: { label: "Flashlight", value: "2" },
    boot: { label: "Boot", value: "5" }
  },
  // These four clues are shuffled when a new game starts.
  finalOrder: ["flashlight", "mitten", "boot", "thermometer"],
  challenges: [
    // Challenge 1: The Frozen Keypad
    {
      id: "keypad",
      title: "The Frozen Keypad",
      image: "challenge01-frozen-keypad.png",
      directions: "The office door keypad is iced over. Use the clues to find the 4-digit code.",
      type: "keypad",
      answer: "4682",
      clues: [
        "The code uses 2, 4, 6, and 8 exactly once.",
        "The 2 is the last digit.",
        "The 4 comes before the 6.",
        "The 8 comes after the 6."
      ],
      success: "Click! The office door opens."
    },

    // Challenge 2: Cafeteria Mix-Up
    {
      id: "cafeteria",
      title: "Cafeteria Mix-Up",
      image: "challenge02-cafeteria-mixup.png.png",
      directions: "Match each snack to its correct container before the cafeteria cart rolls away.",
      type: "matching",
      items: ["Hot chocolate", "Marshmallows", "Popcorn", "Pretzels"],
      containers: [
        { id: "red-thermos", label: "Red thermos" },
        { id: "blue-tub", label: "Blue tub" },
        { id: "gold-tin", label: "Gold tin" },
        { id: "gray-basket", label: "Gray basket" }
      ],
      logic: [
        "The red thermos holds the only drink.",
        "The popcorn is in the gold tin.",
        "The pretzels are in the gray basket.",
        "The marshmallows are not in the thermos."
      ],
      answer: {
        "red-thermos": "Hot chocolate",
        "blue-tub": "Marshmallows",
        "gold-tin": "Popcorn",
        "gray-basket": "Pretzels"
      },
      success: "Snack station restored."
    },

    // Challenge 3: The Missing Mitten
    {
      id: "mitten",
      title: "The Missing Mitten",
      image: "challenge03-missing-mitten.png",
      directions: "Look at the hallway picture. Where are the red mittens with white snowflakes?",
      type: "object-search",
      target: "On the bench",
      choices: [
        "On the bench",
        "By the double doors",
        "Beside the blue lockers",
        "On the coat hooks"
      ],
      wrongFeedback: "Not there. Look for two red mittens with white snowflakes.",
      success: "Mitten found. You earned a clue.",
      awardClue: "mitten"
    },

    // Challenge 4: Thermostat Trouble
    {
      id: "thermostat",
      title: "Thermostat Trouble",
      image: "challenge04-thermostat-trouble.png",
      directions: "The thermostat is counting down by the same amount each time. Fill in the missing number.",
      type: "number-pattern",
      pattern: ["42", "39", "36", "?", "30"],
      answer: "33",
      success: "The thermostat hums back to life. You earned a clue.",
      awardClue: "thermometer"
    },

    // Challenge 5: Scrambled Announcement
    {
      id: "announcement",
      title: "Scrambled Announcement",
      image: "challenge05-scrambled-announcement.png",
      directions: "Click the phrase that comes first, then keep building the announcement. Use the arrow buttons if you need to rearrange it.",
      type: "sequence",
      pieces: [
        "Attention, students!",
        "Because of icy roads,",
        "school is closed today.",
        "Stay warm and check tomorrow's update."
      ],
      answer: [
        "Attention, students!",
        "Because of icy roads,",
        "school is closed today.",
        "Stay warm and check tomorrow's update."
      ],
      shuffled: [
        "school is closed today.",
        "Stay warm and check tomorrow's update.",
        "Attention, students!",
        "Because of icy roads,"
      ],
      success: "Announcement fixed."
    },

    // Challenge 6: Locker Logic
    {
      id: "lockers",
      title: "Locker Logic",
      image: "challenge06-locker-logic.png",
      directions: "One locker contains the emergency flashlight. Use every clue, then click the locker to test your answer.",
      type: "lockers",
      lockers: [12, 18, 24, 30],
      answer: 24,
      logic: [
        "The flashlight is not in an even multiple of 10.",
        "It is not in Locker 12.",
        "Its locker number is greater than 20.",
        "It is not in Locker 30."
      ],
      wrongFeedback: {
        "12": "Clue check: it is not in Locker 12.",
        "18": "Clue check: the locker number is greater than 20.",
        "30": "Clue check: it is not in Locker 30.",
        default: "One clue rules that locker out."
      },
      success: "The flashlight is in Locker 24. You earned a clue.",
      awardClue: "flashlight"
    },

    // Challenge 7: The Salt Supply
    {
      id: "salt",
      title: "The Salt Supply",
      image: "challenge07-salt-supply.png",
      directions: "The custodian needs exactly 50 pounds of ice melt. Select only three bags.",
      type: "bags",
      bags: [8, 12, 15, 18, 20],
      answer: [12, 18, 20],
      targetTotal: 50,
      maxBags: 3,
      success: "Exactly 50 pounds. The walkway is safe."
    },

    // Challenge 8: Footprints in the Hall
    {
      id: "footprints",
      title: "Footprints in the Hall",
      image: "challenge08-footprints.png.png",
      directions: "The four trails are labeled A through D from left to right. Which trail was made by paws instead of shoes?",
      type: "odd-footprint",
      choices: [
        { id: "A", label: "Far-left trail", odd: false },
        { id: "B", label: "Left-center trail", odd: true },
        { id: "C", label: "Right-center trail", odd: false },
        { id: "D", label: "Far-right trail", odd: false }
      ],
      wrongFeedback: "That is not the paw-print trail. Compare the shape of each mark and try again.",
      success: "Paw-print trail spotted. You earned a clue.",
      awardClue: "boot"
    },

    // Challenge 9: Power Outage
    {
      id: "power",
      title: "Power Outage",
      image: "challenge09-power-outage..png",
      directions: "The hallway lights are blinking in a pattern. Choose what comes next.",
      type: "light-pattern",
      sequence: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
        [true, false, false, false]
      ],
      options: [
        { value: [false, true, false, false], correct: true },
        { value: [false, false, true, false], correct: false },
        { value: [true, false, false, false], correct: false },
        { value: [false, false, false, true], correct: false }
      ],
      success: "Power pattern solved."
    },

    // Challenge 10: The Final Plow Code
    {
      id: "final",
      title: "The Final Plow Code",
      image: "challenge10-final-plow-code.png",
      directions: "Use your collected clues. Enter the code for the icons in this order.",
      type: "final-code",
      success: "The school gates unlock."
    }
  ]
};

const state = {
  current: -1,
  solvedCurrent: false,
  earnedClues: {},
  finalOrder: []
};

const gameScreen = document.querySelector("#gameScreen");
const clueList = document.querySelector("#clueList");
const restartButton = document.querySelector("#restartButton");

restartButton.addEventListener("click", restartGame);

renderIntro();
renderClues();

function renderIntro() {
  state.current = -1;
  state.solvedCurrent = false;
  gameScreen.innerHTML = `
    <div class="intro-grid">
      <div class="intro-copy">
        <p class="eyebrow">School Closed. Systems Weird.</p>
        <h2>A winter storm locked down the school.</h2>
        <p>Restore power, fix the problems, collect clues, and unlock the school gates before the snowplow arrives.</p>
        <p>No snow expertise needed. Just sharp eyes and clever thinking.</p>
        <div class="button-row">
          <button class="primary-button" type="button" id="startGame">Start Game</button>
        </div>
      </div>
      ${imageFrame(SNOWED_IN_GAME.openingImage)}
    </div>
  `;
  hydrateImages();
  document.querySelector("#startGame").addEventListener("click", () => {
    state.finalOrder = shuffledCopy(SNOWED_IN_GAME.finalOrder);
    state.current = 0;
    renderChallenge();
  });
}

function restartGame() {
  state.current = -1;
  state.solvedCurrent = false;
  state.earnedClues = {};
  state.finalOrder = [];
  renderClues();
  renderIntro();
}

function renderChallenge() {
  state.solvedCurrent = false;
  const challenge = SNOWED_IN_GAME.challenges[state.current];
  const progressText = `Challenge ${state.current + 1} of ${SNOWED_IN_GAME.challenges.length}`;
  const progressPercent = ((state.current + 1) / SNOWED_IN_GAME.challenges.length) * 100;

  gameScreen.innerHTML = `
    <div class="progress-row">
      <span class="progress-pill">${progressText}</span>
      <div class="progress-track" aria-label="${progressText}">
        <div class="progress-fill" style="width: ${progressPercent}%"></div>
      </div>
    </div>
    <div class="challenge-grid">
      <div class="challenge-copy">
        <h2>${challenge.title}</h2>
        <p>${challenge.directions}</p>
        <div class="challenge-space" id="challengeSpace"></div>
      </div>
      ${imageFrame(challenge.image)}
    </div>
    <div id="feedback" class="feedback" hidden></div>
    <div class="button-row" id="navRow"></div>
  `;

  hydrateImages();
  renderNav();
  renderChallengeType(challenge);
}

function renderChallengeType(challenge) {
  const space = document.querySelector("#challengeSpace");
  const renderers = {
    keypad: renderKeypadChallenge,
    matching: renderMatchingChallenge,
    "object-search": renderObjectSearchChallenge,
    "number-pattern": renderNumberPatternChallenge,
    sequence: renderSequenceChallenge,
    lockers: renderLockerChallenge,
    bags: renderBagsChallenge,
    "odd-footprint": renderOddFootprintChallenge,
    "light-pattern": renderLightPatternChallenge,
    "final-code": renderFinalCodeChallenge
  };
  renderers[challenge.type](challenge, space);
}

function renderNav() {
  const navRow = document.querySelector("#navRow");
  navRow.innerHTML = "";
  if (!state.solvedCurrent) return;

  const isLast = state.current === SNOWED_IN_GAME.challenges.length - 1;
  if (!isLast) {
    const nextButton = makeButton("Next Challenge", "primary-button", () => {
      state.current += 1;
      renderChallenge();
    });
    navRow.append(nextButton);
  }
}

function imageFrame(filename) {
  return `
    <div class="image-frame" data-image-frame>
      <img alt="" data-image src="images/${filename}">
      <div class="placeholder-note" data-placeholder hidden>
        <div>
          <strong>${filename}</strong>
          <span>Image coming soon</span>
        </div>
      </div>
    </div>
  `;
}

function hydrateImages() {
  document.querySelectorAll("[data-image-frame]").forEach((frame) => {
    const img = frame.querySelector("[data-image]");
    const placeholder = frame.querySelector("[data-placeholder]");

    const showImage = () => {
      frame.classList.add("has-image");
      placeholder.hidden = true;
    };

    const showPlaceholder = () => {
      frame.classList.remove("has-image");
      placeholder.hidden = false;
    };

    img.addEventListener("load", showImage, { once: true });
    img.addEventListener("error", showPlaceholder, { once: true });

    if (img.complete) {
      if (img.naturalWidth > 0) showImage();
      else showPlaceholder();
    }
  });
}

function renderClues() {
  const earned = Object.keys(state.earnedClues);
  if (!earned.length) {
    clueList.innerHTML = `<div class="clue-empty">No clues yet. Keep solving.</div>`;
    return;
  }

  clueList.innerHTML = earned.map((clueId) => {
    const clue = SNOWED_IN_GAME.clues[clueId];
    return `<div class="clue-chip"><span>${clue.label}</span><span>${clue.value}</span></div>`;
  }).join("");
}

function awardClue(clueId) {
  if (!clueId || state.earnedClues[clueId]) return;
  state.earnedClues[clueId] = true;
  renderClues();
}

function solveChallenge(message, clueId) {
  state.solvedCurrent = true;
  awardClue(clueId);
  setFeedback(message, "success");
  renderNav();

  const isLast = state.current === SNOWED_IN_GAME.challenges.length - 1;
  if (isLast) {
    window.setTimeout(renderSuccess, 650);
  }
}

function setFeedback(message, type = "") {
  const feedback = document.querySelector("#feedback");
  feedback.hidden = false;
  feedback.className = `feedback ${type}`;
  feedback.textContent = message;
}

function makeButton(label, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function shuffledCopy(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  // Keep the challenge from ever opening in the teacher-data order.
  if (shuffled.length > 1 && shuffled.every((item, index) => item === items[index])) {
    shuffled.push(shuffled.shift());
  }
  return shuffled;
}

// Challenge 1 interaction: keypad code
function renderKeypadChallenge(challenge, space) {
  let code = "";
  space.innerHTML = `
    <div class="keypad-wrap">
      <div>
        <div class="code-display" id="codeDisplay" aria-label="Entered code">----</div>
        <div class="keypad" id="keypad"></div>
      </div>
      <ul class="logic-list">
        ${challenge.clues.map((clue) => `<li>${clue}</li>`).join("")}
      </ul>
    </div>
  `;

  const keypad = document.querySelector("#keypad");
  const display = document.querySelector("#codeDisplay");
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Enter"].forEach((key) => {
    const button = makeButton(key, key.length === 1 ? "key-button" : "key-button utility", () => {
      if (state.solvedCurrent) return;
      if (key === "Clear") {
        code = "";
      } else if (key === "Enter") {
        if (code === challenge.answer) {
          solveChallenge(challenge.success);
        } else {
          setFeedback("The keypad buzzes. Check the order of the clues and try again.", "error");
          code = "";
        }
      } else if (code.length < 4) {
        code += key;
      }
      display.textContent = code.padEnd(4, "-");
    });
    keypad.append(button);
  });

  window.onkeydown = (event) => {
    if (state.current !== 0 || state.solvedCurrent) return;
    if (/^[0-9]$/.test(event.key) && code.length < 4) {
      code += event.key;
      display.textContent = code.padEnd(4, "-");
    }
    if (event.key === "Backspace") {
      code = code.slice(0, -1);
      display.textContent = code.padEnd(4, "-");
    }
    if (event.key === "Enter") {
      if (code === challenge.answer) solveChallenge(challenge.success);
      else {
        setFeedback("The keypad buzzes. Check the order of the clues and try again.", "error");
        code = "";
        display.textContent = "----";
      }
    }
  };
}

// Challenge 2 interaction: drag, drop, or click-to-match snacks
function renderMatchingChallenge(challenge, space) {
  const assignments = {};
  const itemOrder = shuffledCopy(challenge.items);
  let selectedItem = null;
  space.innerHTML = `
    <ul class="logic-list">
      ${challenge.logic.map((clue) => `<li>${clue}</li>`).join("")}
    </ul>
    <div class="matching-board challenge-space">
      <div>
        <h3>Snacks</h3>
        <div class="item-bank" id="itemBank"></div>
      </div>
      <div>
        <h3>Containers</h3>
        <div class="container-list" id="containerList"></div>
      </div>
    </div>
  `;

  const itemBank = document.querySelector("#itemBank");
  const containerList = document.querySelector("#containerList");

  function renderItems() {
    itemBank.innerHTML = "";
    const placedItems = Object.values(assignments);
    itemOrder.filter((item) => !placedItems.includes(item)).forEach((item) => {
      const button = makeButton(item, "item-pill", () => {
        selectedItem = selectedItem === item ? null : item;
        renderItems();
      });
      button.draggable = true;
      button.dataset.item = item;
      if (selectedItem === item) button.classList.add("selected");
      button.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", item));
      itemBank.append(button);
    });
  }

  function renderContainers() {
    containerList.innerHTML = "";
    challenge.containers.forEach((container) => {
      const drop = document.createElement("button");
      drop.type = "button";
      drop.className = `container-drop ${assignments[container.id] ? "filled" : ""}`;
      drop.innerHTML = `<span class="drop-label">${container.label}</span>${assignments[container.id] || "Drop or tap here"}`;
      drop.addEventListener("click", () => {
        if (state.solvedCurrent) return;
        if (assignments[container.id]) {
          delete assignments[container.id];
        } else if (selectedItem) {
          assignments[container.id] = selectedItem;
          selectedItem = null;
        }
        renderItems();
        renderContainers();
      });
      drop.addEventListener("dragover", (event) => event.preventDefault());
      drop.addEventListener("drop", (event) => {
        event.preventDefault();
        const item = event.dataTransfer.getData("text/plain");
        if (!state.solvedCurrent && item) {
          assignments[container.id] = item;
          renderItems();
          renderContainers();
        }
      });
      containerList.append(drop);
    });
  }

  const checkButton = makeButton("Check Matches", "primary-button", () => {
    const complete = challenge.containers.every((container) => assignments[container.id]);
    const correct = challenge.containers.every((container) => assignments[container.id] === challenge.answer[container.id]);
    if (complete && correct) solveChallenge(challenge.success);
    else if (!complete) setFeedback("Every container needs one snack.", "error");
    else setFeedback("One container is mixed up. Use the clues and try again.", "error");
  });

  renderItems();
  renderContainers();
  document.querySelector("#navRow").append(checkButton);
}

// Challenge 3 interaction: clickable search objects
function renderObjectSearchChallenge(challenge, space) {
  const choiceOrder = shuffledCopy(challenge.choices);
  space.innerHTML = `
    <div class="object-grid">
      ${choiceOrder.map((choice) => `<button class="object-button" type="button">${choice}</button>`).join("")}
    </div>
  `;

  space.querySelectorAll(".object-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.solvedCurrent) return;
      if (button.textContent === challenge.target) solveChallenge(challenge.success, challenge.awardClue);
      else setFeedback(challenge.wrongFeedback, "error");
    });
  });
}

// Challenge 4 interaction: number pattern entry
function renderNumberPatternChallenge(challenge, space) {
  space.innerHTML = `
    <div class="number-pattern">
      ${challenge.pattern.map((num) => `<span class="number-card ${num === "?" ? "blank" : ""}">${num}</span>`).join("")}
    </div>
    <label for="patternAnswer"><strong>Missing number</strong></label><br>
    <input id="patternAnswer" class="answer-input" inputmode="numeric" autocomplete="off">
    <div class="button-row">
      <button class="primary-button" type="button" id="checkPattern">Check Answer</button>
    </div>
  `;

  document.querySelector("#checkPattern").addEventListener("click", () => {
    const answer = document.querySelector("#patternAnswer").value.trim();
    if (answer === challenge.answer) solveChallenge(challenge.success, challenge.awardClue);
    else setFeedback("The pattern changes by the same amount each step. Try again.", "error");
  });
}

// Challenge 5 interaction: click or drag tiles into sequence
function renderSequenceChallenge(challenge, space) {
  let answer = [];
  let bank = [...challenge.shuffled];
  space.innerHTML = `
    <div class="sequence-board">
      <div>
        <h3>Your announcement</h3>
        <div class="answer-bank" id="answerBank"></div>
      </div>
      <div>
        <h3>Phrase tiles</h3>
        <div class="word-bank" id="wordBank"></div>
      </div>
    </div>
  `;

  function draw() {
    const wordBank = document.querySelector("#wordBank");
    const answerBank = document.querySelector("#answerBank");
    wordBank.innerHTML = "";
    answerBank.innerHTML = "";

    if (answer.length === 0) {
      answerBank.innerHTML = '<p class="sequence-empty">Click a phrase below to begin.</p>';
    }

    answer.forEach((piece, index) => {
      const row = document.createElement("div");
      row.className = "sequence-item";
      row.draggable = true;
      row.innerHTML = `
        <span class="sequence-number">${index + 1}</span>
        <span class="sequence-text">${piece}</span>
        <div class="sequence-controls" aria-label="Move ${piece}">
          <button class="sequence-control" type="button" data-move="left" aria-label="Move ${piece} earlier" ${index === 0 ? "disabled" : ""}>&larr;</button>
          <button class="sequence-control" type="button" data-move="right" aria-label="Move ${piece} later" ${index === answer.length - 1 ? "disabled" : ""}>&rarr;</button>
          <button class="sequence-control remove" type="button" data-move="remove" aria-label="Return ${piece} to phrase tiles">&times;</button>
        </div>
      `;
      row.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", `answer:${index}`));
      row.querySelectorAll("[data-move]").forEach((button) => {
        button.addEventListener("click", () => {
          const action = button.dataset.move;
          if (action === "left" && index > 0) [answer[index - 1], answer[index]] = [answer[index], answer[index - 1]];
          if (action === "right" && index < answer.length - 1) [answer[index], answer[index + 1]] = [answer[index + 1], answer[index]];
          if (action === "remove") {
            bank.push(piece);
            answer.splice(index, 1);
          }
          draw();
        });
      });
      answerBank.append(row);
    });

    bank.forEach((piece, index) => {
      const tile = makeButton(piece, "word-tile", () => {
        if (answer.length < challenge.answer.length) {
          answer.push(piece);
          bank.splice(index, 1);
          draw();
        }
      });
      tile.draggable = true;
      tile.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", `bank:${index}`));
      wordBank.append(tile);
    });

    answerBank.addEventListener("dragover", (event) => event.preventDefault());
    answerBank.addEventListener("drop", (event) => {
      event.preventDefault();
      const [source, indexValue] = event.dataTransfer.getData("text/plain").split(":");
      const index = Number(indexValue);
      if (source === "bank" && Number.isInteger(index) && bank[index]) {
        answer.push(bank[index]);
        bank.splice(index, 1);
        draw();
      } else if (source === "answer" && Number.isInteger(index) && answer[index]) {
        const [piece] = answer.splice(index, 1);
        answer.push(piece);
        draw();
      }
    });
  }

  const checkButton = makeButton("Check Announcement", "primary-button", () => {
    const correct = challenge.answer.every((piece, index) => answer[index] === piece);
    if (answer.length !== challenge.answer.length) setFeedback("Use all four phrase tiles.", "error");
    else if (correct) solveChallenge(challenge.success);
    else setFeedback("The announcement sounds scrambled. Try a different order.", "error");
  });

  draw();
  document.querySelector("#navRow").append(checkButton);
}

// Challenge 6 interaction: locker deduction with optional elimination
function renderLockerChallenge(challenge, space) {
  space.innerHTML = `
    <ul class="logic-list">
      ${challenge.logic.map((clue) => `<li>${clue}</li>`).join("")}
    </ul>
    <div class="locker-grid challenge-space">
      ${challenge.lockers.map((locker) => `
        <div class="locker-card">
          <button class="locker-button" type="button" data-locker="${locker}">Locker ${locker}</button>
          <label class="eliminate-label">
            <input type="checkbox" data-eliminate="${locker}">
            Rule out
          </label>
        </div>
      `).join("")}
    </div>
  `;

  space.querySelectorAll("[data-locker]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.solvedCurrent) return;
      const locker = Number(button.dataset.locker);
      if (locker === challenge.answer) solveChallenge(challenge.success, challenge.awardClue);
      else setFeedback(challenge.wrongFeedback[String(locker)] || challenge.wrongFeedback.default, "error");
    });
  });

  space.querySelectorAll("[data-eliminate]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      checkbox.closest(".locker-card").classList.toggle("eliminated", checkbox.checked);
    });
  });
}

// Challenge 7 interaction: limited resource bag selection
function renderBagsChallenge(challenge, space) {
  const selected = [];
  space.innerHTML = `
    <div class="total-card">Selected total: <span id="bagTotal">0</span> lb</div>
    <div class="bag-grid challenge-space" id="bagGrid"></div>
    <div class="button-row">
      <button class="secondary-button" type="button" id="resetBags">Reset Bags</button>
      <button class="primary-button" type="button" id="checkBags">Check Total</button>
    </div>
  `;

  function drawBags() {
    const grid = document.querySelector("#bagGrid");
    const total = selected.reduce((sum, bag) => sum + bag, 0);
    document.querySelector("#bagTotal").textContent = total;
    grid.innerHTML = "";
    challenge.bags.forEach((bag) => {
      const isSelected = selected.includes(bag);
      const button = makeButton(`${bag} lb`, `bag-button ${isSelected ? "selected" : ""}`, () => {
        if (state.solvedCurrent) return;
        const index = selected.indexOf(bag);
        if (index >= 0) selected.splice(index, 1);
        else if (selected.length < challenge.maxBags) selected.push(bag);
        else setFeedback(`Only ${challenge.maxBags} bags can fit on the cart.`, "error");
        drawBags();
      });
      grid.append(button);
    });
  }

  document.querySelector("#resetBags").addEventListener("click", () => {
    selected.length = 0;
    setFeedback("Bags reset. Try another combination.", "");
    drawBags();
  });

  document.querySelector("#checkBags").addEventListener("click", () => {
    const total = selected.reduce((sum, bag) => sum + bag, 0);
    if (selected.length !== challenge.maxBags) {
      setFeedback(`Choose exactly ${challenge.maxBags} bags.`, "error");
    } else if (total === challenge.targetTotal) {
      solveChallenge(challenge.success);
    } else {
      setFeedback("That total is not exactly 50 pounds. Reset or swap a bag and try again.", "error");
    }
  });

  drawBags();
}

// Challenge 8 interaction: odd track visual reasoning
function renderOddFootprintChallenge(challenge, space) {
  space.innerHTML = `
    <div class="footprint-grid">
      ${challenge.choices.map((choice) => `
        <button class="choice-button footprint-card" type="button" data-choice="${choice.id}">
          <strong>Track ${choice.id}</strong>
          <span>${choice.label}</span>
        </button>
      `).join("")}
    </div>
  `;

  space.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.solvedCurrent) return;
      const choice = challenge.choices.find((item) => item.id === button.dataset.choice);
      if (choice.odd) solveChallenge(challenge.success, challenge.awardClue);
      else setFeedback(challenge.wrongFeedback, "error");
    });
  });
}

// Challenge 9 interaction: on/off light pattern
function renderLightPatternChallenge(challenge, space) {
  const optionOrder = shuffledCopy(challenge.options);
  if (optionOrder[0].correct) optionOrder.push(optionOrder.shift());

  space.innerHTML = `
    <h3>Pattern</h3>
    <div class="light-sequence">
      ${challenge.sequence.map((step, index) => lightStep(step, index + 1)).join("")}
    </div>
    <h3 class="challenge-space">What comes next?</h3>
    <div class="pattern-options">
      ${optionOrder.map((option, index) => `
        <button class="pattern-option" type="button" data-option="${index}">
          <strong>Option ${String.fromCharCode(65 + index)}</strong>
          ${bulbs(option.value)}
        </button>
      `).join("")}
    </div>
  `;

  space.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.solvedCurrent) return;
      const option = optionOrder[Number(button.dataset.option)];
      if (option.correct) solveChallenge(challenge.success);
      else setFeedback("Watch which light turns on next in the loop.", "error");
    });
  });
}

function lightStep(step, label) {
  return `<div class="light-step"><strong>${label}</strong>${bulbs(step)}</div>`;
}

function bulbs(pattern) {
  return `<span class="bulbs">${pattern.map((isOn) => `<span class="bulb ${isOn ? "on" : ""}"></span>`).join("")}</span>`;
}

// Challenge 10 interaction: final earned clue code
function renderFinalCodeChallenge(challenge, space) {
  let code = "";
  if (state.finalOrder.length === 0) {
    state.finalOrder = shuffledCopy(SNOWED_IN_GAME.finalOrder);
  }
  const finalCode = state.finalOrder.map((clueId) => SNOWED_IN_GAME.clues[clueId].value).join("");

  space.innerHTML = `
    <div class="final-icons">
      ${state.finalOrder.map((clueId) => {
        const clue = SNOWED_IN_GAME.clues[clueId];
        return `<div class="final-icon-card">${clue.label}</div>`;
      }).join("")}
    </div>
    <div class="code-display" id="finalCodeDisplay" aria-label="Entered final code">----</div>
    <div class="keypad" id="finalKeypad"></div>
  `;

  const keypad = document.querySelector("#finalKeypad");
  const display = document.querySelector("#finalCodeDisplay");
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Enter"].forEach((key) => {
    const button = makeButton(key, key.length === 1 ? "key-button" : "key-button utility", () => {
      if (state.solvedCurrent) return;
      if (key === "Clear") code = "";
      else if (key === "Enter") {
        if (code === finalCode) solveChallenge(challenge.success);
        else {
          setFeedback("The gate stays locked. Check the order of your collected clues.", "error");
          code = "";
        }
      } else if (code.length < 4) {
        code += key;
      }
      display.textContent = code.padEnd(4, "-");
    });
    keypad.append(button);
  });
}

function renderSuccess() {
  gameScreen.innerHTML = `
    <div class="snow-celebration" aria-hidden="true"></div>
    <div class="success-card">
      <div class="success-message">
        <h2>You did it!</h2>
        <p>The school gates are unlocked.</p>
      </div>
      <div class="plow-update">
        <h3>PLOW UPDATE</h3>
        <p>The snowplow has arrived.</p>
        <p><strong>The gates opened just in time. Now the crew can clear the school safely.</strong></p>
        <p>Total snowfall: 8 inches. Hot chocolate has officially been earned.</p>
      </div>
      <div class="button-row" style="justify-content: center;">
        <button class="primary-button" type="button" id="playAgain">Restart Game</button>
      </div>
    </div>
  `;
  document.querySelector("#playAgain").addEventListener("click", restartGame);
  launchSnowCelebration();
}

function launchSnowCelebration() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.querySelector(".snow-celebration");
  const snowflakes = ["❄", "❅", "❆"];
  const waveCount = 8;
  const flakesPerWave = 12;

  for (let wave = 0; wave < waveCount; wave += 1) {
    window.setTimeout(() => {
      if (!container.isConnected) return;

      for (let index = 0; index < flakesPerWave; index += 1) {
        const flake = document.createElement("span");
        flake.className = "celebration-flake";
        flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.fontSize = `${18 + Math.random() * 24}px`;
        flake.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
        flake.style.setProperty("--spin", `${360 + Math.random() * 720}deg`);
        flake.style.setProperty("--duration", `${3.5 + Math.random() * 1.8}s`);
        flake.style.setProperty("--delay", `${Math.random() * 0.3}s`);
        container.append(flake);
        window.setTimeout(() => flake.remove(), 6000);
      }
    }, wave * 320);
  }
}
