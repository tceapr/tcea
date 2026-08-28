const events = [
  {
    id: "born",
    year: "1946",
    title: "Dolly Parton is born",
    text: "Dolly Parton is born in Tennessee.",
    icon: "🎂",
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
    icon: "🎤",
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
    icon: "🧳",
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
    icon: "📺",
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
    icon: "⭐",
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
    icon: "🎵",
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
    icon: "🎬",
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
    icon: "🎡",
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
    icon: "📖",
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
    icon: "📚",
    fact:
      "Dolly Parton's Imagination Library celebrated the delivery of its 100 millionth book in 2018. Dolly presented a special copy of the milestone book to the Library of Congress.",
    hiddenFact:
      "Dolly Parton's Imagination Library celebrated the delivery of its 100 millionth book. Dolly presented a special copy of the milestone book to the Library of Congress.",
  },
  {
    id: "passing",
    year: "2026",
    title: "Dolly Parton is remembered",
    text: "Dolly Parton passed away and was honored internationally.",
    icon: "🕯️",
    fact:
      "Dolly Parton passed away on August 25, 2026. She was honored internationally after her death, with tributes appearing around the world. Landmarks were lit in pink and fans created memorials. Musicians, world leaders, and fans remembered not only her music, but also her generosity, humor, and lifelong impact on children through the Imagination Library.",
    hiddenFact:
      "Dolly Parton passed away on August 25. She was honored internationally after her death, with tributes appearing around the world. Landmarks were lit in pink and fans created memorials. Musicians, world leaders, and fans remembered not only her music, but also her generosity, humor, and lifelong impact on children through the Imagination Library.",
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
let dateMatches = {};
let lastFocus = null;
let glitterPieces = [];
let glitterFlashes = [];
let glitterAnimation = null;

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

function isTimelineInOrder() {
  return orderedIds.every((id, index) => id === events[index].id);
}

function completeTimeline() {
  if (completed) return;
  completed = true;
  orderedIds = events.map((event) => event.id);
  renderTimeline(Object.fromEntries(events.map((event) => [event.id, "correct"])));
  completionPanel.hidden = false;
  checkButton.disabled = true;
  tryAgainButton.disabled = true;
  setMessage("Beautiful work. The years are revealed, and the Date Challenge is ready.");
  launchPinkGlitterBursts(7);
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
  if (isTimelineInOrder()) {
    completeTimeline();
    return;
  }
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
    completeTimeline();
  } else {
    renderTimeline(statuses);
    setMessage("Some cards are in the right spot and some need to move. Keep thinking from earliest to latest.");
  }
}

function renderDateChallenge() {
  matchList.innerHTML = "";
  const years = shuffle(events.map((event) => event.year));

  events.forEach((event) => {
    const row = document.createElement("div");
    row.className = "match-row";
    row.dataset.id = event.id;
    const options = years.map((year) => `<option value="${year}">${year}</option>`).join("");
    row.innerHTML = `
      <div class="match-event">
        <strong>${event.title}</strong>
        <p>${event.text}</p>
      </div>
      <label>
        <span class="sr-only">Choose a year for ${event.title}</span>
        <select data-match="${event.id}">
          <option value="">Choose year</option>
          ${options}
        </select>
      </label>
    `;
    matchList.append(row);
  });

  updateDateMatches();
}

function updateDateMatches(statuses = {}) {
  matchList.querySelectorAll(".match-row").forEach((row) => {
    const id = row.dataset.id;
    const select = row.querySelector("[data-match]");
    row.classList.remove("correct", "incorrect");
    if (statuses[id]) row.classList.add(statuses[id]);
    select.value = dateMatches[id] || "";
  });
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
    launchPinkGlitterBursts(7);
  } else if (!allMatched) {
    setMessage("Add a year to every event, then check your matches again.");
  } else {
    setMessage("A few dates need another look. Use the revealed timeline above to help.");
  }
}

function resizeCanvas() {
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight;
  const scale = window.devicePixelRatio || 1;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

function launchPinkGlitterBursts(count) {
  let bursts = 0;
  const interval = window.setInterval(() => {
    bursts += 1;
    createPinkGlitterBurst();
    if (bursts >= count) window.clearInterval(interval);
  }, 420);
}

function createPinkGlitterBurst() {
  resizeCanvas();
  const centerX = document.documentElement.clientWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ["#ff2f9d", "#ff63bc", "#ff9bd5", "#ffffff", "#ffd76a", "#ffc7e7"];

  glitterFlashes.push({
    x: centerX,
    y: centerY,
    radius: 8,
    life: 24,
    maxLife: 24,
  });

  for (let index = 0; index < 180; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 12.5;
    glitterPieces.push({
      x: centerX,
      y: centerY,
      size: 2 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.34,
      life: 72 + Math.random() * 26,
      maxLife: 98,
      sparkle: Math.random() > 0.48,
    });
  }

  if (!glitterAnimation) {
    glitterAnimation = requestAnimationFrame(drawPinkGlitter);
  }
}

function drawPinkGlitter() {
  ctx.clearRect(0, 0, document.documentElement.clientWidth, window.innerHeight);
  glitterPieces = glitterPieces.filter((piece) => piece.life > 0);
  glitterFlashes = glitterFlashes.filter((flash) => flash.life > 0);

  glitterFlashes.forEach((flash) => {
    const progress = 1 - flash.life / flash.maxLife;
    const alpha = Math.max(flash.life / flash.maxLife, 0);
    flash.radius += 15;
    flash.life -= 1;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#ff2f9d";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    for (let ray = 0; ray < 18; ray += 1) {
      const angle = (Math.PI * 2 * ray) / 18;
      const inner = 18 + progress * 35;
      const outer = 95 + progress * 180;
      ctx.beginPath();
      ctx.moveTo(flash.x + Math.cos(angle) * inner, flash.y + Math.sin(angle) * inner);
      ctx.lineTo(flash.x + Math.cos(angle) * outer, flash.y + Math.sin(angle) * outer);
      ctx.stroke();
    }
    ctx.restore();
  });

  glitterPieces.forEach((piece) => {
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.vx *= 0.988;
    piece.vy = piece.vy * 0.988 + 0.1;
    piece.rotation += piece.spin;
    piece.life -= 1;

    const alpha = Math.max(piece.life / piece.maxLife, 0);
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = piece.color;

    if (piece.sparkle) {
      ctx.beginPath();
      ctx.moveTo(0, -piece.size * 1.35);
      ctx.lineTo(piece.size * 0.32, -piece.size * 0.32);
      ctx.lineTo(piece.size * 1.35, 0);
      ctx.lineTo(piece.size * 0.32, piece.size * 0.32);
      ctx.lineTo(0, piece.size * 1.35);
      ctx.lineTo(-piece.size * 0.32, piece.size * 0.32);
      ctx.lineTo(-piece.size * 1.35, 0);
      ctx.lineTo(-piece.size * 0.32, -piece.size * 0.32);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
    }

    ctx.restore();
  });

  if (glitterPieces.length || glitterFlashes.length) {
    glitterAnimation = requestAnimationFrame(drawPinkGlitter);
  } else {
    glitterAnimation = null;
    ctx.clearRect(0, 0, document.documentElement.clientWidth, window.innerHeight);
  }
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
  if (isTimelineInOrder()) {
    completeTimeline();
    return;
  }
  maybeShowFirstFact(sourceId);
});

matchList.addEventListener("change", (event) => {
  const select = event.target.closest("[data-match]");
  if (!select) return;
  if (select.value) {
    dateMatches[select.dataset.match] = select.value;
  } else {
    delete dateMatches[select.dataset.match];
  }
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
  dateMatches = {};
  updateDateMatches();
  setMessage("Date matches cleared. Choose a year beside each event.");
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
