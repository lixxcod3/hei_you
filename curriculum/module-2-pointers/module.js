/* curriculum/module-2-pointers/module.js */
import l0 from './0-addresses.js';
import l1 from './1-dereferencing.js';
import l2 from './2-pass-by-reference.js';
import l3 from './3-pointer-arithmetic.js';
import l4 from './4-dynamic-memory.js';

export default {
  title: "Pointers & Memory",
  level: "core",
  time: "~1.5 hrs",
  desc: "Meet the feature that makes C powerful: direct access to memory.",
  outline: [
    "What an address is, and the <code>&</code> operator",
    "Declaring pointers and dereferencing with <code>*</code>",
    "Pointers and functions (pass by reference)",
    "Pointer arithmetic, carefully",
    "A first look at dynamic memory (<code>malloc</code> / <code>free</code>)"
  ],
  sub_lessons: [l0, l1, l2, l3, l4]
};
