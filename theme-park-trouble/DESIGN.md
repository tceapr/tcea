# Puzzle plan and reference review

## Reference

Reviewed `debug-haunted-house/index.html`, `script.js`, `styles.css`, and `README.md`, plus the repository-root `LICENSE`. The public reference URL was attempted, but the web reader could not retrieve it; the local source was available and supplied the full implementation.

Retained: six attraction progression, map, editable algorithms, hints, visual test runs, separate answer submission, earned letters, final unlock, teacher password, original vector art, and celebration.

Improved: single simulation engine for testing and answer checking; validated, guarded localStorage; draft edits survive refresh; tests cancel when navigating or resetting; distinct Test/Reset Test/Restore Original/Reset Activity functions; focus follows reordered cards; text map and step trace; final gate requires all six verified awards; replay restarts the gate transition and confetti; guide can be read without opening the answer key. New files are isolated in `theme-park-trouble/`.

## Attraction map

A garden-style illustrated park with six numbered attractions on a winding path. Desktop order runs 1–3 across the top and 4–6 back along the second row. Tablet/mobile order follows normal reading order. The next attraction is available; later stops explain which preceding stop is required. Completed stops remain available for experimentation.

## Puzzle specifications (teacher spoilers)

| Stop | Original bug | Complete repair | Letter |
|---|---|---|---|
| 1 Roller Coaster | Right, Right, Up, **Down**, Right, Right, Up | Change command 4 to Up. Start (column 1, row 5); finish (column 5, row 2). Every move is one square. | T |
| 2 Snack Shack | Lid, fruit, cup, serve, extra lid, sticker | Cup → fruit → lid → sticker on lid → serving tray. Remove extra lid. | I |
| 3 Bumper Car | Forward 3, left, Forward 3, left, Forward 2, **left** | Change command 6 to right. The car follows a U-shaped route around the tire island and reaches P, but the wrong final turn points its nose toward the tires instead of the exit. | C |
| 4 Ferris Wheel | Power on, full turn, seat bear, power off, return bear | Power on → seat bear → one full turn → return bear to platform → power off. | K |
| 5 Midway | Two randomly selected tiles from 7–12 break a shape rule, number rule, or both | Repair both tiles. Shapes repeat Star/Circle/Diamond while counts repeat 1/2/3/2. The overlapping cycles create 12 distinct combined positions before repeating. A new pair is generated on Reset Activity and remains stable through refreshes. | E |
| 6 Maze | IF B then right; ELSE IF Y then right | Change B rule to left; Y remains right. Apply one sign rule then move one square. The B rule must work at two signs. | T |

Final word: **TICKET**. Riddle: “I’m your pass to a day of rides and games. Show me at the entrance. What am I?” Letters are deliberately in attraction order; this is a meaning-and-reading puzzle, not an arbitrary scramble.

## Ambiguity and age checks

- Coaster and car lanes are explicit. Movement cannot silently wrap or clamp at an edge. A wrong move stops with feedback. Exactly one command may change.
- Fruit cup dependencies are stated explicitly: sticker on lid and only one lid. Each of the five needed steps requires the previous result. Students can return removed steps.
- Bumper Cars takes place in a 6×6 arena with a central tire island and a marked parking bay. The car follows relative Forward and Turn commands, reaches P, and must finish pointing toward the exit. This differs from the roller coaster’s absolute compass directions.
- The Ferris wheel is an explicitly labeled toy model. Its power, bear location, seat, platform, and completed turn are visible throughout the test. The fictional model rule that loading controls need power makes the five-step order fully determined.
- Midway gives two precise rules and six locked examples; later tiles remain editable. Its three-step shape cycle and four-step number cycle do not align again until tile 13, so the second row cannot be copied from the first. Exactly two distinct tiles from 7–12 are changed for each new playthrough, and the generated puzzle is saved so refreshes do not move the bugs. It cannot be solved merely by spotting an unusual color.
- Maze uses relative turns with visible orientation, letter-labeled signs, and a rule applied once per square. A maximum step bound prevents infinite runs.
- All incorrect programs remain editable; hints never auto-reveal a solution after a failure. Students earn a letter only through Check Answer.
- No passengers, accidents, countdown, penalties, lives, or personal information.

`tests/logic.cjs` confirms that all six original programs fail and all six intended repairs succeed. It enumerates every allowed one-command repair and ordering and confirms one valid repair per stated puzzle model. UI animations consume these same simulation frames.
