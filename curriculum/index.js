/* curriculum/index.js
   Single source of truth. Assembles every module into one ordered array.
   The rest of the app reads `curriculum[modIndex]` exactly as before —
   only now each module and lesson lives in its own file.

   To add a module: create its folder + module.js, then import it here
   and drop it into the array in the position you want it to appear. */
import module0 from './module-0-hello/module.js';
import module1 from './module-1-variables/module.js';
import module2 from './module-2-pointers/module.js';
import module3 from './module-3-arrays/module.js';
import module4 from './module-4-structs/module.js';

export const curriculum = [module0, module1, module2, module3, module4];

export default curriculum;
