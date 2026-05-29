const gameSelect = document.querySelector("#game-select");
const copyLinkButton = document.querySelector("#copy-link");
const gameArea = document.querySelector("#game-area");
const message = document.querySelector("#message");
const gameCount = document.querySelector("#game-count");
const emptyTemplate = document.querySelector("#empty-template");

let games = [];
let currentGame = null;
let selectedTileIds = new Set();
let solvedGroupIndexes = [];
let remainingTiles = [];
let mistakes = 0;
let isGameOver = false;
let confettiTimeout = null;

const maxMistakes = 4;

function makeSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function makeDisplayTitle(title) {
  return title.replace(/\s+Game(\s+\d+)?$/, "$1").trim();
}

function normalizeValue(value) {
  return value.trim().replace(/\s+/g, " ").toUpperCase();
}

function parseGames(markdown) {
  const sections = markdown.split(/^## /gm).slice(1);

  return sections
    .map((section) => {
      const lines = section.split(/\r?\n/);
      const title = lines.shift().trim();
      const board = [];
      const groups = [];
      let mode = "";
      let currentGroup = null;

      lines.forEach((line) => {
        if (line.startsWith("### Mixed-Up Board")) {
          mode = "board";
          return;
        }

        if (/^### .*Answers/.test(line)) {
          mode = "answers";
          return;
        }

        if (line.startsWith("### ")) {
          mode = "";
          return;
        }

        if (mode === "board" && line.startsWith("|") && !line.includes(":----")) {
          const cells = line
            .split("|")
            .map((cell) => normalizeValue(cell))
            .filter(Boolean);

          if (cells.length === 4) {
            board.push(...cells);
          }
        }

        if (mode === "answers" && line.startsWith("#### ")) {
          currentGroup = { name: line.replace(/^#### /, "").trim(), words: [] };
          groups.push(currentGroup);
          return;
        }

        if (mode === "answers" && currentGroup && line.trim().startsWith("* ")) {
          currentGroup.words.push(normalizeValue(line.trim().replace(/^\* /, "")));
        }
      });

      return {
        title,
        displayTitle: makeDisplayTitle(title),
        slug: makeSlug(title),
        board,
        groups,
        issues: validateGame(title, board, groups),
      };
    })
    .filter((game) => game.board.length || game.groups.length)
    .sort((a, b) => a.title.localeCompare(b.title));
}

function validateGame(title, board, groups) {
  const issues = [];
  const boardCounts = countValues(board);
  const answerWords = groups.flatMap((group) => group.words);
  const answerCounts = countValues(answerWords);

  if (board.length !== 16) {
    issues.push(`${title} has ${board.length} board tiles.`);
  }

  if (groups.length !== 4 || groups.some((group) => group.words.length !== 4)) {
    issues.push(`${title} needs four answer groups with four words each.`);
  }

  Object.entries(answerCounts).forEach(([word, count]) => {
    if (!boardCounts[word]) {
      issues.push(`${word} is in the answers but not on the board.`);
    }

    if (boardCounts[word] && boardCounts[word] !== count) {
      issues.push(`${word} appears ${boardCounts[word]} time(s) on the board and ${count} time(s) in answers.`);
    }
  });

  Object.keys(boardCounts).forEach((word) => {
    if (!answerCounts[word]) {
      issues.push(`${word} is on the board but not in the answers.`);
    }
  });

  return issues;
}

function countValues(values) {
  return values.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function hydrateChooser() {
  const fragment = document.createDocumentFragment();

  games.forEach((game) => {
    const option = document.createElement("option");
    option.value = game.slug;
    option.textContent = game.displayTitle;
    fragment.append(option);
  });

  gameSelect.append(fragment);
  gameCount.textContent = `${games.length} games ready`;

  const slug = new URLSearchParams(window.location.search).get("game");
  const requestedGame = games.find((game) => game.slug === slug);

  if (requestedGame) {
    gameSelect.value = requestedGame.slug;
    startGame(requestedGame);
  } else {
    renderEmptyState();
  }
}

function startGame(game) {
  clearConfetti();
  currentGame = game;
  selectedTileIds = new Set();
  solvedGroupIndexes = [];
  remainingTiles = game.board.map((word, index) => ({ id: `${word}-${index}`, word }));
  mistakes = 0;
  isGameOver = false;
  copyLinkButton.disabled = false;
  updateUrl(game.slug);
  setMessage(game.issues.length ? game.issues[0] : "");
  renderGame();
}

function updateUrl(slug) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("game", slug);
  window.history.replaceState({}, "", nextUrl);
}

function buildShareUrl() {
  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set("game", currentGame.slug);
  return shareUrl.toString();
}

async function copyShareLink() {
  if (!currentGame) {
    return;
  }

  const url = buildShareUrl();

  try {
    await navigator.clipboard.writeText(url);
    setMessage("Student link copied.");
  } catch {
    setMessage(url);
  }
}

function renderEmptyState() {
  currentGame = null;
  copyLinkButton.disabled = true;
  gameArea.replaceChildren(emptyTemplate.content.cloneNode(true));
}

function renderGame() {
  const wrap = document.createElement("div");
  wrap.className = "game-board-wrap";

  wrap.innerHTML = `
    <div class="game-topline">
      <div class="game-title">
        <h2>${escapeHtml(currentGame.displayTitle)}</h2>
        <p>Select four tiles that belong together.</p>
      </div>
      <div class="mistakes" aria-label="${maxMistakes - mistakes} mistakes remaining">
        <span>Mistakes</span>
        ${Array.from({ length: maxMistakes })
          .map((_, index) => `<span class="dot ${index < mistakes ? "used" : ""}" aria-hidden="true"></span>`)
          .join("")}
      </div>
    </div>
    <div class="solved-list"></div>
    <div class="tile-grid" role="group" aria-label="GroupUp tiles"></div>
    <div class="controls">
      <button type="button" id="submit-guess" ${selectedTileIds.size !== 4 || isGameOver ? "disabled" : ""}>Submit</button>
      <button type="button" id="clear-selection" class="secondary" ${!selectedTileIds.size || isGameOver ? "disabled" : ""}>Clear</button>
      <button type="button" id="shuffle-board" class="secondary" ${isGameOver ? "disabled" : ""}>Shuffle</button>
      <button type="button" id="restart-game" class="secondary">Restart</button>
      <button type="button" id="reveal-answers" class="secondary">Answers</button>
    </div>
  `;

  const solvedList = wrap.querySelector(".solved-list");
  solvedGroupIndexes.forEach((groupIndex) => {
    solvedList.append(createSolvedGroup(currentGame.groups[groupIndex], groupIndex));
  });

  const grid = wrap.querySelector(".tile-grid");
  remainingTiles.forEach((tile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tile ${selectedTileIds.has(tile.id) ? "selected" : ""}`;
    button.textContent = tile.word;
    button.disabled = isGameOver;
    button.setAttribute("aria-pressed", selectedTileIds.has(tile.id) ? "true" : "false");
    button.addEventListener("click", () => toggleTile(tile.id));
    grid.append(button);
  });

  wrap.querySelector("#submit-guess").addEventListener("click", submitGuess);
  wrap.querySelector("#clear-selection").addEventListener("click", clearSelection);
  wrap.querySelector("#shuffle-board").addEventListener("click", shuffleRemainingTiles);
  wrap.querySelector("#restart-game").addEventListener("click", restartGame);
  wrap.querySelector("#reveal-answers").addEventListener("click", revealAnswers);

  if (isGameOver) {
    wrap.append(createAnswerPanel());
  }

  gameArea.replaceChildren(wrap);
}

function createSolvedGroup(group, groupIndex) {
  const element = document.createElement("div");
  element.className = `solved-group group-color-${groupIndex}`;
  element.innerHTML = `
    <div>
      <strong>${escapeHtml(group.name)}</strong>
      <span>${escapeHtml(group.words.join(", "))}</span>
    </div>
  `;
  return element;
}

function toggleTile(tileId) {
  if (selectedTileIds.has(tileId)) {
    selectedTileIds.delete(tileId);
  } else if (selectedTileIds.size < 4) {
    selectedTileIds.add(tileId);
  }

  renderGame();
}

function submitGuess() {
  const selectedWords = remainingTiles
    .filter((tile) => selectedTileIds.has(tile.id))
    .map((tile) => tile.word)
    .sort();

  const solvedIndex = currentGame.groups.findIndex((group, index) => {
    if (solvedGroupIndexes.includes(index)) {
      return false;
    }

    return sameWords(selectedWords, [...group.words].sort());
  });

  if (solvedIndex >= 0) {
    solvedGroupIndexes.push(solvedIndex);
    remainingTiles = remainingTiles.filter((tile) => !selectedTileIds.has(tile.id));
    selectedTileIds = new Set();
    setMessage(solvedGroupIndexes.length === 4 ? "You solved it." : "Nice group.");

    if (solvedGroupIndexes.length === 4) {
      isGameOver = true;
      if (mistakes === 0) {
        launchConfetti();
      }
    }
  } else {
    mistakes += 1;
    selectedTileIds = new Set();
    setMessage(maxMistakes - mistakes > 0 ? "Try another group." : "Answers revealed.");

    if (mistakes >= maxMistakes) {
      isGameOver = true;
    }
  }

  renderGame();
}

function sameWords(first, second) {
  return first.length === second.length && first.every((word, index) => word === second[index]);
}

function clearSelection() {
  selectedTileIds = new Set();
  renderGame();
}

function shuffleRemainingTiles() {
  selectedTileIds = new Set();
  remainingTiles = [...remainingTiles].sort(() => Math.random() - 0.5);
  renderGame();
}

function restartGame() {
  startGame(currentGame);
}

function launchConfetti() {
  clearConfetti();

  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.setAttribute("aria-hidden", "true");

  const colors = ["#b23b62", "#6f91a8", "#f5c84c", "#a7c957", "#83b5e1", "#b99ad6"];

  Array.from({ length: 90 }).forEach((_, index) => {
    const piece = document.createElement("span");
    piece.style.setProperty("--x", `${Math.random() * 100}vw`);
    piece.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    piece.style.setProperty("--delay", `${Math.random() * 0.45}s`);
    piece.style.setProperty("--duration", `${2.4 + Math.random() * 1.8}s`);
    piece.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
    piece.style.background = colors[index % colors.length];
    piece.style.borderRadius = index % 3 === 0 ? "50%" : "2px";
    confetti.append(piece);
  });

  document.body.append(confetti);
  confettiTimeout = window.setTimeout(clearConfetti, 5200);
}

function clearConfetti() {
  if (confettiTimeout) {
    window.clearTimeout(confettiTimeout);
    confettiTimeout = null;
  }

  document.querySelector(".confetti")?.remove();
}

function revealAnswers() {
  clearConfetti();
  isGameOver = true;
  selectedTileIds = new Set();
  setMessage("Answers revealed.");
  renderGame();
  requestAnimationFrame(() => {
    document.querySelector(".answer-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function createAnswerPanel() {
  const panel = document.createElement("div");
  panel.className = "answer-panel";
  panel.innerHTML = `
    <h3>Answer key</h3>
    <div class="answer-list">
      ${currentGame.groups
        .map(
          (group, index) => `
            <div class="answer-group group-color-${index}">
              <strong>${escapeHtml(group.name)}</strong>
              <span>${escapeHtml(group.words.join(", "))}</span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
  return panel;
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

gameSelect.addEventListener("change", () => {
  const game = games.find((entry) => entry.slug === gameSelect.value);

  if (game) {
    startGame(game);
  } else {
    renderEmptyState();
  }
});

copyLinkButton.addEventListener("click", copyShareLink);

fetch("groupuplist")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load the GroupUp list.");
    }

    return response.text();
  })
  .then((markdown) => {
    games = parseGames(markdown);
    hydrateChooser();
  })
  .catch(() => {
    gameCount.textContent = "Games unavailable";
    setMessage("The GroupUp list could not be loaded. Start this from a local web server or publish the folder online.", "error");
    renderEmptyState();
  });
