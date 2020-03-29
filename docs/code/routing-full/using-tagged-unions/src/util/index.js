import { TaggedUnion } from "static-tagged-union";

export const Data = TaggedUnion(["None", "Loading", "Loaded"]);
