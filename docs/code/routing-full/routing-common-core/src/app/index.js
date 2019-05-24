import { Route, routes, navigateTo } from "../routes";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";

export const createApp = initialRoute => ({
  Initial: () => navigateTo(initialRoute || [Route.Home()]),

  Actions: ({ update, combine }) =>
    Object.assign(
      {},
      routes.Actions({ update, combine }),
      login.Actions({ update, combine }),
      settings.Actions({ update, combine })
    ),

  acceptors: [settings.accept, login.accept, routes.accept],

  services: [
    login.service,
    tea.service,
    teaDetails.service,
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  ]
});
