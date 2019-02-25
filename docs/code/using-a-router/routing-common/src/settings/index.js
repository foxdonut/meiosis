import { PS } from "patchinko/explicit";

export const settings = {
  actions: update => ({
    logout: () => update({
      //routeNext: [caseOf("Home")],
      user: null
    })
  }),

  routing: {
    ValidateArrive: ({ state, update }) => {
      if (!state.user) {
        update({
          //routeNext: [caseOf("Login")],
          login: PS({
            message: "Please login."
          })
        });
        return false;
      }
      return true;
    }
  }
};
