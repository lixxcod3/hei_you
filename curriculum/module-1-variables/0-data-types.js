/* curriculum/module-1-variables/0-data-types.js */
export default {
  title: "Data Types",
  theory: `
    <h2>Core Data Types</h2>
    <p>A variable is a named box in memory. Its <strong>type</strong> tells C how big that box is and what kind of value goes inside.</p>

    <h3>The types you'll use most</h3>
    <ul>
      <li><code>int</code> — whole numbers, e.g. <code>42</code>, <code>-7</code></li>
      <li><code>float</code> — decimal numbers, e.g. <code>3.14</code></li>
      <li><code>double</code> — a bigger, more precise decimal</li>
      <li><code>char</code> — a single character, e.g. <code>'A'</code></li>
    </ul>

    <h3>Declaring and initialising</h3>
    <p>Give the type, then the name, then (optionally) a starting value:</p>
    <pre>int   age   = 20;
float pi    = 3.14;
char  grade = 'A';</pre>
    <p>Once declared, a variable keeps its type for its whole life — you can change the value, not the type.</p>

    <div class="task-box dont-print">
      <h3>Try it</h3>
      <p>Read the example in the editor, then press <strong>Compile &amp; Run</strong> to continue.</p>
    </div>
  `,
  starter: "float pi = 3.14;",
  validate(src) { return true; }
};
