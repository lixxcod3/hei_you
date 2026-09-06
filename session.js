/* session.js — Global auth state & nav handler */
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
  if (!key) return; // Leave guest UI intact if no session is found

  var users = getUsers();
  var user = users[key] || {};
  var name = user.name || key.split('@')[0];

  // 1. Swap the global navigation buttons
  var navRight = document.querySelector('.nav-right');
  if (navRight) {
    navRight.innerHTML = `
      <a class="btn btn-sm" href="profile.html" style="background:transparent; border-color:transparent; color:#dfe4ee; box-shadow:none;">Hi, ${name}</a>
      <a class="btn btn-gold btn-sm" href="dashboard.html">Classroom</a>
      <button class="btn btn-sm" id="nav-logout" style="background:transparent; border-color:transparent; color:#dfe4ee; box-shadow:none;">Log out</button>
    `;
  }

  // 2. Global Log Out listener
  document.body.addEventListener('click', function(e) {
    if (e.target && (e.target.id === 'nav-logout' || e.target.id === 'logout')) {
        e.preventDefault();
        try {
            localStorage.removeItem('heiyou_session');
            sessionStorage.removeItem('heiyou_session');
        } catch (err) {}
        window.location.href = 'index.html';
    }
  });
})();
