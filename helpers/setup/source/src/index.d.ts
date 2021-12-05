import commonSetup, {
  createNest,
  cell as commonMeiosisCell,
  StreamLibWithProperty
} from "./common";
import mergerinoSetup, { cell as mergerinoCell, nest as mergerinoNest } from "./mergerino";
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
    export { mergerinoSetup as setup, mergerinoCell as cell, mergerinoNest as nest };
  }
  export namespace functionPatches {
    export {
      functionPatchesSetup as setup,
      functionPatchesCell as cell,
      functionPatchesNest as nest
    };
  }
  export namespace immer {
    export { immerSetup as setup, immerCell as cell, immerNest as nest };
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
  FunctionPatchesMeiosisConfig,
  FunctionPatchesNest,
  FunctionPatchesRootCell
} from "./functionPatches";

export {
  ImmerApp,
  ImmerConfig,
  ImmerCell,
  ImmerMeiosisConfig,
  ImmerRootCell,
  ImmerPatch,
  Produce
} from "./immer";

export {
  MergerinoFunctionPatch,
  MergerinoObjectPatch,
  MergerinoPatch,
  MergerinoMeiosisConfig,
  MergerinoApp,
  MergerinoCell,
  MergerinoRootCell,
  MergerinoNest,
  MergerinoConfig
} from "./mergerino";

export default meiosisSetup;
