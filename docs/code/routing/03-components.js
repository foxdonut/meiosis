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
  <span>
    <div>
      Description of Tea {routing.localSegment.params.id}
    </div>
    <div>
      <a
        href="#"
        onClick={() =>
          actions.navigateTo(routing.parentRoute())
        }
      >
        Close
      </a>
    </div>
  </span>
);

export const Tea = ({ state, actions, routing }) => (
  <div>
    <div>Tea Page</div>
    <div className="columns">
      <div className="column col-6">
        <div>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo(
                routing.childRoute([
                  Route.TeaDetails({ id: 1 })
                ])
              )
            }
          >
            Tea 1
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() =>
              actions.navigateTo(
                routing.childRoute([
                  Route.TeaDetails({ id: 2 })
                ])
              )
            }
          >
            Tea 2
          </a>
        </div>
      </div>
      <div className="column col-6">
        {routing.childSegment.id === "TeaDetails" && (
          <TeaDetails
            state={state}
            actions={actions}
            routing={routing.next()}
          />
        )}
      </div>
    </div>
  </div>
);

const Brewer = ({ actions, routing }) => {
  return (
    <span>
      <div>Brewer Details</div>
      <div>
        <a
          href="#"
          onClick={() =>
            actions.navigateTo(routing.parentRoute())
          }
        >
          Close
        </a>
      </div>
    </span>
  );
};

const beverageComponentMap = {
  Brewer
};

const Beverage = ({ state, actions, routing }) => {
  const Component =
    beverageComponentMap[routing.childSegment.id];

  return (
    <div className="columns">
      <div className="column col-6">
        <div>Beverage Details</div>
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
        {!Component && (
          <div>
            <a
              href="#"
              onClick={() =>
                actions.navigateTo(
                  routing.childRoute([Route.Brewer()])
                )
              }
            >
              Brewer
            </a>
          </div>
        )}
      </div>
      {Component && (
        <div className="column col-6">
          <Component
            state={state}
            actions={actions}
            routing={routing.next()}
          />
        </div>
      )}
    </div>
  );
};

const Beverages = ({ actions, routing }) => (
  <div className="columns">
    <div className="column col-6">
      <div>
        <a
          href="#"
          onClick={() =>
            actions.navigateTo(
              routing.siblingRoute([
                Route.Beverage({ id: 1 })
              ])
            )
          }
        >
          Beverage 1
        </a>
      </div>
      <div>
        <a
          href="#"
          onClick={() =>
            actions.navigateTo(
              routing.siblingRoute([
                Route.Beverage({ id: 2 })
              ])
            )
          }
        >
          Beverage 2
        </a>
      </div>
    </div>
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
