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
    label: "Final Round",
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
    image: "assets/fact-or-fiddle/smokymountains.png",
    alt: "Illustration of Dolly's Smoky Mountain childhood",
    answer: "FACT",
    explanation:
      "Dolly was born in Locust Ridge, Tennessee. She grew up with her parents and 11 siblings in a small cabin in the Great Smoky Mountains.",
  },
  {
    statement: "The doctor who delivered Dolly was paid with a sack of flour.",
    image: "assets/fact-or-fiddle/sackofcornmeal.png",
    alt: "Illustration of a sack of cornmeal",
    answer: "FIDDLE",
    explanation: "Close, but Dolly said her father paid the doctor with a sack of cornmeal.",
  },
  {
    statement: "Dolly's uncle gave her the first real guitar she owned.",
    image: "assets/fact-or-fiddle/bdayguitar.png",
    alt: "Illustration of Dolly's first real guitar",
    answer: "FACT",
    explanation:
      "Dolly first played a homemade guitar. Her uncle Bill Owens later recognized her talent and gave her her first store-bought guitar. He also helped her find early opportunities to perform.",
  },
  {
    statement: "Dolly wrote \"Jolene\" and \"I Will Always Love You\" on the same day.",
    image: "assets/fact-or-fiddle/wrote2songs.png",
    alt: "Illustration of two Dolly songs being written",
    answer: "FACT",
    explanation:
      "Dolly has said that she wrote both songs on the same remarkably productive day in 1973. They became two of her most famous songs.",
  },
  {
    statement: "Dolly created a signature line of wigs that is sold around the world.",
    image: "assets/fact-or-fiddle/wigs.png",
    alt: "Illustration of Dolly-style wigs",
    answer: "FIDDLE",
    explanation:
      "Dolly is famous for her collection of wigs, but she never launched an international signature wig line. Her stage wigs were custom-made for her.",
  },
  {
    statement: "Dolly recorded a secret song that cannot be released until 2045.",
    image: "assets/fact-or-fiddle/timecapsule.png",
    alt: "Illustration of a time capsule for a secret song",
    answer: "FACT",
    explanation:
      "Dolly recorded a song and placed it in a time capsule at Dollywood's DreamMore Resort. The time capsule is not supposed to be opened until 2045.",
  },
  {
    statement: "Dolly used her acrylic fingernails to help create the rhythm for \"9 to 5.\"",
    image: "assets/fact-or-fiddle/dollysnails.png",
    alt: "Illustration of Dolly's acrylic fingernails",
    answer: "FACT",
    explanation:
      "Dolly discovered that clicking her acrylic fingernails together sounded like a typewriter. That rhythm became an unforgettable part of \"9 to 5.\"",
  },
  {
    statement: "Dolly once entered a Dolly Parton look-alike contest and won first place.",
    image: "assets/fact-or-fiddle/contest.png",
    alt: "Illustration of a Dolly Parton look-alike contest",
    answer: "FIDDLE",
    explanation:
      "Dolly secretly entered a Dolly Parton look-alike contest on Santa Monica Boulevard. She exaggerated her appearance for the contest, but she did not win.",
  },
  {
    statement: "Dolly has full sleeves of brightly colored tattoos hidden beneath her clothes.",
    image: "assets/fact-or-fiddle/tattoo.png",
    alt: "Illustration of small pastel tattoos",
    answer: "FIDDLE",
    explanation:
      "Dolly said she had a few small, tasteful tattoos in soft pastel colors. She explained that some were used to cover scars, but she did not have full tattoo sleeves.",
  },
  {
    statement: "Dolly the sheep was the first mammal cloned from an adult cell and was named in Dolly Parton's honor.",
    image: "assets/fact-or-fiddle/dollyclone.png",
    alt: "Illustration of Dolly the cloned sheep",
    answer: "FACT",
    explanation:
      "Scientists created Dolly the sheep using a cell from a mammary gland. They named the famous sheep after Dolly Parton.",
  },
  {
    statement: "The Imagination Library begins mailing free books to children when they turn five.",
    image: "assets/fact-or-fiddle/imaginationlibrary.png",
    alt: "Illustration of books from the Imagination Library",
    answer: "FIDDLE",
    explanation:
      "The program begins much earlier. In participating communities, enrolled children receive a free book each month from birth until age five. The Imagination Library has gifted more than 300 million books around the world.",
  },
  {
    statement: "Dolly donated $1 million to COVID-19 research connected to the development of the Moderna vaccine.",
    image: "assets/fact-or-fiddle/covidvaccine.png",
    alt: "Illustration of vaccine research",
    answer: "FACT",
    explanation:
      "Dolly donated $1 million to Vanderbilt University Medical Center in 2020. Her gift supported COVID-19 research, including work connected to the Moderna vaccine.",
  },
  {
    statement: "Dollywood employees receive only a 50 percent discount on college tuition.",
    image: "assets/fact-or-fiddle/collegetuition.png",
    alt: "Illustration of college tuition support",
    answer: "FIDDLE",
    explanation:
      "Eligible employees can receive 100 percent coverage for tuition, fees, and required books and supplies in more than 100 fully funded programs through the GROW U program.",
  },
  {
    statement: "Dolly once lost a movie role because she refused to wear makeup.",
    image: "assets/fact-or-fiddle/movierole.png",
    alt: "Illustration of a movie role and makeup",
    answer: "FIDDLE",
    explanation:
      "There is no reliable account of Dolly losing a movie role for refusing to wear makeup. In fact, Dolly has often joked about how prepared she likes to be while wearing her signature makeup.",
  },
];

const nineFiveLevelOneQuestions = [
  {
    title: "Sports Plays",
    parts: ["A regulation baseball game has ", " innings, while a basketball team has ", " players on the court."],
    answers: ["9", "5"],
  },
  {
    title: "Shapin' Up",
    parts: ["A pentagon has ", " sides, while a nonagon has ", " sides."],
    answers: ["5", "9"],
  },
  {
    title: "Phrase It",
    parts: ["You are on cloud ", " when you are extremely happy, but you give someone a high ", "."],
    answers: ["9", "5"],
  },
  {
    title: "Going Roman",
    parts: ["IX equals ", ", while V equals ", "."],
    answers: ["9", "5"],
  },
  {
    title: "Alphabet Soup",
    parts: ["E is the ", "th letter of the alphabet, while I is the ", "th."],
    answers: ["5", "9"],
  },
  {
    title: "Elemental",
    parts: ["Fluorine has atomic number ", ", while boron has atomic number ", "."],
    answers: ["9", "5"],
  },
  {
    title: "Calendar Check",
    parts: ["September is the ", "th month of the year, while May is the ", "th."],
    answers: ["9", "5"],
  },
  {
    title: "Christmas Counting",
    parts: ["In The Twelve Days of Christmas, there are ", " ladies dancing and ", " golden rings."],
    answers: ["9", "5"],
  },
  {
    title: "Factor This",
    parts: ["", " x 19 = 95, while ", " x 19 = 171."],
    answers: ["5", "9"],
  },
];

const nineFiveLevelTwoQuestions = [
  {
    title: "County Counter",
    question: "Dolly Parton's home state of Tennessee has how many counties?",
    options: ["85", "95", "195"],
    correct: "95",
    fact: "Tennessee has 95 counties, including Sevier County, where Dolly Parton was born.",
  },
  {
    title: "Elemental 95",
    question: "Which element has atomic number 95?",
    options: ["Uranium", "Glitterium", "Americium"],
    correct: "Americium",
    fact: "Americium is element number 95 on the periodic table. It is a synthetic radioactive element.",
  },
  {
    title: "Hit the Highway",
    question: "Interstate 95 is best known for running along which part of the United States?",
    options: ["The East Coast", "The Rocky Mountains", "Straight through Dollywood"],
    correct: "The East Coast",
    fact: "Interstate 95 is one of the major north-south highways along the East Coast of the United States.",
  },
  {
    title: "Throwback Tech",
    question: "Which Microsoft operating system was released in 1995?",
    options: ["Windows Bedazzled", "Windows 3.1", "Windows 95"],
    correct: "Windows 95",
    fact: "Windows 95 was released by Microsoft in August 1995 and helped make the Start button a familiar part of personal computers.",
  },
  {
    title: "Going Roman",
    question: "How is 95 written in Roman numerals?",
    options: ["XCV", "VC", "DOLLY"],
    correct: "XCV",
    fact: "XCV represents 95 in Roman numerals. XC means 90 and V means 5.",
  },
  {
    title: "What's Your Angle?",
    question: "A 95-degree angle is:",
    options: ["Acute", "Obtuse", "Dramatic"],
    correct: "Obtuse",
    fact: "An obtuse angle measures more than 90 degrees but less than 180 degrees.",
  },
  {
    title: "Going Binary",
    question: "Which is 95 written in binary?",
    options: ["1010101", "1011111", "9995559"],
    correct: "1011111",
    fact: "The decimal number 95 is written as 1011111 in binary.",
  },
  {
    title: "Way Out There",
    question: "95 Arethusa is:",
    options: ["A comet", "An asteroid", "Dolly's secret backup tour bus"],
    correct: "An asteroid",
    fact: "95 Arethusa is an asteroid located in the main asteroid belt between Mars and Jupiter.",
  },
  {
    title: "Calling 95",
    question: "+95 is the international calling code for:",
    options: ["Malaysia", "Montana", "Myanmar"],
    correct: "Myanmar",
    fact: "The country calling code +95 is used for Myanmar.",
  },
  {
    title: "Ka-Chow!",
    question: "Which animated race car is famous for the number 95?",
    options: ["Mater", "Lightning McQueen", "Dolly Parton's pink convertible"],
    correct: "Lightning McQueen",
    fact: "Lightning McQueen from Pixar's Cars races with the number 95.",
  },
];

const timelineList = document.querySelector("#timeline-list");
const message = document.querySelector("#message");
const timelineChallenge = document.querySelector("#timeline-challenge");
const checkButton = document.querySelector("#check-button");
const tryAgainButton = document.querySelector("#try-again-button");
const resetButton = document.querySelector("#reset-button");
const firstChallengeShortcut = document.querySelector("#first-challenge-shortcut");
const secondChallengeShortcut = document.querySelector("#second-challenge-shortcut");
const thirdChallengeShortcut = document.querySelector("#third-challenge-shortcut");
const timelineChallengeShortcut = document.querySelector("#timeline-challenge-shortcut");
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
const fiddleQuestionIcon = document.querySelector("#fiddle-question-icon");
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
const nineToFive = document.querySelector("#nine-to-five");
const nineIntro = document.querySelector("#nine-intro");
const nineLevelOne = document.querySelector("#nine-level-one");
const nineLevelOneComplete = document.querySelector("#nine-level-one-complete");
const nineLevelTwo = document.querySelector("#nine-level-two");
const nineFinal = document.querySelector("#nine-final");
const startNineLevelOneButton = document.querySelector("#start-nine-level-one");
const startNineLevelTwoButton = document.querySelector("#start-nine-level-two");
const nineLevelOneProgress = document.querySelector("#nine-level-one-progress");
const nineLevelOneTitle = document.querySelector("#nine-level-one-title");
const nineLevelOneStatement = document.querySelector("#nine-level-one-statement");
const nineNumberChoices = document.querySelector("#nine-number-choices");
const nineCheckButton = document.querySelector("#nine-check-button");
const nineLevelOneFeedback = document.querySelector("#nine-level-one-feedback");
const unlockLevelTwoButton = document.querySelector("#unlock-level-two-button");
const nineLevelTwoProgress = document.querySelector("#nine-level-two-progress");
const nineLevelTwoQuestion = document.querySelector("#nine-level-two-question");
const nineLevelTwoOptions = document.querySelector("#nine-level-two-options");
const nineLevelTwoFeedback = document.querySelector("#nine-level-two-feedback");
const nineFactPanel = document.querySelector("#nine-fact-panel");
const nineFactText = document.querySelector("#nine-fact-text");
const nineNextQuestionButton = document.querySelector("#nine-next-question-button");
const ninePlayAgainButton = document.querySelector("#nine-play-again-button");
const nineBackButton = document.querySelector("#nine-back-button");
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
let nineLevelOneOrder = nineFiveLevelOneQuestions.map((_, index) => index);
let nineLevelOneIndex = 0;
let nineBlankValues = [null, null];
let nineActiveBlank = 0;
let nineLevelOneDone = false;
let nineLevelTwoOrder = nineFiveLevelTwoQuestions.map((_, index) => index);
let nineLevelTwoIndex = 0;
let nineLevelTwoAnswered = false;
let nineLevelTwoWrongChoices = new Set();
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
  setMessage("Beautiful work. The years are revealed, and the full Dolly timeline is complete.");
  launchPinkGlitterBursts(11);
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

function resetTimelineChallenge() {
  orderedIds = shuffle(events).map((event) => event.id);
  firstFactsShown = new Set();
  completed = false;
  completionPanel.hidden = true;
  checkButton.disabled = false;
  tryAgainButton.disabled = false;
  renderTimeline();
  setMessage("Drag, tap, or use the arrow buttons to arrange the cards from earliest to latest.");
}

function resetGame() {
  resetTimelineChallenge();
  resetWhichCameFirst();
  resetFactOrFiddle(false);
  resetNineToFive();
  openFirstChallenge(false);
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
  launchPinkGlitterBursts(10);
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

function openFirstChallenge(shouldScroll = true) {
  factOrFiddle.hidden = false;
  dateChallenge.hidden = true;
  nineToFive.hidden = true;
  timelineChallenge.hidden = true;
  if (shouldScroll) factOrFiddle.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openSecondChallenge() {
  factOrFiddle.hidden = true;
  dateChallenge.hidden = false;
  nineToFive.hidden = true;
  timelineChallenge.hidden = true;
  dateChallenge.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openThirdChallenge(shouldScroll = true) {
  factOrFiddle.hidden = true;
  dateChallenge.hidden = true;
  nineToFive.hidden = false;
  timelineChallenge.hidden = true;
  if (shouldScroll) nineToFive.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showNinePanel(panel) {
  [nineIntro, nineLevelOne, nineLevelOneComplete, nineLevelTwo, nineFinal].forEach((section) => {
    section.hidden = section !== panel;
  });
}

function resetNineToFive() {
  nineLevelOneOrder = nineFiveLevelOneQuestions.map((_, index) => index);
  nineLevelOneIndex = 0;
  nineBlankValues = [null, null];
  nineActiveBlank = 0;
  nineLevelOneDone = false;
  nineLevelTwoOrder = nineFiveLevelTwoQuestions.map((_, index) => index);
  nineLevelTwoIndex = 0;
  nineLevelTwoAnswered = false;
  nineLevelTwoWrongChoices = new Set();
  startNineLevelTwoButton.disabled = true;
  nineLevelOneFeedback.textContent = "";
  nineLevelOneFeedback.className = "nine-feedback";
  nineLevelTwoFeedback.textContent = "";
  nineLevelTwoFeedback.className = "nine-feedback";
  nineFactPanel.hidden = true;
  showNinePanel(nineIntro);
}

function currentNineLevelOneQuestion() {
  return nineFiveLevelOneQuestions[nineLevelOneOrder[nineLevelOneIndex]];
}

function currentNineLevelTwoQuestion() {
  return nineFiveLevelTwoQuestions[nineLevelTwoOrder[nineLevelTwoIndex]];
}

function startNineLevelOne() {
  nineLevelOneOrder = shuffle(nineFiveLevelOneQuestions.map((_, index) => index));
  nineLevelOneIndex = 0;
  nineLevelOneDone = false;
  startNineLevelTwoButton.disabled = true;
  renderNineLevelOne();
  showNinePanel(nineLevelOne);
}

function renderNineLevelOne() {
  const question = currentNineLevelOneQuestion();
  nineLevelOneProgress.textContent = `Level 1 | ${nineLevelOneIndex + 1} of ${nineFiveLevelOneQuestions.length}`;
  nineLevelOneTitle.textContent = question.title;
  nineLevelOneStatement.innerHTML = "";

  question.parts.forEach((part, index) => {
    nineLevelOneStatement.append(document.createTextNode(part));
    if (index < question.answers.length) {
      const blank = document.createElement("button");
      blank.className = "nine-blank";
      if (nineBlankValues[index]) blank.classList.add("filled");
      if (nineActiveBlank === index) blank.classList.add("active");
      blank.type = "button";
      blank.dataset.blankIndex = index;
      blank.textContent = nineBlankValues[index] || `Blank ${index + 1}`;
      blank.setAttribute("aria-label", `Blank ${index + 1}${nineBlankValues[index] ? ` filled with ${nineBlankValues[index]}` : ""}`);
      nineLevelOneStatement.append(blank);
    }
  });

  nineNumberChoices.hidden = nineActiveBlank === null;
  nineCheckButton.disabled = false;
}

function chooseNineBlank(index) {
  nineActiveBlank = index;
  renderNineLevelOne();
  const choice = nineNumberChoices.querySelector("[data-number-choice]");
  if (choice) choice.focus();
}

function placeNineNumber(value) {
  if (nineActiveBlank === null) return;
  nineBlankValues[nineActiveBlank] = value;
  const nextBlank = nineBlankValues.findIndex((item) => item === null);
  nineActiveBlank = nextBlank === -1 ? null : nextBlank;
  nineLevelOneFeedback.textContent = "";
  nineLevelOneFeedback.className = "nine-feedback";
  renderNineLevelOne();
  if (nineActiveBlank === null) {
    nineCheckButton.focus();
  }
}

function checkNineLevelOne() {
  const question = currentNineLevelOneQuestion();
  const hasBothAnswers = nineBlankValues.every(Boolean);
  if (!hasBothAnswers) {
    nineLevelOneFeedback.textContent = "Choose a blank, then pick 9 or 5 for both spots.";
    nineLevelOneFeedback.className = "nine-feedback notice";
    return;
  }

  const isCorrect = nineBlankValues.every((answer, index) => answer === question.answers[index]);
  if (!isCorrect) {
    nineLevelOneFeedback.textContent = "Almost! Switch them around and try again.";
    nineLevelOneFeedback.className = "nine-feedback incorrect";
    return;
  }

  nineLevelOneFeedback.textContent = nineLevelOneIndex % 2 === 0 ? "You got it!" : "That adds up!";
  nineLevelOneFeedback.className = "nine-feedback correct";

  window.setTimeout(() => {
    if (nineLevelOneIndex === nineFiveLevelOneQuestions.length - 1) {
      nineLevelOneDone = true;
      startNineLevelTwoButton.disabled = false;
      showNinePanel(nineLevelOneComplete);
      launchGentleSparkleBurst();
      return;
    }

    nineLevelOneIndex += 1;
    nineBlankValues = [null, null];
    nineActiveBlank = 0;
    nineLevelOneFeedback.textContent = "";
    nineLevelOneFeedback.className = "nine-feedback";
    renderNineLevelOne();
  }, 650);
}

function unlockNineLevelTwo() {
  nineLevelOneDone = true;
  startNineLevelTwoButton.disabled = false;
  startNineLevelTwo();
}

function startNineLevelTwo() {
  if (!nineLevelOneDone) {
    nineLevelOneFeedback.textContent = "Finish Level 1 first, then Level 2 will unlock.";
    nineLevelOneFeedback.className = "nine-feedback notice";
    return;
  }
  nineLevelTwoOrder = shuffle(nineFiveLevelTwoQuestions.map((_, index) => index));
  nineLevelTwoIndex = 0;
  nineLevelTwoAnswered = false;
  nineLevelTwoWrongChoices = new Set();
  renderNineLevelTwo();
  showNinePanel(nineLevelTwo);
}

function renderNineLevelTwo() {
  const question = currentNineLevelTwoQuestion();
  nineLevelTwoProgress.textContent = `Level 2 | Question ${nineLevelTwoIndex + 1} of ${nineFiveLevelTwoQuestions.length}`;
  nineLevelTwoQuestion.textContent = question.question;
  nineLevelTwoOptions.innerHTML = "";
  nineLevelTwoFeedback.className = "nine-feedback";
  if (!nineLevelTwoAnswered && !nineLevelTwoWrongChoices.size) {
    nineLevelTwoFeedback.textContent = "";
  } else if (!nineLevelTwoAnswered) {
    nineLevelTwoFeedback.className = "nine-feedback incorrect";
  }

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "nine-option";
    button.type = "button";
    button.dataset.nineOption = option;
    button.textContent = option;
    if (nineLevelTwoWrongChoices.has(option)) button.classList.add("incorrect");
    if (nineLevelTwoAnswered) {
      button.disabled = true;
      if (option === question.correct) button.classList.add("correct");
    }
    nineLevelTwoOptions.append(button);
  });

  nineFactPanel.hidden = !nineLevelTwoAnswered;
  if (nineLevelTwoAnswered) {
    nineLevelTwoFeedback.textContent = "Correct! You found the 95 connection.";
    nineLevelTwoFeedback.className = "nine-feedback correct";
    nineFactText.textContent = question.fact;
    nineNextQuestionButton.textContent = nineLevelTwoIndex === nineFiveLevelTwoQuestions.length - 1 ? "Finish" : "Next Question";
  }
}

function answerNineLevelTwo(option) {
  if (nineLevelTwoAnswered) return;
  const question = currentNineLevelTwoQuestion();
  if (option !== question.correct) {
    nineLevelTwoWrongChoices.add(option);
    nineLevelTwoFeedback.textContent = "Not quite. Try another choice.";
    nineLevelTwoFeedback.className = "nine-feedback incorrect";
    renderNineLevelTwo();
    return;
  }

  nineLevelTwoAnswered = true;
  renderNineLevelTwo();
  nineNextQuestionButton.focus();
}

function nextNineLevelTwoQuestion() {
  if (!nineLevelTwoAnswered) return;
  if (nineLevelTwoIndex === nineFiveLevelTwoQuestions.length - 1) {
    showNineFinal();
    return;
  }

  nineLevelTwoIndex += 1;
  nineLevelTwoAnswered = false;
  nineLevelTwoWrongChoices = new Set();
  renderNineLevelTwo();
}

function showNineFinal() {
  showNinePanel(nineFinal);
  launchGentleSparkleBurst();
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
  fiddleQuestionIcon.src = question.image;
  fiddleQuestionIcon.alt = question.alt;
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
  launchPinkGlitterBursts(10);
}

function openTimelineChallenge() {
  factOrFiddle.hidden = true;
  dateChallenge.hidden = true;
  nineToFive.hidden = true;
  timelineChallenge.hidden = false;
  timelineChallenge.scrollIntoView({ behavior: "smooth", block: "start" });
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
  createSparkleShower();
  const interval = window.setInterval(() => {
    bursts += 1;
    createPinkGlitterBurst(bursts);
    if (bursts === Math.ceil(count / 2)) createSparkleShower();
    if (bursts >= count) window.clearInterval(interval);
  }, 300);
}

function launchGentleSparkleBurst() {
  resizeCanvas();
  const centerX = document.documentElement.clientWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ["#ff63bc", "#ffd76a", "#18aeb3", "#ffffff", "#bfa8ff"];

  for (let index = 0; index < 90; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3.2 + Math.random() * 7.2;
    glitterPieces.push({
      x: centerX,
      y: centerY,
      size: 2 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.26,
      life: 54 + Math.random() * 28,
      maxLife: 82,
      sparkle: Math.random() > 0.28,
      shape: Math.random() > 0.78 ? "circle" : Math.random() > 0.46 ? "sparkle" : "rect",
    });
  }

  if (!glitterAnimation) {
    glitterAnimation = requestAnimationFrame(drawPinkGlitter);
  }
}

function createSparkleShower() {
  resizeCanvas();
  const colors = ["#ff2f9d", "#ff63bc", "#ff9bd5", "#ffffff", "#ffd76a", "#18aeb3"];
  const width = document.documentElement.clientWidth;

  for (let index = 0; index < 110; index += 1) {
    glitterPieces.push({
      x: Math.random() * width,
      y: -20 - Math.random() * 120,
      size: 2 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: -1.8 + Math.random() * 3.6,
      vy: 2.8 + Math.random() * 4.8,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.26,
      life: 92 + Math.random() * 34,
      maxLife: 126,
      sparkle: Math.random() > 0.36,
      shape: Math.random() > 0.82 ? "circle" : "sparkle",
    });
  }

  if (!glitterAnimation) {
    glitterAnimation = requestAnimationFrame(drawPinkGlitter);
  }
}

function createPinkGlitterBurst(burstNumber = 1) {
  resizeCanvas();
  const centerX = document.documentElement.clientWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ["#ff2f9d", "#ff63bc", "#ff9bd5", "#ffffff", "#ffd76a", "#ffc7e7", "#18aeb3"];
  const bigBurst = burstNumber % 3 === 1;

  glitterFlashes.push({
    x: centerX,
    y: centerY,
    radius: 8,
    life: bigBurst ? 34 : 26,
    maxLife: bigBurst ? 34 : 26,
    color: bigBurst ? "#ffd76a" : "#ff2f9d",
  });

  for (let index = 0; index < (bigBurst ? 280 : 220); index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (bigBurst ? 7.5 : 6) + Math.random() * (bigBurst ? 16 : 13);
    glitterPieces.push({
      x: centerX,
      y: centerY,
      size: 2 + Math.random() * (bigBurst ? 10 : 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.42,
      life: 82 + Math.random() * 34,
      maxLife: 116,
      sparkle: Math.random() > 0.48,
      shape: Math.random() > 0.9 ? "circle" : Math.random() > 0.42 ? "sparkle" : "rect",
    });
  }

  if (glitterPieces.length > 3200) {
    glitterPieces.splice(0, glitterPieces.length - 3200);
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
    ctx.strokeStyle = flash.color || "#ff2f9d";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#ffd76a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(flash.x, flash.y, flash.radius * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    for (let ray = 0; ray < 26; ray += 1) {
      const angle = (Math.PI * 2 * ray) / 26;
      const inner = 18 + progress * 35;
      const outer = 120 + progress * 230;
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

    if (piece.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, piece.size * 0.58, 0, Math.PI * 2);
      ctx.fill();
    } else if (piece.sparkle || piece.shape === "sparkle") {
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

dateChallengeButton.addEventListener("click", openFirstChallenge);

checkButton.addEventListener("click", checkTimeline);
tryAgainButton.addEventListener("click", () => {
  renderTimeline();
  setMessage("Keep going. The cards are ready for another check when you are.");
});
resetButton.addEventListener("click", resetTimelineChallenge);
firstChallengeShortcut.addEventListener("click", openFirstChallenge);
secondChallengeShortcut.addEventListener("click", openSecondChallenge);
thirdChallengeShortcut.addEventListener("click", openThirdChallenge);
timelineChallengeShortcut.addEventListener("click", openTimelineChallenge);
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
  openSecondChallenge();
});
nineLevelOneStatement.addEventListener("click", (event) => {
  const blank = event.target.closest("[data-blank-index]");
  if (!blank) return;
  chooseNineBlank(Number(blank.dataset.blankIndex));
});
nineNumberChoices.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-number-choice]");
  if (!choice) return;
  placeNineNumber(choice.dataset.numberChoice);
});
startNineLevelOneButton.addEventListener("click", startNineLevelOne);
startNineLevelTwoButton.addEventListener("click", startNineLevelTwo);
nineCheckButton.addEventListener("click", checkNineLevelOne);
unlockLevelTwoButton.addEventListener("click", unlockNineLevelTwo);
nineLevelTwoOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-nine-option]");
  if (!option) return;
  answerNineLevelTwo(option.dataset.nineOption);
});
nineNextQuestionButton.addEventListener("click", nextNineLevelTwoQuestion);
ninePlayAgainButton.addEventListener("click", () => {
  resetNineToFive();
  startNineLevelOne();
});
nineBackButton.addEventListener("click", () => {
  resetNineToFive();
  openFirstChallenge();
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
