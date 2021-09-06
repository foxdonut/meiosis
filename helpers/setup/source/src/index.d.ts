import commonSetup, { meiosisOne as commonMeiosisOne, StreamLibWithProperty } from "./common";
import mergerinoSetup, { meiosisOne as mergerinoMeiosisOne } from "./mergerino";
import functionPatchesSetup, { meiosisOne as functionPatchesMeiosisOne } from "./functionPatches";
import immerSetup, { meiosisOne as immerMeiosisOne } from "./immer";
import { get } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, commonMeiosisOne as setupOne };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoMeiosisOne as meiosisOne };
  }
  export namespace functionPatches {
    export { functionPatchesSetup as setup, functionPatchesMeiosisOne as meiosisOne };
  }
  export namespace immer {
    export { immerSetup as setup, immerMeiosisOne as meiosisOne };
  }
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get };
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
