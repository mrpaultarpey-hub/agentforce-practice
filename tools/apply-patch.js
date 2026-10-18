// Rewrites option text (and optionally why) in questions.js by question id and option index.
// Usage: node apply_patch.js <questions.js> <patch.js>
// patch.js exports { 'AG-001': { 0: 'new text', 2: { text: '...', why: '...' } } }
const fs = require('fs');
const path = require('path');

const file = path.resolve(process.argv[2]);
const patch = require(path.resolve(process.argv[3]));
let src = fs.readFileSync(file, 'utf8');

const escape = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const literal = /'((?:[^'\\]|\\.)*)'/;

let changed = 0;
for (const [id, edits] of Object.entries(patch)) {
  const start = src.indexOf(`id: '${id}'`);
  if (start < 0) throw new Error('Question not found: ' + id);
  const next = src.indexOf("id: '", start + 5);
  const end = next < 0 ? src.length : next;
  let block = src.slice(start, end);

  // Each option sits on one line that starts with "{ correct:".
  const lines = block.split('\n');
  const optionLines = lines.map((l, i) => (/^\s*\{ correct: (true|false), text: /.test(l) ? i : -1)).filter(i => i >= 0);

  // _stem replaces the whole stem: a string, or a list of alternative wordings.
  if (edits._stem !== undefined) {
    const first = lines.findIndex(l => /^\s*stem: /.test(l));
    const indent = lines[first].match(/^\s*/)[0];
    let last = first;
    if (/\[\s*$/.test(lines[first])) {
      while (!/^\s*\],?\s*$/.test(lines[last])) last++;
    }
    const stems = Array.isArray(edits._stem) ? edits._stem : [edits._stem];
    const replacement = stems.length === 1
      ? [`${indent}stem: '${escape(stems[0])}',`]
      : [`${indent}stem: [`, ...stems.map((s, i) => `${indent}  '${escape(s)}'${i < stems.length - 1 ? ',' : ''}`), `${indent}],`];
    lines.splice(first, last - first + 1, ...replacement);
    const shift = replacement.length - (last - first + 1);
    for (let i = 0; i < optionLines.length; i++) optionLines[i] += shift;
  }

  for (const [indexText, edit] of Object.entries(edits)) {
    if (indexText === '_stem') continue;
    const lineNo = optionLines[Number(indexText)];
    if (lineNo === undefined) throw new Error(`${id}: no option ${indexText}`);
    const { text, why } = typeof edit === 'string' ? { text: edit } : edit;
    let line = lines[lineNo];
    if (text !== undefined) {
      line = line.replace(/text: '((?:[^'\\]|\\.)*)'/, () => `text: '${escape(text)}'`);
    }
    if (why !== undefined) {
      line = line.replace(/why: '((?:[^'\\]|\\.)*)'/, () => `why: '${escape(why)}'`);
    }
    lines[lineNo] = line;
    changed++;
  }
  block = lines.join('\n');
  src = src.slice(0, start) + block + src.slice(end);
}

fs.writeFileSync(file, src);
console.log('options changed:', changed);
