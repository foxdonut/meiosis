import { Route, routes, navigateTo } from "../routes";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";

export interface Actions {
  navigateTo: (route: any) => any;
}

export const createApp = (initialRoute): any => ({
  initial: navigateTo(initialRoute || Route.Home()),

  Actions: (update): Actions => Object.assign({}, routes.Actions(update)),

  services: [routes.service, tea.service, teaDetails.service],

  Effects: (update): any => [tea.Effect(update)]
});
