(() => {
  const $ = id => document.getElementById(id);
  const screens = ['start','game','end'];
  const shuffle = items => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let celebrationFrame = null, celebrationTimers = [];
  let mode = 'quick', questions = [], index = 0, score = 0, selected = null, revealed = false, mistakes = [], sound = false, quickPlayed = [];
  const colors = {red:'#e85d54',blue:'#5389d9',green:'#60a96f',yellow:'#eabf42',purple:'#9872c5',black:'#626574',white:'#a9a19a',brown:'#b58262',orange:'#ec9853',gray:'#8796a1',gold:'#d3a840',silver:'#9daeb9',pink:'#e78db3'};
  function show(id) { screens.forEach(name => $(name).hidden = name !== id); window.scrollTo(0,0); }
  function makeSet() {
    // Deal from shuffled color groups in rounds to keep adjacent colors apart.
    const pool = QUESTIONS.filter(q => mode === 'full' ? !quickPlayed.includes(q.expression) : q.quick);
    const groups = {}; shuffle(pool).forEach(q => (groups[q.color] ||= []).push(q));
    const result = []; let previous = '';
    while (Object.values(groups).some(g => g.length)) {
      let keys = shuffle(Object.keys(groups).filter(k => groups[k].length));
      if (keys.length > 1 && keys[0] === previous) [keys[0], keys[1]] = [keys[1], keys[0]];
      keys.forEach(k => { result.push(groups[k].pop()); previous = k; });
    }
    return result.slice(0, mode === 'quick' ? 10 : 15);
  }
  function clearCelebration() { if (celebrationFrame !== null) cancelAnimationFrame(celebrationFrame); celebrationFrame = null; celebrationTimers.forEach(clearTimeout); celebrationTimers = []; $('confetti').replaceChildren(); }
  function start() { clearCelebration(); questions = makeSet(); if (mode === 'quick') quickPlayed = questions.map(q => q.expression); index = 0; score = 0; mistakes = []; show('game'); render(); }
  function render() {
    selected = null; revealed = false; const q = questions[index];
    document.documentElement.style.setProperty('--accent', colors[q.color]);
    $('mode-label').textContent = mode === 'quick' ? 'QUICK SPLASH' : 'NEXT SPECTRUM';
    $('score').textContent = score; $('progress-label').textContent = `Saying ${index + 1} of ${questions.length}`;
    $('question-number').textContent = `${String(index + 1).padStart(2,'0')} / ${questions.length}`;
    $('color-label').textContent = `${q.color.toUpperCase()} EDITION`; $('expression').textContent = q.expression;
    $('progress').innerHTML = questions.map((_, i) => `<span class="${i < index ? 'complete' : ''}" style="--segment:${i % 6}"></span>`).join('');
    $('progress').setAttribute('aria-label', `${index} of ${questions.length} sayings completed`);
    const choices = shuffle([{text:q.meaning, correct:true},{text:q.wrong, correct:false}]);
    $('answers').replaceChildren(...choices.map((choice, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'answer'; button.setAttribute('role','radio'); button.setAttribute('aria-checked','false');
      const letter = document.createElement('span'); letter.className = 'letter'; letter.textContent = i ? 'B' : 'A';
      const text = document.createElement('span'); text.textContent = choice.text;
      const status = document.createElement('span'); status.className = 'answer-status'; button.append(letter,text,status);
      button.addEventListener('click', () => { if (revealed) return; selected = {choice,button}; document.querySelectorAll('.answer').forEach(b => { b.classList.remove('chosen'); b.setAttribute('aria-checked','false'); }); button.classList.add('chosen'); button.setAttribute('aria-checked','true'); $('reveal').disabled = false; });
      button.dataset.correct = choice.correct; return button;
    }));
    $('reveal-area').replaceChildren(); $('reveal-area').className = 'reveal-area'; $('reveal').hidden = false; $('reveal').disabled = true; $('next').hidden = true; $('next').innerHTML = (index === questions.length - 1 ? 'See My Results' : 'Next Saying') + ' <span>→</span>';
  }
  function chime() { if (!sound) return; try { const C = window.AudioContext || window.webkitAudioContext; const ctx = new C(); [440,554,659].forEach((frequency,i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = frequency; o.type = 'sine'; g.gain.setValueAtTime(.0001,ctx.currentTime+i*.09); g.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+i*.09+.02); g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+i*.09+.19); o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime+i*.09); o.stop(ctx.currentTime+i*.09+.2); }); setTimeout(() => ctx.close(), 800); } catch (_) {} }
  $('reveal').addEventListener('click', () => {
    if (!selected || revealed) return; revealed = true; const q = questions[index];
    if (selected.choice.correct) { score += 10; chime(); } else mistakes.push(q);
    $('score').textContent = score;
    document.querySelectorAll('.answer').forEach(button => { button.disabled = true; if (button.dataset.correct === 'true') { button.classList.add('correct'); button.querySelector('.answer-status').textContent = '✓ Correct'; } else if (button === selected.button) { button.classList.add('incorrect'); button.querySelector('.answer-status').textContent = 'Your pick'; } });
    const area = $('reveal-area'); area.classList.add('visible');
    const title = document.createElement('h3'); title.textContent = selected.choice.correct ? '✦ Colorfully Correct!' : 'Oops! That’s a Colorful Mix-Up!';
    const meaning = document.createElement('p'); meaning.textContent = `${q.expression} means ${q.meaning.charAt(0).toLowerCase() + q.meaning.slice(1)}`;
    const example = document.createElement('p'); example.className = 'example'; example.textContent = `Try it: “${q.example}”`;
    area.append(title, meaning, example); $('reveal').hidden = true; $('next').hidden = false;
    $('progress').children[index].classList.add('complete'); $('progress').setAttribute('aria-label', `${index + 1} of ${questions.length} sayings completed`);
  });
  $('next').addEventListener('click', () => { index++; if (index < questions.length) { render(); $('expression').focus?.(); } else finish(); });
  const awards = [
    [50, 'A Little Color Confused!', "You're just getting your colors warmed up!"],
    [60, 'Color Me Curious!', "You're starting to see the colorful picture!"],
    [70, 'Splash of Brilliance!', 'Your colorful thinking is shining through!'],
    [80, 'Color Me Clever!', "You've got a colorful way with words!"],
    [90, 'True Colors Showing!', 'Your figurative language skills are looking bright!'],
    [100, 'Color Me Impressed!', "You're painting a pretty impressive picture!"],
    [Infinity, 'Passed with Flying Colors!', 'Every shade, every saying, every answer. Perfect!']
  ];
  function burst(burstNumber) {
    const container = $('confetti');
    const palettes = [
      ['#e85d54','#ff9a8b','#bf3933'], ['#ef9551','#ffc278','#cf662e'],
      ['#e5b52f','#ffe17a','#bd891b'], ['#61a979','#a0db9b','#32805a'],
      ['#438f9a','#85d4ce','#256d78'], ['#568bd4','#9ac6f2','#305db2'],
      ['#7559b7','#b7a3e9','#533892'], ['#b15eb2','#e2a2d7','#863c8d'],
      ['#e9769c','#ffc0d1','#bb486f'], ['#e85d54','#f0bd42','#61a979','#568bd4','#ac79c6','#ef9551']
    ];
    const palette = palettes[burstNumber % palettes.length];
    const pieces = [];
    for (let i = 0; i < 56; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece' + (i % 3 === 0 ? ' ribbon' : '');
      piece.style.setProperty('--color', palette[i % palette.length]);
      piece.style.setProperty('--side', i % 2 ? '100%' : '0%');
      piece.style.setProperty('--travel', `${(i % 2 ? -1 : 1) * (35 + Math.random() * 45)}vw`);
      piece.style.setProperty('--rise', `${80 + Math.random() * 180}px`);
      piece.style.setProperty('--turn', `${(Math.random() * 5 + 2) * (i % 2 ? -1 : 1)}turn`);
      piece.style.setProperty('--duration', `${2 + Math.random() * .3}s`);
      container.append(piece); pieces.push(piece);
    }
    celebrationTimers.push(setTimeout(() => pieces.forEach(piece => piece.remove()), 2500));
  }
  function finish() {
    clearCelebration();
    const correct = score / 10, percentage = correct / questions.length * 100;
    const [, title, message] = awards.find(([limit]) => percentage < limit);
    $('correct-total').textContent = `${correct} / ${questions.length}`; $('final-score').textContent = score;
    $('title-award').textContent = title; $('encouragement').textContent = message;
    $('review').hidden = true; $('review-button').setAttribute('aria-expanded','false');
    show('end');
    const display = $('percentage'); const target = Math.round(percentage);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { display.textContent = `${target}%`; return; }
    display.textContent = '0%';
    const started = performance.now();
    function count(now) { const progress = Math.min((now - started) / 1200, 1); display.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}%`; if (progress < 1) celebrationFrame = requestAnimationFrame(count); else celebrationFrame = null; }
    celebrationFrame = requestAnimationFrame(count);
    burst(0);
    for (let i = 1; i < 10; i++) celebrationTimers.push(setTimeout(() => burst(i), i * 3000));
  }
  document.querySelectorAll('.mode').forEach(button => button.addEventListener('click', () => { mode = button.dataset.mode; document.querySelectorAll('.mode').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-checked', String(b === button)); }); }));
  $('play').addEventListener('click', start); $('again').addEventListener('click', start);
  $('other').addEventListener('click', () => { clearCelebration(); mode = mode === 'quick' ? 'full' : 'quick'; document.querySelector(`[data-mode="${mode}"]`).click(); show('start'); });
  $('review-button').setAttribute('aria-controls','review'); $('review-button').setAttribute('aria-expanded','false');
  $('review-button').addEventListener('click', () => { const review = $('review'); review.hidden = !review.hidden; $('review-button').setAttribute('aria-expanded', String(!review.hidden)); if (review.hidden) return; review.replaceChildren(); const heading = document.createElement('h3'); heading.textContent = 'Your Mix-Ups'; review.append(heading); if (!mistakes.length) { const p = document.createElement('p'); p.textContent = 'No Mix-Ups Here! You Passed with Flying Colors!'; review.append(p); } mistakes.forEach(q => { const article = document.createElement('article'); const h = document.createElement('h4'); h.textContent = q.expression; const p = document.createElement('p'); p.textContent = q.meaning; const ex = document.createElement('p'); ex.className = 'example'; ex.textContent = `“${q.example}”`; article.append(h,p,ex); review.append(article); }); });
  $('sound').addEventListener('click', () => { sound = !sound; $('sound').setAttribute('aria-pressed', String(sound)); $('sound').setAttribute('aria-label', `Turn sound ${sound ? 'off' : 'on'}`); $('sound').querySelector('span').textContent = `Sound ${sound ? 'on' : 'off'}`; });
})();
