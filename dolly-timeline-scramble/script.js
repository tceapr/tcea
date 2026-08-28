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

const whichCameFirstRounds = [
  {
    a: {
      title: "Grand Ole Opry Debut",
      year: "1959",
      fact: "At age 13, Dolly performed at the Grand Ole Opry.",
    },
    b: {
      title: "Moves to Nashville",
      year: "1964",
      fact: "The day after graduating from high school, Dolly moved to Nashville to pursue a music career.",
    },
    correct: "Grand Ole Opry Debut",
  },
  {
    a: {
      title: "Moves to Nashville",
      year: "1964",
      fact: "Dolly headed to Nashville immediately after high school to pursue songwriting and music.",
    },
    b: {
      title: "The Porter Wagoner Show",
      year: "1967",
      fact: "Dolly joined Porter Wagoner's television program and gained a much larger national audience.",
    },
    correct: "Moves to Nashville",
  },
  {
    a: {
      title: "The Porter Wagoner Show",
      year: "1967",
      fact: "Dolly became a regular performer on Porter Wagoner's popular television show.",
    },
    b: {
      title: "Grand Ole Opry Member",
      year: "1969",
      fact: "Dolly was inducted as a member of the Grand Ole Opry.",
    },
    correct: "The Porter Wagoner Show",
  },
  {
    a: {
      title: "Grand Ole Opry Member",
      year: "1969",
      fact: "Dolly became an official member of the Grand Ole Opry.",
    },
    b: {
      title: "I Will Always Love You",
      year: "1974",
      fact: "Dolly's recording of \"I Will Always Love You\" reached number one on the country chart.",
    },
    correct: "Grand Ole Opry Member",
  },
  {
    a: {
      title: "I Will Always Love You",
      year: "1974",
      fact: "The song became one of Dolly's signature recordings and was later famously recorded by Whitney Houston.",
    },
    b: {
      title: "9 to 5",
      year: "1980",
      fact: "Dolly starred in the movie \"9 to 5\" and wrote and performed its hit title song.",
    },
    correct: "I Will Always Love You",
  },
  {
    a: {
      title: "9 to 5",
      year: "1980",
      fact: "Dolly made her major film debut in \"9 to 5.\"",
    },
    b: {
      title: "Dollywood Opens",
      year: "1986",
      fact: "Dollywood opened in Pigeon Forge, Tennessee.",
    },
    correct: "9 to 5",
  },
  {
    a: {
      title: "Dollywood Opens",
      year: "1986",
      fact: "Dolly partnered with the existing theme park in Tennessee and Dollywood was born.",
    },
    b: {
      title: "Imagination Library Begins",
      year: "1995",
      fact: "Dolly launched the Imagination Library to provide free books to young children.",
    },
    correct: "Dollywood Opens",
  },
  {
    label: "Final Challenge",
    a: {
      title: "Imagination Library Begins",
      year: "1995",
      fact: "The program began in Dolly's home county in Tennessee and eventually expanded around the world.",
    },
    b: {
      title: "Rock and Roll Hall of Fame",
      year: "2022",
      fact: "Dolly Parton was inducted into the Rock and Roll Hall of Fame.",
    },
    correct: "Imagination Library Begins",
  },
];

const factOrFiddleQuestions = [
  {
    statement: "Dolly Parton grew up as one of 12 children in the Great Smoky Mountains.",
    answer: "FACT",
    explanation:
      "Dolly was born in Locust Ridge, Tennessee. She grew up with her parents and 11 siblings in a small cabin in the Great Smoky Mountains.",
  },
  {
    statement: "The doctor who delivered Dolly was paid with a sack of flour.",
    answer: "FIDDLE",
    explanation: "Close, but Dolly said her father paid the doctor with a sack of cornmeal.",
  },
  {
    statement: "Dolly's uncle gave her the first real guitar she owned.",
    answer: "FACT",
    explanation:
      "Dolly first played a homemade guitar. Her uncle Bill Owens later recognized her talent and gave her her first store-bought guitar. He also helped her find early opportunities to perform.",
  },
  {
    statement: "Dolly wrote \"Jolene\" and \"I Will Always Love You\" on the same day.",
    answer: "FACT",
    explanation:
      "Dolly has said that she wrote both songs on the same remarkably productive day in 1973. They became two of her most famous songs.",
  },
  {
    statement: "Dolly created a signature line of wigs that is sold around the world.",
    answer: "FIDDLE",
    explanation:
      "Dolly is famous for her collection of wigs, but she never launched an international signature wig line. Her stage wigs were custom-made for her.",
  },
  {
    statement: "Dolly recorded a secret song that cannot be released until 2045.",
    answer: "FACT",
    explanation:
      "Dolly recorded a song and placed it in a time capsule at Dollywood's DreamMore Resort. The time capsule is not supposed to be opened until 2045.",
  },
  {
    statement: "Dolly used her acrylic fingernails to help create the rhythm for \"9 to 5.\"",
    answer: "FACT",
    explanation:
      "Dolly discovered that clicking her acrylic fingernails together sounded like a typewriter. That rhythm became an unforgettable part of \"9 to 5.\"",
  },
  {
    statement: "Dolly once entered a Dolly Parton look-alike contest and won first place.",
    answer: "FIDDLE",
    explanation:
      "Dolly secretly entered a Dolly Parton look-alike contest on Santa Monica Boulevard. She exaggerated her appearance for the contest, but she did not win.",
  },
  {
    statement: "Dolly has full sleeves of brightly colored tattoos hidden beneath her clothes.",
    answer: "FIDDLE",
    explanation:
      "Dolly said she had a few small, tasteful tattoos in soft pastel colors. She explained that some were used to cover scars, but she did not have full tattoo sleeves.",
  },
  {
    statement: "Dolly the sheep was the first mammal cloned from an adult cell and was named in Dolly Parton's honor.",
    answer: "FACT",
    explanation:
      "Scientists created Dolly the sheep using a cell from a mammary gland. They named the famous sheep after Dolly Parton.",
  },
  {
    statement: "The Imagination Library begins mailing free books to children when they turn five.",
    answer: "FIDDLE",
    explanation:
      "The program begins much earlier. In participating communities, enrolled children receive a free book each month from birth until age five. The Imagination Library has gifted more than 300 million books around the world.",
  },
  {
    statement: "Dolly donated $1 million to COVID-19 research connected to the development of the Moderna vaccine.",
    answer: "FACT",
    explanation:
      "Dolly donated $1 million to Vanderbilt University Medical Center in 2020. Her gift supported COVID-19 research, including work connected to the Moderna vaccine.",
  },
  {
    statement: "Dollywood employees receive only a 50 percent discount on college tuition.",
    answer: "FIDDLE",
    explanation:
      "Eligible employees can receive 100 percent coverage for tuition, fees, and required books and supplies in more than 100 fully funded programs through the GROW U program.",
  },
  {
    statement: "Dolly once lost a movie role because she refused to wear makeup.",
    answer: "FIDDLE",
    explanation:
      "There is no reliable account of Dolly losing a movie role for refusing to wear makeup. In fact, Dolly has often joked about how prepared she likes to be while wearing her signature makeup.",
  },
];

const timelineList = document.querySelector("#timeline-list");
const message = document.querySelector("#message");
const checkButton = document.querySelector("#check-button");
const tryAgainButton = document.querySelector("#try-again-button");
const resetButton = document.querySelector("#reset-button");
const secondChallengeShortcut = document.querySelector("#second-challenge-shortcut");
const thirdChallengeShortcut = document.querySelector("#third-challenge-shortcut");
const hideYearsToggle = document.querySelector("#hide-years-toggle");
const completionPanel = document.querySelector("#completion-panel");
const dateChallengeButton = document.querySelector("#date-challenge-button");
const dateChallenge = document.querySelector("#date-challenge");
const whichGame = document.querySelector("#which-game");
const whichBoard = document.querySelector("#which-board");
const roundLabel = document.querySelector("#round-label");
const scoreLabel = document.querySelector("#score-label");
const progressDots = document.querySelector("#progress-dots");
const whichFeedback = document.querySelector("#which-feedback");
const nextRoundButton = document.querySelector("#next-round-button");
const whichResults = document.querySelector("#which-results");
const finalScore = document.querySelector("#final-score");
const scoreTitle = document.querySelector("#score-title");
const playAgainButton = document.querySelector("#play-again-button");
const continueButton = document.querySelector("#continue-button");
const factOrFiddle = document.querySelector("#fact-or-fiddle");
const fiddleOpening = document.querySelector("#fiddle-opening");
const fiddleGame = document.querySelector("#fiddle-game");
const fiddleResults = document.querySelector("#fiddle-results");
const startFiddleButton = document.querySelector("#start-fiddle-button");
const reduceMotionToggle = document.querySelector("#reduce-motion-toggle");
const fretMarkers = document.querySelector("#fret-markers");
const gameFretMarkers = document.querySelector("#game-fret-markers");
const completeFretMarkers = document.querySelector("#complete-fret-markers");
const fiddleQuestionLabel = document.querySelector("#fiddle-question-label");
const fiddleScoreLabel = document.querySelector("#fiddle-score-label");
const fiddleStatement = document.querySelector("#fiddle-statement");
const factChoiceButton = document.querySelector("#fact-button");
const fiddleChoiceButton = document.querySelector("#fiddle-button");
const fiddleAnswerPanel = document.querySelector("#fiddle-answer-panel");
const fiddleAnswerHeading = document.querySelector("#fiddle-answer-heading");
const fiddleCorrectAnswer = document.querySelector("#fiddle-correct-answer");
const fiddleExplanation = document.querySelector("#fiddle-explanation");
const nextFiddleButton = document.querySelector("#next-fiddle-button");
const fiddleFinalScore = document.querySelector("#fiddle-final-score");
const fiddleCompletionMessage = document.querySelector("#fiddle-completion-message");
const fiddlePlayAgainButton = document.querySelector("#fiddle-play-again-button");
const returnDollyButton = document.querySelector("#return-dolly-button");
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
let whichRoundIndex = 0;
let whichScore = 0;
let whichRoundAnswered = false;
let whichSelectedIndex = null;
let activeChoices = [];
let fiddleOrder = factOrFiddleQuestions.map((_, index) => index);
let fiddleQuestionIndex = 0;
let fiddleScore = 0;
let fiddleAnswered = false;
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
  setMessage("Beautiful work. The years are revealed, and Which Came First is ready.");
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
  completionPanel.hidden = true;
  dateChallenge.hidden = true;
  factOrFiddle.hidden = true;
  checkButton.disabled = false;
  tryAgainButton.disabled = false;
  renderTimeline();
  resetWhichCameFirst();
  resetFactOrFiddle(false);
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

function resetWhichCameFirst() {
  whichRoundIndex = 0;
  whichScore = 0;
  whichRoundAnswered = false;
  whichSelectedIndex = null;
  activeChoices = [];
  whichGame.hidden = false;
  whichResults.hidden = true;
  renderWhichCameFirst();
}

function currentRound() {
  return whichCameFirstRounds[whichRoundIndex];
}

function scoreTitleFor(score) {
  if (score === 8) return "Dolly Historian";
  if (score >= 6) return "Country Superstar";
  if (score >= 4) return "Nashville Bound";
  return "Rising Star";
}

function roundChoices(round) {
  const choices = [
    { ...round.a, side: "a" },
    { ...round.b, side: "b" },
  ];
  return Math.random() > 0.5 ? choices.reverse() : choices;
}

function renderProgressDots() {
  progressDots.innerHTML = "";
  const completedRounds = whichRoundIndex + (whichRoundAnswered ? 1 : 0);

  whichCameFirstRounds.forEach((round, index) => {
    const dot = document.createElement("span");
    dot.className = `progress-dot${index < completedRounds ? " complete" : ""}`;
    dot.setAttribute("aria-label", `${round.label || `Round ${index + 1}`} ${index < completedRounds ? "complete" : "not complete"}`);
    progressDots.append(dot);
  });
}

function renderChoiceCard(choice, index) {
  const round = currentRound();
  const isFirst = choice.title === round.correct;
  const isSelected = whichSelectedIndex === index;
  const card = document.createElement("article");
  card.className = "which-card";
  if (whichRoundAnswered) {
    card.classList.add("answered");
    card.classList.add(isFirst ? "correct" : "incorrect");
  }

  const cardNumber = index + 1;
  const header = document.createElement("div");
  header.className = "which-card-header";
  header.innerHTML = `<span class="choice-label">Card ${cardNumber}</span>`;

  if (whichRoundAnswered && isFirst) {
    const firstLabel = document.createElement("span");
    firstLabel.className = "result-label first";
    firstLabel.textContent = "✓ Came First";
    header.append(firstLabel);
  }

  if (whichRoundAnswered && isSelected) {
    const selectedLabel = document.createElement("span");
    selectedLabel.className = "result-label your-choice";
    selectedLabel.textContent = "Your Choice";
    header.append(selectedLabel);
  }

  if (whichRoundAnswered && !isFirst) {
    const laterLabel = document.createElement("span");
    laterLabel.className = "result-label";
    laterLabel.textContent = "Later Event";
    header.append(laterLabel);
  }

  const title = document.createElement("h3");
  title.textContent = choice.title;

  const fact = document.createElement("p");
  fact.textContent = choice.fact;

  const button = document.createElement("button");
  button.className = "primary-button";
  button.type = "button";
  button.dataset.choiceIndex = index;
  button.textContent = whichRoundAnswered ? "Answer Locked" : "Choose This Event";
  button.disabled = whichRoundAnswered;

  card.append(header, title, fact, button);
  return card;
}

function renderWhichCameFirst() {
  const round = currentRound();
  if (!activeChoices.length) activeChoices = roundChoices(round);

  roundLabel.textContent = round.label || `Round ${whichRoundIndex + 1} of ${whichCameFirstRounds.length}`;
  scoreLabel.textContent = `Score: ${whichScore}`;
  renderProgressDots();

  whichBoard.innerHTML = "";
  whichBoard.append(renderChoiceCard(activeChoices[0], 0));

  const vs = document.createElement("div");
  vs.className = "vs-badge";
  vs.textContent = "VS";
  whichBoard.append(vs);

  whichBoard.append(renderChoiceCard(activeChoices[1], 1));

  if (whichRoundAnswered) {
    const selected = activeChoices[whichSelectedIndex];
    const isCorrect = selected.title === round.correct;
    const response = ["You got it!", "That's right!", "Nice work!"][whichRoundIndex % 3];
    whichFeedback.hidden = false;
    whichFeedback.className = `which-feedback ${isCorrect ? "correct" : "incorrect"}`;
    whichFeedback.innerHTML = `
      <strong>${isCorrect ? response : "Not quite. Here's the timeline."}</strong>
      <p>${round.correct} came first.</p>
      <div class="result-timeline" aria-label="Round years">
        ${activeChoices
          .map(
            (choice) =>
              `<span class="${choice.title === round.correct ? "first" : ""}">${choice.title}: ${choice.year}</span>`,
          )
          .join("")}
      </div>
    `;
    nextRoundButton.hidden = false;
  } else {
    whichFeedback.hidden = true;
    nextRoundButton.hidden = true;
  }
}

function answerWhichRound(choiceIndex) {
  if (whichRoundAnswered) return;
  whichRoundAnswered = true;
  whichSelectedIndex = choiceIndex;
  if (activeChoices[choiceIndex].title === currentRound().correct) whichScore += 1;
  renderWhichCameFirst();
  nextRoundButton.focus();
}

function showWhichResults() {
  whichGame.hidden = true;
  whichResults.hidden = false;
  finalScore.textContent = `${whichScore} / ${whichCameFirstRounds.length}`;
  scoreTitle.textContent = scoreTitleFor(whichScore);
  launchPinkGlitterBursts(7);
}

function nextWhichRound() {
  if (!whichRoundAnswered) return;
  if (whichRoundIndex === whichCameFirstRounds.length - 1) {
    showWhichResults();
    return;
  }
  whichRoundIndex += 1;
  whichRoundAnswered = false;
  whichSelectedIndex = null;
  activeChoices = [];
  renderWhichCameFirst();
}

function openSecondChallenge() {
  dateChallenge.hidden = false;
  dateChallenge.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetFactOrFiddle(shouldShuffle) {
  fiddleOrder = shouldShuffle ? shuffle(factOrFiddleQuestions.map((_, index) => index)) : factOrFiddleQuestions.map((_, index) => index);
  fiddleQuestionIndex = 0;
  fiddleScore = 0;
  fiddleAnswered = false;
  fiddleOpening.hidden = false;
  fiddleGame.hidden = true;
  fiddleResults.hidden = true;
  renderFretMarkers(fretMarkers, 0);
  renderFretMarkers(gameFretMarkers, 0);
  renderFretMarkers(completeFretMarkers, factOrFiddleQuestions.length);
}

function currentFiddleQuestion() {
  return factOrFiddleQuestions[fiddleOrder[fiddleQuestionIndex]];
}

function fiddleCompletionText(score) {
  if (score === 14) return "Top of the charts! You are a Dolly expert!";
  if (score >= 11) return "Standing ovation! You know your Dolly facts!";
  if (score >= 8) return "Encore! You hit plenty of the right notes!";
  return "Tune up and try again! Dolly's story is full of surprises!";
}

function renderFretMarkers(container, litCount) {
  container.innerHTML = "";
  factOrFiddleQuestions.forEach((_, index) => {
    const marker = document.createElement("span");
    marker.className = `fret-marker${index < litCount ? " lit" : ""}`;
    marker.setAttribute("aria-label", `Question ${index + 1} ${index < litCount ? "complete" : "not complete"}`);
    container.append(marker);
  });
}

function startFactOrFiddle(shouldShuffle = false) {
  if (shouldShuffle) resetFactOrFiddle(true);
  fiddleOpening.hidden = true;
  fiddleGame.hidden = false;
  fiddleResults.hidden = true;
  renderFactOrFiddleQuestion();
}

function renderFactOrFiddleQuestion() {
  const question = currentFiddleQuestion();
  fiddleAnswered = false;
  fiddleQuestionLabel.textContent = `Question ${fiddleQuestionIndex + 1} of ${factOrFiddleQuestions.length}`;
  fiddleScoreLabel.textContent = `Score: ${fiddleScore}`;
  fiddleStatement.textContent = question.statement;
  fiddleAnswerPanel.hidden = true;
  fiddleAnswerPanel.className = "answer-panel";
  factChoiceButton.disabled = false;
  fiddleChoiceButton.disabled = false;
  factChoiceButton.classList.remove("selected");
  fiddleChoiceButton.classList.remove("selected");
  renderFretMarkers(gameFretMarkers, fiddleQuestionIndex);
}

function triggerGuitarStrum(isCorrect) {
  factOrFiddle.classList.remove("is-strumming");
  void factOrFiddle.offsetWidth;
  factOrFiddle.classList.add("is-strumming");

  if (isCorrect && !document.body.classList.contains("reduce-motion")) {
    const sparkle = document.createElement("span");
    sparkle.className = "correct-sparkle";
    sparkle.textContent = "✦";
    factOrFiddle.append(sparkle);
    window.setTimeout(() => sparkle.remove(), 820);
  }

  window.setTimeout(() => factOrFiddle.classList.remove("is-strumming"), 540);
}

function answerFactOrFiddle(answer) {
  if (fiddleAnswered) return;
  const question = currentFiddleQuestion();
  const isCorrect = answer === question.answer;

  fiddleAnswered = true;
  if (isCorrect) fiddleScore += 1;

  factChoiceButton.disabled = true;
  fiddleChoiceButton.disabled = true;
  (answer === "FACT" ? factChoiceButton : fiddleChoiceButton).classList.add("selected");
  fiddleScoreLabel.textContent = `Score: ${fiddleScore}`;
  renderFretMarkers(gameFretMarkers, fiddleQuestionIndex + 1);
  triggerGuitarStrum(isCorrect);

  fiddleAnswerPanel.hidden = false;
  fiddleAnswerPanel.className = `answer-panel ${isCorrect ? "correct" : "incorrect"}`;
  fiddleAnswerHeading.textContent = isCorrect ? "You hit the right note!" : "That one was a little tricky!";
  fiddleCorrectAnswer.textContent = `Correct Answer: ${question.answer}`;
  fiddleExplanation.textContent = question.explanation;
  nextFiddleButton.textContent = fiddleQuestionIndex === factOrFiddleQuestions.length - 1 ? "See My Score" : "Next Question";
  nextFiddleButton.focus();
}

function nextFactOrFiddleQuestion() {
  if (!fiddleAnswered) return;
  if (fiddleQuestionIndex === factOrFiddleQuestions.length - 1) {
    showFactOrFiddleResults();
    return;
  }

  fiddleQuestionIndex += 1;
  renderFactOrFiddleQuestion();
}

function showFactOrFiddleResults() {
  fiddleGame.hidden = true;
  fiddleResults.hidden = false;
  fiddleFinalScore.textContent = `${fiddleScore} out of ${factOrFiddleQuestions.length}`;
  fiddleCompletionMessage.textContent = fiddleCompletionText(fiddleScore);
  renderFretMarkers(completeFretMarkers, factOrFiddleQuestions.length);
  launchPinkGlitterBursts(3);
}

function openThirdChallenge() {
  factOrFiddle.hidden = false;
  factOrFiddle.scrollIntoView({ behavior: "smooth", block: "start" });
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

whichBoard.addEventListener("click", (event) => {
  const button = event.target.closest("[data-choice-index]");
  if (!button) return;
  answerWhichRound(Number(button.dataset.choiceIndex));
});

dateChallengeButton.addEventListener("click", openSecondChallenge);

checkButton.addEventListener("click", checkTimeline);
tryAgainButton.addEventListener("click", () => {
  renderTimeline();
  setMessage("Keep going. The cards are ready for another check when you are.");
});
resetButton.addEventListener("click", resetGame);
secondChallengeShortcut.addEventListener("click", openSecondChallenge);
thirdChallengeShortcut.addEventListener("click", openThirdChallenge);
nextRoundButton.addEventListener("click", nextWhichRound);
playAgainButton.addEventListener("click", () => {
  resetWhichCameFirst();
  dateChallenge.scrollIntoView({ behavior: "smooth", block: "start" });
});
continueButton.addEventListener("click", openThirdChallenge);
startFiddleButton.addEventListener("click", () => startFactOrFiddle(false));
factChoiceButton.addEventListener("click", () => answerFactOrFiddle("FACT"));
fiddleChoiceButton.addEventListener("click", () => answerFactOrFiddle("FIDDLE"));
nextFiddleButton.addEventListener("click", nextFactOrFiddleQuestion);
fiddlePlayAgainButton.addEventListener("click", () => {
  resetFactOrFiddle(true);
  startFactOrFiddle();
});
returnDollyButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
reduceMotionToggle.addEventListener("change", () => {
  document.body.classList.toggle("reduce-motion", reduceMotionToggle.checked);
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

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  reduceMotionToggle.checked = true;
  document.body.classList.add("reduce-motion");
}

resizeCanvas();
resetGame();
