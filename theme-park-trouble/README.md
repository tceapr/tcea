# Theme Park Trouble!

**Six attractions. Six bugs. One big opening day!**

A self-contained computational thinking game for grades 3–5. Local prototype only; not published or deployed. The existing `debug-haunted-house` project is untouched.

## Review locally

Open `index.html` directly in a current browser, or serve the repository:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8765/theme-park-trouble/`.

There is no install/build step, external runtime dependency, account, analytics, or student information collection. Progress is saved under `tceaThemeParkTrouble.v1` in this browser's localStorage, when available. Changing origins (for example, file URL versus localhost) uses a different save. Storage failures leave the game playable and display a notice.

**Teacher answer-key password: `TCEA`.** The guide itself is public. The password is a classroom courtesy gate, not secure authentication. Edit `TEACHER_PASSWORD` in `app.js` to change it. The answer key is generated from the same content data used by the game.

## Files and editing

- `index.html`: page shell, navigation, accessible status regions, reset confirmation.
- `content.js`: puzzle descriptions, initial programs, solutions, hints, explanations, map coordinates, and pure simulation logic. Both Test and Check Answer call `simulate`.
- `art.js`: original SVG park illustrations and gate scene.
- `app.js`: game screens, interaction, animations, teacher guide, validated local saves, reset.
- `styles.css`: responsive design, visible focus, print styles, reduced motion, celebration.
- `DESIGN.md`: puzzle plan, unique-solution verification, and reference review.
- `QA.md`: verification record and honest testing limits.
- `tests/logic.cjs`: exhaustive candidate-repair checks.
- `tests/state.cjs`: real application persistence/navigation handlers with a lightweight DOM stub.

Run automated checks with a current Node.js installation:

```sh
node tests/logic.cjs
node tests/state.cjs
node --check app.js
```

For a new puzzle, keep `initial`, `solution`, the simulation, hint, and explanation consistent. Update the tests and recheck the entire progression. The model state produces visual frames and text traces; checking is never a separate, unrelated answer comparison. Repaired attractions remain repaired when students revisit and experiment.

## Accessibility and classroom use

All controls are native buttons, selects, and forms. Reordering uses up/down/remove/return buttons instead of requiring drag-and-drop. Focus follows moved cards. Grid maps have text alternatives and simulations have step transcripts. Shapes and sign letters reinforce color. No sound is required. Reduced-motion preferences disable decorative movement; students can stop any test with Reset Test. Full reset requires an in-game confirmation.

The secret letters are **T I C K E T**, earned in numbered attraction order. The final riddle asks for an admission pass: **TICKET**. The gate opening, lights, moving attractions, celebration replay, and restart are separate from puzzle completion and persist correctly across refreshes. Older saves migrate to revised puzzles without removing letters students already earned.

Midway Mix-Up generates two distinct incorrect tiles from positions 7–12 for each new playthrough. That pair and the student’s edits persist through refreshes; Reset Activity creates a new pair.

## Credits and proposed licensing

Created as a TCEA educational activity prototype. Structure informed by TCEA's **Debug the Haunted House**, whose local source was reviewed first. All art for this game is original SVG; no branded characters or external assets are used.

Proposed license: **CC0 1.0**, matching the repository-root `LICENSE`. Attribution wording and licensing are subject to the owner's review before publication. This prototype does not change the repository's license.
