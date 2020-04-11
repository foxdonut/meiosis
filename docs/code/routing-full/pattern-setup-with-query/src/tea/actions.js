import { router } from "../router";

export const Actions = update => ({
  setTypeFilter: type => update({ filter: { type } }),
  setDescriptionFilter: description => update({ filter: { description } }),
  filter: filter => update({ route: () => router.getRoute("/tea", filter) })
});
