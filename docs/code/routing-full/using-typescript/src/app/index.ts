import { Route, routes, navigateTo } from "../routes";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";

export const createApp = (initialRoute): any => ({
  Initial: (): any => navigateTo(initialRoute || Route.Home()),

  Actions: (update): any => Object.assign({}, routes.Actions(update)),

  acceptors: [routes.accept],

  services: [tea.service, teaDetails.service]
});
