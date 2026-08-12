// Edit this array to add, remove, or replace bands for future games.
const BAND_DATA = [
  {
    name: "Wham!",
    clue3Points: "In 1985, they became the first major Western pop act to perform in Communist China.",
    clue2Points: "The two members were George Michael and Andrew Ridgeley, who had been schoolmates before becoming pop stars.",
    clue1Point: "Hit Songs: \"Wake Me Up Before You Go-Go\" and \"Last Christmas.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wham_in_1984_2.jpg/960px-Wham_in_1984_2.jpg",
    imageAlt: "George Michael and Andrew Ridgeley of Wham performing in 1984.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Sony Music: WHAM! 10 Days in China", url: "https://www.sonymusic.com/sonymusic/wham-10-days-in-china/" },
      { label: "Wikipedia image: Wham!", url: "https://en.wikipedia.org/wiki/Wham!" }
    ]
  },
  {
    name: "Queen",
    clue3Points: "The lead singer designed the band's crest using the zodiac signs of all four members.",
    clue2Points: "Brian May built his famous Red Special guitar with his father. Part of it was made from wood from an old fireplace mantel.",
    clue1Point: "Hit Songs: \"Bohemian Rhapsody,\" \"We Are the Champions,\" and \"Don't Stop Me Now.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Queen_A_Night_At_The_Opera_%281975_Elektra_publicity_photo_02%29.jpg/960px-Queen_A_Night_At_The_Opera_%281975_Elektra_publicity_photo_02%29.jpg",
    imageAlt: "Queen in a 1975 publicity photo.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Freddie Mercury official biography", url: "https://www.freddiemercury.com/en/biography" },
      { label: "Wikipedia image: Queen", url: "https://en.wikipedia.org/wiki/Queen_(band)" }
    ]
  },
  {
    name: "Nirvana",
    clue3Points: "Their album Nevermind knocked Michael Jackson's Dangerous out of the No. 1 spot on the Billboard album chart in 1992.",
    clue2Points: "Kurt Cobain didn't know that Teen Spirit was a brand of deodorant when he chose the title of their biggest song.",
    clue1Point: "Hit Song: \"Smells Like Teen Spirit.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Nirvana_around_1992.jpg",
    imageAlt: "Nirvana band members around 1992.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Billboard: Nevermind chart history", url: "https://www.billboard.com/music/music-news/nirvanas-nevermind-turns-30-its-chart-history-9635615/" },
      { label: "Wikipedia image: Nirvana", url: "https://en.wikipedia.org/wiki/Nirvana_(band)" }
    ]
  },
  {
    name: "Heart",
    clue3Points: "Their first No. 1 song by two sisters was \"These Dreams.\"",
    clue2Points: "Ann and Nancy Wilson led this female-fronted hard-rock band in the early 1970s.",
    clue1Point: "Hit song: \"Barracuda.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/VH1_Divas_Salute_the_Troops%2C_Heart.jpg/960px-VH1_Divas_Salute_the_Troops%2C_Heart.jpg",
    imageAlt: "Ann and Nancy Wilson of Heart performing.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Rock & Roll Hall of Fame: Heart", url: "https://rockhall.com/inductees/heart/" },
      { label: "Wikipedia image: Heart", url: "https://en.wikipedia.org/wiki/Heart_(band)" }
    ]
  },
  {
    name: "Blondie",
    clue3Points: "This New York new-wave band was led by a female singer and mixed punk, disco, reggae, and rap.",
    clue2Points: "The band name came from the street comments heard by the fair-haired lead singer on the streets of New York.",
    clue1Point: "Hit Songs: \"Heart of Glass,\" \"Call Me,\" and \"One Way or Another.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Blondie1977_%28further_cropped%29%29.jpg/960px-Blondie1977_%28further_cropped%29%29.jpg",
    imageAlt: "Blondie in a 1977 band photo.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Rock & Roll Hall of Fame: Blondie", url: "https://rockhall.com/inductees/blondie/" },
      { label: "Wikipedia image: Blondie", url: "https://en.wikipedia.org/wiki/Blondie_(band)" }
    ]
  },
  {
    name: "KISS",
    clue3Points: "Their original four stage characters were The Starchild, The Demon, The Spaceman, and The Catman.",
    clue2Points: "Paul Stanley designed the now-iconic logo for this face-painted rock band known for platform boots and explosive stage shows.",
    clue1Point: "Their signature anthem is \"Rock and Roll All Nite.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Kiss_original_lineup_%281976%29.jpg",
    imageAlt: "The original KISS lineup in costume and makeup in 1976.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Paul Stanley official biography", url: "https://www.paulstanley.com/bio/" },
      { label: "Wikipedia image: KISS", url: "https://en.wikipedia.org/wiki/Kiss_(band)" }
    ]
  },
  {
    name: "Journey",
    clue3Points: "This San Francisco band was originally formed by former members of Santana and other Bay Area groups.",
    clue2Points: "Steve Perry became the voice most associated with the band, helping turn them into one of the biggest arena-rock groups of the late 1970s and 1980s.",
    clue1Point: "Solid Hits include \"Faithfully,\" \"Open Arms,\" and \"Don't Stop Believin'.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Journey_publicity_photo_2013.jpg",
    imageAlt: "Journey in a 2013 publicity photo.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Journey official site: About", url: "https://journeymusic.com/pages/about" },
      { label: "Wikipedia image: Journey", url: "https://en.wikipedia.org/wiki/Journey_(band)" }
    ]
  },
  {
    name: "Commodores",
    clue3Points: "This group formed while its members were students at Tuskegee Institute in Alabama.",
    clue2Points: "Before becoming a solo superstar, Lionel Richie was one of the group's lead singers and songwriters.",
    clue1Point: "Hits include \"Brick House,\" \"Easy,\" and \"Three Times a Lady.\"",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/The_Commodores_1970s_%28Motown_publicity_photo%29.jpg",
    imageAlt: "The Commodores in a 1970s Motown publicity photo, including Lionel Richie.",
    imageCredit: "Photo: Wikimedia Commons",
    sources: [
      { label: "Alabama Music Hall of Fame: The Commodores", url: "https://www.alamhof.org/commodore" },
      { label: "Wikimedia Commons image: The Commodores 1970s", url: "https://commons.wikimedia.org/wiki/File:The_Commodores_1970s_(Motown_publicity_photo).jpg" }
    ]
  }
];

const app = document.querySelector("#app");
const sourcesDialog = document.querySelector("#sourcesDialog");
const sourcesList = document.querySelector("#sourcesList");

const state = {
  screen: "setup",
  bands: [],
  currentBandIndex: 0,
  revealedClues: 0,
  answerRevealed: false
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentPointValue() {
  if (state.revealedClues <= 1) return 3;
  if (state.revealedClues === 2) return 2;
  return 1;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand-row">
        <img class="brand-pick" src="assets/pdf-rock-pick.png" alt="Rock and roll pick graphic from the original quiz PDF">
        <div>
          <p class="mini-title">Rock in One Word</p>
          <p class="mini-subtitle">How quickly can you name the band?</p>
        </div>
      </div>
      <div class="utility-actions">
        <button class="secondary-button" type="button" data-action="sources">Sources</button>
        ${state.screen !== "setup" ? '<button class="ghost-button" type="button" data-action="restart">New Game</button>' : ""}
      </div>
    </header>
  `;
}

function renderSetup() {
  app.innerHTML = `
    ${renderTopbar()}
    <main class="screen">
      <section class="setup-card">
        <h1 class="hero-title">Rock in One Word</h1>
        <p class="subtitle">How quickly can you name the band?</p>

        <div class="rules" aria-label="Rules">
          <div class="rule"><strong>Hard</strong>Hardest clue. Worth 3 points.</div>
          <div class="rule"><strong>Medium</strong>More familiar fact. Worth 2 points.</div>
          <div class="rule"><strong>Easy</strong>Hit songs or signature anthem. Worth 1 point.</div>
        </div>

        <p>
          Guess out loud after any clue. The host reveals clues, then reveals the
          band name and picture.
        </p>

        <div class="setup-actions">
          <button class="primary-button" type="button" data-action="start">Start Game</button>
        </div>
      </section>
    </main>
  `;
}

function startGame() {
  state.bands = [...BAND_DATA];
  state.currentBandIndex = 0;
  state.revealedClues = 0;
  state.answerRevealed = false;
  state.screen = "play";
  render();
}

function renderPlay() {
  const band = state.bands[state.currentBandIndex];
  const pointValue = currentPointValue();
  app.innerHTML = `
    ${renderTopbar()}
    <main class="screen">
      <section class="play-card">
        <p class="band-progress">Mystery Band ${state.currentBandIndex + 1} of ${state.bands.length}</p>
        <h1 class="mystery-title">${state.answerRevealed ? "The band is..." : "Mystery Band"}</h1>
        <div class="value-badge">Current value: ${pointValue} point${pointValue === 1 ? "" : "s"}</div>

        <div class="clue-grid">
          ${renderClueCard(1, "Hard - 3 Points", band.clue3Points)}
          ${renderClueCard(2, "Medium - 2 Points", band.clue2Points)}
          ${renderClueCard(3, "Easy - 1 Point", band.clue1Point)}
        </div>

        ${state.answerRevealed ? renderAnswerPanel(band, pointValue) : renderPlayActions()}
      </section>
    </main>
  `;
}

function renderClueCard(number, label, text) {
  const revealed = state.revealedClues >= number;
  const canReveal = !state.answerRevealed && state.revealedClues + 1 === number;
  const classes = ["clue-card"];
  if (!revealed && !canReveal) classes.push("locked");
  if (revealed) classes.push("revealed");
  const buttonAttrs = canReveal ? `data-action="reveal-clue" data-clue="${number}"` : "disabled";
  return `
    <button class="${classes.join(" ")}" type="button" ${buttonAttrs}>
      <span class="clue-label">${label}</span>
      <span class="${revealed ? "clue-text" : "covered"}">${revealed ? escapeHtml(text) : canReveal ? "Reveal Clue" : "Locked"}</span>
      <span class="sr-only">${revealed ? "Revealed" : canReveal ? "Available" : "Locked"}</span>
    </button>
  `;
}

function renderPlayActions() {
  const nextClue = state.revealedClues + 1;
  const revealNextText = nextClue <= 3 ? `Reveal ${4 - nextClue} Point Clue` : "Reveal Band";
  return `
    <div class="action-row">
      ${state.revealedClues > 0 ? '<button class="primary-button" type="button" data-action="know-it">I Know It</button>' : ""}
      ${state.revealedClues > 0 && state.revealedClues < 3 ? `<button class="secondary-button" type="button" data-action="reveal-clue" data-clue="${nextClue}">${revealNextText}</button>` : ""}
      ${state.revealedClues === 3 ? '<button class="secondary-button" type="button" data-action="know-it">Reveal Band</button>' : ""}
    </div>
  `;
}

function renderAnswerPanel(band, pointValue) {
  const nextLabel = state.currentBandIndex + 1 === state.bands.length ? "Finish" : "Next Band";
  return `
    <div class="answer-panel" aria-live="polite">
      <div class="band-reveal-copy">
        <p class="answer-eyebrow">The band is...</p>
        <h2 class="band-answer">${escapeHtml(band.name)}</h2>
      </div>
      <figure class="band-photo-card">
        <img class="band-photo" src="${escapeHtml(band.image)}" alt="${escapeHtml(band.imageAlt)}">
        <figcaption>${escapeHtml(band.imageCredit)}</figcaption>
      </figure>
    </div>
    <div class="action-row">
      <button class="primary-button" type="button" data-action="next-band">${nextLabel}</button>
    </div>
  `;
}

function nextBand() {
  if (state.currentBandIndex + 1 >= state.bands.length) {
    state.screen = "final";
    render();
    return;
  }
  state.currentBandIndex += 1;
  state.revealedClues = 0;
  state.answerRevealed = false;
  render();
}

function renderFinal() {
  app.innerHTML = `
    ${renderTopbar()}
    <main class="screen">
      <section class="final-card">
        <h1 class="final-title">The Show Is Over!</h1>
        <p class="subtitle">You made it through all ${BAND_DATA.length} mystery bands.</p>
        <div class="winner-banner">Tiebreakers can be added when they are ready.</div>
        <div class="final-actions">
          <button class="primary-button" type="button" data-action="play-again">Play Again</button>
        </div>
      </section>
    </main>
  `;
}

function renderSources() {
  const seen = new Set();
  sourcesList.innerHTML = BAND_DATA.map((band) => {
    const links = (band.sources || [{ label: band.name, url: band.source }])
      .filter((source) => {
        const key = `${source.label}|${source.url}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`)
      .join("<br>");
    return `
      <div class="source-item">
        <strong>${escapeHtml(band.name)}</strong>
        ${links}
      </div>
    `;
  }).join("");
}

function restartToSetup() {
  state.screen = "setup";
  render();
}

function playAgain() {
  state.bands = [...BAND_DATA];
  state.currentBandIndex = 0;
  state.revealedClues = 0;
  state.answerRevealed = false;
  state.screen = "play";
  render();
}

function render() {
  if (state.screen === "setup") renderSetup();
  if (state.screen === "play") renderPlay();
  if (state.screen === "final") renderFinal();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  if (!action) return;

  if (action === "sources") {
    renderSources();
    sourcesDialog.showModal();
  }
  if (action === "close-sources") sourcesDialog.close();
  if (action === "restart") restartToSetup();
  if (action === "start") startGame();
  if (action === "reveal-clue") {
    state.revealedClues = Math.max(state.revealedClues, Number(button.dataset.clue));
    render();
  }
  if (action === "know-it") {
    state.answerRevealed = true;
    render();
  }
  if (action === "next-band") nextBand();
  if (action === "play-again") playAgain();
});

sourcesDialog.addEventListener("click", (event) => {
  if (event.target === sourcesDialog) sourcesDialog.close();
});

render();
