const ROUNDS = [
  {
    title: "AI Conference",
    shortName: "AI Conference",
    icon: "✨",
    color: "#6f4cc3",
    kind: "Three-Clue Reveal",
    prompt: "WHO AM I?",
    clueMode: "clues",
    clues: [
      "I happen in June.",
      "My sessions focus on one of the fastest-changing areas in education.",
      "You might leave with prompts, tools, strategies, and a much longer list of things you want to try.",
    ],
    reveal: {
      title: "AI Conference",
      details: ["June 2027"],
    },
  },
  {
    title: "Librarian Conference",
    shortName: "Librarian Conference",
    icon: "📚",
    color: "#00a7b5",
    kind: "Emoji Puzzle",
    prompt: "Name that learning opportunity.",
    clueMode: "emoji",
    emojis: ["📚", "+", "💻", "+", "💡", "+", "🌐"],
    reveal: {
      title: "Librarian Conference",
      details: ["June 2027"],
    },
  },
  {
    title: "Sys Admin",
    shortName: "Sys Admin",
    icon: "🖧",
    color: "#174778",
    kind: "Where + When",
    prompt: "What TCEA learning opportunity am I?",
    clueMode: "clues",
    clues: ["Georgetown", "November 4-6, 2026"],
    reveal: {
      title: "Sys Admin",
      details: ["November 4-6, 2026", "Georgetown"],
    },
  },
  {
    title: "TCEA Convention 2027",
    shortName: "Convention",
    icon: "🎉",
    color: "#ff6f61",
    kind: "Clue Combination",
    prompt: "Name that learning opportunity.",
    clueMode: "clues",
    clues: ["4 days", "San Antonio", "Thousands of educators"],
    reveal: {
      title: "TCEA Convention 2027",
      details: ["January 31-February 3, 2027", "San Antonio"],
    },
  },
  {
    title: "ETC",
    shortName: "ETC",
    icon: "🌊",
    color: "#0087c7",
    kind: "Destination Clue",
    prompt: "What learning opportunity is headed to the coast?",
    clueMode: "mixed",
    clues: [
      { type: "emoji", value: ["🌊", "🏖️"] },
      { type: "text", value: "Galveston" },
      { type: "text", value: "June 13-15, 2027" },
    ],
    reveal: {
      title: "ETC",
      details: ["June 13-15, 2027", "Galveston"],
    },
  },
  {
    title: "Pedagogy Showcase",
    shortName: "Pedagogy",
    icon: "🍎",
    color: "#87c540",
    kind: "Finish the Phrase",
    prompt: "Finish the phrase.",
    clueMode: "phrase",
    answerWord: "PEDAGOGY",
    reveal: {
      title: "Pedagogy Showcase",
      details: ["Fall 2026"],
    },
  },
  {
    title: "Courses and Certifications",
    shortName: "Courses",
    icon: "🎓",
    color: "#d93a96",
    kind: "What Am I?",
    prompt: "Name that learning opportunity.",
    clueMode: "clues",
    clues: [
      "I don't have just one start date.",
      "You choose what you want to learn.",
      "You can go deeper and build your expertise.",
    ],
    badgeClueIndex: 2,
    badges: [
      {
        src: "assets/badges/tech-apps-teks-6-8.png",
        alt: "TCEA Certified Educator Tech Apps TEKS 6-8 badge",
      },
      {
        src: "assets/badges/artificial-intelligence-educator.png",
        alt: "TCEA Certified Educator Artificial Intelligence Educator badge",
      },
      {
        src: "assets/badges/instructional-coach.png",
        alt: "TCEA Certified Educator Instructional Coach badge",
      },
    ],
    reveal: {
      title: "Courses & Certifications",
      details: [],
      note: "Learning that fits your goals and your schedule.",
      linkLabel: "EXPLORE COURSES",
      linkUrl: "https://tcea.org/courses/",
    },
  },
  {
    title: "TCEA TechNotes Blog",
    shortName: "Blog",
    icon: "📝",
    color: "#faa734",
    kind: "Idea Finder",
    prompt: "Where could you find ideas about ALL of these?",
    clueMode: "articles",
    articles: [
      { icon: "🤖", title: "AI", meta: "Prompts, tools, and classroom uses", color: "#6f4cc3" },
      { icon: "🧩", title: "Classroom Activities", meta: "Ready-to-use ideas", color: "#ff6f61" },
      { icon: "💻", title: "Ed Tech Tools", meta: "Apps, workflows, and resources", color: "#00a7b5" },
      { icon: "💡", title: "Teaching Strategies", meta: "Practical moves for learning", color: "#87c540" },
    ],
    reveal: {
      title: "TCEA TechNotes Blog",
      details: [],
      note: "Fresh ideas, resources, and classroom inspiration.",
      linkLabel: "VISIT THE BLOG",
      linkUrl: "https://blog.tcea.org/",
    },
  },
  {
    title: "Launch_K5",
    shortName: "Launch_K5",
    icon: "🚀",
    color: "#7b4dd6",
    kind: "Visual Equation",
    prompt: "Name that learning opportunity.",
    clueMode: "mixed",
    clues: [
      { type: "emoji", value: ["🧒", "+", "💻", "+", "🤖", "+", "🔧"] },
      { type: "text", value: "K-5" },
      { type: "text", value: "Computer Science" },
      { type: "text", value: "Hands-On Learning" },
    ],
    reveal: {
      title: "Launch_K5",
      details: ["October 20-21, 2026"],
      linkLabel: "LEARN MORE",
      linkUrl: "https://tcea.org/event/tcea-launch_k5-cs/",
    },
  },
];

const FINAL_GROUPS = [
  {
    title: "LEARN",
    color: "#00a7b5",
    items: ["Courses and Certifications", "TCEA Blog", "Pedagogy Showcase"],
  },
  {
    title: "CONNECT",
    color: "#ff6f61",
    items: ["AI Conference", "Librarian Conference", "Sys Admin", "ETC"],
  },
  {
    title: "GO BIG",
    color: "#6f4cc3",
    items: ["TCEA Convention", "Launch_K5"],
  },
];

const state = {
  screen: "home",
  roundIndex: 0,
  stepIndex: 0,
  revealed: false,
  completed: Array(ROUNDS.length).fill(false),
};

const screen = document.querySelector("#screen");
const progressChip = document.querySelector("#progressChip");
const homeButton = document.querySelector("#homeButton");
const confettiLayer = document.querySelector("#confettiLayer");

homeButton.addEventListener("click", restartGame);

function restartGame() {
  state.screen = "home";
  state.roundIndex = 0;
  state.stepIndex = 0;
  state.revealed = false;
  state.completed = Array(ROUNDS.length).fill(false);
  render();
}

function startGame() {
  state.screen = "round";
  state.roundIndex = 0;
  state.stepIndex = 0;
  state.revealed = false;
  render();
}

function advanceClue() {
  state.stepIndex += 1;
  render();
}

function revealAnswer() {
  state.revealed = true;
  state.completed[state.roundIndex] = true;
  render();
  burstConfetti();
}

function nextRound() {
  if (state.roundIndex >= ROUNDS.length - 1) {
    state.screen = "final";
    render();
    burstConfetti(42);
    fallConfetti();
    return;
  }

  state.roundIndex += 1;
  state.stepIndex = 0;
  state.revealed = false;
  render();
}

function render() {
  updateProgress();

  if (state.screen === "home") {
    renderHome();
    return;
  }

  if (state.screen === "final") {
    renderFinal();
    return;
  }

  renderRound();
}

function updateProgress() {
  const roundNumber = Math.min(state.roundIndex + 1, ROUNDS.length);
  if (state.screen === "final") {
    progressChip.textContent = "Complete";
    return;
  }

  progressChip.textContent = `Round ${roundNumber} of ${ROUNDS.length}`;
}

function renderHome() {
  screen.innerHTML = `
    <section class="home-screen" aria-labelledby="gameTitle">
      <div class="home-layout">
        <div class="home-copy">
          <p class="eyebrow">Fast Webinar Game</p>
          <h1 id="gameTitle">Name That Learning Opportunity</h1>
          <p class="intro">Can you identify all 9 ways to learn with TCEA?</p>
          <button class="primary-button start-button" type="button" id="startButton">
            START GAME
          </button>
        </div>
        ${renderBoard("Mystery Board", "All nine answers are waiting.", "large")}
      </div>
    </section>
  `;

  document.querySelector("#startButton").addEventListener("click", startGame);
  homeButton.classList.add("is-hidden");
}

function renderRound() {
  const round = ROUNDS[state.roundIndex];
  const clueHtml = state.revealed ? renderAnswer(round) : renderClue(round);
  const actionsHtml = renderActions(round);

  screen.innerHTML = `
    <section class="game-screen" aria-labelledby="roundTitle">
      <div class="game-layout">
        <article class="round-card">
          <div class="round-header">
            <div>
              <p class="round-kind">${round.kind}</p>
              <h2 class="prompt" id="roundTitle">${state.revealed ? "Answer Revealed!" : round.prompt}</h2>
            </div>
            <span class="round-badge">Round ${state.roundIndex + 1}</span>
          </div>
          <div class="clue-stage">
            ${clueHtml}
          </div>
          <div class="round-actions">
            ${actionsHtml}
          </div>
        </article>
        <aside class="side-board" aria-label="Mystery board progress">
          ${renderBoard("Mystery Board", "Unlocked answers pop in here.", "compact")}
        </aside>
      </div>
    </section>
  `;

  bindRoundActions();
  homeButton.classList.remove("is-hidden");
}

function renderClue(round) {
  if (round.clueMode === "emoji") {
    return `
      <div class="clue-content">
        <div class="emoji-puzzle" aria-label="${round.emojis.join(" ")}">
          ${round.emojis.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </div>
    `;
  }

  if (round.clueMode === "mixed") {
    return renderMixedClues(round);
  }

  if (round.clueMode === "phrase") {
    const showWord = state.stepIndex > 0;
    return `
      <div class="clue-content">
        <div class="phrase-card">
          <p class="phrase-text">
            Great technology is only as powerful as great
            <span class="missing-word">${showWord ? round.answerWord : "_________"}</span>.
          </p>
        </div>
      </div>
    `;
  }

  if (round.clueMode === "choice") {
    return `
      <div class="clue-content">
        <div class="choice-grid">
          ${round.choices.map((choice) => `
            <div class="choice-card" style="--accent: ${choice.color}">
              <span class="choice-letter">${choice.label}</span>
              <p class="choice-text">${choice.text}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (round.clueMode === "articles") {
    return `
      <div class="clue-content">
        <div class="article-grid">
          ${round.articles.map((article) => `
            <div class="article-card" style="--accent: ${article.color}">
              <span class="article-icon" aria-hidden="true">${article.icon}</span>
              <p class="article-title">${article.title}</p>
              <p class="article-meta">${article.meta}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  const visibleClues = round.clues.slice(0, state.stepIndex + 1);
  return `
    <div class="clue-content">
      <div class="clue-list">
        ${visibleClues.map((clue, index) => renderCluePill(round, clue, index)).join("")}
      </div>
    </div>
  `;
}

function renderCluePill(round, clue, index) {
  const hasBadges = round.badges && round.badgeClueIndex === index;

  return `
    <div class="clue-pill${hasBadges ? " clue-pill-with-badges" : ""}">
      <span>${clue}</span>
      ${hasBadges ? `
        <span class="badge-clue-strip" aria-label="TCEA certification badge examples">
          ${round.badges.map((badge) => `
            <img src="${badge.src}" alt="${badge.alt}">
          `).join("")}
        </span>
      ` : ""}
    </div>
  `;
}

function renderMixedClues(round) {
  const visibleClues = round.clues.slice(0, state.stepIndex + 1);

  return `
    <div class="clue-content">
      <div class="clue-list">
        ${visibleClues.map((clue) => {
          if (clue.type === "emoji") {
            return `
              <div class="visual-equation" aria-label="${clue.value.join(" ")}">
                ${clue.value.map((item) => `<span>${item}</span>`).join("")}
              </div>
            `;
          }

          return `<div class="info-pill">${clue.value}</div>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderAnswer(round) {
  const { reveal } = round;
  return `
    <div class="clue-content">
      <div class="answer-card" style="--answer-color: ${round.color}">
        <span class="answer-icon" aria-hidden="true">${round.icon}</span>
        <h2 class="answer-title">${reveal.title}</h2>
        ${reveal.details.map((detail) => `<p class="answer-detail">${detail}</p>`).join("")}
        ${reveal.note ? `<p class="answer-note">${reveal.note}</p>` : ""}
        ${reveal.linkUrl ? `
          <div class="answer-actions">
            <a class="link-button" href="${reveal.linkUrl}" target="_blank" rel="noopener noreferrer">
              ${reveal.linkLabel}
            </a>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function renderActions(round) {
  if (state.revealed) {
    const label = state.roundIndex === ROUNDS.length - 1 ? "FINAL SCREEN" : "NEXT ROUND";
    return `<button class="primary-button" type="button" id="nextRoundButton">${label}</button>`;
  }

  const clueCount = getClueCount(round);
  const hasMoreClues = state.stepIndex < clueCount - 1;

  if (round.clueMode === "phrase" && state.stepIndex === 0) {
    return `<button class="secondary-button" type="button" id="nextClueButton">REVEAL WORD</button>`;
  }

  if (hasMoreClues) {
    return `<button class="secondary-button" type="button" id="nextClueButton">NEXT CLUE</button>`;
  }

  return `<button class="primary-button" type="button" id="revealButton">REVEAL</button>`;
}

function bindRoundActions() {
  const nextClueButton = document.querySelector("#nextClueButton");
  const revealButton = document.querySelector("#revealButton");
  const nextRoundButton = document.querySelector("#nextRoundButton");

  if (nextClueButton) {
    nextClueButton.addEventListener("click", advanceClue);
  }

  if (revealButton) {
    revealButton.addEventListener("click", revealAnswer);
  }

  if (nextRoundButton) {
    nextRoundButton.addEventListener("click", nextRound);
  }
}

function getClueCount(round) {
  if (round.clueMode === "emoji" || round.clueMode === "choice" || round.clueMode === "articles") {
    return 1;
  }

  if (round.clueMode === "phrase") {
    return 2;
  }

  return round.clues.length;
}

function renderBoard(title, subtitle, density) {
  return `
    <div class="board-panel board-${density}">
      <div class="board-label">
        <span>${title}</span>
        <span>${subtitle}</span>
      </div>
      <div class="mystery-board">
        ${ROUNDS.map((round, index) => renderTile(round, index)).join("")}
      </div>
    </div>
  `;
}

function renderTile(round, index) {
  const isComplete = state.completed[index];
  const style = `--tile-color: ${round.color}; --tile-index: ${index}`;

  if (!isComplete) {
    return `
      <div class="mystery-tile" data-number="${index + 1}" style="${style}">
        <span class="mystery-mark">?</span>
      </div>
    `;
  }

  return `
    <div class="mystery-tile tile-complete" data-number="${index + 1}" style="${style}">
      <span class="tile-content">
        <span class="tile-icon" aria-hidden="true">${round.icon}</span>
        <span class="tile-name">${round.shortName}</span>
      </span>
    </div>
  `;
}

function renderFinal() {
  state.completed = Array(ROUNDS.length).fill(true);

  screen.innerHTML = `
    <section class="final-screen" aria-labelledby="finalTitle">
      <div class="final-card">
        <div class="final-heading">
          <h2 id="finalTitle">You Named Them All!</h2>
          <p>Which One Is Calling Your Name?</p>
        </div>

        <div class="final-board" aria-label="All nine learning opportunities">
          ${ROUNDS.map((round, index) => renderTile(round, index)).join("")}
        </div>

        <div class="final-groups">
          ${FINAL_GROUPS.map((group) => `
            <section class="group-card" style="--accent: ${group.color}">
              <h3>${group.title}</h3>
              <ul>
                ${group.items.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </section>
          `).join("")}
        </div>

        <p class="final-message">There is more than one way to learn with TCEA.</p>

        <div class="final-actions">
          <button class="primary-button start-button" type="button" id="playAgainButton">
            PLAY AGAIN
          </button>
        </div>
      </div>
    </section>
  `;

  document.querySelector("#playAgainButton").addEventListener("click", restartGame);
  homeButton.classList.remove("is-hidden");
}

function burstConfetti(count = 28) {
  confettiLayer.innerHTML = "";
  const colors = ["#174778", "#faa734", "#00a7b5", "#ff6f61", "#87c540", "#6f4cc3", "#d93a96"];

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    const angle = (Math.PI * 2 * index) / count;
    const distance = 130 + Math.random() * 170;
    const x = `${Math.cos(angle) * distance}px`;
    const y = `${Math.sin(angle) * distance - 90}px`;
    const rotation = `${Math.random() * 640 - 320}deg`;

    piece.className = "confetti-piece";
    piece.style.setProperty("--x", x);
    piece.style.setProperty("--y", y);
    piece.style.setProperty("--rotation", rotation);
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    piece.style.left = `${46 + Math.random() * 8}%`;
    piece.style.top = `${48 + Math.random() * 8}%`;
    confettiLayer.appendChild(piece);
  }

  window.setTimeout(() => {
    confettiLayer.querySelectorAll(".confetti-piece:not(.is-falling)").forEach((piece) => piece.remove());
  }, 950);
}

function fallConfetti(count = 96) {
  window.setTimeout(() => {
    confettiLayer.innerHTML = "";
    const colors = ["#174778", "#faa734", "#00a7b5", "#ff6f61", "#87c540", "#6f4cc3", "#d93a96"];

    for (let index = 0; index < count; index += 1) {
      const piece = document.createElement("span");
      const width = 8 + Math.random() * 8;
      const height = 12 + Math.random() * 12;

      piece.className = "confetti-piece is-falling";
      piece.style.setProperty("--start-x", `${Math.random() * 100}vw`);
      piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      piece.style.setProperty("--rotation", `${Math.random() * 900 - 450}deg`);
      piece.style.setProperty("--fall-duration", `${2.4 + Math.random() * 1.8}s`);
      piece.style.setProperty("--fall-delay", `${Math.random() * 0.95}s`);
      piece.style.setProperty("--piece-width", `${width}px`);
      piece.style.setProperty("--piece-height", `${height}px`);
      piece.style.setProperty("--confetti-color", colors[index % colors.length]);
      confettiLayer.appendChild(piece);
    }

    window.setTimeout(() => {
      confettiLayer.innerHTML = "";
    }, 5600);
  }, 280);
}

render();
