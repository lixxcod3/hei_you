/* curriculum/module-3-arrays/0-declaring-arrays.js */
export default {
  title: "Declaring & Indexing Arrays",
  theory: `
    <h2>Declaring &amp; Indexing Arrays</h2>
    <p>An <strong>array</strong> stores several values of the same type under one name. You reach each one by its <strong>index</strong>, counting from <code>0</code>.</p>
    <pre>int data[3] = {10, 20, 30};

printf("%d", data[0]);   // 10 - first element
printf("%d", data[2]);   // 30 - last element</pre>
    <ul>
      <li><code>data[3]</code> makes room for 3 ints.</li>
      <li>Valid indexes are <code>0</code>, <code>1</code>, <code>2</code> - <code>data[3]</code> is off the end.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Declare an int array <code>data</code> holding <code>1, 2, 3</code>, then print its <strong>first</strong> element with <code>data[0]</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    // declare the array and print its first element\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('data[')) return "Declare an array called data (e.g. int data[3]).";
    if (!src.includes('1') || !src.includes('2') || !src.includes('3')) return "Fill it with the values 1, 2, 3.";
    if (!src.includes('data[0]')) return "Print the first element with data[0].";
    return true;
  }
};
