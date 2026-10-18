# Agentforce Practice

Practice questions for the Salesforce Certified Agentforce Specialist exam (Spring '26 outline), as a web app that installs on an Android phone.

- Questions never run out. Answer order is shuffled and wrong options vary between showings.
- Every answer shows an explanation and a link to the Salesforce source.
- Pick any mix of sections. "All" follows the exam weightings.
- Questions you get wrong come back sooner. Progress is kept in the phone's browser.

All questions are original and checked against Salesforce Help, Trailhead or Salesforce developer docs. No exam dumps.

## Files

- `questions.js`: the question bank and section list. The format is described at the top of the file.
- `app.js`: picks, shows and marks questions, and saves progress.
- `sw.js`: service worker for offline use.
- `docs/exam-outline.md`: the official exam outline.

## Running locally

```
py -m http.server 8765
```

Then open http://127.0.0.1:8765.

## Checks before committing questions

```
node tools/validate.js questions.js
node tools/length-bias.js questions.js
```

`validate.js` checks ids, sections, answer counts and sources. `length-bias.js` checks that the right answer isn't usually the longest option, so length never gives the answer away. `apply-patch.js` applies option and stem rewrites by question id.
