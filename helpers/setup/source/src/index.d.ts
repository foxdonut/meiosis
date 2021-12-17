import commonSetup, { createNest, setupCell as commonCell, StreamLibWithProperty } from "./common";
import mergerinoSetup, { setupCell as mergerinoCell, nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, {
  setupCell as functionPatchesCell,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { setupCell as immerCell, produceNest } from "./immer";
import { get } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, commonCell as setupCell, createNest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoCell as setupCell, mergerinoNest as nest };
  }
  export namespace functionPatches {
    export {
      functionPatchesSetup as setup,
      functionPatchesCell as setupCell,
      functionPatchesNest as nest
    };
  }
  export namespace immer {
    export { immerSetup as setup, immerCell as setupCell, produceNest };
  }
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get };
  }
}

export default meiosisSetup;
