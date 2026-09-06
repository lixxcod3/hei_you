/* modules_script.js — guest gate for the curriculum.
   Default HTML shows the guest view (first modules only). If a session
   exists, unlock every module and switch the nav to the logged-in state. */
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
  if (!key) return; // guest: leave the limited view as-is

  /* logged in: unlock every locked module */
  var locked = document.querySelectorAll('.mod.locked');
  for (var i = 0; i < locked.length; i++) locked[i].classList.add('unlocked');

  /* hide the guest banner */
  var banner = document.getElementById('guest-banner');
  if (banner) banner.style.display = 'none';

  /* switch nav to the logged-in state */
  var guest = document.getElementById('nav-guest');
  var user = document.getElementById('nav-user');
  if (guest && user) {
    guest.style.display = 'none';
    user.style.display = 'flex';
    var u = getUsers()[key];
    var name = (u && u.name) ? u.name : key.split('@')[0];
    var nm = document.getElementById('nav-name');
    if (nm) nm.textContent = name;
  }
  var out = document.getElementById('nav-logout');
  if (out) out.addEventListener('click', function () {
    try { localStorage.removeItem('heiyou_session'); sessionStorage.removeItem('heiyou_session'); } catch (e) {}
    location.reload();
  });
})();
