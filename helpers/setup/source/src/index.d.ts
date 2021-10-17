import commonSetup, {
  createNest,
  meiosisOne as commonMeiosisOne,
  StreamLibWithProperty
} from "./common";
import mergerinoSetup, {
  meiosisOne as mergerinoMeiosisOne,
  nest as mergerinoNest
} from "./mergerino";
import functionPatchesSetup, {
  meiosisOne as functionPatchesMeiosisOne,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { meiosisOne as immerMeiosisOne, nest as immerNest } from "./immer";
import { get } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, commonMeiosisOne as setupOne, createNest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoMeiosisOne as meiosisOne, mergerinoNest as nest };
  }
  export namespace functionPatches {
    export {
      functionPatchesSetup as setup,
      functionPatchesMeiosisOne as meiosisOne,
      functionPatchesNest as nest
    };
  }
  export namespace immer {
    export { immerSetup as setup, immerMeiosisOne as meiosisOne, immerNest as nest };
  }
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get };
  }
}

export * from "./common";
export {
  FunctionPatch,
  FunctionPatchesApp,
  FunctionPatchesConfig,
  FunctionPatchesContext,
  FunctionPatchesMeiosisConfig
} from "./functionPatches";
export { ImmerApp, ImmerConfig, ImmerMeiosisConfig, ImmerPatch } from "./immer";
export { MergerinoMeiosisConfig, MergerinoApp, MergerinoConfig, MergerinoPatch } from "./mergerino";

export default meiosisSetup;
