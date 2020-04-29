import { fold } from "static-tagged-union";

export const service = ({ state, previousState }) =>
  fold({
    Login: () => {
      if (!state.login || state.login.username == null) {
        return {
          login: {
            username: "",
            password: ""
          }
        };
      }
    },
    _: () => {
      if (
        !state.user &&
        state.login &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?")
      ) {
        return () => previousState;
      } else if (state.login) {
        return { login: undefined };
      }
    }
  })(state.route);
