/** @jsx preact.h */
import preact from "preact@8.4.2";

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

export const Tea = () => (
  <div>
    <div>Tea Page</div>
  </div>
);

export const Coffee = () => {
  return (
    <div>
      <div>Coffee Page</div>
    </div>
  );
};

export const Beer = () => {
  return (
    <div>
      <div>Beer Page</div>
    </div>
  );
};
