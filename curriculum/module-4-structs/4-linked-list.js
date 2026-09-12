/* curriculum/module-4-structs/4-linked-list.js */
export default {
  title: "Your First Linked List",
  theory: `
    <h2>Your First Linked List</h2>
    <p>A <strong>linked list</strong> is a chain of nodes. Each node holds a value plus a pointer to the <code>next</code> node, so the list can grow without a fixed size. The last node points to <code>NULL</code>.</p>
    <pre>struct Node {
    int data;
    struct Node *next;   // points to the next node
};

// [10|*] -&gt; [20|*] -&gt; NULL</pre>
    <ul>
      <li>A node contains a pointer to <em>its own type</em> - that's what links the chain.</li>
      <li><code>NULL</code> marks the end.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Complete the <code>Node</code> struct: it needs an <code>int data</code> field and a <code>struct Node *next</code> pointer.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nstruct Node {\n    // add two fields: the value, and a link to the following node\n\n};\n\nint main(void) {\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('int data')) return "Add an int field called data.";
    if (!src.includes('next')) return "Add a field called next that points to the following node.";
    if (!src.includes('*')) return "The next field must be a pointer - use struct Node *next;";
    return true;
  }
};
