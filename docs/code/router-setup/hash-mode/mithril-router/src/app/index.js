import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";

export const createApp = () => ({
  initial: {
    route: {}
  },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  services: [login.service, settings.service, tea.service, teaDetails.service],

  effects: [settings.effect, tea.effect]
});

export { App } from "./view";
