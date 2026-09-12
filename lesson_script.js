/* lesson_script.js */
document.addEventListener('DOMContentLoaded', async function () {
  "use strict";

  var titleEl  = document.getElementById('lesson-title');
  var subNavEl = document.getElementById('sub-nav');
  var bodyEl   = document.getElementById('content-body');

  function showFatal(msg) {
    if (titleEl)  titleEl.textContent  = 'Lesson failed to load';
    if (subNavEl) subNavEl.textContent = 'Error';
    if (bodyEl)   bodyEl.innerHTML =
      '<h2>Something went wrong</h2>' +
      '<p style="color:#A8324A;font-weight:700;line-height:1.6;">' + msg + '</p>';
    console.error('[lesson]', msg);
  }

  async function loadCurriculum() {
    try { if (typeof curriculum !== 'undefined' && curriculum) return curriculum; } catch (e) {}
    if (typeof window !== 'undefined' && window.curriculum) return window.curriculum;
    var m = await import('./curriculum/index.js');
    return m.curriculum || m.default;
  }

  try {
    // --- session guard ---
    var key = localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session');
    if (!key) { window.location.href = 'login.html'; return; }

    // --- curriculum ---
    var curriculumData;
    try { curriculumData = await loadCurriculum(); }
    catch (e) { showFatal('Could not load the curriculum. Include curriculum_data.js before this script, or upload the "curriculum/" folder next to lesson.html. Details: ' + e.message); return; }
    if (!curriculumData) { showFatal('The curriculum loaded but was empty.'); return; }

    // --- user record + progress state ---
    var users = JSON.parse(localStorage.getItem('heiyou_users') || '{}');
    var user = users[key] || {};
    if (typeof user.progress !== 'number') user.progress = 0;            // fully-completed MODULES
    if (!user.subProgress || typeof user.subProgress !== 'object') user.subProgress = {}; // per-module cleared count
    function saveUser() { users[key] = user; localStorage.setItem('heiyou_users', JSON.stringify(users)); }

    var urlParams = new URLSearchParams(window.location.search);
    var modIndex = parseInt(urlParams.get('mod')) || 0;
    var subIndex = parseInt(urlParams.get('sub')) || 0;

    var moduleData = curriculumData[modIndex];
    if (!moduleData || !moduleData.sub_lessons[subIndex]) { window.location.replace('dashboard.html'); return; }

    var totalSubs = moduleData.sub_lessons.length;
    var totalModules = Object.keys(curriculumData).length;
    var prog = user.progress || 0;

    // How many sub-lessons are cleared in a module:
    //  - a fully completed module (index < prog) -> all of them (open for review)
    //  - the current module (index == prog)      -> whatever's stored (starts at 0)
    function clearedIn(mi) {
      if (mi < prog) return (curriculumData[mi] ? curriculumData[mi].sub_lessons.length : 0);
      return user.subProgress[mi] || 0;
    }

    // --- GATE: block jumping ahead by URL ---
    // Locked module? send the learner to where they actually are.
    if (modIndex > prog) {
      var m = Math.min(prog, totalModules - 1);
      var s = Math.min(user.subProgress[m] || 0, (curriculumData[m].sub_lessons.length - 1));
      window.location.replace('lesson.html?mod=' + m + '&sub=' + s);
      return;
    }
    var completedCount = clearedIn(modIndex);              // subs cleared in this module
    var maxSub = Math.min(completedCount, totalSubs - 1);  // furthest sub the learner may open
    if (subIndex > maxSub) {                               // tried to skip ahead -> clamp back
      window.location.replace('lesson.html?mod=' + modIndex + '&sub=' + maxSub);
      return;
    }

    // --- render lesson ---
    titleEl.textContent  = "Module " + (modIndex + 1) + ": " + moduleData.title;
    var lesson = moduleData.sub_lessons[subIndex];
    subNavEl.textContent = `Sub-lesson ${subIndex + 1} of ${totalSubs}: ${lesson.title}`;
    bodyEl.innerHTML     = lesson.theory;

    // --- engagement: counter, progress bar, clickable brick dots ---
    var subCount = document.getElementById('sub-count');
    if (subCount) subCount.textContent = (subIndex + 1) + ' / ' + totalSubs;
    var fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = Math.round((completedCount / totalSubs) * 100) + '%';

    var dotsWrap = document.getElementById('dots');
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (var d = 0; d < totalSubs; d++) {
        var cls = 'brick';
        if (d < completedCount) cls += ' done';
        if (d > maxSub) cls += ' locked';
        if (d === subIndex) cls += ' current';
        var el;
        if (d <= maxSub && d !== subIndex) {           // unlocked & not current -> clickable for review
          el = document.createElement('a');
          el.href = 'lesson.html?mod=' + modIndex + '&sub=' + d;
          el.title = 'Go to sub-lesson ' + (d + 1);
        } else {
          el = document.createElement('span');
          if (d > maxSub) el.title = 'Finish the earlier sub-lessons to unlock this';
        }
        el.className = cls;
        dotsWrap.appendChild(el);
      }
    }

    var codeEl      = document.getElementById('code');
    var outEl       = document.getElementById('out');
    var verdictEl   = document.getElementById('verdict');
    var completeBtn = document.getElementById('btn-complete');

    codeEl.value = lesson.starter;

    codeEl.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = this.selectionStart;
        this.value = this.value.slice(0, s) + '    ' + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = s + 4;
      }
    });

    var printBtn = document.getElementById('btn-print');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    var winFace  = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#3F7A5C" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g><rect x="9" y="16" width="8" height="2" fill="#fff"/></svg>';
    var loseFace = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#A8324A" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g><rect x="9" y="17" width="8" height="2" fill="#fff"/></svg>';

    var passed = false;   // did the learner pass THIS sub-lesson in this visit?

    function runCode() {
      var src = codeEl.value;
      var evalResult = lesson.validate(src);
      if (evalResult !== true) {
        passed = false;
        outEl.innerHTML = '<span class="err" style="color:var(--crimson);">\u2717 Build failed</span>\n\n' + evalResult;
        verdictEl.className = 'verdict lose';
        verdictEl.innerHTML = loseFace + '<span>Professor W\u00e1ng: \u201cShame on you.\u201d Check your syntax.</span>';
        completeBtn.disabled = true;
        completeBtn.textContent = 'Run successful code to unlock';
        completeBtn.style.background = '';
        completeBtn.style.color = '';
      } else {
        passed = true;
        outEl.innerHTML = '<span class="ok" style="color:var(--emerald);">\u2713 Compiled successfully</span>\n\n[process exited with code 0]';
        verdictEl.className = 'verdict win';
        verdictEl.innerHTML = winFace + '<span>Professor W\u00e1ng: \u201cProud of you.\u201d Code looks good!</span>';
        completeBtn.disabled = false;
        completeBtn.style.background = 'var(--gold)';
        completeBtn.style.color = 'var(--navy-dark)';
        completeBtn.textContent = (subIndex + 1 < totalSubs) ? 'Next Sub-lesson \u2192' : 'Complete Module & Return \u2192';
        completeBtn.classList.remove('pop'); void completeBtn.offsetWidth; completeBtn.classList.add('pop');
        var cur = dotsWrap && dotsWrap.querySelector('.brick.current');
        if (cur) cur.classList.add('lit');
      }
    }

    document.getElementById('run').addEventListener('click', runCode);
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
    });

    document.getElementById('reset').addEventListener('click', function () {
      passed = false;
      codeEl.value = lesson.starter;
      outEl.innerHTML = 'Write your solution above and press <b>Compile &amp; Run</b>...';
      verdictEl.className = 'verdict';
      verdictEl.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="9" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g></svg><span>Professor W\u00e1ng is watching.</span>';
      completeBtn.disabled = true;
      completeBtn.style.background = '';
      completeBtn.style.color = '';
    });

    completeBtn.addEventListener('click', function () {
      if (completeBtn.disabled || !passed) return;   // can't advance without a real pass
      // record that this sub-lesson is now cleared (only ever move forward)
      if ((user.subProgress[modIndex] || 0) < subIndex + 1) {
        user.subProgress[modIndex] = subIndex + 1;
      }
      if (subIndex + 1 < totalSubs) {
        saveUser();
        window.location.href = 'lesson.html?mod=' + modIndex + '&sub=' + (subIndex + 1);
      } else {
        user.subProgress[modIndex] = totalSubs;            // whole module cleared
        if (user.progress <= modIndex) user.progress = modIndex + 1;
        saveUser();
        window.location.href = 'dashboard.html';
      }
    });

  } catch (err) {
    showFatal(err && err.message ? err.message : String(err));
  }
});
