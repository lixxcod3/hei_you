/* profile_script.js — account profile (front-end, localStorage).
   Included in <head> for the gate; the rest runs on DOMContentLoaded. */
(function () {
  "use strict";
  function getSession() {
    try { return localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session'); }
    catch (e) { return null; }
  }
  /* gate: must be logged in */
  if (!getSession()) { location.replace('login.html'); return; }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var USERS_KEY = 'heiyou_users';
    function readUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch (e) { return {}; } }
    function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
    async function hashPassword(pw) {
      try {
        if (window.crypto && crypto.subtle) {
          var data = new TextEncoder().encode(pw + '::heiyou-salt');
          var buf = await crypto.subtle.digest('SHA-256', data);
          return 'sha256:' + Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
        }
      } catch (e) {}
      var h = 0, s = pw + '::heiyou-salt';
      for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; }
      return 'weak:' + h.toString(16);
    }
    /* accept accounts stored either hashed or (legacy) plaintext */
    async function passwordMatches(stored, entered) {
      if (stored === entered) return true;               // plaintext fallback
      var hashed = await hashPassword(entered);
      return stored === hashed;
    }

    var key = getSession();
    var users = readUsers();
    var user = users[key] || { email: key };
    var name = user.name || key.split('@')[0];

    var banner = document.getElementById('banner');
    var winIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#2c5741" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="15" width="10" height="2" fill="#fff"/></svg>';
    var loseIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#7d2537" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="16" width="10" height="2" fill="#fff"/></svg>';
    function show(type, html, ico) { banner.className = 'banner show ' + type; banner.innerHTML = (ico || '') + '<span>' + html + '</span>'; }
    function bad(id, on) { document.getElementById(id).classList[on ? 'add' : 'remove']('bad'); }

    /* populate */
    document.getElementById('email').value = user.email || key;
    document.getElementById('username').value = name;
    document.getElementById('who2').textContent = name;
    document.getElementById('avatar').textContent = (name[0] || '?').toUpperCase();

    /* save username */
    document.getElementById('save-name').addEventListener('click', function () {
      var v = document.getElementById('username').value.trim();
      if (v.length < 3) { bad('f-username', true); show('lose', 'Professor Wáng: “Shame on you.” 太可惜了 — username needs at least 3 characters.', loseIco); return; }
      bad('f-username', false);
      users = readUsers(); if (!users[key]) users[key] = { email: key };
      users[key].name = v; saveUsers(users);
      document.getElementById('who2').textContent = v;
      document.getElementById('avatar').textContent = v[0].toUpperCase();
      var menuName = document.querySelector('.session-menu a[href$="profile.html"]');
      if (menuName) menuName.textContent = 'Hi, ' + v;
      show('win', 'Professor Wáng: “Proud of you.” 好样的 — username updated.', winIco);
    });

    /* change password */
    document.getElementById('save-pw').addEventListener('click', async function () {
      var cur = document.getElementById('cur').value;
      var np = document.getElementById('newpw').value;
      var cp = document.getElementById('confpw').value;
      bad('f-cur', false); bad('f-new', false); bad('f-conf', false);

      users = readUsers();
      var stored = users[key] ? users[key].pw : undefined;

      if (stored !== undefined) {
        var ok = await passwordMatches(stored, cur);
        if (!ok) { bad('f-cur', true); show('lose', 'Professor Wáng: “Shame on you.” 太可惜了 — current password is incorrect.', loseIco); return; }
      }
      if (np.length < 8) { bad('f-new', true); show('lose', 'Professor Wáng: “Shame on you.” 太可惜了 — new password needs at least 8 characters.', loseIco); return; }
      if (np !== cp) { bad('f-conf', true); show('lose', 'Professor Wáng: “Shame on you.” 太可惜了 — the two new passwords don’t match.', loseIco); return; }

      if (!users[key]) users[key] = { email: key, name: name };
      users[key].pw = await hashPassword(np);
      saveUsers(users);
      document.getElementById('cur').value = '';
      document.getElementById('newpw').value = '';
      document.getElementById('confpw').value = '';
      show('win', 'Professor Wáng: “Proud of you.” 好样的 — password updated.', winIco);
    });

    /* clear error state as the user types */
    ['username', 'cur', 'newpw', 'confpw'].forEach(function (id) {
      var map = { username: 'f-username', cur: 'f-cur', newpw: 'f-new', confpw: 'f-conf' };
      document.getElementById(id).addEventListener('input', function () { bad(map[id], false); });
    });

    /* logout (session.js also wires [data-logout]) */
    document.getElementById('logout').addEventListener('click', function () {
      try { localStorage.removeItem('heiyou_session'); sessionStorage.removeItem('heiyou_session'); } catch (e) {}
      location.href = 'index.html';
    });
  });
})();
