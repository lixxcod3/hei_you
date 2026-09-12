/* curriculum/module-2-pointers/4-dynamic-memory.js */
export default {
  title: "A First Look at Dynamic Memory",
  theory: `
    <h2>A First Look at Dynamic Memory</h2>
    <p>Sometimes you don't know how much memory you'll need until the program runs. <code>malloc</code> asks the system for a block of memory at runtime; <code>free</code> gives it back when you're done.</p>
    <pre>#include &lt;stdlib.h&gt;   // malloc / free live here

int *p = malloc(sizeof(int));   // room for one int
*p = 99;
printf("%d", *p);               // 99
free(p);                        // always release it</pre>
    <ul>
      <li><code>sizeof(int)</code> asks for exactly the size of one int.</li>
      <li>Every <code>malloc</code> should have a matching <code>free</code>, or memory leaks.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Allocate space for one <code>int</code> with <code>malloc</code>, then release it with <code>free</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // allocate one int, then release it\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('malloc')) return "Use malloc to allocate memory.";
    if (!src.includes('free')) return "Release the memory with free().";
    return true;
  }
};
