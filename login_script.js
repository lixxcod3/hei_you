(function(){
  var form=document.getElementById('form');
  var wrap=document.getElementById('formwrap');
  var banner=document.getElementById('banner');
  var submit=document.getElementById('submit');
  var email=document.getElementById('email');
  var pass=document.getElementById('pass');
  var remember=document.getElementById('remember');

  var loseIco='<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#7d2537" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="16" width="10" height="2" fill="#fff"/></svg>';
  var winIco='<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#2c5741" stroke="#1C2436" stroke-width="2"/><rect x="7" y="8" width="3" height="3" fill="#fff"/><rect x="14" y="8" width="3" height="3" fill="#fff"/><rect x="7" y="15" width="10" height="2" fill="#fff"/></svg>';
  var infoIco='<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><rect x="10" y="6" width="4" height="4" fill="#E3B25E"/><rect x="10" y="12" width="4" height="6" fill="#E3B25E"/></svg>';

  /* ---- Hei You local store (Option A: browser-only, front-end demo) ----
     Users live in localStorage under 'heiyou_users'. Passwords are hashed
     with SHA-256 so plaintext isn't stored. This is fine for a scoped
     prototype but is NOT real security — anyone with the device can read it. */
  var USERS_KEY='heiyou_users';
  function readUsers(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||'{}');}catch(e){return {};}}
  async function hashPassword(pw){
    try{
      if(window.crypto&&crypto.subtle){
        var data=new TextEncoder().encode(pw+'::heiyou-salt');
        var buf=await crypto.subtle.digest('SHA-256',data);
        return 'sha256:'+Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
      }
    }catch(e){}
    var h=0,s=pw+'::heiyou-salt';for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0;}
    return 'weak:'+h.toString(16);
  }

  function show(type,html,ico){banner.className='banner show '+type;banner.innerHTML=(ico||'')+'<span>'+html+'</span>';}
  function shake(){wrap.classList.remove('shake');void wrap.offsetWidth;wrap.classList.add('shake');}
  function clearField(id){document.getElementById(id).classList.remove('bad');}
  email.addEventListener('input',function(){clearField('f-email');});
  pass.addEventListener('input',function(){clearField('f-pass');});

  document.getElementById('toggle').addEventListener('click',function(){
    var t=pass.type==='password';pass.type=t?'text':'password';this.textContent=t?'hide':'show';this.setAttribute('aria-label',t?'Hide password':'Show password');
  });

  document.getElementById('github').addEventListener('click',function(){
    show('info','老师 Wáng: this is a front-end demo — wire up GitHub later. 加油!',infoIco);
  });

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    var bad=[];
    var reEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!reEmail.test(email.value.trim())){document.getElementById('f-email').classList.add('bad');bad.push('email');}
    if(pass.value.length<6){document.getElementById('f-pass').classList.add('bad');bad.push('password');}

    if(bad.length){
      show('lose','Professor Wáng: “Shame on you.” 太可惜了 — check your '+bad.join(' and ')+'.',loseIco);
      shake();return;
    }

    var key=email.value.trim().toLowerCase();
    var users=readUsers();
    var user=users[key];

    submit.disabled=true;submit.textContent='Logging in…';
    var hash=await hashPassword(pass.value);

    if(!user||user.pw!==hash){
      submit.disabled=false;submit.textContent='Log in';
      document.getElementById('f-email').classList.add('bad');
      document.getElementById('f-pass').classList.add('bad');
      show('lose','Professor Wáng: “Shame on you.” 太可惜了 — wrong email or password. No account yet? Sign up.',loseIco);
      shake();return;
    }

    /* remember me -> persist across sessions; otherwise clear on tab close */
    try{
      if(remember&&remember.checked){localStorage.setItem('heiyou_session',key);sessionStorage.removeItem('heiyou_session');}
      else{sessionStorage.setItem('heiyou_session',key);localStorage.removeItem('heiyou_session');}
    }catch(e){}

    show('win','Professor Wáng: “Proud of you.” 好样的 — welcome back, '+(user.name||'builder')+'. Entering the classroom…',winIco);
    setTimeout(function(){window.location.href='index.html';},1400);
  });
})();