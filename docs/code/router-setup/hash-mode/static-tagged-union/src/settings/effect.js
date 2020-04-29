export const effect = ({ state, update }) => {
  if (state.redirect) {
    update({ route: () => state.redirect, redirect: undefined });
  }
};
