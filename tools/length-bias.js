// Reports how often the correct option is the longest. Usage: node length_bias.js <questions.js> [--list]
global.window = {};
require(require('path').resolve(process.argv[2]));
const qs = window.QUESTIONS;
let singles = 0, longest = 0, multi = 0, multiAllLongest = 0, ratioSum = 0;
const flagged = [];
for (const q of qs) {
  const right = q.options.filter(o => o.correct), wrong = q.options.filter(o => !o.correct);
  const maxWrong = Math.max(...wrong.map(o => o.text.length));
  const avgWrong = wrong.reduce((s, o) => s + o.text.length, 0) / wrong.length;
  if (right.length === 1) {
    singles++;
    const r = right[0].text.length;
    ratioSum += r / avgWrong;
    if (r > maxWrong) { longest++; flagged.push(q.id + ' ' + r + ' vs ' + maxWrong); }
  } else {
    multi++;
    if (Math.min(...right.map(o => o.text.length)) > maxWrong) { multiAllLongest++; flagged.push(q.id + ' (multi)'); }
  }
}
console.log(`single-answer: ${singles}, correct is longest: ${longest} (${Math.round(100*longest/singles)}%), avg correct/wrong length ratio ${(ratioSum/singles).toFixed(2)}`);
console.log(`multi-answer: ${multi}, all correct longer than every wrong: ${multiAllLongest}`);
if (process.argv[3] === '--list') console.log(flagged.join('\n'));
