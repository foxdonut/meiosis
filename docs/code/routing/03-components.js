/** @jsx preact.h */
import preact from "preact@8.4.2/dist/preact.mjs";

import { Route } from "./03-routes";

export const Home = ({ state }) => (
  <div>
    <div>Home Page</div>
    {state.user && (
      <div>You are logged in as: {state.user}</div>
    )}
  </div>
);

export const Login = () => {
  return (
    <div>
      <div>Login</div>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export const Settings = () => (
  <div>
    <div>Settings Page</div>
    <button className="btn btn-error">Logout</button>
  </div>
);

const TeaDetails = ({ actions, routing }) => (
  <div>
    <div>Details</div>
    <a
      href="#"
      onClick={() =>
        actions.navigateTo(routing.parentRoute())
      }
    >
      Back to list
    </a>
  </div>
);

export const Tea = ({ state, actions, routing }) => (
  <div>
    <div>Tea Page</div>
    <ul>
      <li>
        <a
          href="#"
          onClick={() =>
            actions.navigateTo(
              routing.childRoute([Route.TeaDetails()])
            )
          }
        >
          Details
        </a>
      </li>
    </ul>
    {routing.childSegment.id === "TeaDetails" && (
      <TeaDetails
        state={state}
        actions={actions}
        routing={routing.next()}
      />
    )}
  </div>
);

const Brewer = () => {
  return <div>Brewer</div>;
};

const beverageComponentMap = {
  Brewer
};

const Beverage = ({ state, actions, routing }) => {
  const Component =
    beverageComponentMap[routing.childSegment.id];

  return (
    <div>
      <div>Beverage Details</div>
      <div>
        <a
          href="#"
          onClick={() =>
            actions.navigateTo(
              routing.childRoute([Route.Brewer()])
            )
          }
        >
          Brewer Details
        </a>
      </div>
      {Component && (
        <Component
          state={state}
          actions={actions}
          routing={routing.next()}
        />
      )}
      <div>
        <a
          href="#"
          onClick={() =>
            actions.navigateTo(
              routing.siblingRoute([Route.Beverages()])
            )
          }
        >
          Back to list
        </a>
      </div>
    </div>
  );
};

const Beverages = ({ actions, routing }) => (
  <div>
    <a
      href="#"
      onClick={() =>
        actions.navigateTo(
          routing.siblingRoute([Route.Beverage()])
        )
      }
    >
      Beverage Details
    </a>
  </div>
);

const componentMap = {
  Beverages,
  Beverage
};

export const Coffee = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];

  return (
    <div>
      <div>Coffee Page</div>
      <Component
        state={state}
        actions={actions}
        routing={routing.next()}
      />
    </div>
  );
};

export const Beer = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];

  return (
    <div>
      <div>Beer Page</div>
      <Component
        state={state}
        actions={actions}
        routing={routing.next()}
      />
    </div>
  );
};
