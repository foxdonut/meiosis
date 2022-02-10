import commonSetup, { StreamLibWithProperty } from "./common";
import mergerinoSetup from "./mergerino";
import functionPatchesSetup from "./functionPatches";
import immerSetup from "./immer";
import { get } from "./util";

declare namespace meiosisSetup {
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
  let simpleStream: StreamLibWithProperty;
  export namespace util {
    export { get };
  }
}

export default meiosisSetup;
