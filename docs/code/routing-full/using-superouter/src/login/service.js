export const service = ({ state }) => {
  if (state.routeTransition.arrive.Login) {
    return {
      state: {
        login: {
          username: "",
          password: ""
        }
      }
    };
  } else if (state.routeTransition.leave.Login) {
    if (
      !state.user &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      return { patch: false };
    }
    return { state: { login: null } };
  }
};
