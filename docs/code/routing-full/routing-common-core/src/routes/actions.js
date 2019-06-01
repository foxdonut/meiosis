export const navigateTo = route => ({ route: { current: route } });

export const Actions = update => ({
  navigateTo: route => update(navigateTo(route))
});
