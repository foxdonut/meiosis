/** @jsx m */
import m from "mithril@2.0.0-rc.4";
import merge from "mergerino@0.0.3";
import meiosis from "meiosis-setup";
import { Routing } from "meiosis-routing/state";

import { Route, navTo, router } from "./routes-07";

import {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
} from "./components-07";

import {
  loginAccept,
  settingsAccept,
  routeAccept
} from "./acceptors-07";

import {
  teaService,
  teaDetailService,
  coffeeService,
  beerService,
  beverageService,
  brewerService,
  loginService
} from "./services-07";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
};

const Root = {
  view: ({ attrs: { state, actions } }) => {
    const routing = Routing(state.route.current);
    const Component = componentMap[routing.localSegment.id];
    const isActive = tab =>
      tab === Component ? " active" : "";

    return (
      <div>
        <ul className="nav">
          <li className={"nav-item" + isActive(Home)}>
            <a href={router.toPath([Route.Home()])}>Home</a>
          </li>
          <li className={"nav-item" + isActive(Login)}>
            <a href={router.toPath([Route.Login()])}>
              Login
            </a>
          </li>
          <li className={"nav-item" + isActive(Settings)}>
            <a href={router.toPath([Route.Settings()])}>
              Settings
            </a>
          </li>
          <li className={"nav-item" + isActive(Tea)}>
            <a href={router.toPath([Route.Tea()])}>Tea</a>
          </li>
          <li className={"nav-item" + isActive(Coffee)}>
            <a
              href={router.toPath([
                Route.Coffee(),
                Route.Beverages()
              ])}
            >
              Coffee
            </a>
          </li>
          <li className={"nav-item" + isActive(Beer)}>
            <a
              href={router.toPath([
                Route.Beer(),
                Route.Beverages()
              ])}
            >
              Beer
            </a>
          </li>
        </ul>
        <hr />

        <div style={{ paddingLeft: ".4rem" }}>
          <Component
            state={state}
            actions={actions}
            routing={routing}
          />
        </div>

        {/* Show or hide the Please Wait modal.
          See public/css/style.css */}
        <div
          style={{
            visibility: state.pleaseWait
              ? "visible"
              : "hidden"
          }}
        >
          <div className="simpleModal">
            <div className="simpleBox">
              <div>Loading, please wait...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const App = {
  view: ({ attrs: { state, actions } }) =>
    m(Root, { state, actions })
};

const app = {
  Initial: () => ({
    route: { current: [Route.Home()] }
  }),
  Actions: ({ update, combine }) => ({
    navigateTo: route => update(navTo(route)),

    username: value =>
      update({ login: { username: value } }),
    password: value =>
      update({ login: { password: value } }),

    login: (username, returnTo) =>
      update(
        combine([
          { user: username },
          navTo([returnTo || Route.Home()])
        ])
      ),

    logout: () =>
      update(
        combine([{ user: null }, navTo([Route.Home()])])
      )
  }),
  acceptors: [loginAccept, settingsAccept, routeAccept],
  services: [
    teaService,
    teaDetailService,
    coffeeService,
    beerService,
    beverageService,
    brewerService,
    loginService
  ]
};

meiosis.mergerino
  .setup({ stream: meiosis.simpleStream, merge, app })
  .then(({ states, actions }) => {
    m.route(
      document.getElementById("app"),
      "/",
      router.MithrilRoutes({ states, actions, App })
    );

    states.map(() => m.redraw());

    states.map(state =>
      router.locationBarSync(state.route.current)
    );

    const locationValue = document.getElementById(
      "locationValue"
    );

    states.map(state => {
      if (document.getElementById("consoleLog").checked) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(state));
      }

      locationValue.value = location.hash;
    });

    document
      .getElementById("setLocation")
      .addEventListener("click", () => {
        location.hash = locationValue.value;
      });
  });
