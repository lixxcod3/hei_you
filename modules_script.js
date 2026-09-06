/* modules_script.js — Logic to sync the Curriculum catalog with user progress */
(function () {
  "use strict";

  function getSession() {
    try { return localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session'); }
    catch (e) { return null; }
  }
  
  function getUsers() {
    try { return JSON.parse(localStorage.getItem('heiyou_users') || '{}'); }
    catch (e) { return {}; }
  }

  var key = getSession();
  
  // If guest, leave the DOM exactly as is (shows 2 modules open, 3 locked, guest banner)
  if (!key) return; 

  // --- LOGGED IN BEHAVIOR ---
  var users = getUsers();
  var user = users[key] || {};
  var p = typeof user.progress === 'number' ? user.progress : 0;

  // 1. Hide the guest banner since they are logged in
  var banner = document.getElementById('guest-banner');
  if (banner) banner.style.display = 'none';

  // 2. Loop through all 5 modules and update based on user progress
  for (var i = 0; i < 5; i++) {
    var btn = document.getElementById('mod-link-' + i);
    var status = document.getElementById('mod-status-' + i);
    var article = document.getElementById('mod-article-' + i);

    if (btn && status && article) {
      if (i <= p) {
        // Module is UNLOCKED (either completed or next in line)
        article.classList.remove('locked');
        article.classList.add('unlocked');
        
        status.className = 'status available';
        status.textContent = 'Available';

        btn.className = 'btn btn-primary btn-sm';
        btn.href = 'lesson.html?mod=' + i;
        btn.textContent = (i < p) ? 'Review Lesson →' : 'Start Lesson →';
      } else {
        // Module is LOCKED (too far ahead)
        article.classList.add('locked');
        article.classList.remove('unlocked');
        
        status.className = 'status soon';
        status.textContent = 'Locked';

        btn.className = 'btn btn-sm is-disabled';
        btn.removeAttribute('href');
        btn.textContent = 'Locked';
      }
    }
  }
})();
