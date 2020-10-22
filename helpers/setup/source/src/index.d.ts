import commonSetup from "./common";
import mergerinoSetup from "./mergerino";
import functionPatchesSetup from "./functionPatches";
import immerSetup from "./immer";
import preactSetup from "./preact";
import reactSetup from "./react";
import { SimpleStream } from "./simple-stream";

declare namespace _default {
  export namespace common {
    export { commonSetup as setup };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup };
  }
  export namespace functionPatches {
    export { functionPatchesSetup as setup };
  }
  export namespace immer {
    export { immerSetup as setup };
  }
  export namespace preact {
    export { preactSetup as setup };
  }
  export namespace react {
    export { reactSetup as setup };
  }
  let simpleStream: SimpleStream;
}

export default _default;
