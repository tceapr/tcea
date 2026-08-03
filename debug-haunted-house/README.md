# Debug the Haunted House

Debug the Haunted House is a self-contained browser activity for students in grades 3-5. Students complete six friendly Halloween debugging challenges, collect the letters T R E A T S, and unlock the final message.

## Run Locally

Open `index.html` in a browser.

You can also serve the folder with any local web server. For example, from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish With GitHub Pages

1. Put the `debug-haunted-house` folder in a GitHub repository.
2. In the repository settings, open Pages.
3. Choose the branch that contains this folder.
4. Select the repository root or the folder location that matches your setup.
5. Save, then open the GitHub Pages URL when publishing finishes.

## Activity Structure

- `index.html` contains the page structure, room sections, teacher guide, and final unlock area.
- `styles.css` contains the responsive Halloween design, layout, cards, grids, and motion preferences.
- `script.js` contains the puzzle data, interactions, answer checking, animations, saved progress, reset behavior, and final unlock.

The six rooms are:

1. The Crooked Path
2. The Potion Room
3. The Witch's Tower
4. The Pumpkin Workshop
5. The Banner Blunder
6. The Escape Hall

## Teacher Editing Notes

Most activity text and answers are in `script.js`.

- Change room names, letters, hints, or introductions in the `rooms` array.
- Change answer explanations in `roomExplanations`.
- Change Room 1 arrows in `room1Commands` and the Room 1 answer check.
- Change Room 2 and Room 4 card text in `renderRoom2`, `renderRoom4`, and the matching answer arrays inside `checkCurrentRoom`.
- Change Room 3 commands in `room3Commands` and the Room 3 answer check.
- Change Room 5 pattern choices in `room5Pattern` and the Room 5 answer check.
- Change Room 6 choices in `renderRoom6` and the correct answer inside `checkCurrentRoom`.
- Change the final word in `checkFinalWord`.
- Change the final message in `unlockFinalDoor`.
- Change the teacher guide password by editing `TEACHER_GUIDE_PASSWORD` in `script.js`. The default password is `TCEA`.
- Unlocking the teacher guide also unlocks all room cards for teacher preview during that browser session.

The activity saves completed rooms in the browser's local storage. The Reset Activity button clears that saved progress after confirmation.
