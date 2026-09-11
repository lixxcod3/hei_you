/* curriculum/module-0-hello/1-anatomy.js */
export default {
  title: "Anatomy of a C File",
  theory: `
    <h2>Anatomy of a C File</h2>
    <p>A C file has a predictable shape. Once you know the parts, error messages get much easier to read.</p>
    <h3>Directives, statements, blocks</h3>
    <ul>
      <li><strong>Directives</strong> start with <code>#</code> and run before compiling, e.g. <code>#include &lt;stdio.h&gt;</code>. They take <em>no</em> semicolon.</li>
      <li><strong>Statements</strong> are single instructions and <em>always</em> end with <code>;</code>.</li>
      <li><strong>Blocks</strong> group statements inside <code>{ }</code>.</li>
    </ul>
    <pre>#include &lt;stdio.h&gt;      // directive - no semicolon

int main(void) {         // block starts
    printf("Hi");        // statement - semicolon!
    return 0;            // statement - semicolon!
}                        // block ends</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>This program is missing its include line and a semicolon. Add <code>#include &lt;stdio.h&gt;</code> at the top and fix the missing <code>;</code> so it compiles.</p>
    </div>
  `,
  starter: `int main(void) {\n    printf("Fixed!")\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('#include')) return "Add the #include directive at the top.";
    if (!src.includes('stdio.h')) return "You need to include <stdio.h> for printf.";
    if (!src.includes('printf')) return "Keep the printf() call.";
    if ((src.match(/;/g) || []).length < 2) return "A statement is still missing its semicolon (;).";
    return true;
  }
};
