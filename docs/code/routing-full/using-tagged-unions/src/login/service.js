import { fold } from "static-tagged-union";
import { T } from "ducklings";

export const service = ({ state }) =>
  T(state.route)(
    fold({
      Login: () =>
        !state.login && {
          login: {
            username: "",
            password: ""
          }
        },
      _: () =>
        /*
      if (
        !state.user &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?")
      ) {
        return () => previousState;
      }
      */
        state.login && { login: undefined }
    })
  );
