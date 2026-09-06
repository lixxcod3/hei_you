/* modules_script.js — Curriculum access handler */
(function () {
  "use strict";

  function getSession() {
    try { return localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session'); }
    catch (e) { return null; }
  }

  var key = getSession();
  
  // If guest, leave the DOM exactly as is (shows 2 modules open, 3 locked, guest banner, and footer CTA)
  if (!key) return; 

  // --- LOGGED IN BEHAVIOR ---
  
  // 1. Hide the guest banner at the top
  var banner = document.getElementById('guest-banner');
  if (banner) banner.style.display = 'none';

  // 2. Hide the bottom Call-To-Action (Sign up / Dashboard) section
  var ctaSection = document.querySelector('.cta');
  if (ctaSection) ctaSection.style.display = 'none';

  // 3. Unlock ALL modules completely
  for (var i = 0; i < 5; i++) {
    var btn = document.getElementById('mod-link-' + i);
    var status = document.getElementById('mod-status-' + i);
    var article = document.getElementById('mod-article-' + i);

    if (btn && status && article) {
      // Remove locked styles
      article.classList.remove('locked');
      article.classList.add('unlocked');
      
      // Update Status badge
      status.className = 'status available';
      status.textContent = 'Available';

      // Activate Button
      btn.className = 'btn btn-primary btn-sm';
      btn.href = 'lesson.html?mod=' + i + '&sub=0'; // Link to the first sub-lesson of that module
      btn.textContent = 'Start Module →';
    }
  }
})();
