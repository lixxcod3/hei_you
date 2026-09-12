/* curriculum/module-3-arrays/3-strings.js */
export default {
  title: "C Strings & the Null Terminator",
  theory: `
    <h2>C Strings &amp; the Null Terminator</h2>
    <p>C has no dedicated string type - a string is just an array of <code>char</code> ending with a hidden <strong>null terminator</strong> <code>'\\0'</code>. That invisible marker tells functions where the text stops.</p>
    <pre>char name[] = "Hei";
// actually stored as: 'H' 'e' 'i' '\\0'

printf("%s", name);   // prints: Hei</pre>
    <ul>
      <li>Double quotes <code>"..."</code> make a string and add the <code>'\\0'</code> for you.</li>
      <li><code>%s</code> prints characters until it hits the <code>'\\0'</code>.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Declare a <code>char</code> array called <code>name</code> set to <code>"Hei"</code>, and print it with <code>%s</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    // declare the string and print it with %s\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('char')) return "Use a char array to hold the string.";
    if (!src.includes('name')) return "Call the array name.";
    if (!src.includes('%s')) return "Print it with the %s specifier.";
    return true;
  }
};
