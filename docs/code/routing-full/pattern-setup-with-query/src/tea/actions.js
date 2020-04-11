import { router } from "../router";

export const Actions = update => ({
  filter: filter => update({ route: () => router.getRoute("/tea", filter) })
});
