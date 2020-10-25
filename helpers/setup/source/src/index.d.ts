import commonSetup, { StreamLib } from "./common";
import mergerinoSetup from "./mergerino";
import functionPatchesSetup from "./functionPatches";
import immerSetup from "./immer";
import preactSetup from "./preact";
import reactSetup from "./react";

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
  let simpleStream: StreamLib;
}

export * from "./common";
export * from "./functionPatches";
export * from "./immer";
export * from "./mergerino";
export * from "./preact";
export * from "./react";

export default _default;
