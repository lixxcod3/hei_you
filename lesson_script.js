/* lesson_script.js — Curriculum content and evaluation logic */

(function () {
  "use strict";

  // Check auth
  var key = localStorage.getItem('heiyou_session') || sessionStorage.getItem('heiyou_session');
  if (!key) { window.location.href = 'login.html'; return; }
  var users = JSON.parse(localStorage.getItem('heiyou_users') || '{}');
  var user = users[key];

  // Parse URL parameter (e.g. ?mod=0)
  var urlParams = new URLSearchParams(window.location.search);
  var modIndex = parseInt(urlParams.get('mod')) || 0;

  // Icons
  var winFace = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" fill="#3F7A5C" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g><rect x="9" y="16" width="8" height="2" fill="#fff"/></svg>';
  var loseFace = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" fill="#A8324A" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g><rect x="9" y="17" width="8" height="2" fill="#fff"/></svg>';

  // --- Curriculum Database ---
  var lessons = [
    {
      title: "Hello, World & Syntax",
      content: `
        <h2>The Foundation</h2>
        <p>Every language starts somewhere. In C, the entry point for your execution is the <code>main()</code> function. Without it, the compiler won't know where to begin.</p>
        <h3>The #include directive</h3>
        <p>C is a small language. To do basic things like printing to the screen, we need to borrow tools from the standard library using <code>#include &lt;stdio.h&gt;</code>.</p>
        <div class="task-box">
          <h3>Your Task</h3>
          <p>Fix the code on the right. Professor Wáng left out a crucial semicolon, and the program won't compile. Add it, then change the printed text to output exactly <strong>Hello, C!</strong></p>
        </div>
      `,
      starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!")\n    return 0;\n}`,
      validate: function(src) {
        if (!/;\s*return/.test(src)) return "main.c: error: expected ';' before 'return'";
        if (!/printf\s*\(\s*"Hello, C!\\n?"\s*\)/.test(src)) return "main.c: error: Output did not match 'Hello, C!'";
        return true;
      }
    },
    {
      title: "Variables & Types",
      content: `
        <h2>Storing Data</h2>
        <p>C requires you to declare exactly what type of data a variable will hold. The fundamentals are <code>int</code> (integers) and <code>float</code> (decimals).</p>
        <h3>Format Specifiers</h3>
        <p>When printing variables, we use format specifiers like <code>%d</code> for integers. If you wanted to test Vieta's formulas or calculate polynomial roots, you'd need these to output your math accurately.</p>
        <pre>int sum = a + b;\nprintf("Sum: %d", sum);</pre>
        <div class="task-box">
          <h3>Your Task</h3>
          <p>Declare an integer variable named <code>x</code> and set it to 42. Then, use <code>printf</code> to print its value using the <code>%d</code> specifier.</p>
        </div>
      `,
      starter: `#include <stdio.h>\n\nint main(void) {\n    // Declare x here\n    \n    // Print x here\n    \n    return 0;\n}`,
      validate: function(src) {
        if (!/int\s+x\s*=\s*42\s*;/.test(src)) return "main.c: error: Ensure you declare 'int x = 42;'";
        if (!/printf\s*\(\s*".*%d.*"\s*,\s*x\s*\)/.test(src)) return "main.c: error: Use printf with '%d' to print x.";
        return true;
      }
    },
    {
      title: "Pointers & Memory",
      content: `
        <h2>The Key to the Kingdom</h2>
        <p>A pointer is just a variable that holds a memory address. If a variable is a house, the pointer is the address written on an envelope.</p>
        <ul>
          <li><code>&var</code> gives you the <em>address</em> of a variable.</li>
          <li><code>*ptr</code> gives you the <em>value</em> at that address (dereferencing).</li>
        </ul>
        <div class="task-box">
          <h3>Your Task</h3>
          <p>We have an integer <code>target = 100</code>. Declare a pointer named <code>ptr</code> that stores the address of <code>target</code>. Then print the value using the pointer.</p>
        </div>
      `,
      starter: `#include <stdio.h>\n\nint main(void) {\n    int target = 100;\n    // Declare int *ptr here\n    \n    return 0;\n}`,
      validate: function(src) {
        if (!/int\s*\*\s*ptr\s*=\s*&target\s*;/.test(src)) return "main.c: error: Declare ptr pointing to &target.";
        return true;
      }
    },
    {
      title: "Arrays & Strings",
      content: `
        <h2>Contiguous Memory</h2>
        <p>An array is a block of memory holding multiple items of the same type. In C, strings are simply arrays of characters that end with a null terminator <code>'\\0'</code>.</p>
        <pre>int scores[3] = {95, 87, 92};\nchar name[] = "Hei You";</pre>
        <div class="task-box">
          <h3>Your Task</h3>
          <p>Create an integer array named <code>data</code> holding the numbers 1, 2, and 3. Print the second element (remember, C is 0-indexed!).</p>
        </div>
      `,
      starter: `#include <stdio.h>\n\nint main(void) {\n    // Create array here\n    \n    // Print the second element (index 1)\n    \n    return 0;\n}`,
      validate: function(src) {
        if (!/int\s+data(\[\s*3?\s*\])?\s*=\s*\{\s*1\s*,\s*2\s*,\s*3\s*\}/.test(src)) return "main.c: error: Create the 'data' array correctly.";
        if (!/data\[\s*1\s*\]/.test(src)) return "main.c: error: Make sure you are accessing index 1.";
        return true;
      }
    },
    {
      title: "Structs & Data Structures",
      content: `
        <h2>Building Blocks</h2>
        <p>When you start building games or complex algorithms, basic types aren't enough. <code>struct</code> lets you group different variables under one name. It's the foundation of Binary Search Trees, Double Linked Lists, and graph nodes.</p>
        <pre>struct Node {\n    int data;\n    struct Node* next;\n    struct Node* prev;\n};</pre>
        <div class="task-box">
          <h3>Your Task</h3>
          <p>Define a <code>struct Point</code> representing a 2D coordinate with integers <code>x</code> and <code>y</code>. In <code>main</code>, create a Point, set x to 10 and y to 20, then print them.</p>
        </div>
      `,
      starter: `#include <stdio.h>\n\n// Define struct Point here\n\nint main(void) {\n    // Create and use Point here\n    \n    return 0;\n}`,
      validate: function(src) {
        if (!/struct\s+Point\s*\{/.test(src)) return "main.c: error: Define 'struct Point'.";
        if (!/\.x\s*=\s*10/ && !/\{\s*10\s*,\s*20\s*\}/.test(src)) return "main.c: error: Set x to 10 and y to 20.";
        return true;
      }
    }
  ];

  // Load Content
  var lesson = lessons[modIndex];
  if (!lesson) { window.location.href = 'dashboard.html'; return; }

  document.getElementById('lesson-title').textContent = "Module " + (modIndex + 1) + ": " + lesson.title;
  document.getElementById('content-body').innerHTML = lesson.content;
  
  var codeEl = document.getElementById('code');
  var outEl = document.getElementById('out');
  var verdictEl = document.getElementById('verdict');
  var completeBtn = document.getElementById('btn-complete');

  codeEl.value = lesson.starter;

  // Allow tab spacing in textarea
  codeEl.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var s = this.selectionStart;
      this.value = this.value.slice(0, s) + '    ' + this.value.slice(this.selectionEnd);
      this.selectionStart = this.selectionEnd = s + 4;
    }
  });

  // Compiler Simulator
  document.getElementById('run').addEventListener('click', function() {
    var src = codeEl.value;
    
    // Evaluate logic
    var evalResult = lesson.validate(src);

    if (evalResult !== true) {
      outEl.innerHTML = '<span class="err">✗ Build failed</span>\n\n' + evalResult;
      verdictEl.className = 'verdict lose';
      verdictEl.innerHTML = loseFace + '<span>Professor Wáng: “Shame on you.” 太可惜了 — review the instructions.</span>';
      completeBtn.disabled = true;
      completeBtn.textContent = 'Run successful code to unlock';
      completeBtn.style.background = '#e2e7f0';
      completeBtn.style.borderColor = '#c9cfda';
      completeBtn.style.color = '#7a8398';
    } else {
      outEl.innerHTML = '<span class="ok">✓ Compiled main.c — running…</span>\n\n<span class="ok">[process exited with code 0]</span>';
      verdictEl.className = 'verdict win';
      verdictEl.innerHTML = winFace + '<span>Professor Wáng: “Proud of you.” 好样的 — brick placed!</span>';
      
      // Enable progress button
      completeBtn.disabled = false;
      completeBtn.textContent = 'Mark Complete & Continue →';
      completeBtn.style.background = 'var(--gold)';
      completeBtn.style.borderColor = 'var(--navy-dark)';
      completeBtn.style.color = 'var(--navy-dark)';
    }
  });

  document.getElementById('reset').addEventListener('click', function() {
    codeEl.value = lesson.starter;
    outEl.innerHTML = 'Write your solution above and press <b>Compile &amp; Run</b>...';
    verdictEl.className = 'verdict';
    verdictEl.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><g class="eyes"><rect x="9" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></g></svg><span>Professor Wáng is watching.</span>';
    completeBtn.disabled = true;
  });

  // Progress logic
  completeBtn.addEventListener('click', function() {
    if (user.progress <= modIndex) {
      user.progress = modIndex + 1;
      users[key] = user;
      localStorage.setItem('heiyou_users', JSON.stringify(users));
    }
    window.location.href = 'dashboard.html';
  });

})();
