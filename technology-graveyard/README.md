# The Technology Graveyard

A self-contained, GitHub Pages-ready activity for middle school students.

## Files

- `index.html` contains the activity structure.
- `styles.css` contains the graveyard theme, responsive layout, accessibility states, and print styles.
- `script.js` contains the exhibit data, randomized choices, scoring, local progress saving, reset, and printing.
- `images/` is ready for your custom relic images.

## Adding Images

Add image files with these exact names:

- `images/floppy-disk.png`
- `images/overhead-projector.png`
- `images/cassette-tape.png`
- `images/35-mm-film.png`
- `images/dial-up-internet.png`
- `images/palmpilot.png`
- `images/spirit-duplicator.png`
- `images/cd-rom-encyclopedia.png`
- `images/dot-matrix-printer.png`

If an image file is missing, the activity displays a clearly labeled placeholder instead.

The welcome screen and main menu also use `images/graveyard-scene.png`.

## Editing Questions

Open `script.js` and edit the `exhibits` array near the top of the file. Each exhibit includes clues, correct answers, limitations, replacements, image path, and answer choices.

## Publishing

Upload the `technology-graveyard` folder to GitHub Pages. No database, login, external API, package installation, or build step is required.
