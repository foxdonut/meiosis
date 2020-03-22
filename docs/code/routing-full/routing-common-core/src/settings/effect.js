import { navigateTo } from "../routes";

export const effect = ({ state, update }) => {
  if (state.redirect) {
    update([navigateTo(state.redirect), { redirect: undefined }]);
  }
};
