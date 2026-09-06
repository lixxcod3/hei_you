/* curriculum_data.js */
const curriculum = {
  0: {
    title: "Hello, World & Syntax",
    sub_lessons: [
      {
        sub_id: 0,
        title: "1.1 The Foundation",
        theory: `
          <h2>The Foundation</h2>
          <p>Every C program needs a starting point, which is the <code>main()</code> function. To print text, we borrow tools from the standard library using <code>#include &lt;stdio.h&gt;</code>.</p>
          <div class="task-box dont-print">
            <h3>Your Task</h3>
            <p>Add the missing semicolon (<code>;</code>) and change the text to print <strong>Hello, Builder!</strong></p>
          </div>
        `,
        starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!")\n    return 0;\n}`,
        validate: function(src) {
          if (!/;\s*return/.test(src)) return "Error: expected ';' before 'return'";
          if (!/printf\s*\(\s*"Hello, Builder!\\n?"\s*\)/.test(src)) return "Error: Output must match 'Hello, Builder!'";
          return true;
        }
      },
      {
        sub_id: 1,
        title: "1.2 Format Specifiers",
        theory: `
          <h2>Format Specifiers</h2>
          <p>C uses format specifiers like <code>%d</code> to print integers. This is crucial when outputting mathematical calculations.</p>
          <div class="task-box dont-print">
            <h3>Your Task</h3>
            <p>Declare <code>int x = 42;</code> and print it using <code>%d</code>.</p>
          </div>
        `,
        starter: `#include <stdio.h>\n\nint main(void) {\n    // Declare int x here\n    \n    return 0;\n}`,
        validate: function(src) {
          if (!/int\s+x\s*=\s*42\s*;/.test(src)) return "Error: Declare 'int x = 42;'";
          return true;
        }
      }
    ]
  },
  4: {
    title: "Structs & Data Structures",
    sub_lessons: [
      {
        sub_id: 0,
        title: "5.1 Struct Basics",
        theory: "<h2>Structs</h2><p>Structs group different variables under a single name.</p>",
        starter: "// Struct lesson starter",
        validate: function(src) { return true; }
      },
      {
        sub_id: 1,
        title: "5.2 Double Linked Lists",
        theory: `
          <h2>Double Linked Lists</h2>
          <p>Unlike single linked lists, each node here has a pointer to the next (<code>next</code>) and previous (<code>prev</code>) elements, allowing two-way traversal.</p>
        `,
        starter: "struct Node {\n    int data;\n    struct Node* next;\n    struct Node* prev;\n};",
        validate: function(src) { return true; }
      }
    ]
  }
};
