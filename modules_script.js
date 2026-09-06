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

  // 2. Hide the bottom CTA (signup/dashboard) for logged-in users
  var cta = document.querySelector('.cta');
  if (cta) cta.style.display = 'none';

  // 3. Loop through all 5 modules and unlock them all
  for (var i = 0; i < 5; i++) {
    var btn = document.getElementById('mod-link-' + i);
    var status = document.getElementById('mod-status-' + i);
    var article = document.getElementById('mod-article-' + i);

    if (btn && status && article) {
      // ALL modules are UNLOCKED for logged-in users, overriding the progress lock
      article.classList.remove('locked');
      article.classList.add('unlocked');
      
      status.className = 'status available';
      status.textContent = 'Available';

      btn.className = 'btn btn-primary btn-sm';
      btn.href = 'lesson.html?mod=' + i;
      
      // Still swap the button text based on their actual progress
      btn.textContent = (i < p) ? 'Review Lesson →' : 'Start Lesson →';
    }
  }
})();
