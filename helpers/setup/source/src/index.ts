import mSetup, {
  combinePatches as mCombinePatches,
  updateFormFloatValue as mUpdateFormFloatValue,
  updateFormIntValue as mUpdateFormIntValue,
  updateFormValue as mUpdateFormValue
} from './mergerino';
import fSetup, {
  combinePatches as fCombinePatches,
  updateFormFloatValue as fUpdateFormFloatValue,
  updateFormIntValue as fUpdateFormIntValue,
  updateFormValue as fUpdateFormValue
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
    updateFormFloatValue: mUpdateFormFloatValue,
    updateFormIntValue: mUpdateFormIntValue,
    updateFormValue: mUpdateFormValue
  },
  functionPatches: {
    setup: fSetup,
    combinePatches: fCombinePatches,
    updateFormFloatValue: fUpdateFormFloatValue,
    updateFormIntValue: fUpdateFormIntValue,
    updateFormValue: fUpdateFormValue
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
