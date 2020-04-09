import { fold } from "static-tagged-union";
import { T } from "ducklings";

export const service = ({ state, previousState }) =>
  T(state.route)(
    fold({
      Login: () =>
        !state.login && {
          login: {
            username: "",
            password: ""
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
    })
  );
