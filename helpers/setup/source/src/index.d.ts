import commonSetup, { createNest, StreamLibWithProperty } from "./common";
import mergerinoSetup, { nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, { nest as functionPatchesNest } from "./functionPatches";
import immerSetup, { produceNest } from "./immer";
import { get } from "./util";

declare namespace meiosisSetup {
  export namespace common {
    export { commonSetup as setup, createNest };
  }
  export namespace mergerino {
    export { mergerinoSetup as setup, mergerinoNest as nest };
  }
  export namespace functionPatches {
    export { functionPatchesSetup as setup, functionPatchesNest as nest };
  }
  export namespace immer {
    export { immerSetup as setup, produceNest };
  }
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get };
  }
}

export default meiosisSetup;
