/* curriculum/module-0-hello/module.js */
import l0 from './0-your-first-program.js';
import l1 from './1-anatomy.js';
import l2 from './2-compile-run.js';
import l3 from './3-comments.js';
import l4 from './4-escape-sequences.js';

export default {
  title: "Hello, World & Syntax",
  level: "beginner",
  time: "~45 min",
  desc: "Write, compile and run your very first C program, and learn how the pieces of a program fit together.",
  outline: [
    "Your first program: <code>main()</code> and <code>printf()</code>",
    "Anatomy of a C file: <code>#include</code>, statements, semicolons",
    "Compiling and running right in the browser",
    "Comments and clean formatting",
    "Escape sequences and printing values"
  ],
  sub_lessons: [l0, l1, l2, l3, l4]
};
