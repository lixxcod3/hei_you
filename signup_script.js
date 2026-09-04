(function () {
  var form = document.getElementById('form');
  var wrap = document.getElementById('formwrap');
  var banner = document.getElementById('banner');
  var submit = document.getElementById('submit');
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var pass = document.getElementById('pass');
  var conf = document.getElementById('conf');
  var terms = document.getElementById('terms');

  var loseIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#7d2537" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="16" width="10" height="2" fill="#fff"/></svg>';
  var winIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#2c5741" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="15" width="10" height="2" fill="#fff"/></svg>';
  var infoIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><rect x="10" y="6" width="4" height="4" fill="#E3B25E"/><rect x="10" y="12" width="4" height="6" fill="#E3B25E"/></svg>';

  var USERS_KEY = 'heiyou_users';
  function readUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }
  function saveUsers(u) {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
  }

  async function hashPassword(pw) {
    try {
      if (window.crypto && crypto.subtle) {
        var data = new TextEncoder().encode(pw + '::heiyou-salt');
        var buf = await crypto.subtle.digest('SHA-256', data);
        return 'sha256:' + Array.from(new Uint8Array(buf)).map(function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('');
      }
    } catch (e) {}
    var h = 0, s = pw + '::heiyou-salt';
    for (var i = 0; i < s.length; i++) {
      h = (h * 31 + s.charCodeAt(i)) >>> 0;
    }
    return 'weak:' + h.toString(16);
  }

  function show(type, html, ico) {
    banner.className = 'banner show ' + type;
    banner.innerHTML = (ico || '') + '<span>' + html + '</span>';
  }

  function shake() {
    wrap.classList.remove('shake');
    void wrap.offsetWidth;
    wrap.classList.add('shake');
  }

  function clear(id) {
    document.getElementById(id).classList.remove('bad');
  }

  name.addEventListener('input', function () { clear('f-name'); });
  email.addEventListener('input', function () { clear('f-email'); });
  pass.addEventListener('input', function () { clear('f-pass'); });
  conf.addEventListener('input', function () { clear('f-conf'); });
  terms.addEventListener('change', function () { clear('f-terms'); });

  document.getElementById('toggle').addEventListener('click', function () {
    var t = pass.type === 'password';
    pass.type = t ? 'text' : 'password';
    this.textContent = t ? 'hide' : 'show';
    this.setAttribute('aria-label', t ? 'Hide password' : 'Show password');
  });

  document.getElementById('github').addEventListener('click', function () {
    show('info', '老师 Wáng: this is a front-end demo — wire up GitHub later. 加油!', infoIco);
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var bad = [];
    var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.value.trim().length < 3) {
      document.getElementById('f-name').classList.add('bad');
      bad.push('username');
    }
    if (!reEmail.test(email.value.trim())) {
      document.getElementById('f-email').classList.add('bad');
      bad.push('email');
    }
    if (pass.value.length < 8) {
      document.getElementById('f-pass').classList.add('bad');
      bad.push('password');
    }
    if (conf.value !== pass.value || conf.value === '') {
      document.getElementById('f-conf').classList.add('bad');
      bad.push('confirmation');
    }
    if (!terms.checked) {
      document.getElementById('f-terms').classList.add('bad');
      bad.push('terms');
    }

    if (bad.length) {
      var first = bad[0];
      show('lose', 'Professor Wáng: “Shame on you.” 太可惜了 — fix your ' + first + (bad.length > 1 ? ' (and ' + (bad.length - 1) + ' more)' : '') + '.', loseIco);
      shake();
      return;
    }

    var key = email.value.trim().toLowerCase();
    var users = readUsers();
    if (users[key]) {
      document.getElementById('f-email').classList.add('bad');
      show('lose', 'Professor Wáng: “Shame on you.” 太可惜了 — that email is already registered. Try logging in.', loseIco);
      shake();
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Creating…';
    try {
      var hash = await hashPassword(pass.value);
      users[key] = {
        name: name.value.trim(),
        email: key,
        pw: hash,
        created: Date.now()
      };
      saveUsers(users);
      try {
        sessionStorage.setItem('heiyou_session', key);
      } catch (e) {}
    } catch (err) {
      submit.disabled = false;
      submit.textContent = 'Create account';
      show('info', '老师 Wáng: couldn\u2019t save to this browser (storage blocked). Try a normal window.', infoIco);
      return;
    }

    show('win', 'Professor Wáng: “Proud of you.” 好样的 — account created. Entering the classroom…', winIco);
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1600);
  });
})();