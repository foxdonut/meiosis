import * as flyd from "flyd";
import { Route } from "meiosis-router-setup";

type Stream<T> = flyd.Stream<T>;

import { Service, Effect } from "../meiosis";

interface Login {
  username: string;
  password: string;
  message?: string;
  returnTo?: Route;
}

interface Tea {
  id: string;
  type: string;
  title: string;
  description: string;
}

export interface State {
  route: Route; // FIXME
  user?: string;
  message?: string;
  login: Login;
  loading?: boolean;
  teas?: Tea[];
  tea?: string;
  searchTeas: Tea[];
}

export type Patch = any;
export type Update = Stream<Patch>;
export type AppService = Service<State, Patch>;
export type EffectConstructor = (update: Update) => Effect<State>;

export interface LoginActions {
  username: (value: string) => void;
  password: (value: string) => void;
  login: (username: string, returnTo?: any) => void; // FIXME: Route
}

export interface SettingsActions {
  logout: () => void;
}

export interface AppActions {
  login: LoginActions;
  settings: SettingsActions;
}

export interface ViewAttrs {
  state: State;
  update: Update;
  actions: AppActions;
}
