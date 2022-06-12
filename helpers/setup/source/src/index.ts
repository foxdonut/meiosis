import mSetup, {
  combinePatches as mCombinePatches,
  updateFloatValue as mUpdateFloatValue,
  updateIntValue as mUpdateIntValue,
  updateValue as mUpdateValue
} from './mergerino';
import fSetup, {
  combinePatches as fCombinePatches,
  updateFloatValue as fUpdateFloatValue,
  updateIntValue as fUpdateIntValue,
  updateValue as fUpdateValue
} from './functionPatches';
import simpleStream, { createDropRepeats, dropRepeats } from './simple-stream';
import { assoc, concatIfPresent, get } from './util';

export default {
  common: {
    createDropRepeats,
    dropRepeats
  },
  mergerino: {
    setup: mSetup,
    combinePatches: mCombinePatches,
    updateFloatValue: mUpdateFloatValue,
    updateIntValue: mUpdateIntValue,
    updateValue: mUpdateValue
  },
  functionPatches: {
    setup: fSetup,
    combinePatches: fCombinePatches,
    updateFloatValue: fUpdateFloatValue,
    updateIntValue: fUpdateIntValue,
    updateValue: fUpdateValue
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
