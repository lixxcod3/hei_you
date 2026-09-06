/* curriculum_data.js — Database all modules */

const curriculum = {
  // Modul 0: Hello World
  0: {
    title: "Hello, World & Syntax",
    sub_lessons: [
      {
        sub_id: 0,
        title: "1.1 The Foundation",
        theory: `
          <h2>The Foundation</h2>
          <p>Setiap program C membutuhkan titik awal, yaitu fungsi <code>main()</code>. Untuk mencetak teks, kita perlu meminjam alat dari standard library menggunakan <code>#include &lt;stdio.h&gt;</code>.</p>
          <div class="task-box dont-print">
            <h3>Your Task</h3>
            <p>Tambahkan titik koma (<code>;</code>) yang hilang, lalu ubah teks agar mencetak <strong>Hello, Builder!</strong></p>
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
        title: "1.2 Math & Printf",
        theory: `
          <h2>Format Specifiers</h2>
          <p>C menggunakan *format specifiers* seperti <code>%d</code> untuk mencetak angka bulat (integer). Ini sangat penting saat kamu ingin memvalidasi hasil dari operasi matematika.</p>
          <div class="task-box dont-print">
            <h3>Your Task</h3>
            <p>Deklarasikan <code>int x = 42;</code> dan cetak menggunakan <code>%d</code>.</p>
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
  
  // Modul 4 (Indeks 4): Structs & Data Structures
  4: {
    title: "Structs & Data Structures",
    sub_lessons: [
      {
        sub_id: 0,
        title: "5.1 Struct Basics",
        theory: "<h2>Structs</h2><p>Struct menggabungkan beberapa variabel menjadi satu kesatuan tipe data.</p>",
        starter: "// Struct lesson starter",
        validate: function(src) { return true; }
      },
      {
        sub_id: 1,
        title: "5.2 Double Linked Lists",
        theory: `
          <h2>Double Linked Lists</h2>
          <p>Berbeda dengan *single linked list*, setiap *node* di sini memiliki *pointer* ke elemen selanjutnya (<code>next</code>) dan elemen sebelumnya (<code>prev</code>). Ini mempermudah traversal dua arah.</p>
        `,
        starter: "struct Node {\n    int data;\n    struct Node* next;\n    struct Node* prev;\n};",
        validate: function(src) { return true; }
      },
      {
        sub_id: 2,
        title: "5.3 Binary Search Trees",
        theory: `
          <h2>BST Deletion Logic</h2>
          <p>Menghapus *node* dalam *Binary Search Tree* butuh kehati-hatian. Ada tiga kasus: *leaf node*, *node* dengan satu anak, dan *node* dengan dua anak.</p>
        `,
        starter: "// Write your BST deletion logic",
        validate: function(src) { return true; }
      }
    ]
  }
};
