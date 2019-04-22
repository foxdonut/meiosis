import O from "patchinko/constant";

export const navigateTo = route => ({ route: O({ current: route }) });

export const actions = update => ({
  navigateTo: route => update(navigateTo(route))
});
