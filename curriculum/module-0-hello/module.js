/* curriculum/module-0-hello/module.js
   Module metadata + the ordered list of its lessons.
   level/time/desc/outline are here so the curriculum page can be driven
   from data later instead of hardcoding each card (see README). */
import lesson0 from './0-the-foundation.js';
import lesson1 from './1-format-specifiers.js';

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
  sub_lessons: [lesson0, lesson1]
};
