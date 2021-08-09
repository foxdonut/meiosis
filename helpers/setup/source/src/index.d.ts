import commonSetup, { meiosisOne as commonMeiosisOne, Nest, StreamLibWithProperty } from "./common";
import mergerinoSetup, {
  nest as mergerinoNest,
  meiosisOne as mergerinoMeiosisOne
} from "./mergerino";
import functionPatchesSetup, {
  nest as functionPatchesNest,
  meiosisOne as functionPatchesMeiosisOne
} from "./functionPatches";
import immerSetup, { nest as immerNest } from "./immer";
import { get, setImmutable, setMutate } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, commonMeiosisOne as setupOne, Nest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoNest as nest, mergerinoMeiosisOne as meiosisOne };
  }
  export namespace functionPatches {
    export {
      functionPatchesSetup as setup,
      functionPatchesNest as nest,
      functionPatchesMeiosisOne as meiosisOne
    };
  }
  export namespace immer {
    export { immerSetup as setup, immerNest as nest };
  }
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get, setImmutable, setMutate };
  }
}

export * from "./common";
export {
  FunctionPatch,
  FunctionPatchesMeiosisConfig,
  FunctionPatchesMeiosisOne,
  FunctionPatchesMeiosisOneApp,
  FunctionPatchesMeiosisOneConfig
} from "./functionPatches";
export {
  ImmerMeiosisConfig,
  ImmerMeiosisOne,
  ImmerMeiosisOneApp,
  ImmerMeiosisOneConfig,
  ImmerPatch
} from "./immer";
export {
  MergerinoMeiosisConfig,
  MergerinoMeiosisOne,
  MergerinoMeiosisOneApp,
  MergerinoMeiosisOneConfig,
  MergerinoPatch
} from "./mergerino";

export default meiosisSetup;
