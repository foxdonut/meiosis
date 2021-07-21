import commonSetup, { meiosisOne as commonMeiosisOne, Nest, StreamLibWithProperty } from "./common";
import mergerinoSetup, {
  nest as mergerinoNest,
  meiosisOne as mergerinoMeiosisOne
} from "./mergerino";
import functionPatchesSetup, { nest as functionPatchesNest } from "./functionPatches";
import immerSetup, { nest as immerNest } from "./immer";
import preactSetup from "./preact";
import reactSetup from "./react";
import { get, setMutate, setImmutable } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, commonMeiosisOne as setupOne, Nest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoNest as nest, mergerinoMeiosisOne as meiosisOne };
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
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get, setMutate, setImmutable };
  }
}

export * from "./common";
export { FunctionPatch, MeiosisFunctionPatchesConfig } from "./functionPatches";
export { ImmerPatch, MeiosisImmerConfig } from "./immer";
export {
  MergerinoMeiosisConfig,
  MergerinoMeiosisOne,
  MergerinoMeiosisOneActionConstructor,
  MergerinoMeiosisOneApp,
  MergerinoMeiosisOneConfig,
  MergerinoPatch
} from "./mergerino";
export { PreactSetup } from "./preact";
export { ReactFunctions, ReactSetup } from "./react";

export default meiosisSetup;
