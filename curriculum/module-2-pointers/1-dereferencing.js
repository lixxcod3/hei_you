/* curriculum/module-2-pointers/1-dereferencing.js */
export default {
  title: "Declaring Pointers & Dereferencing",
  theory: `
    <h2>Declaring Pointers &amp; Dereferencing</h2>
    <p>A <strong>pointer</strong> is a variable that stores an address. Declare one with a <code>*</code>, aim it at something with <code>&amp;</code>, and read through it with <code>*</code> (called <em>dereferencing</em>).</p>
    <pre>int  n   = 42;
int *ptr = &amp;n;       // ptr points at n

printf("%d", *ptr);   // 42 - the value ptr points to</pre>
    <ul>
      <li><code>int *ptr</code> - "ptr is a pointer to an int".</li>
      <li><code>*ptr</code> - the value stored at that address.</li>
      <li>Change <code>*ptr</code> and you change <code>n</code> itself.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Declare a pointer <code>ptr</code> aimed at <code>n</code> (using <code>&amp;n</code>), then print the value with <code>*ptr</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int n = 42;\n    // declare a pointer and read through it below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('*ptr')) return "Declare and use a pointer called ptr (int *ptr).";
    if (!src.includes('&n')) return "Aim ptr at n with &n.";
    return true;
  }
};
