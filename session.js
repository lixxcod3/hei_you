/* session.js  */
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

  function esc(s) { 
    return String(s).replace(/[&<>"]/g, function (c) { 
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; 
    }); 
  }
  
  function logout() {
    try { 
      localStorage.removeItem('heiyou_session'); 
      sessionStorage.removeItem('heiyou_session'); 
    } catch (e) {}
    location.href = 'index.html';
  }

  function run() {
    // Wire any explicit logout controls on the page
    var outs = document.querySelectorAll('[data-logout]');
    for (var i = 0; i < outs.length; i++) outs[i].addEventListener('click', logout);

    var key = getSession();
    if (!key) return; // If guest, leave the UI exactly as is

    var header = document.querySelector('header') || document.body;
    var actions = document.querySelector('.nav-actions') || document.querySelector('.nav-right');

    // 1. Hide guest auth UI inside the header
    var links = header.querySelectorAll('a[href$="login.html"], a[href$="signup.html"]');
    for (var j = 0; j < links.length; j++) links[j].style.display = 'none';
    
    // 2. Hide Guest Banners and the massive bottom CTA globally
    var guestNav = document.getElementById('nav-guest'); if (guestNav) guestNav.style.display = 'none';
    var userNav = document.getElementById('nav-user'); if (userNav) userNav.style.display = 'none';
    var ctaSection = document.getElementById('signup'); if (ctaSection) ctaSection.style.display = 'none';
    
    // 3. Hide the Auth Toast Notification entirely
    var toast = document.getElementById('auth-toast-backdrop'); if (toast) toast.style.display = 'none';
    var st = document.createElement('style'); st.textContent = '#auth-toast-backdrop{display:none!important;}'; document.head.appendChild(st);

    if (!actions || actions.querySelector('.session-menu')) return;

    // 4. Inject the logged-in menu (Classroom, Profile, Log Out)
    var user = getUsers()[key] || {};
    var name = user.name || key.split('@')[0];
    
    var menu = document.createElement('span');
    menu.className = 'session-menu';
    menu.style.cssText = 'display:flex;align-items:center;gap:14px;';
    
    // We use the exact `.login` CSS class from style.css so it blends perfectly into the header
    menu.innerHTML =
      '<a class="login" href="profile.html">Hi, ' + esc(name) + '</a>' +
      '<a class="btn btn-gold btn-sm" href="dashboard.html">Classroom</a>' +
      '<button type="button" class="login" data-logout style="background:none; border:none; cursor:pointer; font-family:inherit; font-size:14px;">Log out</button>';
    
    // Insert menu BEFORE the mobile burger button if it exists, otherwise just append it
    var burger = actions.querySelector('.burger');
    if (burger) {
        actions.insertBefore(menu, burger);
    } else {
        actions.appendChild(menu);
    }
    
    menu.querySelector('[data-logout]').addEventListener('click', logout);
  }

  // Ensure execution regardless of script load timing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
