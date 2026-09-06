/* dashboard_script.js */
(function () {
  "use strict";

  var key = localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session');
  if (!key) { window.location.href = 'login.html'; return; }

  var users = JSON.parse(localStorage.getItem('heiyou_users') || '{}');
  var user = users[key] || {};
  if (typeof user.progress !== 'number') user.progress = 0; 
  var name = user.name || key.split('@')[0];

  document.getElementById('hello-name').textContent = name;

  var modules = [
    { title: "Hello, World & Syntax", desc: "Your first compile. printf, main, and program structure." },
    { title: "Variables & Types", desc: "int, char, float — storing and printing values." },
    { title: "Pointers & Memory", desc: "Addresses, dereferencing, and direct memory access." },
    { title: "Arrays & Strings", desc: "Contiguous memory, indexing, and the null terminator." },
    { title: "Structs & Data Structures", desc: "Bundle data, build linked lists, and think in structures." }
  ];

  function renderTower() {
    var p = Math.min(user.progress, modules.length);
    document.getElementById('done-count').textContent = p;
    document.getElementById('s-done').textContent = p;
    document.getElementById('progress-bar').style.width = (p / modules.length * 100) + '%';

    var html = '';
    modules.forEach(function(m, i) {
      var stateClass = i < p ? 'done' : (i === p ? 'now' : 'lock');
      var btnText = i < p ? 'Review' : (i === p ? 'Continue' : 'Locked');
      var btnClass = i < p ? 'btn btn-sm' : (i === p ? 'btn btn-primary btn-sm' : 'btn btn-sm is-disabled');

      html += `
        <div class="brick-item ${stateClass}">
          <div class="no">${i + 1}</div>
          <div class="brick-info">
            <h3>${m.title}</h3>
            <p>${m.desc}</p>
          </div>
          <div>
            <button class="${btnClass}" onclick="window.location.href='lesson.html?mod=${i}'">${btnText}</button>
          </div>
        </div>
      `;
    });
    document.getElementById('tower').innerHTML = html;
  }

  renderTower();

  var resetBtn = document.getElementById('reset-progress');
  if(resetBtn) {
      resetBtn.addEventListener('click', function() {
          if(confirm('Professor Wáng frowns. Are you sure you want to tear down your tower and start over?')) {
              user.progress = 0;
              users[key] = user;
              localStorage.setItem('heiyou_users', JSON.stringify(users));
              renderTower();
          }
      });
  }
})();
