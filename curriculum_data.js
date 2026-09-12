/* curriculum_data.js  */
const curriculum = {
  0: {
    title: "Hello, World & Syntax",
    level: "beginner",
    time: "~45 min",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Your First Program",
        theory: "\n    <h2>Your First Program</h2>\n    <p>Every C program starts life the same way: include a library, open <code>main()</code>, do something, then return. Let's write the classic first program.</p>\n    <h3>The pieces</h3>\n    <ul>\n      <li><code>#include &lt;stdio.h&gt;</code> — brings in <code>printf</code>.</li>\n      <li><code>int main(void) { ... }</code> — where the program starts.</li>\n      <li><code>printf(\"...\")</code> — prints text to the screen.</li>\n      <li><code>return 0;</code> — signals success.</li>\n    </ul>\n    <pre>#include &lt;stdio.h&gt;\n\nint main(void) {\n    printf(\"Hello, World!\");\n    return 0;\n}</pre>\n    <p>Remember: every statement ends with a semicolon <code>;</code>.</p>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Use <code>printf</code> to print exactly <strong>Hello, World!</strong> — and don't forget the semicolon.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    // print the greeting here\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('printf')) return "Use printf() to print your message.";
            if (!src.includes('Hello, World!')) return "The output must contain 'Hello, World!'";
            if (!src.includes(';')) return "Every statement needs a semicolon (;).";
            return true;
          }
      },
      {
        sub_id: 1,
        title: "Anatomy of a C File",
        theory: "\n    <h2>Anatomy of a C File</h2>\n    <p>A C file has a predictable shape. Once you know the parts, error messages get much easier to read.</p>\n    <h3>Directives, statements, blocks</h3>\n    <ul>\n      <li><strong>Directives</strong> start with <code>#</code> and run before compiling, e.g. <code>#include &lt;stdio.h&gt;</code>. They take <em>no</em> semicolon.</li>\n      <li><strong>Statements</strong> are single instructions and <em>always</em> end with <code>;</code>.</li>\n      <li><strong>Blocks</strong> group statements inside <code>{ }</code>.</li>\n    </ul>\n    <pre>#include &lt;stdio.h&gt;      // directive - no semicolon\n\nint main(void) {         // block starts\n    printf(\"Hi\");        // statement - semicolon!\n    return 0;            // statement - semicolon!\n}                        // block ends</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>This program is missing its include line and a semicolon. Add <code>#include &lt;stdio.h&gt;</code> at the top and fix the missing <code>;</code> so it compiles.</p>\n    </div>\n  ",
        starter: "int main(void) {\n    printf(\"Fixed!\")\n    return 0;\n}",
        validate(src) {
            if (!src.includes('#include')) return "Add the #include directive at the top.";
            if (!src.includes('stdio.h')) return "You need to include <stdio.h> for printf.";
            if (!src.includes('printf')) return "Keep the printf() call.";
            if ((src.match(/;/g) || []).length < 2) return "A statement is still missing its semicolon (;).";
            return true;
          }
      },
      {
        sub_id: 2,
        title: "Compiling and Running",
        theory: "\n    <h2>Compiling and Running</h2>\n    <p>Writing code is only half the job - the computer can't run C directly. A <strong>compiler</strong> first translates your source into machine instructions. Here, pressing <strong>Compile &amp; Run</strong> does that in the browser and shows the result in the console on the right.</p>\n    <h3>The cycle</h3>\n    <ul>\n      <li>Write or edit your code.</li>\n      <li>Press <strong>Compile &amp; Run</strong>.</li>\n      <li>Read the output - a green success line, or a red error to fix.</li>\n      <li>Fix and repeat. This loop is the heart of programming.</li>\n    </ul>\n    <p>A program that compiles cleanly and finishes tidily returns <code>0</code> from <code>main</code>.</p>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>This program won't compile - there's a typo in the return line. Fix it to read <code>return 0;</code> and run it.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Compiling C!\");\n    retunr 0;\n}",
        validate(src) {
            if (src.includes('retunr')) return "There's still a typo - it should be 'return', not 'retunr'.";
            if (!src.includes('return 0;')) return "Make main end with 'return 0;'.";
            return true;
          }
      },
      {
        sub_id: 3,
        title: "Comments & Clean Formatting",
        theory: "\n    <h2>Comments &amp; Clean Formatting</h2>\n    <p>Comments are notes for humans; the compiler ignores them. They explain <em>why</em> code does something and keep a program readable.</p>\n    <h3>Two styles</h3>\n    <pre>// single-line comment - runs to the end of the line\n\n/* multi-line comment\n   spanning several lines */</pre>\n    <h3>Formatting habits</h3>\n    <ul>\n      <li>Indent code inside <code>{ }</code> (usually 4 spaces).</li>\n      <li>One statement per line.</li>\n      <li>Use blank lines to separate ideas.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Add a comment above the <code>printf</code> line explaining what it does. Any <code>//</code> or <code>/* */</code> comment counts.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Readable code!\");\n    return 0;\n}",
        validate(src) {
            if (!src.includes('//') && !src.includes('/*')) return "Add a comment using // or /* */.";
            if (!src.includes('printf')) return "Keep the printf() line.";
            return true;
          }
      },
      {
        sub_id: 4,
        title: "Escape Sequences",
        theory: "\n    <h2>Escape Sequences</h2>\n    <p>Some characters can't be typed directly inside a string, so C uses <strong>escape sequences</strong>: a backslash followed by a letter.</p>\n    <h3>Common ones</h3>\n    <ul>\n      <li><code>\\n</code> - new line</li>\n      <li><code>\\t</code> - tab</li>\n      <li><code>\\\"</code> - a literal double quote</li>\n    </ul>\n    <pre>printf(\"Line one\\nLine two\");</pre>\n    <p>That prints on two lines, because <code>\\n</code> moves the cursor down to the next one.</p>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Make the program print <strong>two separate lines</strong> by adding a <code>\\n</code> in the middle of the text.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Line oneLine two\");\n    return 0;\n}",
        validate(src) {
            if (!src.includes('\\n')) return "Add a \\n escape sequence to create a new line.";
            if (!src.includes('printf')) return "Keep the printf() line.";
            return true;
          }
      }
    ]
  },
  1: {
    title: "Variables & Types",
    level: "beginner",
    time: "~1 hr",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Declaring & Initialising Variables",
        theory: "\n    <h2>Declaring &amp; Initialising Variables</h2>\n    <p>A variable is a named box in memory. Before you can use one, you must <strong>declare</strong> it: state its type and name. You can also <strong>initialise</strong> it - give it a starting value on the same line.</p>\n    <h3>The pattern</h3>\n    <pre>int count;          // declare (no value yet)\ncount = 5;          // assign later\n\nint score = 100;    // declare + initialise together</pre>\n    <ul>\n      <li>Names are case-sensitive: <code>age</code> and <code>Age</code> differ.</li>\n      <li>Use meaningful names - <code>total</code>, not <code>t</code>.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Declare an integer called <code>age</code> and initialise it to <code>20</code> on a single line.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    // declare the variable here\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('int age')) return "Declare an integer named age (int age).";
            if (!src.includes('20')) return "Initialise age to 20.";
            if (!src.includes('=')) return "Use = to assign the value.";
            return true;
          }
      },
      {
        sub_id: 1,
        title: "Core Data Types",
        theory: "\n    <h2>Core Data Types</h2>\n    <p>The type of a variable decides what it can hold and how much memory it uses.</p>\n    <h3>The essentials</h3>\n    <ul>\n      <li><code>int</code> - whole numbers: <code>42</code></li>\n      <li><code>float</code> - decimals: <code>3.14</code></li>\n      <li><code>double</code> - bigger, more precise decimals</li>\n      <li><code>char</code> - one character in single quotes: <code>'A'</code></li>\n    </ul>\n    <pre>int    lives = 3;\nfloat  pi    = 3.14;\nchar   grade = 'A';</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Declare a <code>float</code> called <code>pi</code> set to <code>3.14</code>, and a <code>char</code> called <code>grade</code> set to <code>'A'</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    // declare the two variables here\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('float') || !src.includes('3.14')) return "Declare a float pi = 3.14;";
            if (!src.includes('char') || !src.includes("'A'")) return "Declare a char grade = 'A';";
            return true;
          }
      },
      {
        sub_id: 2,
        title: "Reading Input with scanf()",
        theory: "\n    <h2>Reading Input with scanf()</h2>\n    <p><code>printf</code> sends data out; <code>scanf</code> reads data in from the user. It needs two things: a format specifier, and the <strong>address</strong> of the variable to fill - that's the <code>&amp;</code>.</p>\n    <pre>int age;\nprintf(\"Enter your age: \");\nscanf(\"%d\", &amp;age);   // read an int into age</pre>\n    <ul>\n      <li><code>%d</code> reads an int, <code>%f</code> a float, <code>%c</code> a char.</li>\n      <li>The <code>&amp;</code> before the variable is required - it tells scanf <em>where</em> to store the value.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Read an integer into <code>x</code> using <code>scanf</code> with <code>\"%d\"</code> and <code>&amp;x</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int x;\n    // read an integer into x below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('scanf')) return "Use scanf() to read input.";
            if (!src.includes('%d')) return "Use the %d specifier to read an integer.";
            if (!src.includes('&x')) return "Pass the address of x with &x.";
            return true;
          }
      },
      {
        sub_id: 3,
        title: "Arithmetic & Assignment Operators",
        theory: "\n    <h2>Arithmetic &amp; Assignment Operators</h2>\n    <p>C does maths with the operators you'd expect, plus a few handy shortcuts.</p>\n    <h3>Arithmetic</h3>\n    <ul>\n      <li><code>+  -  *  /</code> - add, subtract, multiply, divide</li>\n      <li><code>%</code> - remainder (modulo): <code>7 % 3</code> is <code>1</code></li>\n    </ul>\n    <h3>Assignment shortcuts</h3>\n    <pre>int total = 0;\ntotal = total + 5;   // long way\ntotal += 5;          // same thing, shorter\ntotal++;             // add 1</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Given <code>a</code> and <code>b</code>, add them together and store the result in a variable called <code>sum</code> (use <code>a + b</code>).</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int a = 8, b = 5;\n    // add the two numbers below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('sum')) return "Store the result in a variable called sum.";
            if (!src.includes('a + b') && !src.includes('a+b')) return "Add a and b together (a + b).";
            return true;
          }
      },
      {
        sub_id: 4,
        title: "Type Conversion & Casting",
        theory: "\n    <h2>Type Conversion &amp; Casting</h2>\n    <p>C sometimes converts between types automatically, but integer division can surprise you: <code>7 / 2</code> is <code>3</code>, not <code>3.5</code>, because both sides are <code>int</code>.</p>\n    <h3>Forcing a type with a cast</h3>\n    <p>Put the target type in parentheses before a value to convert it:</p>\n    <pre>int a = 7, b = 2;\nfloat result = (float)a / b;   // 3.5, not 3</pre>\n    <p>Casting <code>a</code> to <code>float</code> makes the whole division use decimals.</p>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Divide <code>a</code> by <code>b</code> as decimals by casting one side with <code>(float)</code>, storing the answer in <code>result</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int a = 7, b = 2;\n    float result;\n    // cast one side and divide below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('(float)') && !src.includes('(double)')) return "Use a cast like (float) to convert before dividing.";
            if (!src.includes('result')) return "Store the answer in result.";
            if (!src.includes('/')) return "Use / to divide a by b.";
            return true;
          }
      }
    ]
  },
  2: {
    title: "Pointers & Memory",
    level: "core",
    time: "~1.5 hrs",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Addresses & the & Operator",
        theory: "\n    <h2>Addresses &amp; the &amp; Operator</h2>\n    <p>Every variable lives somewhere in memory, at a numbered location called its <strong>address</strong>. The <code>&amp;</code> operator (\"address of\") gives you that location.</p>\n    <pre>int n = 42;\nprintf(\"value: %d\\n\", n);      // 42\nprintf(\"address: %p\\n\", &amp;n);  // e.g. 0x7ffd...</pre>\n    <ul>\n      <li><code>n</code> is the value; <code>&amp;n</code> is where it lives.</li>\n      <li><code>%p</code> is the format specifier for printing an address.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Print the address of <code>n</code> using <code>&amp;n</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int n = 42;\n    // print the address of n below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('&n')) return "Use &n to get the address of n.";
            if (!src.includes('printf')) return "Print it with printf.";
            return true;
          }
      },
      {
        sub_id: 1,
        title: "Declaring Pointers & Dereferencing",
        theory: "\n    <h2>Declaring Pointers &amp; Dereferencing</h2>\n    <p>A <strong>pointer</strong> is a variable that stores an address. Declare one with a <code>*</code>, aim it at something with <code>&amp;</code>, and read through it with <code>*</code> (called <em>dereferencing</em>).</p>\n    <pre>int  n   = 42;\nint *ptr = &amp;n;       // ptr points at n\n\nprintf(\"%d\", *ptr);   // 42 - the value ptr points to</pre>\n    <ul>\n      <li><code>int *ptr</code> - \"ptr is a pointer to an int\".</li>\n      <li><code>*ptr</code> - the value stored at that address.</li>\n      <li>Change <code>*ptr</code> and you change <code>n</code> itself.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Declare a pointer <code>ptr</code> aimed at <code>n</code> (using <code>&amp;n</code>), then print the value with <code>*ptr</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int n = 42;\n    // declare a pointer and read through it below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('*ptr')) return "Declare and use a pointer called ptr (int *ptr).";
            if (!src.includes('&n')) return "Aim ptr at n with &n.";
            return true;
          }
      },
      {
        sub_id: 2,
        title: "Pointers & Functions (Pass by Reference)",
        theory: "\n    <h2>Pointers &amp; Functions (Pass by Reference)</h2>\n    <p>Normally C passes a <em>copy</em> of a value into a function, so the original can't be changed. Pass a <strong>pointer</strong> instead and the function can reach back and modify the caller's variable - this is <em>pass by reference</em>.</p>\n    <pre>void addOne(int *p) {\n    *p = *p + 1;      // change the caller's variable\n}\n\nint main(void) {\n    int score = 10;\n    addOne(&amp;score);      // pass the address\n    printf(\"%d\", score);  // 11\n}</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Finish <code>addOne</code> so it adds <code>1</code> to the value its pointer points at, using <code>*p</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nvoid addOne(int *p) {\n    // increment the value at the pointer\n}\n\nint main(void) {\n    int score = 10;\n    addOne(&score);\n    printf(\"%d\", score);\n    return 0;\n}",
        validate(src) {
            if (!src.includes('*p')) return "Use *p to reach the value the pointer points at.";
            if (!src.includes('*p = *p + 1') && !src.includes('*p += 1') && !src.includes('(*p)++')) return "Add one to *p, e.g. *p = *p + 1;";
            return true;
          }
      },
      {
        sub_id: 3,
        title: "Pointer Arithmetic",
        theory: "\n    <h2>Pointer Arithmetic</h2>\n    <p>Adding to a pointer doesn't add bytes - it moves by whole elements. If <code>p</code> points at an <code>int</code>, then <code>p + 1</code> points at the <em>next</em> int, and <code>*(p + 1)</code> reads it.</p>\n    <pre>int nums[3] = {10, 20, 30};\nint *p = nums;          // points at nums[0]\n\nprintf(\"%d\", *p);         // 10\nprintf(\"%d\", *(p + 1));   // 20\nprintf(\"%d\", *(p + 2));   // 30</pre>\n    <p>This is exactly why <code>nums[i]</code> and <code>*(nums + i)</code> mean the same thing.</p>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Using the pointer <code>p</code>, print the <strong>second</strong> element (value <code>20</code>) with <code>*(p + 1)</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int nums[3] = {10, 20, 30};\n    int *p = nums;\n    // print the second element through p\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('*(p + 1)') && !src.includes('*(p+1)') && !src.includes('p[1]')) return "Reach the second element with *(p + 1).";
            if (!src.includes('printf')) return "Print it with printf.";
            return true;
          }
      },
      {
        sub_id: 4,
        title: "A First Look at Dynamic Memory",
        theory: "\n    <h2>A First Look at Dynamic Memory</h2>\n    <p>Sometimes you don't know how much memory you'll need until the program runs. <code>malloc</code> asks the system for a block of memory at runtime; <code>free</code> gives it back when you're done.</p>\n    <pre>#include &lt;stdlib.h&gt;   // malloc / free live here\n\nint *p = malloc(sizeof(int));   // room for one int\n*p = 99;\nprintf(\"%d\", *p);               // 99\nfree(p);                        // always release it</pre>\n    <ul>\n      <li><code>sizeof(int)</code> asks for exactly the size of one int.</li>\n      <li>Every <code>malloc</code> should have a matching <code>free</code>, or memory leaks.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Allocate space for one <code>int</code> with <code>malloc</code>, then release it with <code>free</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // allocate one int, then release it\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('malloc')) return "Use malloc to allocate memory.";
            if (!src.includes('free')) return "Release the memory with free().";
            return true;
          }
      }
    ]
  },
  3: {
    title: "Arrays & Strings",
    level: "core",
    time: "~1.5 hrs",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Declaring & Indexing Arrays",
        theory: "\n    <h2>Declaring &amp; Indexing Arrays</h2>\n    <p>An <strong>array</strong> stores several values of the same type under one name. You reach each one by its <strong>index</strong>, counting from <code>0</code>.</p>\n    <pre>int data[3] = {10, 20, 30};\n\nprintf(\"%d\", data[0]);   // 10 - first element\nprintf(\"%d\", data[2]);   // 30 - last element</pre>\n    <ul>\n      <li><code>data[3]</code> makes room for 3 ints.</li>\n      <li>Valid indexes are <code>0</code>, <code>1</code>, <code>2</code> - <code>data[3]</code> is off the end.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Declare an int array <code>data</code> holding <code>1, 2, 3</code>, then print its <strong>first</strong> element with <code>data[0]</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    // declare the array and print its first element\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('data[')) return "Declare an array called data (e.g. int data[3]).";
            if (!src.includes('1') || !src.includes('2') || !src.includes('3')) return "Fill it with the values 1, 2, 3.";
            if (!src.includes('data[0]')) return "Print the first element with data[0].";
            return true;
          }
      },
      {
        sub_id: 1,
        title: "Looping over Arrays",
        theory: "\n    <h2>Looping over Arrays</h2>\n    <p>To visit every element, use a loop with a counter. A <code>for</code> loop is the natural fit: it sets a start, a condition, and a step all on one line.</p>\n    <pre>int data[3] = {10, 20, 30};\n\nfor (int i = 0; i &lt; 3; i++) {\n    printf(\"%d\\n\", data[i]);\n}</pre>\n    <ul>\n      <li><code>i</code> goes 0, 1, 2 and stops before 3.</li>\n      <li><code>data[i]</code> reads the element at the current index.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Write a <code>for</code> loop that prints every element of <code>data</code> using <code>data[i]</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int data[3] = {10, 20, 30};\n    // loop over the array below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('for')) return "Use a for loop.";
            if (!src.includes('[i]')) return "Access each element with data[i].";
            if (!src.includes('printf')) return "Print each element with printf.";
            return true;
          }
      },
      {
        sub_id: 2,
        title: "How Arrays Relate to Pointers",
        theory: "\n    <h2>How Arrays Relate to Pointers</h2>\n    <p>An array's name is really the <strong>address of its first element</strong>. That means you can aim a pointer straight at an array with no <code>&amp;</code>:</p>\n    <pre>int data[3] = {10, 20, 30};\nint *p = data;        // same as &amp;data[0]\n\nprintf(\"%d\", *p);         // 10\nprintf(\"%d\", *(p + 1));   // 20\nprintf(\"%d\", p[1]);       // 20 - arrays and pointers index the same way</pre>\n    <p>This is why passing an array to a function really passes a pointer.</p>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Aim <code>p</code> at <code>data</code> (no <code>&amp;</code> needed) and print the first element with <code>*p</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    int data[3] = {10, 20, 30};\n    // aim a pointer at the array and read the first value\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('*p')) return "Declare a pointer p (int *p).";
            if (!src.includes('= data')) return "Aim p at the array with p = data.";
            return true;
          }
      },
      {
        sub_id: 3,
        title: "C Strings & the Null Terminator",
        theory: "\n    <h2>C Strings &amp; the Null Terminator</h2>\n    <p>C has no dedicated string type - a string is just an array of <code>char</code> ending with a hidden <strong>null terminator</strong> <code>'\\0'</code>. That invisible marker tells functions where the text stops.</p>\n    <pre>char name[] = \"Hei\";\n// actually stored as: 'H' 'e' 'i' '\\0'\n\nprintf(\"%s\", name);   // prints: Hei</pre>\n    <ul>\n      <li>Double quotes <code>\"...\"</code> make a string and add the <code>'\\0'</code> for you.</li>\n      <li><code>%s</code> prints characters until it hits the <code>'\\0'</code>.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Declare a <code>char</code> array called <code>name</code> set to <code>\"Hei\"</code>, and print it with <code>%s</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    // declare the string and print it with %s\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('char')) return "Use a char array to hold the string.";
            if (!src.includes('name')) return "Call the array name.";
            if (!src.includes('%s')) return "Print it with the %s specifier.";
            return true;
          }
      },
      {
        sub_id: 4,
        title: "Handy String Functions",
        theory: "\n    <h2>Handy String Functions</h2>\n    <p>The <code>&lt;string.h&gt;</code> library gives you ready-made tools so you don't loop over characters by hand.</p>\n    <ul>\n      <li><code>strlen(s)</code> - length of <code>s</code> (not counting <code>'\\0'</code>)</li>\n      <li><code>strcpy(dst, src)</code> - copy <code>src</code> into <code>dst</code></li>\n      <li><code>strcmp(a, b)</code> - compare; <code>0</code> means equal</li>\n    </ul>\n    <pre>#include &lt;string.h&gt;\n\nchar word[] = \"Hello\";\nint len = strlen(word);   // 5</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Include <code>&lt;string.h&gt;</code> and use <code>strlen</code> to store the length of <code>word</code> in <code>len</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nint main(void) {\n    char word[] = \"Hello\";\n    int len;\n    // measure the word below\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('string.h')) return "Include <string.h> to use string functions.";
            if (!src.includes('strlen')) return "Use strlen() to get the length.";
            if (!src.includes('len')) return "Store the result in len.";
            return true;
          }
      }
    ]
  },
  4: {
    title: "Structs & Data Structures",
    level: "advanced",
    time: "~2 hrs",
    sub_lessons: [
      {
        sub_id: 0,
        title: "Defining and Using a struct",
        theory: "\n    <h2>Defining and Using a struct</h2>\n    <p>A <strong>struct</strong> groups related variables (of possibly different types) into one new type. Reach each <strong>field</strong> with a dot <code>.</code>.</p>\n    <pre>struct Point {\n    int x;\n    int y;\n};\n\nstruct Point p;\np.x = 3;\np.y = 5;\nprintf(\"%d, %d\", p.x, p.y);  // 3, 5</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>A <code>struct Point</code> with fields <code>x</code> and <code>y</code> is defined for you. Create one called <code>p</code> and set <code>p.x</code> to <code>3</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    // create a Point and set its x field\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('struct Point p')) return "Create a Point with: struct Point p;";
            if (!src.includes('p.x')) return "Set the x field with p.x.";
            if (!src.includes('3')) return "Set p.x to 3.";
            return true;
          }
      },
      {
        sub_id: 1,
        title: "Arrays of Structs",
        theory: "\n    <h2>Arrays of Structs</h2>\n    <p>You can store many structs in an array - a common way to hold a list of records. Combine array indexing with the dot operator.</p>\n    <pre>struct Point pts[2];\n\npts[0].x = 1;\npts[0].y = 2;\npts[1].x = 3;\npts[1].y = 4;\n\nprintf(\"%d\", pts[1].x);  // 3</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Make an array <code>pts</code> of <code>2</code> Points, then set <code>pts[0].x</code> to <code>1</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    // make the array and set the first point's x\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('pts[2]')) return "Declare an array of 2 Points: struct Point pts[2];";
            if (!src.includes('pts[0].x')) return "Set the first point's x with pts[0].x.";
            return true;
          }
      },
      {
        sub_id: 2,
        title: "typedef for Cleaner Code",
        theory: "\n    <h2>typedef for Cleaner Code</h2>\n    <p>Writing <code>struct Point</code> everywhere gets noisy. <code>typedef</code> gives a type a shorter alias so you can drop the <code>struct</code> keyword.</p>\n    <pre>typedef struct {\n    int x;\n    int y;\n} Point;          // \"Point\" is now a type\n\nPoint p;          // no \"struct\" needed\np.x = 7;</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>The <code>Point</code> type is already <code>typedef</code>'d. Declare a variable <code>p</code> and set <code>p.x</code> to <code>7</code> - notice you don't write <code>struct</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nint main(void) {\n    // declare a Point and set its x field\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('Point p')) return "Declare a Point called p (no 'struct' needed).";
            if (!src.includes('p.x')) return "Set the x field with p.x.";
            if (!src.includes('7')) return "Set p.x to 7.";
            return true;
          }
      },
      {
        sub_id: 3,
        title: "Pointers to Structs & the Arrow",
        theory: "\n    <h2>Pointers to Structs &amp; the -&gt; Operator</h2>\n    <p>When you have a <em>pointer</em> to a struct, use the arrow <code>-&gt;</code> instead of the dot to reach fields. <code>p-&gt;x</code> is shorthand for <code>(*p).x</code>.</p>\n    <pre>Point pt = {0, 0};\nPoint *p = &amp;pt;\n\np-&gt;x = 5;            // same as (*p).x = 5\nprintf(\"%d\", p-&gt;x);  // 5</pre>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>A pointer <code>p</code> points to <code>pt</code>. Set its <code>x</code> field to <code>5</code> using the arrow operator <code>p-&gt;x</code>.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nint main(void) {\n    Point pt = {0, 0};\n    Point *p = &pt;\n    // set the x field using the arrow operator\n\n    return 0;\n}",
        validate(src) {
            if (!src.includes('p->x')) return "Use the arrow operator: p->x.";
            if (!src.includes('5')) return "Set p->x to 5.";
            return true;
          }
      },
      {
        sub_id: 4,
        title: "Your First Linked List",
        theory: "\n    <h2>Your First Linked List</h2>\n    <p>A <strong>linked list</strong> is a chain of nodes. Each node holds a value plus a pointer to the <code>next</code> node, so the list can grow without a fixed size. The last node points to <code>NULL</code>.</p>\n    <pre>struct Node {\n    int data;\n    struct Node *next;   // points to the next node\n};\n\n// [10|*] -&gt; [20|*] -&gt; NULL</pre>\n    <ul>\n      <li>A node contains a pointer to <em>its own type</em> - that's what links the chain.</li>\n      <li><code>NULL</code> marks the end.</li>\n    </ul>\n    <div class=\"task-box dont-print\">\n      <h3>Your Task</h3>\n      <p>Complete the <code>Node</code> struct: it needs an <code>int data</code> field and a <code>struct Node *next</code> pointer.</p>\n    </div>\n  ",
        starter: "#include <stdio.h>\n\nstruct Node {\n    // add two fields: the value, and a link to the following node\n\n};\n\nint main(void) {\n    return 0;\n}",
        validate(src) {
            if (!src.includes('int data')) return "Add an int field called data.";
            if (!src.includes('next')) return "Add a field called next that points to the following node.";
            if (!src.includes('*')) return "The next field must be a pointer - use struct Node *next;";
            return true;
          }
      }
    ]
  }
};
