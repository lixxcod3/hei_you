/* dashboard_script.js — Logic for the logged-in Classroom */

(function () {
  "use strict";

  // 1. Auth Guard & Data Retrieval
  function getSession() {
    try { return localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session'); }
    catch (e) { return null; }
  }
  function getUsers() {
    try { return JSON.parse(localStorage.getItem('heiyou_users') || '{}'); }
    catch (e) { return {}; }
  }
  function saveUsers(usersData) {
    try { localStorage.setItem('heiyou_users', JSON.stringify(usersData)); } catch (e) {}
  }

  var key = getSession();
  if (!key) {
    window.location.href = 'login.html'; // Boot guests out
    return;
  }

  var users = getUsers();
  var user = users[key] || {};
  // Initialize mock progress if it doesn't exist
  if (typeof user.progress !== 'number') user.progress = 0; 
  var name = (user.name) ? user.name : key.split('@')[0];

  // 2. Curriculum Data
  var modules = [
    { title: "Hello, World & syntax", desc: "Your first compile. printf, main, and how a program starts." },
    { title: "Variables & types", desc: "int, char, float — storing and printing values." },
    { title: "Pointers & memory", desc: "Addresses, dereferencing, and direct memory access." },
    { title: "Arrays & strings", desc: "Contiguous memory, indexing, and the null terminator." },
    { title: "Structs & data structures", desc: "Bundle data, build linked lists, and think in structures." }
  ];

  // 3. DOM Elements
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('who').textContent = name;
    document.getElementById('hello-name').textContent = name;
    
    var towerEl = document.getElementById('tower');
    var progressEl = document.getElementById('progress');
    var doneCountEl = document.getElementById('done-count');
    var sDoneEl = document.getElementById('s-done');
    var bannerEl = document.getElementById('banner');
    
    // UI Feedback Banner
    function showBanner(msg, type) {
      bannerEl.className = 'banner show ' + (type || 'info');
      bannerEl.innerHTML = '<span>' + msg + '</span>';
      setTimeout(function(){ bannerEl.classList.remove('show'); }, 4000);
    }

    // 4. Render Logic
    function render() {
      // Cap progress at max modules
      var p = Math.min(user.progress, modules.length); 
      
      // Update counters & progress bar
      doneCountEl.textContent = p;
      sDoneEl.textContent = p;
      progressEl.innerHTML = '<div class="progress-bar" style="width: ' + ((p / modules.length) * 100) + '%;"></div>';

      // Build the tower HTML
      var html = '';
      for (var i = 0; i < modules.length; i++) {
        var m = modules[i];
        var stateClass, btnClass, btnText;
        
        if (i < p) {
          stateClass = 'done';
          btnClass = 'btn btn--sm';
          btnText = 'Review';
        } else if (i === p) {
          stateClass = 'now';
          btnClass = 'btn btn--primary btn--sm action-continue';
          btnText = 'Continue';
        } else {
          stateClass = 'lock';
          btnClass = 'btn btn--sm is-disabled';
          btnText = 'Locked';
        }

        html += `
          <div class="brick-item ${stateClass}">
            <div class="no">${i + 1}</div>
            <div class="brick-info">
              <h3>${m.title}</h3>
              <p>${m.desc}</p>
            </div>
            <div class="brick-action">
              <button class="${btnClass}" data-index="${i}">${btnText}</button>
            </div>
          </div>
        `;
      }
      towerEl.innerHTML = html;

      // Attach mock progression events
      var continueBtns = towerEl.querySelectorAll('.action-continue');
      continueBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (user.progress < modules.length) {
            user.progress++;
            users[key] = user;
            saveUsers(users);
            showBanner('Professor Wáng: “Proud of you.” Brick placed successfully!', 'win');
            render();
          }
        });
      });
    }

    render();

    // 5. Global Actions
    document.getElementById('logout').addEventListener('click', function () {
      try { localStorage.removeItem('heiyou_session'); sessionStorage.removeItem('heiyou_session'); } catch (e) {}
      window.location.href = 'index.html';
    });

    document.getElementById('reset').addEventListener('click', function () {
      if(confirm("Professor Wáng frowns. Are you sure you want to tear down your tower and start over?")) {
        user.progress = 0;
        users[key] = user;
        saveUsers(users);
        showBanner('Tower reset. Time to lay the first brick again.', 'info');
        render();
      }
    });

    var resumeBtn = document.getElementById('resume');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', function(e) {
        if(user.progress >= modules.length) {
          e.preventDefault();
          showBanner("You've finished all current modules! Hit the playground.", "info");
        }
      });
    }
  });
})();
