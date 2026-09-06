/* session.js — shared logged-in navigation.
   Include on any page. When a session exists it hides the Log in / Sign up
   buttons (and the guest toast) and shows an account menu instead. */
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
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function logout() {
    try { localStorage.removeItem('heiyou_session'); sessionStorage.removeItem('heiyou_session'); } catch (e) {}
    location.href = 'index.html';
  }

  function run() {
    // wire any explicit logout controls on the page, logged in or not
    var outs = document.querySelectorAll('[data-logout]');
    for (var i = 0; i < outs.length; i++) outs[i].addEventListener('click', logout);

    var key = getSession();
    if (!key) return; // guest: keep Log in / Sign up buttons

    var header = document.querySelector('header') || document.body;
    var actions = document.querySelector('.nav-actions') || document.querySelector('.nav-right');

    // hide guest auth UI inside the header
    var links = header.querySelectorAll('a[href$="login.html"], a[href$="signup.html"]');
    for (var j = 0; j < links.length; j++) links[j].style.display = 'none';
    var g = document.getElementById('nav-guest'); if (g) g.style.display = 'none';
    var u = document.getElementById('nav-user'); if (u) u.style.display = 'none';
    var toast = document.getElementById('auth-toast-backdrop'); if (toast) toast.style.display = 'none';
    var st = document.createElement('style'); st.textContent = '#auth-toast-backdrop{display:none!important;}'; document.head.appendChild(st);

    if (!actions || actions.querySelector('.session-menu')) return;

    var user = getUsers()[key] || {};
    var name = user.name || key.split('@')[0];
    var menu = document.createElement('span');
    menu.className = 'session-menu';
    menu.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:wrap;';
    menu.innerHTML =
      '<a class="btn" href="profile.html" style="text-decoration:none;padding:11px 16px;font-size:14px;">Hi, ' + esc(name) + '</a>' +
      '<a class="btn btn-gold" href="dashboard.html" style="text-decoration:none;padding:11px 16px;font-size:14px;">Classroom</a>' +
      '<button type="button" class="btn" data-logout style="padding:11px 16px;font-size:14px;">Log out</button>';
    actions.appendChild(menu);
    menu.querySelector('[data-logout]').addEventListener('click', logout);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
