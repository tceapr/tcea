const STORAGE_KEY = "technologyGraveyardProgressV5";
const TOTAL_POINTS = 27;

const exhibits = [
  {
    id: "floppy-disk",
    image: "images/floppy-disk.png",
    relic: "Floppy disk",
    clues: [
      "I stored computer files.",
      "I was small, square, and removable.",
      "My shape is still used as a save icon.",
      "I held much less information than today's storage devices."
    ],
    purpose: "Saving and moving computer files",
    limitation: "Very limited storage capacity",
    replacement: "USB flash drives and cloud storage",
    choices: {
      identify: ["Floppy disk", "Memory card", "CD jewel case", "Pocket calculator"],
      purpose: ["Saving and moving computer files", "Projecting classroom notes", "Recording portable audio", "Printing color photos"],
      replacement: ["USB flash drives and cloud storage", "Smartphone cameras", "Interactive displays", "Streaming services"]
    }
  },
  {
    id: "overhead-projector",
    image: "images/overhead-projector.png",
    relic: "Overhead projector",
    clues: [
      "Teachers often used me at the front of the classroom.",
      "I shined light through clear plastic sheets.",
      "I enlarged writing and images onto a screen.",
      "Teachers could write on the sheets while I projected them."
    ],
    purpose: "Displaying information to a large group",
    limitation: "Required transparencies and a projection surface",
    replacement: "Digital projectors and interactive displays",
    choices: {
      identify: ["Overhead projector", "Slide scanner", "Document shredder", "Filmstrip viewer"],
      purpose: ["Displaying information to a large group", "Storing research articles", "Organizing appointments", "Connecting to the internet"],
      replacement: ["Digital projectors and interactive displays", "USB flash drives and cloud storage", "Online encyclopedias and websites", "Smartphones"]
    }
  },
  {
    id: "cassette-tape",
    image: "images/cassette-tape.png",
    relic: "Cassette tape",
    clues: [
      "I stored sound on magnetic tape.",
      "I sometimes had to be rewound.",
      "My tape could become tangled.",
      "I had two small reels that moved the tape from one side to the other."
    ],
    purpose: "Recording and playing portable audio",
    limitation: "Listeners had to rewind or fast-forward to find a specific recording",
    replacement: "Digital audio files and streaming services",
    choices: {
      identify: ["Cassette tape", "VHS case", "Mini printer cartridge", "CD-ROM encyclopedia"],
      purpose: ["Recording and playing portable audio", "Taking digital photographs", "Showing still classroom pictures", "Saving computer files"],
      replacement: ["Digital audio files and streaming services", "Presentation slides and document cameras", "Broadband and Wi-Fi connections", "Smartphone cameras"]
    }
  },
  {
    id: "35-mm-film",
    image: "images/35-mm-film.png",
    relic: "35 mm film",
    clues: [
      "I was loaded into many film cameras.",
      "I came in a light-tight cassette.",
      "A roll usually held 24 or 36 pictures.",
      "I had to be developed before the pictures could be seen."
    ],
    purpose: "Capturing photographs on a removable roll of film",
    limitation: "Photos could not be viewed instantly, and the film had to be developed",
    replacement: "Digital cameras and smartphone cameras",
    choices: {
      identify: ["35 mm film", "Photo memory card", "Cassette tape", "Photo slide"],
      purpose: ["Capturing photographs on a removable roll of film", "Organizing personal information", "Recording portable audio", "Researching without the internet"],
      replacement: ["Digital cameras and smartphone cameras", "Digital presentations and videos", "USB flash drives and cloud storage", "Digital audio files and streaming services"]
    }
  },
  {
    id: "dial-up-internet",
    image: "images/dial-up-internet.png",
    relic: "Dial-up internet",
    clues: [
      "I connected through a telephone line.",
      "I made beeps, squeals, and static while connecting.",
      "The telephone often could not be used while I was online.",
      "I used a modem to connect a computer to the internet."
    ],
    purpose: "Connecting home computers to online services and the internet",
    limitation: "Slow speeds and use of the telephone line",
    replacement: "Broadband, cable, fiber, and Wi-Fi connections",
    choices: {
      identify: ["Dial-up internet", "Cordless classroom mic", "Dot-matrix printer", "Overhead projector"],
      purpose: ["Connecting home computers to online services and the internet", "Displaying printed information", "Taking and storing photographs", "Playing audio recordings"],
      replacement: ["Broadband, cable, fiber, and Wi-Fi connections", "Online encyclopedias and search engines", "Digital projectors and interactive displays", "Smartphone cameras"]
    }
  },
  {
    id: "palmpilot",
    image: "images/palmpilot.png",
    relic: "PalmPilot",
    clues: [
      "I fit in a person's hand.",
      "I stored contacts, appointments, notes, and lists.",
      "People often entered information with a stylus.",
      "I could synchronize information with a desktop computer."
    ],
    purpose: "Organizing personal information electronically",
    limitation: "Limited communication, internet, and multimedia capabilities",
    replacement: "Smartphones",
    choices: {
      identify: ["PalmPilot", "Scientific calculator", "Digital voice recorder", "Portable label maker"],
      purpose: ["Organizing personal information electronically", "Displaying lessons on a wall", "Providing digital reference information", "Connecting through a telephone line"],
      replacement: ["Smartphones", "Digital projectors and interactive displays", "Presentation slides and document cameras", "Broadband and Wi-Fi connections"]
    }
  },
  {
    id: "spirit-duplicator",
    image: "images/spirit-duplicator.png",
    relic: "Spirit duplicator (ditto machine)",
    clues: [
      "Teachers used me to make classroom copies.",
      "My copies often had purple-blue ink.",
      "Fresh pages sometimes had a strong smell.",
      "I used a prepared master sheet to produce each set of copies."
    ],
    purpose: "Making multiple paper copies for students",
    limitation: "Copies could fade, and the process used special masters and fluid",
    replacement: "Photocopiers, printers, and digital handouts",
    choices: {
      identify: ["Spirit duplicator (ditto machine)", "Fax machine", "Overhead projector", "Laminator"],
      purpose: ["Making multiple paper copies for students", "Capturing photographs electronically", "Saving and moving computer files", "Storing sound on magnetic tape"],
      replacement: ["Photocopiers, printers, and digital handouts", "Digital audio files and streaming services", "USB flash drives and cloud storage", "Smartphones"]
    }
  },
  {
    id: "cd-rom-encyclopedia",
    image: "images/cd-rom-encyclopedia.png",
    relic: "CD-ROM encyclopedia",
    clues: [
      "I looked like a music CD.",
      "I contained articles, maps, images, audio, and video.",
      "Students could use me without connecting to the internet.",
      "My information could not be updated until a new disc was released."
    ],
    purpose: "Providing digital reference and research information",
    limitation: "Information could become outdated and was difficult to update",
    replacement: "Online encyclopedias, websites, and search engines",
    choices: {
      identify: ["CD-ROM encyclopedia", "Music mixtape", "Floppy disk", "Photo memory card"],
      purpose: ["Providing digital reference and research information", "Recording portable audio", "Displaying information to a group", "Organizing appointments and notes"],
      replacement: ["Online encyclopedias, websites, and search engines", "Digital projectors and interactive displays", "Digital presentations and videos", "Smartphone cameras"]
    }
  },
  {
    id: "dot-matrix-printer",
    image: "images/dot-matrix-printer.png",
    relic: "Dot-matrix printer",
    clues: [
      "I printed on paper with holes along the edges.",
      "I made a loud grinding sound.",
      "My letters were formed from tiny dots.",
      "My paper often came in one long, connected stack with perforated edges."
    ],
    purpose: "Printing text and simple graphics from a computer",
    limitation: "Printing was noisy, slow, and lower quality than modern printers",
    replacement: "Inkjet and laser printers",
    choices: {
      identify: ["Dot-matrix printer", "Fax machine", "Paper shredder", "CD-ROM drive"],
      purpose: ["Printing text and simple graphics from a computer", "Presenting visual lessons and stories", "Connecting home computers to the internet", "Providing reference information"],
      replacement: ["Inkjet and laser printers", "Broadband and Wi-Fi connections", "Online encyclopedias and search engines", "USB flash drives and cloud storage"]
    }
  }
];

const screens = {
  welcome: document.querySelector("#welcome-screen"),
  directions: document.querySelector("#directions-screen"),
  list: document.querySelector("#exhibit-list-screen"),
  exhibit: document.querySelector("#exhibit-screen"),
  score: document.querySelector("#score-screen"),
  reflection: document.querySelector("#reflection-screen")
};

const state = loadState();
let activeExhibitIndex = 0;
let activeChoices = {};

const elements = {
  completed: document.querySelector("#completed-count"),
  score: document.querySelector("#score-count"),
  meter: document.querySelector("#progress-meter"),
  grid: document.querySelector("#exhibit-grid"),
  finishButton: document.querySelector("#finish-button"),
  relicImage: document.querySelector("#relic-image"),
  imageFrame: document.querySelector(".image-frame"),
  placeholderLabel: document.querySelector("#placeholder-label"),
  placeholderPath: document.querySelector("#placeholder-path"),
  exhibitNumber: document.querySelector("#exhibit-number-label"),
  exhibitTitle: document.querySelector("#exhibit-title"),
  clueList: document.querySelector("#clue-list"),
  questionList: document.querySelector("#question-list"),
  form: document.querySelector("#investigation-form"),
  feedback: document.querySelector("#feedback-box"),
  reveal: document.querySelector("#reveal-box"),
  checkButton: document.querySelector("#check-button"),
  continueButton: document.querySelector("#continue-button"),
  scoreBadge: document.querySelector("#score-badge"),
  scoreMessage: document.querySelector("#score-message"),
  reflectionRelic: document.querySelector("#reflection-relic"),
  reflectionForm: document.querySelector("#reflection-form"),
  printTemplate: document.querySelector("#print-template")
};

document.querySelector("#enter-button").addEventListener("click", () => showScreen("directions"));
document.querySelector("#start-exhibits-button").addEventListener("click", () => showScreen("list"));
document.querySelector("#back-to-list-button").addEventListener("click", () => showScreen("list"));
document.querySelector("#continue-button").addEventListener("click", continueAfterExhibit);
document.querySelector("#finish-button").addEventListener("click", showFinalScore);
document.querySelector("#review-button").addEventListener("click", () => showScreen("list"));
document.querySelector("#reflection-button").addEventListener("click", () => showScreen("reflection"));
document.querySelector("#back-to-score-button").addEventListener("click", () => showScreen("score"));
document.querySelector("#print-button").addEventListener("click", printInvestigation);
document.querySelector("#reset-button").addEventListener("click", resetActivity);
document.querySelector("#try-again-button").addEventListener("click", resetActivity);
elements.form.addEventListener("submit", checkInvestigation);
elements.reflectionForm.addEventListener("input", saveReflection);
elements.relicImage.addEventListener("load", () => elements.imageFrame.classList.add("has-image"));
elements.relicImage.addEventListener("error", () => elements.imageFrame.classList.remove("has-image"));

renderReflectionChoices();
renderExhibitGrid();
updateProgress();
showScreen(state.screen === "exhibit" ? "list" : state.screen || "welcome");

function loadState() {
  const startingState = {
    screen: "welcome",
    exhibits: {},
    reflection: {}
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...startingState, ...saved } : startingState;
  } catch {
    return startingState;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  if (name === "score") {
    updateScoreDisplay();
  }
  screens[name].classList.add("active");
  state.screen = name;
  saveState();
  updateProgress();

  const heading = screens[name].querySelector("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: false });
  }
}

function renderExhibitGrid() {
  elements.grid.innerHTML = "";

  exhibits.forEach((exhibit, index) => {
    const record = getRecord(exhibit.id);
    const button = document.createElement("button");
    button.className = "tombstone-card";
    button.type = "button";
    button.innerHTML = `
      <span>Exhibit ${index + 1}</span>
      <strong>${record.completed ? exhibit.relic : "Mystery Relic"}</strong>
      <span>${record.completed ? `${record.points} of 3 points` : "Needs investigation"}</span>
      <span class="status-pill">${record.completed ? "Review Reveal" : "Investigate"}</span>
    `;
    button.addEventListener("click", () => openExhibit(index));
    elements.grid.append(button);
  });

  elements.finishButton.disabled = completedCount() !== exhibits.length;
}

function openExhibit(index) {
  activeExhibitIndex = index;
  const exhibit = exhibits[index];
  const record = getRecord(exhibit.id);
  activeChoices = buildChoices(exhibit, record);

  elements.exhibitNumber.textContent = `Exhibit ${index + 1}`;
  elements.exhibitTitle.textContent = record.completed ? exhibit.relic : "Mystery Relic";
  elements.clueList.innerHTML = exhibit.clues.map((clue) => `<li>${clue}</li>`).join("");
  elements.placeholderLabel.textContent = `Image Placeholder: Exhibit ${index + 1}`;
  elements.placeholderPath.textContent = `Add image: ${exhibit.image}`;
  elements.relicImage.alt = `Image for Exhibit ${index + 1}. If no custom image appears, use the clues and add a file at ${exhibit.image}.`;
  elements.relicImage.src = exhibit.image;
  elements.imageFrame.classList.remove("has-image");
  elements.feedback.classList.remove("active");
  elements.feedback.innerHTML = "";
  elements.reveal.classList.remove("active");
  elements.reveal.innerHTML = "";
  elements.continueButton.classList.add("hidden");
  elements.checkButton.classList.remove("hidden");
  elements.checkButton.disabled = false;
  elements.checkButton.textContent = "Check My Investigation";

  renderQuestions(exhibit, record);

  if (record.completed) {
    showCompletedReveal(exhibit, record);
  }

  showScreen("exhibit");
}

function buildChoices(exhibit, record) {
  if (record.choiceOrder) {
    return record.choiceOrder;
  }

  const randomized = {
    identify: shuffle(exhibit.choices.identify),
    purpose: shuffle(exhibit.choices.purpose),
    replacement: shuffle(exhibit.choices.replacement)
  };

  state.exhibits[exhibit.id] = { ...record, choiceOrder: randomized };
  saveState();
  return randomized;
}

function renderQuestions(exhibit, record) {
  const questions = [
    ["identify", "What is this technology relic?", exhibit.relic],
    ["purpose", "What problem did it help people solve?", exhibit.purpose],
    ["replacement", "What technology eventually replaced it?", exhibit.replacement]
  ];

  elements.questionList.innerHTML = questions.map(([key, prompt, answer]) => {
    const choices = activeChoices[key].map((choice) => {
      const checked = record.answers?.[key] === choice ? "checked" : "";
      return `
        <label class="choice" data-question="${key}" data-choice="${escapeAttribute(choice)}">
          <input type="radio" name="${key}" value="${escapeAttribute(choice)}" ${checked} ${record.completed ? "disabled" : ""}>
          <span>${choice}</span>
        </label>
      `;
    }).join("");

    return `
      <fieldset class="question-group" data-question="${key}" data-answer="${escapeAttribute(answer)}">
        <legend>${prompt}</legend>
        <div class="choice-list">${choices}</div>
      </fieldset>
    `;
  }).join("");
}

function checkInvestigation(event) {
  event.preventDefault();
  const exhibit = exhibits[activeExhibitIndex];
  const record = getRecord(exhibit.id);
  const formData = new FormData(elements.form);
  const answers = {
    identify: formData.get("identify"),
    purpose: formData.get("purpose"),
    replacement: formData.get("replacement")
  };

  if (!answers.identify || !answers.purpose || !answers.replacement) {
    elements.feedback.innerHTML = "<strong>Notice:</strong> Answer all three questions before checking this exhibit.";
    elements.feedback.classList.add("active");
    return;
  }

  const attempt = Math.min((record.attempts || 0) + 1, 2);
  const result = scoreAnswers(exhibit, answers);
  const completed = result.points === 3 || attempt >= 2;

  state.exhibits[exhibit.id] = {
    ...record,
    attempts: attempt,
    answers,
    points: completed ? result.points : 0,
    completed
  };

  markChoices(exhibit, answers);
  showFeedback(result, completed, attempt);

  if (completed) {
    showCompletedReveal(exhibit, state.exhibits[exhibit.id]);
  } else {
    elements.checkButton.textContent = "Try One More Time";
  }

  renderExhibitGrid();
  updateProgress();
  saveState();
}

function scoreAnswers(exhibit, answers) {
  const checks = {
    identify: answers.identify === exhibit.relic,
    purpose: answers.purpose === exhibit.purpose,
    replacement: answers.replacement === exhibit.replacement
  };

  return {
    checks,
    points: Object.values(checks).filter(Boolean).length
  };
}

function markChoices(exhibit, answers) {
  const answersByKey = {
    identify: exhibit.relic,
    purpose: exhibit.purpose,
    replacement: exhibit.replacement
  };

  document.querySelectorAll(".choice").forEach((choice) => {
    const key = choice.dataset.question;
    const selected = answers[key] === choice.dataset.choice;
    choice.classList.remove("correct-choice", "needs-look");

    if (selected && choice.dataset.choice === answersByKey[key]) {
      choice.classList.add("correct-choice");
    }

    if (selected && choice.dataset.choice !== answersByKey[key]) {
      choice.classList.add("needs-look");
    }
  });
}

function showFeedback(result, completed, attempt) {
  const labels = {
    identify: "Identification",
    purpose: "Purpose",
    replacement: "Replacement"
  };

  const lines = Object.entries(result.checks).map(([key, correct]) => {
    const icon = correct ? "Correct:" : "Needs another look:";
    return `<li><strong>${icon}</strong> ${labels[key]}</li>`;
  }).join("");

  const lead = completed
    ? `Investigation recorded. You earned ${result.points} of 3 points for this exhibit.`
    : `Attempt ${attempt} recorded. Check the items marked "Needs another look" and try once more.`;

  elements.feedback.innerHTML = `<p>${lead}</p><ul>${lines}</ul>`;
  elements.feedback.classList.add("active");
}

function showCompletedReveal(exhibit, record) {
  elements.exhibitTitle.textContent = exhibit.relic;
  elements.reveal.innerHTML = `
    <h3>Exhibit Reveal</h3>
    <dl>
      <dt>Relic</dt><dd>${exhibit.relic}</dd>
      <dt>Original purpose</dt><dd>${exhibit.purpose}</dd>
      <dt>Major limitation</dt><dd>${exhibit.limitation}</dd>
      <dt>Modern replacement</dt><dd>${exhibit.replacement}</dd>
      <dt>Score</dt><dd>${record.points} of 3 points</dd>
    </dl>
  `;
  elements.reveal.classList.add("active");
  elements.checkButton.classList.add("hidden");
  elements.continueButton.classList.remove("hidden");
  elements.form.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });

  if (record.answers) {
    markChoices(exhibit, record.answers);
  }
}

function continueAfterExhibit() {
  if (completedCount() === exhibits.length) {
    showFinalScore();
    return;
  }

  showScreen("list");
}

function showFinalScore() {
  updateScoreDisplay();
  showScreen("score");
}

function updateScoreDisplay() {
  const score = totalScore();
  const level = getLevel(score);
  elements.scoreBadge.textContent = `${score} / ${TOTAL_POINTS}`;
  elements.scoreMessage.innerHTML = `<strong>${level}</strong><br>${getLevelMessage(score)}`;
}

function getLevel(score) {
  if (score >= 24) return "Technology Time Traveler";
  if (score >= 19) return "Relic Researcher";
  if (score >= 13) return "Digital Detective";
  return "Technology Archaeologist in Training";
}

function getLevelMessage(score) {
  if (score >= 24) return "You tracked these relics across time with expert-level accuracy.";
  if (score >= 19) return "You uncovered strong evidence about how older tools shaped modern technology.";
  if (score >= 13) return "You spotted many important clues and connected several relics to their replacements.";
  return "You are building your investigation skills. Review the exhibits and look closely at the clues.";
}

function updateProgress() {
  elements.completed.textContent = completedCount();
  elements.score.textContent = totalScore();
  elements.meter.style.width = `${(completedCount() / exhibits.length) * 100}%`;
}

function completedCount() {
  return exhibits.filter((exhibit) => getRecord(exhibit.id).completed).length;
}

function totalScore() {
  return exhibits.reduce((sum, exhibit) => sum + (getRecord(exhibit.id).points || 0), 0);
}

function getRecord(id) {
  return state.exhibits[id] || {};
}

function renderReflectionChoices() {
  elements.reflectionRelic.innerHTML = '<option value="">Choose a relic</option>' + exhibits
    .map((exhibit) => `<option value="${escapeAttribute(exhibit.relic)}">${exhibit.relic}</option>`)
    .join("");

  Object.entries(state.reflection || {}).forEach(([key, value]) => {
    const field = elements.reflectionForm.elements[key];
    if (field) field.value = value;
  });
}

function saveReflection() {
  state.reflection = Object.fromEntries(new FormData(elements.reflectionForm).entries());
  saveState();
}

function printInvestigation() {
  saveReflection();
  const previousPrint = document.querySelector(".print-page");
  if (previousPrint) previousPrint.remove();

  const page = elements.printTemplate.content.firstElementChild.cloneNode(true);
  page.querySelector(".print-score").textContent = `Score: ${totalScore()} of ${TOTAL_POINTS} points - ${getLevel(totalScore())}`;
  const prompts = [
    ["The technology relic I chose", state.reflection.reflectionRelic],
    ["The problem it helped people solve", state.reflection.reflectionPurpose],
    ["One limitation it had", state.reflection.reflectionLimitation],
    ["The technology that replaced it", state.reflection.reflectionReplacement],
    ["One modern technology I think may become a relic someday", state.reflection.reflectionFuture]
  ];

  const list = page.querySelector("dl");
  list.innerHTML = prompts.map(([label, value]) => `<dt>${label}</dt><dd>${value || ""}</dd>`).join("");
  document.body.append(page);
  window.print();
}

function resetActivity() {
  if (!confirm("Reset the activity and clear saved progress on this device?")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
