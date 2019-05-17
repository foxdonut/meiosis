/** @jsx preact.h */
import preact from "preact@8.4.2/dist/preact.mjs";
import merge from "mergerino@0.0.3";
import meiosis from "meiosis-setup";

import { Home } from "./components-01";

const Root = ({ state, actions }) => (
  <div>
    <ul className="nav">
      <li className="nav-item active">
        <a href="#">Home</a>
      </li>
      <li className="nav-item">
        <a href="#">Login</a>
      </li>
      <li className="nav-item">
        <a href="#">Settings</a>
      </li>
      <li className="nav-item">
        <a href="#">Tea</a>
      </li>
      <li className="nav-item">
        <a href="#">Coffee</a>
      </li>
      <li className="nav-item">
        <a href="#">Beer</a>
      </li>
    </ul>
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
