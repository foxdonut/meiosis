import { meiosisSetup } from './setup';
import { createDropRepeats, dropRepeats, simpleStream } from './simple-stream';
import {
  assoc,
  concatIfPresent,
  get,
  updateFormFloatValue,
  updateFormIntValue,
  updateFormValue
} from './util';

export default {
  setup: meiosisSetup,
  stream: {
    simpleStream,
    createDropRepeats,
    dropRepeats
  },
  util: {
    assoc,
    concatIfPresent,
    get,
    updateFormFloatValue,
    updateFormIntValue,
    updateFormValue
  }
};
