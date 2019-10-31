import * as React from "react";
import { Routing } from "meiosis-routing/state";

import { Home } from "../home";
import { Tea } from "../tea";

import { Route } from "../routes";
import { router } from "../router";

const componentMap = {
  Home,
  Tea
};

export const Root = ({ state, actions }) => {
  const routing = Routing(state.route);
  const Component = componentMap[routing.localSegment.id];
  const isActive = (tab): string => (tab === Component ? "active" : "");

  return (
    <div>
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
          <li className={isActive(Home)}>
            <a href={router.toPath(Route.Home())}>Home</a>
          </li>
          <li className={isActive(Tea)}>
            <a href={router.toPath(Route.Tea())}>Tea</a>
          </li>
        </ul>
      </nav>
      <Component state={state} actions={actions} routing={routing} />
      {/* Show or hide the Please Wait modal. See public/css/style.css */}
      <div style={{ visibility: state.pleaseWait ? "visible" : "hidden" }}>
        <div className="simpleModal">
          <div className="simpleBox">
            <div>Loading, please wait...</div>
          </div>
        </div>
      </div>
    </div>
  );
};
