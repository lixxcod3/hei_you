/* curriculum/module-2-pointers/0-addresses.js */
export default {
  title: "Addresses & the & Operator",
  theory: `
    <h2>Addresses &amp; the &amp; Operator</h2>
    <p>Every variable lives somewhere in memory, at a numbered location called its <strong>address</strong>. The <code>&amp;</code> operator ("address of") gives you that location.</p>
    <pre>int n = 42;
printf("value: %d\\n", n);      // 42
printf("address: %p\\n", &amp;n);  // e.g. 0x7ffd...</pre>
    <ul>
      <li><code>n</code> is the value; <code>&amp;n</code> is where it lives.</li>
      <li><code>%p</code> is the format specifier for printing an address.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Print the address of <code>n</code> using <code>&amp;n</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int n = 42;\n    // print the address of n below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('&n')) return "Use &n to get the address of n.";
    if (!src.includes('printf')) return "Print it with printf.";
    return true;
  }
};
