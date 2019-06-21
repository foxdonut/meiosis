export const navigateTo = (route): any => ({ route: { current: route } });

export const Actions = (update): any => ({
  navigateTo: (route): any => update(navigateTo(route))
});
