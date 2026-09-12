/* curriculum/module-3-arrays/module.js */
import l0 from './0-declaring-arrays.js';
import l1 from './1-looping.js';
import l2 from './2-arrays-and-pointers.js';
import l3 from './3-strings.js';
import l4 from './4-string-functions.js';

export default {
  title: "Arrays & Strings",
  level: "core",
  time: "~1.5 hrs",
  desc: "Work with collections of values and C's null-terminated strings.",
  outline: [
    "Declaring and indexing arrays",
    "Looping over arrays with <code>for</code> and <code>while</code>",
    "How arrays relate to pointers in memory",
    "C strings and the null terminator <code>'\\0'</code>",
    "Handy functions: <code>strlen</code>, <code>strcpy</code>, <code>strcmp</code>"
  ],
  sub_lessons: [l0, l1, l2, l3, l4]
};
