import commonSetup, {
  createNest,
  meiosisCell as commonMeiosisCell,
  StreamLibWithProperty
} from "./common";
import mergerinoSetup, { meiosisCell as mergerinoCell, nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, {
  meiosisCell as functionPatchesCell,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { meiosisCell as immerCell, nest as immerNest } from "./immer";
import { get } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, commonMeiosisCell as setupCell, createNest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoCell as meiosisCell, mergerinoNest as nest };
  }
  export namespace functionPatches {
    export {
      functionPatchesSetup as setup,
      functionPatchesCell as meiosisCell,
      functionPatchesNest as nest
    };
  }
  export namespace immer {
    export { immerSetup as setup, immerCell as meiosisCell, immerNest as nest };
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
  FunctionPatchesCell,
  FunctionPatchesMeiosisConfig
} from "./functionPatches";
export { ImmerApp, ImmerConfig, ImmerCell, ImmerMeiosisConfig, ImmerPatch } from "./immer";
export {
  MergerinoMeiosisConfig,
  MergerinoApp,
  MergerinoConfig,
  MergerinoCell,
  MergerinoPatch
} from "./mergerino";

export default meiosisSetup;
