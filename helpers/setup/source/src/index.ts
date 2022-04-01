import mSetup, { combinePatches as mCombinePatches } from './mergerino';
import fSetup, { combinePatches as fCombinePatches } from './functionPatches';
import simpleStream, { createDropRepeats, dropRepeats } from './simple-stream';
import { assoc, concatIfPresent, get } from './util';

export default {
  common: {
    createDropRepeats,
    dropRepeats
  },
  mergerino: {
    setup: mSetup,
    combinePatches: mCombinePatches
  },
  functionPatches: {
    setup: fSetup,
    combinePatches: fCombinePatches
  },
  stream: {
    simpleStream,
    createDropRepeats,
    dropRepeats
  },
  util: {
    assoc,
    concatIfPresent,
    createDropRepeats,
    dropRepeats,
    get
  }
};
