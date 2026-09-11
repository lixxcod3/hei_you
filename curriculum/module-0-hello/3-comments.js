/* curriculum/module-0-hello/3-comments.js */
export default {
  title: "Comments & Clean Formatting",
  theory: `
    <h2>Comments &amp; Clean Formatting</h2>
    <p>Comments are notes for humans; the compiler ignores them. They explain <em>why</em> code does something and keep a program readable.</p>
    <h3>Two styles</h3>
    <pre>// single-line comment - runs to the end of the line

/* multi-line comment
   spanning several lines */</pre>
    <h3>Formatting habits</h3>
    <ul>
      <li>Indent code inside <code>{ }</code> (usually 4 spaces).</li>
      <li>One statement per line.</li>
      <li>Use blank lines to separate ideas.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Add a comment above the <code>printf</code> line explaining what it does. Any <code>//</code> or <code>/* */</code> comment counts.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Readable code!");\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('//') && !src.includes('/*')) return "Add a comment using // or /* */.";
    if (!src.includes('printf')) return "Keep the printf() line.";
    return true;
  }
};
