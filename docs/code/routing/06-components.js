/** @jsx preact.h */
import preact from "preact@8.4.2/dist/preact.mjs";

import { Route, router } from "./06-routes";

export const Home = ({ state }) => (
  <div>
    <div>Home Page</div>
    {state.user && (
      <div>You are logged in as: {state.user}</div>
    )}
  </div>
);

export const Login = ({ state, actions, routing }) => {
  const { message, returnTo } = routing.localSegment.params;

  return (
    <div>
      {message ? <div>{message}</div> : null}
      <div>Login</div>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={state.login.username}
            onInput={evt =>
              actions.username(evt.target.value)
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={state.login.password}
            onInput={evt =>
              actions.password(evt.target.value)
            }
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() =>
            actions.login(state.login.username, returnTo)
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export const Settings = ({ actions }) => (
  <div>
    <div>Settings Page</div>
    <button
      className="btn btn-error"
      onClick={() => actions.logout()}
    >
      Logout
    </button>
  </div>
);

const TeaDetails = ({ state, routing }) => (
  <span>
    <div>{state.tea[routing.localSegment.params.id]}</div>
    <div>
      <a href={router.toPath(routing.parentRoute())}>
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
        {state.teas ? (
          state.teas.map(tea => (
            <div key={tea.id}>
              <a
                href={router.toPath(
                  routing.childRoute(
                    Route.TeaDetails({ id: tea.id })
                  )
                )}
              >
                {tea.title}
              </a>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
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

const Brewer = ({ state, routing }) => {
  const id = routing.localSegment.params.id;
  return (
    <span>
      <div>{state.brewer[id]}</div>
      <div>
        <a href={router.toPath(routing.parentRoute())}>
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
  const id = routing.localSegment.params.id;

  return (
    <div className="columns">
      <div className="column col-6">
        <div>{state.beverage[id]}</div>
        <div>
          <a
            href={router.toPath(
              routing.siblingRoute(Route.Beverages())
            )}
          >
            Back to list
          </a>
        </div>
        {!Component && (
          <div>
            <a
              href={router.toPath(
                routing.childRoute(Route.Brewer({ id }))
              )}
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

const Beverages = ({ state, routing, beveragesId }) =>
  (state[beveragesId] && (
    <div className="columns">
      <div className="column col-6">
        {state[beveragesId].map(beverage => (
          <div key={beverage.id}>
            <a
              href={router.toPath(
                routing.siblingRoute(
                  Route.Beverage({ id: beverage.id })
                )
              )}
            >
              {beverage.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )) ||
  null;

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
        beveragesId="coffees"
      />
    </div>
  );
};

export const Beer = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];
  const type = routing.localSegment.params.type;

  return (
    <div>
      <div>Beer Page</div>
      {type ? <div>Type: {type}</div> : null}
      <Component
        state={state}
        actions={actions}
        routing={routing.next()}
        beveragesId="beers"
      />
    </div>
  );
};

export const NotFound = () => <div>Page Not Found</div>;
