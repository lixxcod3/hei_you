/* curriculum_data.js */
const curriculum = {
  0: {
    title: "Hello, World & Syntax",
    sub_lessons: [
      {
        sub_id: 0,
        title: "The Foundation",
        theory: `
          <h2>The Foundation</h2>
          <p>Every C program needs a starting point, which is the <code>main()</code> function. To print text, we borrow tools from the standard library using <code>#include &lt;stdio.h&gt;</code>.</p>
          <div class="task-box dont-print">
            <h3>Your Task</h3>
            <p>Add the missing semicolon (<code>;</code>) and change the text to print exactly <strong>Hello, Builder!</strong></p>
          </div>
        `,
        starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!")\n    return 0;\n}`,
        validate: function(src) {
          if (!src.includes(';')) return "Error: Missing a semicolon (;) at the end of your statement.";
          if (!src.includes('Hello, Builder!')) return "Error: Output text must contain 'Hello, Builder!'";
          return true;
        }
      },
      {
        sub_id: 1,
        title: "Format Specifiers",
        theory: `
          <h2>Format Specifiers</h2>
          <p>C uses format specifiers like <code>%d</code> to print integers. This is crucial when outputting mathematical calculations.</p>
          <pre>int sum = 10 + 5;\nprintf("Total: %d", sum);</pre>
          <div class="task-box dont-print">
            <h3>Your Task</h3>
            <p>Declare <code>int x = 42;</code> and print it using the <code>%d</code> format specifier.</p>
          </div>
        `,
        starter: `#include <stdio.h>\n\nint main(void) {\n    // Declare int x here\n    \n    // Print x here\n\n    return 0;\n}`,
        validate: function(src) {
          if (!src.includes('int x') || !src.includes('42')) return "Error: Make sure to declare 'int x = 42;'";
          if (!src.includes('%d') || !src.includes('x')) return "Error: Use printf with '%d' to print variable x";
          return true;
        }
      }
    ]
  },
  1: {
    title: "Variables & Types",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Data Types",
        theory: "<h2>Core Data Types</h2><p>Common types are <code>int</code>, <code>float</code>, and <code>char</code>.</p>",
        starter: "float pi = 3.14;",
        validate: function(src) { return true; }
      }
    ]
  },
  2: {
    title: "Pointers & Memory",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Memory Addresses",
        theory: "<h2>Pointers</h2><p>A pointer holds a memory address. Use <code>&</code> to get an address, and <code>*</code> to get the value.</p>",
        starter: "int target = 100;\nint *ptr = &target;",
        validate: function(src) { return true; }
      }
    ]
  },
  3: {
    title: "Arrays & Strings",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Contiguous Memory",
        theory: "<h2>Arrays</h2><p>Arrays hold multiple items of the same type in contiguous memory.</p>",
        starter: "int data[3] = {1, 2, 3};",
        validate: function(src) { return true; }
      }
    ]
  },
  4: {
    title: "Structs & Data Structures",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Struct Basics",
        theory: "<h2>Structs</h2><p>Structs group different variables under a single name.</p>",
        starter: "struct Point {\n    int x;\n    int y;\n};",
        validate: function(src) { return true; }
      },
      {
        sub_id: 1,
        title: "Double Linked Lists",
        theory: "<h2>Double Linked Lists</h2><p>Each node has a pointer to the <code>next</code> and <code>prev</code> elements.</p>",
        starter: "struct Node {\n    int data;\n    struct Node* next;\n    struct Node* prev;\n};",
        validate: function(src) { return true; }
      }
    ]
  }
};
