// Checks questions.js for structural problems. Usage: node validate.js <path to questions.js>
global.window = {};
require(require('path').resolve(process.argv[2]));
const S = new Set(window.SECTIONS.map(s => s.id)); const ids = new Set(); let bad = 0; const count = {};
for (const q of window.QUESTIONS) {
  const right = q.options.filter(o => o.correct).length, wrong = q.options.length - right;
  const slots = q.show || (right > 1 ? right + 3 : 4);
  const problems = [];
  if (ids.has(q.id)) problems.push('duplicate id'); ids.add(q.id);
  if (!S.has(q.section)) problems.push('bad section');
  if (!right) problems.push('no right answer');
  if (wrong < slots - right) problems.push('not enough wrong options');
  if (!q.explanation || !q.source || !q.source.url) problems.push('missing explanation/source');
  const m = (Array.isArray(q.stem) ? q.stem : [q.stem]).join(' ').match(/Which (two|three|four)/);
  if (m && {two:2,three:3,four:4}[m[1]] !== right) problems.push('stem says ' + m[1] + ' but ' + right + ' right');
  if (problems.length) { bad++; console.log(q.id, problems.join(', ')); }
  count[q.section] = (count[q.section] || 0) + 1;
}
console.log(window.QUESTIONS.length, 'questions,', bad, 'with problems', JSON.stringify(count));
