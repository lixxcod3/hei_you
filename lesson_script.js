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

  // Resolve the curriculum from whichever source is present.
  async function loadCurriculum() {
    try { if (typeof curriculum !== 'undefined' && curriculum) return curriculum; } catch (e) {}
    if (typeof window !== 'undefined' && window.curriculum) return window.curriculum;
    var m = await import('./curriculum/index.js');   // modular folder fallback
    return m.curriculum || m.default;
  }

  try {
    // --- session guard ---
    var key = localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session');
    if (!key) { window.location.href = 'login.html'; return; }

    // --- load curriculum (global file or modular folder) ---
    var curriculumData;
    try {
      curriculumData = await loadCurriculum();
    } catch (e) {
      showFatal('Could not load the curriculum. Include curriculum_data.js before this script, or upload the "curriculum/" folder next to lesson.html (names are case-sensitive on GitHub Pages). Details: ' + e.message);
      return;
    }
    if (!curriculumData) { showFatal('The curriculum loaded but was empty.'); return; }

    // --- user record ---
    var users = JSON.parse(localStorage.getItem('heiyou_users') || '{}');
    var user = users[key] || {};
    if (typeof user.progress !== 'number') user.progress = 0;

    var urlParams = new URLSearchParams(window.location.search);
    var modIndex = parseInt(urlParams.get('mod')) || 0;
    var subIndex = parseInt(urlParams.get('sub')) || 0;

    var moduleData = curriculumData[modIndex];
    if (!moduleData || !moduleData.sub_lessons[subIndex]) { window.location.href = 'dashboard.html'; return; }

    var lesson = moduleData.sub_lessons[subIndex];
    var totalSubs = moduleData.sub_lessons.length;

    titleEl.textContent  = "Module " + (modIndex + 1) + ": " + moduleData.title;
    subNavEl.textContent = `Sub-lesson ${subIndex + 1} of ${totalSubs}: ${lesson.title}`;
    bodyEl.innerHTML     = lesson.theory;

    // --- engagement: counter, progress bar, brick step-dots ---
    var subCount = document.getElementById('sub-count');
    if (subCount) subCount.textContent = (subIndex + 1) + ' / ' + totalSubs;
    var fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = Math.round(((subIndex + 1) / totalSubs) * 100) + '%';
    var dotsWrap = document.getElementById('dots');
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (var d = 0; d < totalSubs; d++) {
        var brick = document.createElement('span');
        brick.className = 'brick' + (d < subIndex ? ' done' : (d === subIndex ? ' current' : ''));
        dotsWrap.appendChild(brick);
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

    function runCode() {
      var src = codeEl.value;
      var evalResult = lesson.validate(src);

      if (evalResult !== true) {
        outEl.innerHTML = '<span class="err" style="color:var(--crimson);">\u2717 Build failed</span>\n\n' + evalResult;
        verdictEl.className = 'verdict lose';
        verdictEl.innerHTML = loseFace + '<span>Professor W\u00e1ng: \u201cShame on you.\u201d Check your syntax.</span>';
        completeBtn.disabled = true;
        completeBtn.textContent = 'Run successful code to unlock';
        completeBtn.style.background = '';
        completeBtn.style.color = '';
      } else {
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

    // run with the keyboard: Cmd/Ctrl + Enter
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
    });

    document.getElementById('reset').addEventListener('click', function () {
      codeEl.value = lesson.starter;
      outEl.innerHTML = 'Write your solution above and press <b>Compile &amp; Run</b>...';
      verdictEl.className = 'verdict';
      verdictEl.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="9" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g></svg><span>Professor W\u00e1ng is watching.</span>';
      completeBtn.disabled = true;
      completeBtn.style.background = '';
      completeBtn.style.color = '';
    });

    completeBtn.addEventListener('click', function () {
      if (subIndex + 1 < totalSubs) {
        window.location.href = `lesson.html?mod=${modIndex}&sub=${subIndex + 1}`;
      } else {
        if (user.progress <= modIndex) {
          user.progress = modIndex + 1;
          users[key] = user;
          localStorage.setItem('heiyou_users', JSON.stringify(users));
        }
        window.location.href = 'dashboard.html';
      }
    });

  } catch (err) {
    showFatal(err && err.message ? err.message : String(err));
  }
});
