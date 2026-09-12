/* curriculum/module-2-pointers/2-pass-by-reference.js */
export default {
  title: "Pointers & Functions (Pass by Reference)",
  theory: `
    <h2>Pointers &amp; Functions (Pass by Reference)</h2>
    <p>Normally C passes a <em>copy</em> of a value into a function, so the original can't be changed. Pass a <strong>pointer</strong> instead and the function can reach back and modify the caller's variable - this is <em>pass by reference</em>.</p>
    <pre>void addOne(int *p) {
    *p = *p + 1;      // change the caller's variable
}

int main(void) {
    int score = 10;
    addOne(&amp;score);      // pass the address
    printf("%d", score);  // 11
}</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Finish <code>addOne</code> so it adds <code>1</code> to the value its pointer points at, using <code>*p</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nvoid addOne(int *p) {\n    // increment the value at the pointer\n}\n\nint main(void) {\n    int score = 10;\n    addOne(&score);\n    printf("%d", score);\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('*p')) return "Use *p to reach the value the pointer points at.";
    if (!src.includes('*p = *p + 1') && !src.includes('*p += 1') && !src.includes('(*p)++')) return "Add one to *p, e.g. *p = *p + 1;";
    return true;
  }
};
