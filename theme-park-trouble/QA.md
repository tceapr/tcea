# Verification record

The November 4 revision replaces Midway’s duplicated rows with overlapping shape and number cycles. Shapes repeat Star/Circle/Diamond every three tiles; numbers repeat 1/2/3/2 every four tiles. Their combined pattern does not repeat within the 12-tile display, so students must extend both rules rather than copy the first row. The same revision lets the Roller Coaster test execute all seven commands after it identifies the first wrong move. The coaster continues across visible off-track squares, every command is highlighted in order, and the final feedback reports the first problem without cutting the test short. Midway still creates two randomly selected incorrect tiles per new playthrough; the pair remains stable through refreshes, student edits persist, and Reset Activity generates a fresh valid pair.

Tested locally through November 4, 2026. No publication, deployment, remote write, or changes to the original Haunted House activity.

## Automated checks

- `node tests/logic.cjs`: **340 assertions passed**. Every initial program fails; every intended solution succeeds; invalid drafts fail; simulation frames exist. The original Roller Coaster test executes all seven commands after detecting the bug. Exhaustive enumeration of **1,864 candidate repairs/orderings** establishes one valid solution per stated repair model. Seeded generation verifies that every generated Midway puzzle has exactly two distinct later bugs.
- `node tests/state.cjs`: **31 assertions passed** using the real app in a small DOM stub. Tests fresh state, guarded final navigation, complete save restoration, reset of awards and drafts, malformed JSON, storage access/write failure, invalid awards, noncontiguous progression, earlier-save migration through version 4, and persistence of the generated Midway original.
- `node --check app.js`: passes.
- `git diff --exit-code -- debug-haunted-house`: passes; original source remains unchanged.

## Browser interaction checks

The November 4 Midway redesign was exercised in an isolated browser playthrough with two known broken tiles (tiles 8 and 11 in that run). The page displayed all 12 tiles and both rule cycles, rejected the broken pattern without revealing the repair, scanned the corrected sequence, accepted the fully repaired pattern, and awarded E. The verified solution's second row differs from the first, Diamond is available in every editable shape control, and the page has no horizontal overflow at 1440×1000 or 390×844. Reduced-motion mode was used for the interaction run.

The latest bumper-car revision was checked in the browser with the original program and the repaired program. The original reaches P and reports the wrong final orientation; changing command 6 to Turn right completes the test, earns C, advances progress to 3 of 6, and enables Next Attraction. The U-shaped route, central tire island, P bay, direction arrow, highlighted command, and success feedback were visually inspected.

The preceding October 23 revision added **17 focused browser checks** for the broader experience: original and repaired behavior for both changed puzzles; C and K letter awards; the bear’s power, location, and full-turn states; the remainder of the TICKET progression; final opening; revised Teacher Guide answers; absence of the retired star-stamping answer; and phone-width fit for the bright map, bumper arena, and Ferris wheel. Browser logs contained no errors or warnings after that complete progression.

The earlier full regression recorded **97 browser assertions** during interactive automation and manual visual review in the Codex in-app browser. These cover:

- All six original algorithms rejected by Check Answer and visibly failing during Test.
- All six corrected algorithms successfully simulated and accepted.
- Correct hints opened on all six attractions.
- Successful Test alone does not award a letter or unlock Next Attraction.
- Required sequence and initial locked map stops.
- Native keyboard-operated reorder buttons, removal, and return of a removed snack step.
- Reset Test during an active animation, with editing restored and drafts preserved.
- Navigation away during a test without stale animation updates.
- Unfinished coaster correction surviving refresh; original program restored after full reset.
- Earned letters T, I, C, K, E, T and all six completed map markers.
- Incorrect final word rejected; trimmed, case-insensitive TICKET accepted.
- Gate opens; lights turn on; wheel animation runs; required congratulations text and extension appear.
- Gate replay inspected at the start (near fully closed transform) and end (fully open transform). Gate transition now resets immediately to closed before replay.
- Opened-park state and all letters survive refresh.
- Teacher Guide opens; incorrect password rejected; TCEA reveals all six answers and TICKET; answer key can be hidden again.
- Cancel reset preserves progress. Confirm reset clears it, including after refresh.
- A second complete six-attraction playthrough and final unlock succeeds after reset.
- No warnings or errors in the browser log at the end of the full playthrough.

## Responsive and accessibility inspection

Checked the map and all six puzzle screens at measured CSS viewport sizes approximately **1366×767**, **1024×767**, **767×1024**, and **390×844**. Browser viewport controls are affected by the host's zoom scaling; the numbers above are the measured document dimensions, not nominal requested settings. Every checked page had document width equal to viewport width (no horizontal overflow).

- Inspected screenshots of home, map, puzzle models, and the completed gate scene.
- Select controls have explicit labels; native controls and headings appear in the accessibility tree.
- Keyboard Enter activates puzzle and reorder buttons; visible focus verified on the next disclosure control (solid outline, approximately 4 CSS pixels).
- Text alternatives describe grid coordinates, lane squares, orientation, signs, and model state. The text trace records each simulated step.
- Main body/cream contrast: 11.25:1; white/primary teal: 7.80:1; secondary text/cream: 6.11:1; purple pattern/white: 6.78:1. The model arrow background was darkened for stronger contrast.
- Reviewed reduced-motion media rules: decorative animation and transitions turn off; static success remains visible. Animation tests have a short, finite step trace in reduced-motion mode.
- No audio dependency, timer, lives, penalties, or personal information collection.

## Fixes made during QA

1. Restoring controls after a test now preserves the disabled boundaries of reorder buttons.
2. The Ferris wheel visibly rotates through a full circle with the toy bear in the blue seat and shows power, bear location, and completion state.
3. The midway scanner repeats the current tile beside the test controls for small screens.
4. Celebration replay commits a fully closed gate before starting the opening transition.
5. Darkened the model arrow background to improve contrast.
6. Replaced the bumper car’s abstract arrow tile with a recognizable top-view car whose body and nose marker rotate to show orientation.

## Remaining verification limits

- Physical Chromebook, iPad/touch hardware, Firefox, and assistive-technology sessions (VoiceOver/NVDA/ChromeVox) were not available for this pass. Native controls, responsive layouts, keyboard behavior, and the accessibility tree were checked; this is not a formal accessibility certification.
- Reduced-motion behavior was checked in an automated browser session using the corresponding media preference.
- The embedded browser disallows direct `file://` navigation. HTTP preview was fully tested. The buildless, non-module files can be opened manually in a normal browser, or served using the README command.
- Credit wording and the proposed CC0 note await owner review, as requested.

No known blocking functional issue remains from the checks above.
