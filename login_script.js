/* lesson_script.js  */

(function () {
  "use strict";

  // Auth check
  var key = localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session');
  if (!key) { window.location.href = 'login.html'; return; }
  
  var users = JSON.parse(localStorage.getItem('heiyou_users') || '{}');
  var user = users[key];

  // Parse URL parameters
  var urlParams = new URLSearchParams(window.location.search);
  var modIndex = parseInt(urlParams.get('mod')) || 0;
  var subIndex = parseInt(urlParams.get('sub')) || 0;

  // Load data from curriculum_data.js
  var moduleData = curriculum[modIndex];
  if (!moduleData || !moduleData.sub_lessons[subIndex]) { 
      window.location.href = 'dashboard.html'; 
      return; 
  }

  var lesson = moduleData.sub_lessons[subIndex];
  var totalSubs = moduleData.sub_lessons.length;

  // Render UI
  document.getElementById('lesson-title').textContent = "Module " + (modIndex + 1) + ": " + moduleData.title;
  document.getElementById('sub-nav').textContent = `Sub-lesson ${subIndex + 1} of ${totalSubs}: ${lesson.title}`;
  document.getElementById('content-body').innerHTML = lesson.theory;
  
  var codeEl = document.getElementById('code');
  var outEl = document.getElementById('out');
  var verdictEl = document.getElementById('verdict');
  var completeBtn = document.getElementById('btn-complete');

  codeEl.value = lesson.starter;

  // Indent with Tab key in textarea
  codeEl.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var s = this.selectionStart;
      this.value = this.value.slice(0, s) + '    ' + this.value.slice(this.selectionEnd);
      this.selectionStart = this.selectionEnd = s + 4;
    }
  });

  // Print PDF trigger
  document.getElementById('btn-print').addEventListener('click', function() {
    window.print();
  });

  // SVG Icons for feedback
  var winFace = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#3F7A5C" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g><rect x="9" y="16" width="8" height="2" fill="#fff"/></svg>';
  var loseFace = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#A8324A" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g><rect x="9" y="17" width="8" height="2" fill="#fff"/></svg>';

  // Evaluate user code
  document.getElementById('run').addEventListener('click', function() {
    var src = codeEl.value;
    var evalResult = lesson.validate(src); // Call specific validation from JSON

    if (evalResult !== true) {
      outEl.innerHTML = '<span class="err">✗ Build failed</span>\n\n' + evalResult;
      verdictEl.className = 'verdict lose';
      verdictEl.innerHTML = loseFace + '<span>Professor Wáng: “Shame on you.” Check your syntax.</span>';
      
      completeBtn.disabled = true;
      completeBtn.textContent = 'Run successful code to unlock';
      completeBtn.style.background = '#e2e7f0';
      completeBtn.style.color = '#7a8398';
    } else {
      outEl.innerHTML = '<span class="ok">✓ Compiled successfully</span>\n\n[process exited with code 0]';
      verdictEl.className = 'verdict win';
      verdictEl.innerHTML = winFace + '<span>Professor Wáng: “Proud of you.” Code looks good!</span>';
      
      completeBtn.disabled = false;
      completeBtn.style.background = 'var(--gold)';
      completeBtn.style.color = 'var(--navy-dark)';
      
      // Update button text depending on progress
      if (subIndex + 1 < totalSubs) {
         completeBtn.textContent = 'Next Sub-lesson →';
      } else {
         completeBtn.textContent = 'Complete Module & Return →';
      }
    }
  });

  // Reset code editor
  document.getElementById('reset').addEventListener('click', function() {
    codeEl.value = lesson.starter;
    outEl.innerHTML = 'Write your solution above and press <b>Compile &amp; Run</b>...';
    verdictEl.className = 'verdict';
    verdictEl.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="9" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g></svg><span>Professor Wáng is watching.</span>';
    completeBtn.disabled = true;
  });

  // Handle progression to next sub-lesson or dashboard
  completeBtn.addEventListener('click', function() {
    if (subIndex + 1 < totalSubs) {
      // Go to next sub-lesson in the same module
      window.location.href = `lesson.html?mod=${modIndex}&sub=${subIndex + 1}`;
    } else {
      // Module complete, update global user progress
      if (user.progress <= modIndex) {
        user.progress = modIndex + 1;
        users[key] = user;
        localStorage.setItem('heiyou_users', JSON.stringify(users));
      }
      window.location.href = 'dashboard.html';
    }
  });

})();
