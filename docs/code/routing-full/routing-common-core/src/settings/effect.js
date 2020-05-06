import { navigateTo } from "../routes";

export const effect = update => state => {
  if (state.redirect) {
    update([navigateTo(state.redirect), { redirect: undefined }]);
  }
};
