// Change punctuation content and image filenames here.
const PUNCTUATION = [
  {
    level: "basic",
    id: "period",
    name: "Period",
    symbol: ".",
    image: "images/period.png",
    cardImage: "images/cards/periodcard.png",
    alt: "Period punctuation graphic with a dog sleeping by a door.",
    use: "Ends a statement.",
    sound: "Your voice comes to a full stop and usually drops slightly.",
    example: "The dog slept by the door."
  },
  {
    level: "basic",
    id: "question-mark",
    name: "Question Mark",
    symbol: "?",
    image: "images/question-mark.png",
    cardImage: "images/cards/questionmarkcard.png",
    alt: "Question mark punctuation graphic.",
    use: "Ends a direct question.",
    sound: "Your voice often goes up in pitch at the end.",
    example: "Are you coming with us?"
  },
  {
    level: "basic",
    id: "exclamation-point",
    name: "Exclamation Point",
    symbol: "!",
    image: "images/exclamation-point.png",
    cardImage: "images/cards/exclamationpointcard.png",
    alt: "Exclamation point punctuation graphic.",
    use: "Shows excitement, surprise, warning, or strong feeling.",
    sound: "Your voice becomes stronger and more expressive.",
    example: "Watch out for that puddle!"
  },
  {
    level: "basic",
    id: "comma",
    name: "Comma",
    symbol: ",",
    image: "images/comma.png",
    cardImage: "images/cards/commacard.png",
    alt: "Comma punctuation graphic.",
    use: "Separates items in a list or parts of a sentence.",
    sound: "Take a short pause, but do not completely stop.",
    example: "We packed sandwiches, apples, chips, and cookies."
  },
  {
    level: "basic",
    id: "apostrophe",
    name: "Apostrophe",
    symbol: "'",
    image: "images/apostrophe.png",
    cardImage: "images/cards/apostrophecard.png",
    alt: "Apostrophe punctuation graphic.",
    use: "Shows possession or replaces missing letters in contractions.",
    sound: "Usually there is no pause. Read the word naturally.",
    example: "That is Maya's backpack."
  },
  {
    level: "basic",
    id: "quotation-marks",
    name: "Quotation Marks",
    symbol: "“ ”",
    image: "images/quotation-marks.png",
    cardImage: "images/cards/quotationmarkscard.png",
    alt: "Quotation marks punctuation graphic.",
    use: "Show the exact words someone says.",
    sound: "Change your expression or tone to sound like the speaker.",
    example: "“Meet me by the library,” Noah said."
  },
  {
    level: "more",
    id: "colon",
    name: "Colon",
    symbol: ":",
    image: "images/colon.png",
    cardImage: "images/cards/coloncard.png",
    alt: "Colon punctuation graphic.",
    use: "Introduces a list, explanation, or more information.",
    sound: "Take a noticeable pause. Your voice signals that more information is coming.",
    example: "Bring three things: a pencil, paper, and scissors."
  },
  {
    level: "more",
    id: "semicolon",
    name: "Semicolon",
    symbol: ";",
    image: "images/semicolon.png",
    cardImage: "images/cards/semicoloncard.png",
    alt: "Semicolon punctuation graphic.",
    use: "Connects two closely related complete sentences.",
    sound: "Pause longer than you would for a comma, but not as long as you would for a period.",
    example: "The rain stopped; the game continued."
  },
  {
    level: "more",
    id: "parentheses",
    name: "Parentheses",
    symbol: "( )",
    image: "images/parentheses.png",
    cardImage: "images/cards/parenthesescard.png",
    alt: "Parentheses punctuation graphic.",
    use: "Add extra information.",
    sound: "Pause briefly and often use a slightly different or softer tone.",
    example: "Our field trip is Friday (weather permitting)."
  },
  {
    level: "more",
    id: "hyphen",
    name: "Hyphen",
    symbol: "-",
    image: "images/hyphen.png",
    cardImage: "images/cards/hyphencard.png",
    alt: "Hyphen punctuation graphic.",
    use: "Joins words that work together.",
    sound: "Usually there is no pause. Read the connected words as one idea.",
    example: "She has a five-year-old brother."
  },
  {
    level: "more",
    id: "ellipsis",
    name: "Ellipsis",
    symbol: "…",
    image: "images/ellipsis.png",
    cardImage: "images/cards/ellipsiscard.png",
    alt: "Ellipsis punctuation graphic.",
    use: "Shows a pause or a thought trailing off.",
    sound: "Pause longer than usual or let your voice trail away.",
    example: "I thought I knew the answer, but…"
  },
  {
    level: "more",
    id: "dash",
    name: "Dash",
    symbol: "—",
    image: "images/dash.png",
    cardImage: "images/cards/dashcard.png",
    alt: "Dash punctuation graphic.",
    use: "Shows a sudden break in thought or adds emphasis.",
    sound: "Take a noticeable pause. The words after the dash may get extra emphasis.",
    example: "There was only one thing left to do — run!"
  }
];

// Add game questions here.
const QUESTIONS = {
  basic: [
    q("period", "The kitten hid under the chair ___", "A period belongs here because the sentence tells a complete thought."),
    q("period", "Our class planted flowers by the sidewalk ___", "This is a statement, so it ends with a period."),
    q("period", "Jamal finished his science poster before lunch ___", "The sentence is telling something, so a period is the best choice."),
    q("question-mark", "Where did you put my backpack ___", "A question mark belongs here because the sentence asks a direct question."),
    q("question-mark", "Can we visit the book fair today ___", "This sentence asks something, so it needs a question mark."),
    q("question-mark", "Why is the sky so dark this morning ___", "The word why gives a clue that this is a question."),
    q("exclamation-point", "Watch out for that puddle ___", "An exclamation point fits because the sentence gives a strong warning."),
    q("exclamation-point", "That roller coaster was amazing ___", "The sentence shows excitement, so an exclamation point works best."),
    q("exclamation-point", "Hooray, our team won ___", "This sentence shows a strong happy feeling."),
    q("comma", "We packed sandwiches ___ apples ___ chips ___ and cookies.", "Commas separate items in a list."),
    q("comma", "After the bell rang ___ we walked quietly to music class.", "A comma separates the beginning phrase from the rest of the sentence."),
    q("comma", "Lena brought markers ___ glue ___ paper ___ and scissors.", "Commas help readers move through a list."),
    q("apostrophe", "That is Maya ___ s backpack.", "An apostrophe shows that the backpack belongs to Maya."),
    q("apostrophe", "I can ___ t find my library card.", "An apostrophe replaces the missing letters in a contraction."),
    q("apostrophe", "The teacher read Leo ___ s poem aloud.", "The apostrophe shows possession."),
    q("quotation-marks", "___ Please save me a seat ___ Mia said.", "Quotation marks show the exact words Mia said."),
    q("quotation-marks", "Dad asked ___ Did you feed the fish ___", "Quotation marks go around the exact words Dad asked."),
    q("quotation-marks", "___ I found the missing puzzle piece ___ shouted Eli.", "Quotation marks show exactly what Eli shouted.")
  ],
  more: [
    q("colon", "Bring three things ___ a pencil, paper, and scissors.", "A colon introduces the list of things to bring."),
    q("colon", "I have one goal ___ finish the chapter today.", "A colon introduces more information about the goal."),
    q("colon", "The recipe needs these toppings ___ cheese, olives, and peppers.", "A colon can introduce a list."),
    q("semicolon", "The rain stopped ___ the game continued.", "A semicolon connects two closely related complete sentences."),
    q("semicolon", "Mia practiced every night ___ her song sounded better.", "Both sides are complete thoughts that belong together."),
    q("semicolon", "The bus was late ___ we still arrived on time.", "A semicolon can connect related complete sentences."),
    q("parentheses", "Our field trip is Friday ___ weather permitting ___ .", "Parentheses add extra information that could be removed."),
    q("parentheses", "My cousin ___ who lives in Dallas ___ is visiting tomorrow.", "Parentheses can hold extra information in the sentence."),
    q("parentheses", "The class pet ___ a quiet turtle ___ slept all afternoon.", "The words inside parentheses add extra information."),
    q("hyphen", "She has a five ___ year ___ old brother.", "Hyphens join words that work together before a noun."),
    q("hyphen", "We read a well ___ known story in class.", "A hyphen joins words that work together as one idea."),
    q("hyphen", "The team made a last ___ minute plan.", "A hyphen joins last and minute before plan."),
    q("ellipsis", "I thought I knew the answer, but ___", "An ellipsis shows the thought trailing off."),
    q("ellipsis", "The hallway was quiet ___ too quiet.", "An ellipsis can show a pause for effect."),
    q("ellipsis", "She opened the box and found ___ nothing.", "An ellipsis shows a pause before the surprise."),
    q("dash", "There was only one thing left to do ___ run!", "A dash shows a sudden break and adds emphasis."),
    q("dash", "I reached for my pencil ___ but it was gone.", "A dash can show a sudden break in thought."),
    q("dash", "The winner was announced ___ and the room erupted.", "A dash adds a noticeable pause and emphasis.")
  ]
};

// Change feedback messages here.
const PRAISE = ["Nice work!", "You got it!", "Punctuation power!", "Exactly right!"];
const CLUES = [
  "Think about how your voice sounds when you read the sentence.",
  "Ask yourself: is it asking, telling, listing, or showing strong feeling?",
  "Look closely at where the blank appears in the sentence.",
  "Use the teaching cards if you want a quick reminder."
];
const CONFETTI_SYMBOLS = [".", "?", "!", ",", "'", "\"", ":", ";", "(", ")", "-", "…", "—"];
const CONFETTI_COLORS = ["var(--pink)", "var(--turquoise)", "var(--yellow)", "var(--purple)", "var(--orange)", "var(--emerald)"];

const LEVEL_LABELS = { basic: "Basic", more: "More" };
const app = document.querySelector("#app");

const state = {
  screen: "home",
  level: null,
  teachIndex: 0,
  questions: [],
  questionIndex: 0,
  attempts: 0,
  selectedId: null,
  currentChoices: [],
  feedback: null,
  answered: false,
  reviewingGame: false,
  stats: { score: 0, completed: 0, firstTry: 0 }
};

const lastQuestionOrderByLevel = { basic: "", more: "" };

function q(answerId, sentence, explanation) {
  return { answerId, sentence, explanation };
}

function marksFor(level) {
  return PUNCTUATION.filter((item) => item.level === level);
}

function findMark(id) {
  return PUNCTUATION.find((item) => item.id === id);
}

function randomNumber() {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0] / 4294967296;
  }
  return Math.random();
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(randomNumber() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function questionOrderKey(questions) {
  return questions.map((question) => `${question.answerId}:${question.sentence}`).join("|");
}

function shuffledQuestionOrder(level) {
  let questions = shuffle(QUESTIONS[level]);
  let orderKey = questionOrderKey(questions);
  let attempts = 0;
  while (QUESTIONS[level].length > 1 && orderKey === lastQuestionOrderByLevel[level] && attempts < 5) {
    questions = shuffle(QUESTIONS[level]);
    orderKey = questionOrderKey(questions);
    attempts += 1;
  }
  lastQuestionOrderByLevel[level] = orderKey;
  return questions;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function answerToken(answerId, index) {
  if (answerId === "quotation-marks") {
    return { text: index % 2 === 0 ? "“" : "”", trimBefore: index % 2 !== 0, trimAfter: index % 2 === 0 };
  }
  if (answerId === "parentheses") {
    return { text: index % 2 === 0 ? "(" : ")", trimBefore: index % 2 !== 0, trimAfter: true };
  }
  if (answerId === "apostrophe" || answerId === "hyphen") {
    return { text: findMark(answerId).symbol, trimBefore: true, trimAfter: true };
  }
  if (answerId === "dash") {
    return { text: findMark(answerId).symbol, trimBefore: false, trimAfter: false };
  }
  return { text: findMark(answerId).symbol, trimBefore: true, trimAfter: false };
}

function renderSentence(sentence, answerId, showAnswer = false) {
  const parts = sentence.split("___");
  if (parts.length === 1) return escapeHtml(sentence);

  let output = escapeHtml(parts[0]);
  for (let index = 0; index < parts.length - 1; index += 1) {
    let nextPart = parts[index + 1];
    if (showAnswer) {
      const token = answerToken(answerId, index);
      if (token.trimBefore) output = output.replace(/\s+$/, "");
      if (token.trimAfter) nextPart = nextPart.replace(/^\s+/, "");
      output += `<span class="answer-mark" aria-label="${escapeHtml(findMark(answerId).name)}">${escapeHtml(token.text)}</span>`;
    } else {
      output += '<span class="blank" aria-label="blank"></span>';
    }
    output += escapeHtml(nextPart);
  }
  return output;
}

function renderHome() {
  app.innerHTML = `
    <section class="hero-card home-hero">
      <div class="hero-intro">
        <div>
          <h1 class="hero-title graphic-title">
            <span class="sr-only">PUNCTUATION Power</span>
            <img src="images/home/punctuation-power-title.png" alt="" aria-hidden="true">
          </h1>
          <p class="subtitle">Learn it. Read it. Use it.</p>
        </div>
        <div class="home-burst" aria-hidden="true">
          <img src="images/home/punctuation-power-burst.png" alt="">
        </div>
      </div>
      <div class="level-grid">
        ${renderLevelCard("basic")}
        ${renderLevelCard("more")}
      </div>
    </section>
  `;
}

function renderLevelCard(level) {
  const marks = marksFor(level);
  return `
    <article class="level-card ${level}">
      <div class="level-card-header">
        <span class="level-icon" aria-hidden="true">${level === "basic" ? "." : ";"}</span>
        <h2>${LEVEL_LABELS[level]}</h2>
        <p>${level === "basic" ? "Start with everyday punctuation marks." : "Explore punctuation that adds structure and style."}</p>
      </div>
      <ul class="mark-list" aria-label="${LEVEL_LABELS[level]} punctuation marks">
        ${marks.map((mark) => `<li class="mark-pill"><span>${escapeHtml(mark.symbol)}</span>${escapeHtml(mark.name)}</li>`).join("")}
      </ul>
      <div class="button-row">
        <button class="primary-button" type="button" data-action="learn" data-level="${level}">Learn</button>
        <button class="secondary-button" type="button" data-action="play" data-level="${level}">Play</button>
      </div>
    </article>
  `;
}

function renderLearn() {
  const marks = marksFor(state.level);
  const mark = marks[state.teachIndex];
  const returnButton = state.reviewingGame
    ? '<button class="primary-button" type="button" data-action="return-game">Return to Game</button>'
    : "";
  const navButtons = `
    <div class="button-row learn-actions">
      ${returnButton}
      <button class="secondary-button" type="button" data-action="previous" ${state.teachIndex === 0 ? "disabled" : ""}>Previous</button>
      <button class="secondary-button" type="button" data-action="next" ${state.teachIndex === marks.length - 1 ? "disabled" : ""}>Next</button>
      <button class="ghost-button" type="button" data-action="level">Back to Level</button>
      ${state.reviewingGame ? "" : `<button class="primary-button" type="button" data-action="play" data-level="${state.level}">Play</button>`}
    </div>
  `;
  const learnContent = mark.cardImage
    ? `
      <article class="learn-card designed-learn-card">
        <h1 class="sr-only">${escapeHtml(mark.name)}</h1>
        <div class="designed-card-panel">
          <img class="punctuation-art designed-card-image" src="${escapeHtml(mark.cardImage)}" alt="${escapeHtml(`${mark.name} teaching card. Use: ${mark.use} How it sounds: ${mark.sound} Example: ${mark.example}`)}" data-symbol="${escapeHtml(mark.symbol)}">
          <span class="symbol-fallback">${escapeHtml(mark.symbol)}</span>
        </div>
        <div class="sr-only">
          <p>${escapeHtml(mark.use)}</p>
          <p>${escapeHtml(mark.sound)}</p>
          <p>${escapeHtml(mark.example)}</p>
        </div>
        ${navButtons}
      </article>
    `
    : `
      <article class="learn-card">
        <div class="art-panel">
          <img class="punctuation-art" src="${escapeHtml(mark.image)}" alt="${escapeHtml(mark.alt)}" data-symbol="${escapeHtml(mark.symbol)}">
          <span class="symbol-fallback">${escapeHtml(mark.symbol)}</span>
          <span class="symbol-chip">${escapeHtml(mark.symbol)}</span>
        </div>
        <div>
          <h1>${escapeHtml(mark.name)}</h1>
          <div class="teaching-list">
            <div class="info-block"><strong>How It Is Used</strong>${escapeHtml(mark.use)}</div>
            <div class="info-block"><strong>How It Sounds</strong>${escapeHtml(mark.sound)}</div>
            <div class="info-block"><strong>Example</strong><span class="example-text">${escapeHtml(mark.example)}</span></div>
          </div>
          ${navButtons}
        </div>
      </article>
    `;
  app.innerHTML = `
    <section>
      <div class="screen-heading">
        <span class="progress-badge">${LEVEL_LABELS[state.level]} Learn · ${state.teachIndex + 1} of ${marks.length}</span>
        ${state.reviewingGame ? '<button class="primary-button" type="button" data-action="return-game">Return to Game</button>' : '<button class="ghost-button" type="button" data-action="level">Back to Level</button>'}
      </div>
      ${learnContent}
    </section>
  `;
  wireImageFallbacks();
}

function startPlay(level) {
  state.level = level;
  state.questions = shuffledQuestionOrder(level);
  state.questionIndex = 0;
  state.attempts = 0;
  state.selectedId = null;
  state.currentChoices = [];
  state.feedback = null;
  state.answered = false;
  state.reviewingGame = false;
  state.stats = { score: 0, completed: 0, firstTry: 0 };
  state.screen = "play";
  render();
}

function renderPlay() {
  const question = state.questions[state.questionIndex];
  if (state.currentChoices.length === 0) state.currentChoices = choicesForQuestion(question, state.level);
  const choices = state.currentChoices;
  const showAnswer = state.answered && (state.selectedId === question.answerId || state.feedback?.type === "reveal");
  const powerPercent = Math.round((state.stats.completed / state.questions.length) * 100);
  app.innerHTML = `
    <section class="play-card power-play-card">
      <div class="screen-heading">
        <span class="progress-badge">${LEVEL_LABELS[state.level]} Power-Up · Question ${state.questionIndex + 1} of ${state.questions.length}</span>
        <span class="score-badge">Score ${state.stats.score} · First try ${state.stats.firstTry}</span>
      </div>
      <div class="power-round-top">
        <div>
          <span class="power-kicker">Power-Up Round</span>
          <h1>Choose the punctuation power.</h1>
        </div>
        <div class="power-meter" style="--power: ${powerPercent}%;" aria-label="Power meter ${powerPercent} percent">
          <span>Power Meter</span>
          <div class="power-track"><div class="power-fill"></div></div>
          <strong>${state.stats.completed} of ${state.questions.length} charged</strong>
        </div>
      </div>
      <div class="sentence-panel power-sentence-panel">
        <p class="sentence-text">${renderSentence(question.sentence, question.answerId, showAnswer)}</p>
      </div>
      <div class="choice-grid power-choice-grid" aria-label="Punctuation power choices">
        ${choices.map((mark) => renderChoice(mark, question.answerId)).join("")}
      </div>
      ${state.feedback ? renderFeedback() : ""}
      <div class="button-row" style="margin-top: 16px;">
        <button class="ghost-button" type="button" data-action="learn" data-level="${state.level}" data-focus-id="${question.answerId}">Review Teaching Cards</button>
        <button class="ghost-button" type="button" data-action="level">Back to Level</button>
      </div>
    </section>
  `;
}

function choicesForQuestion(question, level) {
  const answer = findMark(question.answerId);
  const distractors = shuffle(marksFor(level).filter((mark) => mark.id !== question.answerId)).slice(0, 3);
  return shuffle([answer, ...distractors]);
}

function renderChoice(mark, answerId) {
  let className = "choice-button";
  if (state.selectedId === mark.id && state.answered && mark.id === answerId) className += " correct";
  if (state.selectedId === mark.id && !state.answered && state.feedback?.type === "clue") className += " wrong";
  return `
    <button class="${className}" type="button" data-action="answer" data-id="${mark.id}" ${state.answered ? "disabled" : ""}>
      <span class="choice-symbol">${escapeHtml(mark.symbol)}</span>
      <span class="choice-label">${escapeHtml(mark.name)}</span>
    </button>
  `;
}

function renderFeedback() {
  const feedback = state.feedback;
  const question = state.questions[state.questionIndex];
  return `
    <div class="feedback-panel power-feedback ${feedback.type}">
      <strong><span aria-hidden="true">${feedback.type === "good" ? "!" : feedback.type === "clue" ? "?" : "*"}</span>${escapeHtml(feedback.title)}</strong>
      <p>${escapeHtml(feedback.message)}</p>
      ${feedback.explanation ? `<p>${escapeHtml(feedback.explanation)}</p>` : ""}
      <div class="button-row">
        ${state.answered ? `<button class="primary-button" type="button" data-action="next-question">${state.questionIndex + 1 === state.questions.length ? "See Results" : "Next Power"}</button>` : ""}
        ${!state.answered ? `<button class="ghost-button" type="button" data-action="learn" data-level="${state.level}" data-focus-id="${question.answerId}">Review This Card</button>` : ""}
        ${!state.answered && state.attempts >= 2 ? '<button class="secondary-button" type="button" data-action="show-me">Show Me</button>' : ""}
      </div>
    </div>
  `;
}

function selectAnswer(id) {
  if (state.answered) return;
  const question = state.questions[state.questionIndex];
  state.selectedId = id;
  if (id === question.answerId) {
    state.answered = true;
    state.stats.score += 1;
    state.stats.completed += 1;
    if (state.attempts === 0) state.stats.firstTry += 1;
    state.feedback = {
      type: "good",
      title: "Power Up!",
      message: "That punctuation powers up the sentence.",
      explanation: question.explanation
    };
  } else {
    state.attempts += 1;
    state.feedback = {
      type: "clue",
      title: "Power clue",
      message: CLUES[(state.attempts - 1) % CLUES.length]
    };
  }
  render();
}

function showMe() {
  const question = state.questions[state.questionIndex];
  const answer = findMark(question.answerId);
  state.answered = true;
  state.stats.completed += 1;
  state.feedback = {
    type: "reveal",
    title: `Power reveal: ${answer.name} ${answer.symbol}`,
    message: "Take a look at the powered-up sentence, then try the next one.",
    explanation: question.explanation
  };
  render();
}

function nextQuestion() {
  if (state.questionIndex + 1 >= state.questions.length) {
    state.screen = "results";
  } else {
    state.questionIndex += 1;
    state.attempts = 0;
    state.selectedId = null;
    state.currentChoices = [];
    state.feedback = null;
    state.answered = false;
  }
  render();
}

function renderResults() {
  app.innerHTML = `
    <section class="results-card">
      <div class="punctuation-confetti" aria-hidden="true">${renderPunctuationConfetti()}</div>
      <h1>Great punctuation work!</h1>
      <p class="subtitle">You completed the ${LEVEL_LABELS[state.level]} challenge.</p>
      <div class="results-grid">
        <div class="result-tile">Score<span class="result-number">${state.stats.score}</span></div>
        <div class="result-tile">Correct on First Try<span class="result-number">${state.stats.firstTry}</span></div>
        <div class="result-tile">Questions Completed<span class="result-number">${state.stats.completed}</span></div>
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" data-action="play" data-level="${state.level}">Play Again</button>
        <button class="secondary-button" type="button" data-action="play" data-level="${state.level === "basic" ? "more" : "basic"}">Try the Other Level</button>
        <button class="ghost-button" type="button" data-action="learn" data-level="${state.level}">Review the Teaching Cards</button>
      </div>
    </section>
  `;
}

function renderPunctuationConfetti() {
  return Array.from({ length: 54 }, (_, index) => {
    const symbol = CONFETTI_SYMBOLS[index % CONFETTI_SYMBOLS.length];
    const left = (index * 23 + 7) % 100;
    const delay = (index % 18) * 80;
    const duration = 2800 + (index % 7) * 260;
    const drift = ((index % 9) - 4) * 18;
    const spin = index % 2 === 0 ? 260 + (index % 6) * 40 : -260 - (index % 6) * 40;
    const size = 1.2 + (index % 5) * 0.24;
    const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
    return `<span style="--x: ${left}vw; --delay: ${delay}ms; --duration: ${duration}ms; --drift: ${drift}px; --spin: ${spin}deg; --size: ${size}rem; --confetti-color: ${color};">${escapeHtml(symbol)}</span>`;
  }).join("");
}

function wireImageFallbacks() {
  document.querySelectorAll(".punctuation-art").forEach((image) => {
    const showFallback = () => {
      image.style.display = "none";
      const fallback = image.nextElementSibling;
      if (fallback) fallback.style.display = "grid";
    };
    image.addEventListener("error", showFallback);
    if (image.complete && image.naturalWidth === 0) showFallback();
  });
}

function goToLevel(level) {
  state.level = level;
  state.teachIndex = 0;
  state.reviewingGame = false;
  state.screen = "level";
  render();
}

function renderLevel() {
  app.innerHTML = `
    <section class="hero-card">
      <div class="screen-heading">
        <span class="progress-badge">${LEVEL_LABELS[state.level]} Level</span>
        <button class="ghost-button" type="button" data-action="home">All Levels</button>
      </div>
      ${renderLevelCard(state.level)}
    </section>
  `;
}

function render() {
  if (state.screen === "home") renderHome();
  if (state.screen === "level") renderLevel();
  if (state.screen === "learn") renderLearn();
  if (state.screen === "play") renderPlay();
  if (state.screen === "results") renderResults();
}

function teachIndexFor(level, focusId) {
  if (!focusId) return 0;
  const index = marksFor(level).findIndex((mark) => mark.id === focusId);
  return index >= 0 ? index : 0;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  const level = button.dataset.level;
  const marks = state.level ? marksFor(state.level) : [];

  if (action === "home") {
    state.reviewingGame = false;
    state.screen = "home";
    render();
  }
  if (action === "level") {
    state.reviewingGame = false;
    if (state.level) state.screen = "level";
    render();
  }
  if (action === "learn") {
    const openedFromGame = state.screen === "play";
    state.level = level || state.level;
    state.teachIndex = teachIndexFor(state.level, button.dataset.focusId);
    state.reviewingGame = openedFromGame;
    state.screen = "learn";
    render();
  }
  if (action === "return-game") {
    state.reviewingGame = false;
    state.screen = "play";
    render();
  }
  if (action === "previous") {
    state.teachIndex = Math.max(0, state.teachIndex - 1);
    render();
  }
  if (action === "next") {
    state.teachIndex = Math.min(marks.length - 1, state.teachIndex + 1);
    render();
  }
  if (action === "play") startPlay(level || state.level);
  if (action === "answer") selectAnswer(button.dataset.id);
  if (action === "show-me") showMe();
  if (action === "next-question") nextQuestion();
});

render();
