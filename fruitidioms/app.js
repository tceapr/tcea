const questions = [
  {
    idiom: "In a pickle",
    choices: [
      { text: "When the classroom computer froze right before the group presented their slides, they were in a pickle.", correct: true },
      { text: "The group was in a pickle because their slides opened perfectly and their presentation started on time.", correct: false }
    ]
  },
  {
    idiom: "The cherry on top",
    choices: [
      { text: "The class party was fun, and the extra recess afterward was the cherry on top.", correct: true },
      { text: "The class party was canceled, and the broken projector was the cherry on top.", correct: false }
    ]
  },
  {
    idiom: "Heard it through the grapevine",
    choices: [
      { text: "I heard it through the grapevine that the school play auditions are next week.", correct: true },
      { text: "I heard it through the grapevine when the principal announced it on the morning announcements.", correct: false }
    ]
  },
  {
    idiom: "Peachy keen",
    choices: [
      { text: "Ava said everything was peachy keen as she frowned, stomped her feet, and complained about her terrible day.", correct: false },
      { text: "After finishing her project early, Ava said, \"Everything is peachy keen!\"", correct: true }
    ]
  },
  {
    idiom: "Rotten tomatoes",
    choices: [
      { text: "The class loved the school talent show and clapped loudly. It was like throwing rotten tomatoes.", correct: false },
      { text: "The comedy act went badly, and the audience groaned as if they wanted to throw rotten tomatoes.", correct: true }
    ]
  },
  {
    idiom: "Plum forgot",
    choices: [
      { text: "I plum forgot my library book, so I was surprised when I opened my backpack and found it inside.", correct: false },
      { text: "I plum forgot to bring my library book, even though I had reminded myself three times that morning.", correct: true }
    ]
  },
  {
    idiom: "Go bananas",
    choices: [
      { text: "The crowd went bananas by sitting silently and reading quietly.", correct: false },
      { text: "The crowd went bananas when the team scored the winning point.", correct: true }
    ]
  },
  {
    idiom: "Sour grapes",
    choices: [
      { text: "After Julie did not make the soccer team, she said, \"I didn't want to be on that team anyway.\"", correct: true },
      { text: "After Julie did not make the soccer team, she congratulated her friend and said, \"You worked really hard.\"", correct: false }
    ]
  },
  {
    idiom: "Cool as a cucumber",
    choices: [
      { text: "Even during the spelling bee finals, Mia was cool as a cucumber.", correct: true },
      { text: "Jayden was cool as a cucumber while he screamed and knocked over his chair.", correct: false }
    ]
  },
  {
    idiom: "A lemon",
    choices: [
      { text: "My new scooter worked perfectly every day, so it was a lemon.", correct: false },
      { text: "My new scooter broke three times in one week. It turned out to be a lemon.", correct: true }
    ]
  },
  {
    idiom: "Cherry-pick",
    choices: [
      { text: "Maya cherry-picked only the facts that supported her opinion and ignored the rest.", correct: true },
      { text: "Maya cherry-picked by eating every cherry in the bowl.", correct: false }
    ]
  },
  {
    idiom: "Plum tuckered out",
    choices: [
      { text: "After taking a long nap, Noah was plum tuckered out and full of energy.", correct: false },
      { text: "After running laps in PE, Noah was plum tuckered out and needed a rest.", correct: true }
    ]
  },
  {
    idiom: "In the limelight",
    choices: [
      { text: "Sofia was in the limelight when she hid behind the curtain so no one could see her.", correct: false },
      { text: "During the talent show, Sofia was in the limelight when everyone watched her solo.", correct: true }
    ]
  },
  {
    idiom: "The apple of my eye",
    choices: [
      { text: "My little brother is the apple of my eye because he means so much to me.", correct: true },
      { text: "My sandwich is the apple of my eye because it fell on the floor.", correct: false }
    ]
  },
  {
    idiom: "When life gives you lemons, make lemonade",
    choices: [
      { text: "When the outdoor field day was rained out, the class created indoor relay games and still had fun.", correct: true },
      { text: "When the outdoor field day was rained out, the class sat around complaining and refused to try a new plan.", correct: false }
    ]
  }
];

const fruitImages = [
  "assets/apple.jpg",
  "assets/banana.jpg",
  "assets/cherry.jpg",
  "assets/grape.jpg",
  "assets/lemon.jpg",
  "assets/orange.jpg",
  "assets/peach.jpg",
  "assets/pear.jpg",
  "assets/pickle.jpg",
  "assets/pineapple.jpg",
  "assets/plum.jpg",
  "assets/strawberry.jpg",
  "assets/watermelon.jpg"
];
const idiomText = document.querySelector("#idiomText");
const questionCount = document.querySelector("#questionCount");
const correctText = document.querySelector("#correctText");
const wrongText = document.querySelector("#wrongText");
const progressBar = document.querySelector("#progressBar");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const startButton = document.querySelector("#startButton");
const splashScreen = document.querySelector("#splashScreen");
const quizPanel = document.querySelector("#quizPanel");
const thankYouGraphic = document.querySelector("#thankYouGraphic");
const choiceButtons = [document.querySelector("#choiceA"), document.querySelector("#choiceB")];
const fruitLayer = document.querySelector("#fruitLayer");

let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let answered = false;
let activeQuestions = [];
let lastQuestionOrder = "";

function updateScoreboard() {
  correctText.textContent = String(correctCount).padStart(2, "0");
  wrongText.textContent = String(wrongCount).padStart(2, "0");
}

function shuffleQuestions() {
  let shuffled = [];
  let orderKey = "";
  let attempts = 0;

  do {
    shuffled = [...questions];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    orderKey = shuffled.map((question) => question.idiom).join("|");
    attempts += 1;
  } while (orderKey === lastQuestionOrder && attempts < 8);

  lastQuestionOrder = orderKey;
  return shuffled;
}

function resetQuiz() {
  activeQuestions = shuffleQuestions();
  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  fruitLayer.textContent = "";
  renderQuestion();
}

function renderQuestion() {
  const question = activeQuestions[currentIndex];
  answered = false;

  idiomText.textContent = question.idiom;
  questionCount.textContent = `Idiom ${currentIndex + 1} of ${activeQuestions.length}`;
  updateScoreboard();
  progressBar.style.width = `${(currentIndex / activeQuestions.length) * 100}%`;
  feedback.textContent = "";
  feedback.className = "feedback";
  thankYouGraphic?.classList.add("is-hidden");
  document.querySelector(".question-area")?.classList.remove("results-mode");
  document.querySelector(".choices")?.classList.remove("is-hidden");
  nextButton.disabled = true;
  nextButton.textContent = "Choose a sentence";

  choiceButtons.forEach((button, index) => {
    button.className = "choice-button";
    button.disabled = false;
    button.querySelector(".choice-text").textContent = question.choices[index].text;
    button.setAttribute("aria-pressed", "false");
  });
}

function chooseAnswer(choiceIndex) {
  if (answered) {
    return;
  }

  answered = true;
  const question = activeQuestions[currentIndex];
  const selectedChoice = question.choices[choiceIndex];

  choiceButtons.forEach((button, index) => {
    const isCorrect = question.choices[index].correct;
    button.disabled = true;
    button.setAttribute("aria-pressed", index === choiceIndex ? "true" : "false");
    if (isCorrect) {
      button.classList.add("correct");
    }
  });

  if (selectedChoice.correct) {
    correctCount += 1;
    feedback.textContent = "Correct! Fruit is falling.";
    feedback.classList.add("good");
    dropFruit();
  } else {
    wrongCount += 1;
    choiceButtons[choiceIndex].classList.add("incorrect");
    feedback.textContent = "Not quite. The green sentence is the correct one.";
    feedback.classList.add("bad");
  }

  updateScoreboard();
  nextButton.disabled = false;
  nextButton.textContent = currentIndex === activeQuestions.length - 1 ? "Show results" : "Next question";
}

function dropFruit() {
  const amount = 22;

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("img");
    piece.className = "falling-fruit";
    piece.src = fruitImages[Math.floor(Math.random() * fruitImages.length)];
    piece.alt = "";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty("--size", `${Math.floor(Math.random() * 30) + 46}px`);
    piece.style.setProperty("--duration", `${Math.random() * 1.1 + 2.4}s`);
    piece.style.setProperty("--drift", `${Math.floor(Math.random() * 220) - 110}px`);
    piece.style.setProperty("--spin", `${Math.floor(Math.random() * 720) - 360}deg`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    fruitLayer.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function showResults() {
  const percent = Math.round((correctCount / activeQuestions.length) * 100);
  fruitLayer.textContent = "";
  progressBar.style.width = "100%";
  questionCount.textContent = "Finished";
  idiomText.textContent = "Final Results";
  feedback.className = correctCount >= wrongCount ? "feedback final-feedback good" : "feedback final-feedback bad";
  feedback.textContent = `${correctCount} correct, ${wrongCount} wrong. Final score: ${percent}%.`;
  document.querySelector(".question-area")?.classList.add("results-mode");
  document.querySelector(".choices")?.classList.add("is-hidden");
  thankYouGraphic?.classList.remove("is-hidden");
  nextButton.disabled = true;
  nextButton.textContent = "Done";
  updateScoreboard();
}

function advanceQuestion() {
  if (currentIndex === activeQuestions.length - 1) {
    showResults();
    return;
  }

  currentIndex += 1;
  renderQuestion();
}

choiceButtons.forEach((button, index) => {
  button.addEventListener("click", () => chooseAnswer(index));
});

startButton.addEventListener("click", () => {
  splashScreen.classList.add("is-hidden");
  quizPanel.classList.remove("is-hidden");
  resetQuiz();
});

nextButton.addEventListener("click", advanceQuestion);

restartButton.addEventListener("click", () => {
  resetQuiz();
});

resetQuiz();
