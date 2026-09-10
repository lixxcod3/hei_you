/* curriculum/module-2-pointers/0-memory-addresses.js */
export default {
  title: "Memory Addresses",
  theory: `
    <h2>Pointers</h2>
    <p>Every variable lives at some <strong>address</strong> in memory. A <em>pointer</em> is a variable that stores one of those addresses instead of a normal value. This is the idea that makes C powerful.</p>

    <h3>Two key operators</h3>
    <ul>
      <li><code>&amp;</code> — "address of". <code>&amp;target</code> gives you where <code>target</code> lives.</li>
      <li><code>*</code> — "value at". <code>*ptr</code> gives you the value stored at that address (called <em>dereferencing</em>).</li>
    </ul>

    <h3>Declaring a pointer</h3>
    <pre>int target = 100;       // a normal int
int *ptr   = &amp;target;   // ptr holds target's address

printf("%d", *ptr);     // prints 100 — the value target points to</pre>
    <p>Read <code>int *ptr</code> as "ptr is a pointer to an int". Change <code>*ptr</code> and you change <code>target</code> itself.</p>

    <div class="task-box dont-print">
      <h3>Try it</h3>
      <p>Study how <code>&amp;</code> and <code>*</code> work together, then press <strong>Compile &amp; Run</strong> to continue.</p>
    </div>
  `,
  starter: "int target = 100;\nint *ptr = &target;",
  validate(src) { return true; }
};
