/** @jsx preact.h */
import preact from "preact@8.4.2/dist/preact.mjs";
import merge from "mergerino@0.0.4";
import meiosis from "meiosis-setup";

import { Home } from "./01-components";

const Root = ({ state, actions }) => (
  <div className="container">
    <div className="columns">
      <div className="column col-6">
        <div>
          <a href="#">Home</a>
        </div>
        <div>
          <a href="#">Login</a>
        </div>
        <div>
          <a href="#">Settings</a>
        </div>
      </div>
      <div className="column col-6">
        <div>
          <a href="#">Tea</a>
        </div>
        <div>
          <a href="#">Coffee</a>
        </div>
        <div>
          <a href="#">Beer</a>
        </div>
      </div>
    </div>
    <hr />

    <div style={{ paddingLeft: ".4rem" }}>
      <Home state={state} actions={actions} />
    </div>
  </div>
);

const App = meiosis.preact.setup({ preact, Root });
const app = {};

meiosis.mergerino
  .setup({ stream: meiosis.simpleStream, merge, app })
  .then(({ states, actions }) => {
    // eslint-disable-next-line react/no-deprecated
    preact.render(
      <App states={states} actions={actions} />,
      document.getElementById("app")
    );
  });
