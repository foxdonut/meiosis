import commonSetup, { Nest, meiosisOne as commonMeiosisOne } from "./common";
import mergerinoSetup, {
  nest as mergerinoNest,
  meiosisOne as mergerinoMeiosisOne
} from "./mergerino";
import functionPatchesSetup, { nest as functionPatchesNest } from "./functionPatches";
import immerSetup, { nest as immerNest } from "./immer";
import preactSetup from "./preact";
import reactSetup from "./react";
import simpleStream from "./simple-stream";
import { get, setMutate, setImmutable } from "./util";

export default {
  common: {
    setup: commonSetup,
    Nest,
    meiosisOne: commonMeiosisOne
  },
  mergerino: {
    setup: mergerinoSetup,
    nest: mergerinoNest,
    meiosisOne: mergerinoMeiosisOne
  },
  functionPatches: {
    setup: functionPatchesSetup,
    nest: functionPatchesNest
  },
  immer: {
    setup: immerSetup,
    nest: immerNest
  },
  preact: {
    setup: preactSetup
  },
  react: {
    setup: reactSetup
  },
  simpleStream,
  util: {
    get,
    setMutate,
    setImmutable
  }
};
