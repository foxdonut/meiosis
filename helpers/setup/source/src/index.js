import commonSetup from "./common";
import mergerinoSetup, { nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, { nest as functionPatchesNest } from "./functionPatches";
import immerSetup, { nest as immerNest } from "./immer";
import preactSetup from "./preact";
import reactSetup from "./react";
import simpleStream from "./simple-stream";
import { get, setMutate, setImmutable } from "./util";

export default {
  common: {
    setup: commonSetup
  },
  mergerino: {
    setup: mergerinoSetup,
    nest: mergerinoNest
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
