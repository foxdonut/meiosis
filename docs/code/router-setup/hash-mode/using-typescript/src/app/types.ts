import * as flyd from "flyd";

type Stream<T> = flyd.Stream<T>;

import { Router } from "meiosis-router-setup";
import { Service, Effect } from "../meiosis";

/*
interface Route {
  page: string;
  params: any;
  queryParams: any;
  replace?: boolean;
}
*/

interface Login {
  username: string;
  password: string;
}

interface Tea {
  id: string;
  type: string;
  description: string;
}

export interface State {
  route?: any; // FIXME
  user?: string;
  message?: string;
  login?: Login;
  loading?: boolean;
  teas?: Tea[];
  tea?: Tea;
  searchTeas?: Tea[];
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
  router: Router;
}
