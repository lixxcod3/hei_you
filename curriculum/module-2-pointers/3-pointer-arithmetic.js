/* curriculum/module-2-pointers/3-pointer-arithmetic.js */
export default {
  title: "Pointer Arithmetic",
  theory: `
    <h2>Pointer Arithmetic</h2>
    <p>Adding to a pointer doesn't add bytes - it moves by whole elements. If <code>p</code> points at an <code>int</code>, then <code>p + 1</code> points at the <em>next</em> int, and <code>*(p + 1)</code> reads it.</p>
    <pre>int nums[3] = {10, 20, 30};
int *p = nums;          // points at nums[0]

printf("%d", *p);         // 10
printf("%d", *(p + 1));   // 20
printf("%d", *(p + 2));   // 30</pre>
    <p>This is exactly why <code>nums[i]</code> and <code>*(nums + i)</code> mean the same thing.</p>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Using the pointer <code>p</code>, print the <strong>second</strong> element (value <code>20</code>) with <code>*(p + 1)</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int nums[3] = {10, 20, 30};\n    int *p = nums;\n    // print the second element through p\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('*(p + 1)') && !src.includes('*(p+1)') && !src.includes('p[1]')) return "Reach the second element with *(p + 1).";
    if (!src.includes('printf')) return "Print it with printf.";
    return true;
  }
};
