const events = [
  {
    id: "born",
    year: "1946",
    title: "Dolly Parton is born",
    text: "Dolly Parton is born in Tennessee.",
    icon: "★",
    fact:
      "Dolly Rebecca Parton was born on January 19, 1946, in Sevier County, Tennessee. She grew up in a large family and was the fourth of 12 children. Music was an important part of her childhood, and she began singing and performing when she was very young.",
    hiddenFact:
      "Dolly Rebecca Parton was born on January 19 in Sevier County, Tennessee. She grew up in a large family and was the fourth of 12 children. Music was an important part of her childhood, and she began singing and performing when she was very young.",
  },
  {
    id: "opry-debut",
    year: "1959",
    title: "Grand Ole Opry debut",
    text: "At age 13, Dolly performs at the Grand Ole Opry.",
    icon: "♪",
    fact:
      "At just 13 years old, Dolly performed at the Grand Ole Opry in Nashville. Johnny Cash introduced her to the audience. Her performance received such an enthusiastic response that she was called back for several encores.",
    hiddenFact:
      "At just 13 years old, Dolly performed at the Grand Ole Opry in Nashville. Johnny Cash introduced her to the audience. Her performance received such an enthusiastic response that she was called back for several encores.",
  },
  {
    id: "nashville",
    year: "1964",
    title: "Moves to Nashville",
    text: "The day after graduating from high school, Dolly moves to Nashville to pursue a music career.",
    icon: "↗",
    fact:
      "Dolly graduated from Sevier County High School in 1964. The very next day, she moved to Nashville to pursue her dream of becoming a professional songwriter and performer.",
    hiddenFact:
      "Dolly graduated from Sevier County High School and moved to Nashville the very next day. She wanted to pursue her dream of becoming a professional songwriter and performer.",
  },
  {
    id: "porter",
    year: "1967",
    title: "The Porter Wagoner Show",
    text: "Dolly joins The Porter Wagoner Show.",
    icon: "▣",
    fact:
      "Dolly joined The Porter Wagoner Show, a popular country music television program. Performing with Porter Wagoner introduced Dolly to audiences across the country and helped her career grow.",
    hiddenFact:
      "Dolly joined The Porter Wagoner Show, a popular country music television program. Performing with Porter Wagoner introduced Dolly to audiences across the country and helped her career grow.",
  },
  {
    id: "opry-member",
    year: "1969",
    title: "Grand Ole Opry member",
    text: "Dolly becomes a member of the Grand Ole Opry.",
    icon: "✦",
    fact:
      "Dolly became an official member of the Grand Ole Opry in 1969. Becoming an Opry member was an important milestone for the young performer who had first appeared on its stage when she was only 13.",
    hiddenFact:
      "Dolly became an official member of the Grand Ole Opry. Becoming an Opry member was an important milestone for the young performer who had first appeared on its stage when she was only 13.",
  },
  {
    id: "always-love-you",
    year: "1974",
    title: "I Will Always Love You",
    text: "I Will Always Love You becomes a major hit.",
    icon: "♫",
    fact:
      "Dolly wrote I Will Always Love You as she prepared to end her professional partnership with Porter Wagoner and begin the next stage of her career. The song reached number one on the country music chart.",
    hiddenFact:
      "Dolly wrote I Will Always Love You as she prepared to end her professional partnership with Porter Wagoner and begin the next stage of her career. The song reached number one on the country music chart.",
  },
  {
    id: "nine-to-five",
    year: "1980",
    title: "9 to 5",
    text: "Dolly stars in the movie 9 to 5.",
    icon: "▶",
    fact:
      "Dolly made her major movie debut in 9 to 5 alongside Jane Fonda and Lily Tomlin. She also wrote and performed the movie's title song, which became one of her most recognizable hits.",
    hiddenFact:
      "Dolly made her major movie debut in 9 to 5 alongside Jane Fonda and Lily Tomlin. She also wrote and performed the movie's title song, which became one of her most recognizable hits.",
  },
  {
    id: "dollywood",
    year: "1986",
    title: "Dollywood opens",
    text: "Dollywood opens in Tennessee.",
    icon: "◆",
    fact:
      "Dolly became part owner of a theme park near her hometown in East Tennessee. It reopened as Dollywood in 1986. The park helped create jobs and bring visitors to the Smoky Mountains region where Dolly grew up.",
    hiddenFact:
      "Dolly became part owner of a theme park near her hometown in East Tennessee. It reopened as Dollywood and helped create jobs and bring visitors to the Smoky Mountains region where Dolly grew up.",
  },
  {
    id: "imagination-library",
    year: "1995",
    title: "Imagination Library begins",
    text: "Dolly starts the Imagination Library.",
    icon: "▤",
    fact:
      "Dolly created the Imagination Library in her home county in Tennessee. The program mails free books to young children from birth until they begin school. It later expanded far beyond Tennessee.",
    hiddenFact:
      "Dolly created the Imagination Library in her home county in Tennessee. The program mails free books to young children from birth until they begin school. It later expanded far beyond Tennessee.",
  },
  {
    id: "books",
    year: "2018",
    title: "100 million books",
    text: "The Imagination Library gives away its 100 millionth book.",
    icon: "▥",
    fact:
      "Dolly Parton's Imagination Library celebrated the delivery of its 100 millionth book in 2018. Dolly presented a special copy of the milestone book to the Library of Congress.",
    hiddenFact:
      "Dolly Parton's Imagination Library celebrated the delivery of its 100 millionth book. Dolly presented a special copy of the milestone book to the Library of Congress.",
  },
];

const timelineList = document.querySelector("#timeline-list");
const message = document.querySelector("#message");
const checkButton = document.querySelector("#check-button");
const tryAgainButton = document.querySelector("#try-again-button");
const resetButton = document.querySelector("#reset-button");
const hideYearsToggle = document.querySelector("#hide-years-toggle");
const completionPanel = document.querySelector("#completion-panel");
const dateChallengeButton = document.querySelector("#date-challenge-button");
const dateChallenge = document.querySelector("#date-challenge");
const yearBank = document.querySelector("#year-bank");
const matchList = document.querySelector("#match-list");
const checkMatchesButton = document.querySelector("#check-matches-button");
const clearMatchesButton = document.querySelector("#clear-matches-button");
const modal = document.querySelector("#fact-modal");
const factTitle = document.querySelector("#fact-title");
const factYear = document.querySelector("#fact-year");
const factBody = document.querySelector("#fact-body");
const closeFactButton = document.querySelector("#close-fact-button");
const gotItButton = document.querySelector("#got-it-button");
const canvas = document.querySelector("#confetti-canvas");
const ctx = canvas.getContext("2d");

let orderedIds = [];
let firstFactsShown = new Set();
let completed = false;
let draggedId = null;
let selectedYear = null;
let dateMatches = {};
let lastFocus = null;

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function eventById(id) {
  return events.find((event) => event.id === id);
}

function setMessage(text) {
  message.textContent = text;
}

function renderTimeline(statuses = {}) {
  timelineList.innerHTML = "";

  orderedIds.forEach((id, index) => {
    const event = eventById(id);
    const item = document.createElement("li");
    item.className = "timeline-card";
    item.dataset.id = id;
    item.draggable = !completed;
    if (statuses[id]) item.classList.add(statuses[id]);

    const statusMark = statuses[id] === "correct" ? "✓" : statuses[id] === "incorrect" ? "↕" : "";
    const yearMarkup = completed ? `<span class="card-year">${event.year}</span>` : "";

    item.innerHTML = `
      <span class="card-icon" aria-hidden="true">${event.icon}</span>
      <span class="card-copy">
        <strong>${index + 1}. ${event.text}</strong>
        ${completed ? `<span>${event.title}</span>` : ""}
        ${yearMarkup}
      </span>
      <span class="card-actions">
        <button class="move-button" type="button" data-move="up" aria-label="Move ${event.title} up" ${index === 0 || completed ? "disabled" : ""}>↑</button>
        <button class="move-button" type="button" data-move="down" aria-label="Move ${event.title} down" ${index === orderedIds.length - 1 || completed ? "disabled" : ""}>↓</button>
        <button class="fact-button" type="button" data-fact aria-label="Open Dolly Fact for ${event.title}">?</button>
        <span class="status-mark" aria-hidden="true">${statusMark}</span>
      </span>
    `;

    timelineList.append(item);
  });
}

function resetGame() {
  orderedIds = shuffle(events).map((event) => event.id);
  firstFactsShown = new Set();
  completed = false;
  selectedYear = null;
  dateMatches = {};
  completionPanel.hidden = true;
  dateChallenge.hidden = true;
  checkButton.disabled = false;
  tryAgainButton.disabled = false;
  renderTimeline();
  renderDateChallenge();
  setMessage("Drag, tap, or use the arrow buttons to arrange the cards from earliest to latest.");
}

function moveCard(id, direction) {
  if (completed) return;
  const currentIndex = orderedIds.indexOf(id);
  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= orderedIds.length) return;
  [orderedIds[currentIndex], orderedIds[nextIndex]] = [orderedIds[nextIndex], orderedIds[currentIndex]];
  renderTimeline();
  maybeShowFirstFact(id);
  const movedButton = timelineList.querySelector(`[data-id="${id}"] [data-move="${direction < 0 ? "up" : "down"}"]`);
  if (movedButton) movedButton.focus();
}

function maybeShowFirstFact(id) {
  if (firstFactsShown.has(id)) return;
  firstFactsShown.add(id);
  showFact(id);
}

function showFact(id) {
  const event = eventById(id);
  lastFocus = document.activeElement;
  factTitle.textContent = event.title;
  factYear.textContent = hideYearsToggle.checked && !completed ? "Year hidden for now" : event.year;
  factBody.textContent = hideYearsToggle.checked && !completed ? event.hiddenFact : event.fact;
  modal.hidden = false;
  gotItButton.focus();
}

function closeFact() {
  modal.hidden = true;
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

function checkTimeline() {
  const statuses = {};
  let allCorrect = true;

  orderedIds.forEach((id, index) => {
    const expectedId = events[index].id;
    const correct = id === expectedId;
    statuses[id] = correct ? "correct" : "incorrect";
    if (!correct) allCorrect = false;
  });

  if (allCorrect) {
    completed = true;
    orderedIds = events.map((event) => event.id);
    renderTimeline(Object.fromEntries(events.map((event) => [event.id, "correct"])));
    completionPanel.hidden = false;
    checkButton.disabled = true;
    tryAgainButton.disabled = true;
    setMessage("Beautiful work. The years are revealed, and the Date Challenge is ready.");
    launchConfettiBursts(7);
  } else {
    renderTimeline(statuses);
    setMessage("Some cards are in the right spot and some need to move. Keep thinking from earliest to latest.");
  }
}

function renderDateChallenge() {
  yearBank.innerHTML = "";
  matchList.innerHTML = "";
  const years = shuffle(events.map((event) => event.year));

  years.forEach((year) => {
    const button = document.createElement("button");
    button.className = "year-chip";
    button.type = "button";
    button.textContent = year;
    button.dataset.year = year;
    button.addEventListener("click", () => {
      selectedYear = year;
      updateYearButtons();
    });
    yearBank.append(button);
  });

  events.forEach((event) => {
    const row = document.createElement("div");
    row.className = "match-row";
    row.dataset.id = event.id;
    row.innerHTML = `
      <div class="match-event">
        <strong>${event.title}</strong>
        <p>${event.text}</p>
      </div>
      <button type="button" data-match="${event.id}">Choose Year</button>
    `;
    matchList.append(row);
  });

  updateDateMatches();
}

function updateYearButtons() {
  yearBank.querySelectorAll(".year-chip").forEach((button) => {
    const used = Object.values(dateMatches).includes(button.dataset.year);
    button.classList.toggle("selected", button.dataset.year === selectedYear);
    button.classList.toggle("used", used);
    button.disabled = used && button.dataset.year !== selectedYear;
  });
}

function updateDateMatches(statuses = {}) {
  matchList.querySelectorAll(".match-row").forEach((row) => {
    const id = row.dataset.id;
    const button = row.querySelector("[data-match]");
    row.classList.remove("correct", "incorrect");
    if (statuses[id]) row.classList.add(statuses[id]);
    button.textContent = dateMatches[id] || "Choose Year";
  });
  updateYearButtons();
}

function checkDateMatches() {
  const statuses = {};
  let allMatched = true;
  let allCorrect = true;

  events.forEach((event) => {
    if (!dateMatches[event.id]) {
      allMatched = false;
      allCorrect = false;
      statuses[event.id] = "incorrect";
    } else if (dateMatches[event.id] === event.year) {
      statuses[event.id] = "correct";
    } else {
      allCorrect = false;
      statuses[event.id] = "incorrect";
    }
  });

  updateDateMatches(statuses);
  if (allCorrect) {
    setMessage("Date Challenge complete. Every year matches the right Dolly moment.");
    launchConfettiBursts(7);
  } else if (!allMatched) {
    setMessage("Add a year to every event, then check your matches again.");
  } else {
    setMessage("A few dates need another look. Use the revealed timeline above to help.");
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function launchConfettiBursts(count) {
  let bursts = 0;
  const interval = window.setInterval(() => {
    bursts += 1;
    createConfettiBurst();
    if (bursts >= count) window.clearInterval(interval);
  }, 420);
}

function createConfettiBurst() {
  const pieces = Array.from({ length: 72 }, () => ({
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 160,
    y: window.innerHeight * 0.24 + (Math.random() - 0.5) * 60,
    size: 6 + Math.random() * 8,
    color: ["#d73f86", "#0f8d91", "#f6b939", "#7f69c8", "#ffffff"][Math.floor(Math.random() * 5)],
    vx: (Math.random() - 0.5) * 8,
    vy: -5 - Math.random() * 5,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.28,
    life: 84,
  }));

  function frame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pieces.forEach((piece) => {
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vy += 0.18;
      piece.rotation += piece.spin;
      piece.life -= 1;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.globalAlpha = Math.max(piece.life / 84, 0);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
      ctx.restore();
    });

    if (pieces.some((piece) => piece.life > 0)) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  frame();
}

timelineList.addEventListener("click", (event) => {
  const card = event.target.closest(".timeline-card");
  if (!card) return;
  const id = card.dataset.id;
  const move = event.target.dataset.move;

  if (event.target.matches("[data-fact]")) {
    showFact(id);
    return;
  }

  if (move === "up") moveCard(id, -1);
  if (move === "down") moveCard(id, 1);
});

timelineList.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".timeline-card");
  if (!card || completed) return;
  draggedId = card.dataset.id;
  card.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedId);
});

timelineList.addEventListener("dragend", (event) => {
  const card = event.target.closest(".timeline-card");
  if (card) card.classList.remove("is-dragging");
  timelineList.querySelectorAll(".is-over").forEach((item) => item.classList.remove("is-over"));
});

timelineList.addEventListener("dragover", (event) => {
  const card = event.target.closest(".timeline-card");
  if (!card || completed) return;
  event.preventDefault();
  timelineList.querySelectorAll(".is-over").forEach((item) => item.classList.remove("is-over"));
  card.classList.add("is-over");
});

timelineList.addEventListener("drop", (event) => {
  const card = event.target.closest(".timeline-card");
  if (!card || completed) return;
  event.preventDefault();
  card.classList.remove("is-over");
  const targetId = card.dataset.id;
  const sourceId = event.dataTransfer.getData("text/plain") || draggedId;
  if (!sourceId || sourceId === targetId) return;

  const sourceIndex = orderedIds.indexOf(sourceId);
  const targetIndex = orderedIds.indexOf(targetId);
  orderedIds.splice(sourceIndex, 1);
  orderedIds.splice(targetIndex, 0, sourceId);
  renderTimeline();
  maybeShowFirstFact(sourceId);
});

matchList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-match]");
  if (!button || !selectedYear) return;
  const existingEventForYear = Object.entries(dateMatches).find(([, year]) => year === selectedYear);
  if (existingEventForYear) delete dateMatches[existingEventForYear[0]];
  dateMatches[button.dataset.match] = selectedYear;
  selectedYear = null;
  updateDateMatches();
});

dateChallengeButton.addEventListener("click", () => {
  dateChallenge.hidden = false;
  dateChallenge.scrollIntoView({ behavior: "smooth", block: "start" });
});

checkButton.addEventListener("click", checkTimeline);
tryAgainButton.addEventListener("click", () => {
  renderTimeline();
  setMessage("Keep going. The cards are ready for another check when you are.");
});
resetButton.addEventListener("click", resetGame);
checkMatchesButton.addEventListener("click", checkDateMatches);
clearMatchesButton.addEventListener("click", () => {
  selectedYear = null;
  dateMatches = {};
  updateDateMatches();
  setMessage("Date matches cleared. Pick a year card, then choose its event.");
});
hideYearsToggle.addEventListener("change", () => {
  if (!modal.hidden) {
    const openTitle = factTitle.textContent;
    const event = events.find((item) => item.title === openTitle);
    if (event) {
      factYear.textContent = hideYearsToggle.checked && !completed ? "Year hidden for now" : event.year;
      factBody.textContent = hideYearsToggle.checked && !completed ? event.hiddenFact : event.fact;
    }
  }
});
closeFactButton.addEventListener("click", closeFact);
gotItButton.addEventListener("click", closeFact);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeFact();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeFact();
});
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
resetGame();
