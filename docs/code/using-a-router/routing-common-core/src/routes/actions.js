import O from "patchinko/constant";

export const navigateTo = route => ({ route: O({ current: route }) });

export const Actions = ({ update }) => ({
  navigateTo: route => update(navigateTo(route))
});
