import commonSetup, { toStream } from "./common";
import mSetup, { combinePatches as mCombinePatches } from "./mergerino";
import fSetup, { combinePatches as fCombinePatches } from "./functionPatches";
import iSetup, { combinePatches as iCombinePatches } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    toStream
  },
  mergerino: {
    setup: mSetup,
    combinePatches: mCombinePatches
  },
  functionPatches: {
    setup: fSetup,
    combinePatches: fCombinePatches
  },
  immer: {
    setup: iSetup,
    combinePatches: iCombinePatches
  },
  simpleStream,
  util: {
    get
  }
};
