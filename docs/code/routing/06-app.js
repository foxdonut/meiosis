/** @jsx preact.h */
import preact from "preact@8.4.2/dist/preact.mjs";
import merge from "mergerino@0.0.4";
import meiosis from "meiosis-setup";
import { Routing } from "meiosis-routing/state";

import { Route, navTo, router } from "./06-routes";

import {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
} from "./06-components";

import {
  loginAccept,
  settingsAccept,
  routeAccept
} from "./06-acceptors";

import {
  teaService,
  teaDetailService,
  coffeeService,
  beerService,
  beverageService,
  brewerService,
  loginService
} from "./06-services";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
};

const Root = ({ state, actions }) => {
  const routing = Routing(state.route.current);
  const Component = componentMap[routing.localSegment.id];
  const isActive = tab => tab === Component;

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-6">
          <div>
            {isActive(Home) && <span>&rarr;</span>}
            <a href={router.toPath([Route.Home()])}>Home</a>
          </div>
          <div>
            {isActive(Login) && <span>&rarr;</span>}
            <a href={router.toPath([Route.Login()])}>
              Login
            </a>
          </div>
          <div>
            {isActive(Settings) && <span>&rarr;</span>}
            <a href={router.toPath([Route.Settings()])}>
              Settings
            </a>
          </div>
        </div>
        <div className="column col-6">
          <div>
            {isActive(Tea) && <span>&rarr;</span>}
            <a href={router.toPath([Route.Tea()])}>Tea</a>
          </div>
          <div>
            {isActive(Coffee) && <span>&rarr;</span>}
            <a
              href={router.toPath([
                Route.Coffee(),
                Route.Beverages()
              ])}
            >
              Coffee
            </a>
          </div>
          <div>
            {isActive(Beer) && <span>&rarr;</span>}
            <a
              href={router.toPath([
                Route.Beer({ type: "lager" }),
                Route.Beverages()
              ])}
            >
              Beer
            </a>
          </div>
        </div>
      </div>
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
};

const App = meiosis.preact.setup({ preact, Root });

const app = {
  Initial: () => navTo([Route.Home()]),
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
    // eslint-disable-next-line react/no-deprecated
    preact.render(
      <App states={states} actions={actions} />,
      document.getElementById("app")
    );

    router.start({ navigateTo: actions.navigateTo });

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
