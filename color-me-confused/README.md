# Color Me Confused!

A colorful, self-contained figurative-language game for grades 3–6 and beyond. Open `index.html` in a browser to play. No accounts, dependencies, network connection, or student information are required. Sound is optional and off by default.

Quick Splash selects 10 beginner-friendly sayings from a shuffled, varied set. Next Spectrum selects 15 sayings, excluding the 10 from the most recently played Quick Splash. If played first, Next Spectrum selects 15 from the full bank. Choose an answer and select **Reveal the Meaning!**; the end screen offers a review of missed sayings. Play Again repeats the selected mode with a new shuffle; Try Another Mode returns to the mode chooser with the other mode selected.

## Publishing on GitHub Pages

1. Add the entire `color-me-confused` folder to your GitHub repository and push it to GitHub.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then choose the branch and folder containing the site (usually `main` and `/ (root)`). Save.
3. Once the site is published, visit `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/color-me-confused/` (adjust for a custom domain or user site).
4. In Google Sites, choose **Insert → Embed → By URL**, paste the published game URL, and resize the embedded frame. Publish the Google Site. A direct link to the game is also useful for smaller screens.

## Editing sayings

Edit `questions.js`. Each entry contains the expression, color theme, correct meaning, plausible incorrect meaning, example sentence, and `1` for eligibility in Quick Splash (or `0` for Next Spectrum only). Use a color already in `game.js`, or add a matching color to its `colors` object. Keep at least 10 Quick Splash entries.
