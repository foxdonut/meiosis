import setup from './common';
import simpleStream, { createDropRepeats, dropRepeats } from './simple-stream';
import {
  assoc,
  concatIfPresent,
  get,
  updateFormFloatValue,
  updateFormIntValue,
  updateFormValue
} from './util';

export default {
  common: {
    createDropRepeats,
    dropRepeats,
    setup
  },
  setup,
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
    get,
    updateFormFloatValue,
    updateFormIntValue,
    updateFormValue
  }
};
