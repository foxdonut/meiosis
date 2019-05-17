/** @jsx preact.h */
import preact from "preact@8.4.2/dist/preact.mjs";
import merge from "mergerino@0.0.3";
import meiosis from "meiosis-setup";
import { Routing } from "meiosis-routing/state";

import { Route, navTo } from "./routes-03";

import {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
} from "./components-03";

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
  const isActive = tab =>
    tab === Component ? " active" : "";

  return (
    <div>
      <ul className="nav">
        <li className={"nav-item" + isActive(Home)}>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo([Route.Home()])
            }
          >
            Home
          </a>
        </li>
        <li className={"nav-item" + isActive(Login)}>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo([Route.Login()])
            }
          >
            Login
          </a>
        </li>
        <li className={"nav-item" + isActive(Settings)}>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo([Route.Settings()])
            }
          >
            Settings
          </a>
        </li>
        <li className={"nav-item" + isActive(Tea)}>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo([Route.Tea()])
            }
          >
            Tea
          </a>
        </li>
        <li className={"nav-item" + isActive(Coffee)}>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo([
                Route.Coffee(),
                Route.Beverages()
              ])
            }
          >
            Coffee
          </a>
        </li>
        <li className={"nav-item" + isActive(Beer)}>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo([
                Route.Beer(),
                Route.Beverages()
              ])
            }
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
    </div>
  );
};

const App = meiosis.preact.setup({ preact, Root });
const app = {
  Initial: () => ({
    route: [Route.Home()]
  }),
  Actions: ({ update }) => ({
    navigateTo: route => update(navTo(route))
  })
};

meiosis.mergerino
  .setup({ stream: meiosis.simpleStream, merge, app })
  .then(({ states, actions }) => {
    // eslint-disable-next-line react/no-deprecated
    preact.render(
      <App states={states} actions={actions} />,
      document.getElementById("app")
    );

    states.map(state => {
      if (document.getElementById("consoleLog").checked) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(state));
      }
    });
  });
