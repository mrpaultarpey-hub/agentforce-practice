// Agentforce Practice: picks, shows and marks questions from questions.js.
(function () {
  'use strict';

  const STORE_KEY = 'afs-progress-v1';
  const SECTIONS = window.SECTIONS;
  const QUESTIONS = window.QUESTIONS;
  const sectionById = Object.fromEntries(SECTIONS.map(s => [s.id, s]));

  const $ = id => document.getElementById(id);

  // Progress lives in browser storage. Every read and write is wrapped because
  // storage can be blocked, and the app still has to work without it.
  function loadProgress() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { saved = null; }
    const progress = saved && saved.v === 1 ? saved : { v: 1, q: {}, sel: null, day: null };
    if (!Array.isArray(progress.sel) || !progress.sel.length) progress.sel = SECTIONS.map(s => s.id);
    const today = new Date().toISOString().slice(0, 10);
    if (!progress.day || progress.day.date !== today) progress.day = { date: today, n: 0, c: 0 };
    return progress;
  }

  function saveProgress() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) { /* storage unavailable */ }
  }

  let progress = loadProgress();
  const recent = [];
  let current = null;

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function weightedPick(items, weightOf) {
    const total = items.reduce((sum, item) => sum + weightOf(item), 0);
    let r = Math.random() * total;
    for (const item of items) {
      r -= weightOf(item);
      if (r <= 0) return item;
    }
    return items[items.length - 1];
  }

  // Wrong or unseen questions come up more often. A run of right answers pushes a question back.
  function questionWeight(q) {
    const stats = progress.q[q.id];
    if (!stats) return 3;
    if (!stats.lastOk) return 6;
    return Math.max(0.15, 1 / (1 + stats.streak));
  }

  function pickQuestion() {
    const sections = SECTIONS.filter(s => progress.sel.includes(s.id) && QUESTIONS.some(q => q.section === s.id));
    const section = weightedPick(sections, s => s.weight);
    const pool = QUESTIONS.filter(q => q.section === section.id);

    // Keep recent questions and other wordings of the same idea out of the way where the pool allows it.
    const blockCount = Math.min(8, pool.length - 1);
    const blocked = new Set(blockCount > 0 ? recent.slice(-blockCount) : []);
    let candidates = pool.filter(q => !blocked.has(q.id) && !blocked.has(q.group));
    if (!candidates.length) candidates = pool.filter(q => q.id !== recent[recent.length - 1]);
    if (!candidates.length) candidates = pool;

    return weightedPick(candidates, questionWeight);
  }

  // Builds one showing of a question: a random wording, every right option, and enough
  // wrong options to fill the slots, all shuffled.
  function prepare(q) {
    const stems = Array.isArray(q.stem) ? q.stem : [q.stem];
    const right = q.options.filter(o => o.correct);
    const wrong = shuffle(q.options.filter(o => !o.correct));
    const slots = q.show || (right.length > 1 ? right.length + 3 : 4);
    const options = shuffle(right.concat(wrong.slice(0, Math.max(0, slots - right.length))));
    return { q, stem: stems[Math.floor(Math.random() * stems.length)], options, choose: right.length, picked: new Set(), done: false };
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  // Allows `code` in question text.
  function format(text) {
    return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function renderToday() {
    const day = progress.day;
    $('today').textContent = day.n ? `Today ${day.c}/${day.n}` : '';
  }

  function showQuestion() {
    current = prepare(pickQuestion());
    recent.push(current.q.id);
    if (current.q.group) recent.push(current.q.group);

    $('q-section').textContent = sectionById[current.q.section].name;
    $('q-choose').textContent = current.choose > 1 ? `Choose ${current.choose}` : '';
    $('q-stem').innerHTML = format(current.stem);

    const list = $('q-options');
    list.className = 'options' + (current.choose > 1 ? ' multi' : '');
    list.innerHTML = '';
    current.options.forEach((option, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'option';
      button.type = 'button';
      button.innerHTML = `<span class="mark">${String.fromCharCode(65 + index)}</span><span class="text">${format(option.text)}</span>`;
      button.addEventListener('click', () => toggle(index, button));
      item.appendChild(button);
      list.appendChild(item);
    });

    $('result').hidden = true;
    $('btn-submit').hidden = false;
    $('btn-submit').disabled = true;
    $('btn-next').hidden = true;
    window.scrollTo(0, 0);
  }

  function toggle(index, button) {
    if (current.done) return;
    const picked = current.picked;

    // A single-answer question swaps the choice. A multi-answer one toggles up to the limit.
    if (current.choose === 1) {
      picked.clear();
      document.querySelectorAll('.option.picked').forEach(b => b.classList.remove('picked'));
      picked.add(index);
    } else if (picked.has(index)) {
      picked.delete(index);
    } else if (picked.size < current.choose) {
      picked.add(index);
    }

    if (current.choose > 1) button.classList.toggle('picked', picked.has(index));
    else button.classList.add('picked');
    $('btn-submit').disabled = picked.size !== current.choose;
  }

  function submit() {
    if (current.done || current.picked.size !== current.choose) return;
    current.done = true;

    const isRight = current.options.every((option, index) => option.correct === current.picked.has(index));

    const buttons = document.querySelectorAll('#q-options .option');
    current.options.forEach((option, index) => {
      const button = buttons[index];
      button.disabled = true;
      button.classList.remove('picked');
      if (option.correct) button.classList.add('right');
      else if (current.picked.has(index)) button.classList.add('wrong');
      if (option.why) {
        const why = document.createElement('span');
        why.className = 'why';
        why.innerHTML = format(option.why);
        button.querySelector('.text').appendChild(why);
      }
    });

    const verdict = $('verdict');
    verdict.className = 'verdict ' + (isRight ? 'good' : 'bad');
    verdict.innerHTML = isRight
      ? '<span class="badge">&#10003;</span>Correct'
      : '<span class="badge">&#10007;</span>Not quite';
    $('explanation').innerHTML = current.q.explanation.split('\n\n').map(p => `<p>${format(p)}</p>`).join('');
    const source = $('source');
    source.hidden = !current.q.source;
    if (current.q.source) {
      source.href = current.q.source.url;
      source.textContent = 'Source: ' + current.q.source.title;
    }

    const stats = progress.q[current.q.id] || { n: 0, c: 0, streak: 0, lastOk: false };
    stats.n += 1;
    if (isRight) { stats.c += 1; stats.streak += 1; } else { stats.streak = 0; }
    stats.lastOk = isRight;
    progress.q[current.q.id] = stats;
    progress.day.n += 1;
    if (isRight) progress.day.c += 1;
    saveProgress();
    renderToday();

    $('result').hidden = false;
    $('btn-submit').hidden = true;
    $('btn-next').hidden = false;
    $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderSections() {
    const list = $('section-list');
    list.innerHTML = '';
    SECTIONS.forEach(section => {
      const questions = QUESTIONS.filter(q => q.section === section.id);
      let answered = 0;
      let right = 0;
      let seen = 0;
      questions.forEach(q => {
        const stats = progress.q[q.id];
        if (stats) { answered += stats.n; right += stats.c; seen += 1; }
      });
      const percent = answered ? Math.round(100 * right / answered) : 0;

      const row = document.createElement('li');
      row.className = 'section-row';
      row.innerHTML = `
        <label>
          <input type="checkbox" ${progress.sel.includes(section.id) ? 'checked' : ''}>
          <span>${escapeHtml(section.name)}</span>
          <span class="weight">${section.weight}%</span>
        </label>
        <div class="stats">${answered ? `${percent}% right over ${answered} answers` : 'Not started'} &middot; seen ${seen} of ${questions.length}</div>
        <div class="bar"><span style="width:${percent}%"></span></div>`;
      row.querySelector('input').addEventListener('change', event => {
        if (event.target.checked) progress.sel.push(section.id);
        else progress.sel = progress.sel.filter(id => id !== section.id);

        // Never allow an empty selection. Untick the last one and it ticks itself again.
        if (!progress.sel.length) {
          progress.sel = [section.id];
          event.target.checked = true;
        }
        saveProgress();
      });
      list.appendChild(row);
    });
    $('bank-size').textContent = `${QUESTIONS.length} questions in the bank.`;
  }

  function openSections() {
    renderSections();
    $('quiz').hidden = true;
    $('sections').hidden = false;
    window.scrollTo(0, 0);
  }

  function closeSections() {
    $('sections').hidden = true;
    $('quiz').hidden = false;

    // A question from a section that is no longer ticked gets replaced.
    if (!current || current.done || !progress.sel.includes(current.q.section)) showQuestion();
  }

  // Two taps to reset, so a stray tap can't wipe progress.
  let resetArmed = false;
  function reset() {
    const button = $('btn-reset');
    if (!resetArmed) {
      resetArmed = true;
      button.textContent = 'Tap again to wipe all scores';
      setTimeout(() => { resetArmed = false; button.textContent = 'Reset my progress'; }, 4000);
      return;
    }
    resetArmed = false;
    button.textContent = 'Reset my progress';
    progress = { v: 1, q: {}, sel: progress.sel, day: { date: progress.day.date, n: 0, c: 0 } };
    saveProgress();
    renderSections();
    renderToday();
  }

  $('btn-submit').addEventListener('click', submit);
  $('btn-next').addEventListener('click', showQuestion);
  $('btn-sections').addEventListener('click', () => ($('sections').hidden ? openSections() : closeSections()));
  $('btn-back').addEventListener('click', closeSections);
  $('btn-reset').addEventListener('click', reset);

  renderToday();
  showQuestion();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
