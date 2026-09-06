/* profile_script.js — Handles data rendering and updates for the profile page */
(function(){
  "use strict";
  
  var form = document.getElementById('profile-form');
  var banner = document.getElementById('banner');
  var submit = document.getElementById('submit');
  var nameInput = document.getElementById('p-name');
  var emailInput = document.getElementById('p-email');

  var winIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#2c5741" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="15" width="10" height="2" fill="#fff"/></svg>';
  var loseIco = '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#7d2537" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="16" width="10" height="2" fill="#fff"/></svg>';

  // Boot user out if they navigated here manually without a session
  var key = localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session');
  if(!key) { window.location.href = 'login.html'; return; }

  var users = JSON.parse(localStorage.getItem('heiyou_users') || '{}');
  var user = users[key] || {};

  // PRE-FILL COLLECTED DATA
  emailInput.value = key;
  nameInput.value = user.name || key.split('@')[0];

  function show(type, html, ico) {
    banner.className = 'banner show ' + type;
    banner.innerHTML = (ico || '') + '<span>' + html + '</span>';
  }

  function clearField(id) {
    document.getElementById(id).classList.remove('bad');
  }

  nameInput.addEventListener('input', function() { clearField('f-name'); });
  document.getElementById('p-old-pass').addEventListener('input', function() { clearField('f-old-pass'); });
  document.getElementById('p-new-pass').addEventListener('input', function() { clearField('f-new-pass'); });

  async function hashPassword(pw) {
    try {
      if(window.crypto && crypto.subtle) {
        var data = new TextEncoder().encode(pw + '::heiyou-salt');
        var buf = await crypto.subtle.digest('SHA-256', data);
        return 'sha256:' + Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
      }
    } catch(e) {}
    var h = 0, s = pw + '::heiyou-salt'; 
    for(var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; }
    return 'weak:' + h.toString(16);
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    submit.disabled = true;
    submit.textContent = 'Saving...';

    var newName = nameInput.value.trim();
    var oldPass = document.getElementById('p-old-pass').value;
    var newPass = document.getElementById('p-new-pass').value;

    if(newName.length < 3) {
      document.getElementById('f-name').classList.add('bad');
      show('lose', 'Username must be at least 3 characters.', loseIco);
      submit.disabled = false;
      submit.textContent = 'Save Changes';
      return;
    }

    // Update username
    user.name = newName;

    // Handle password change if fields are filled
    if (oldPass || newPass) {
        var oldHash = await hashPassword(oldPass);
        if (oldHash !== user.pw) {
            document.getElementById('f-old-pass').classList.add('bad');
            show('lose', 'Incorrect current password.', loseIco);
            submit.disabled = false;
            submit.textContent = 'Save Changes';
            return;
        }
        if (newPass.length < 8) {
            document.getElementById('f-new-pass').classList.add('bad');
            show('lose', 'New password must be at least 8 characters.', loseIco);
            submit.disabled = false;
            submit.textContent = 'Save Changes';
            return;
        }
        user.pw = await hashPassword(newPass);
    }

    // Save back to DB
    users[key] = user;
    localStorage.setItem('heiyou_users', JSON.stringify(users));
    
    show('win', 'Profile updated successfully!', winIco);
    
    // Clear password fields
    document.getElementById('p-old-pass').value = '';
    document.getElementById('p-new-pass').value = '';
    
    // Dynamically update the Nav Greeting
    var navLink = document.querySelector('.nav-right .btn-sm[href="profile.html"]');
    if(navLink) navLink.textContent = 'Hi, ' + newName;

    submit.disabled = false;
    submit.textContent = 'Save Changes';
  });
})();
