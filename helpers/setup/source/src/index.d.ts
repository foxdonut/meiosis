import commonSetup, { Nest, StreamLib } from "./common";
import mergerinoSetup, { nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, { nest as functionPatchesNest } from "./functionPatches";
import immerSetup, { nest as immerNest } from "./immer";
import preactSetup from "./preact";
import reactSetup from "./react";
import { get, setMutate, setImmutable } from "./util";

declare namespace _default {
  export namespace common {
    export { commonSetup as setup, Nest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoNest as nest };
  }
  export namespace functionPatches {
    export { functionPatchesSetup as setup, functionPatchesNest as nest };
  }
  export namespace immer {
    export { immerSetup as setup, immerNest as nest };
  }
  export namespace preact {
    export { preactSetup as setup };
  }
  export namespace react {
    export { reactSetup as setup };
  }
  let simpleStream: StreamLib;
  export namespace util {
    export { get, setMutate, setImmutable };
  }
}

export * from "./common";
export { FunctionPatch, MeiosisFunctionPatchesConfig } from "./functionPatches";
export { ImmerPatch, MeiosisImmerConfig } from "./immer";
export { MeiosisMergerinoConfig } from "./mergerino";
export { PreactSetup, PreactAppProps } from "./preact";
export { ReactFunctions, ReactSetup, ReactAppProps } from "./react";

export default _default;
