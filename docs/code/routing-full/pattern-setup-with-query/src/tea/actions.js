import { router } from "../router";

export const Actions = update => ({
  filter: type => update({ route: () => router.getRoute("/tea", { type }) })
});
