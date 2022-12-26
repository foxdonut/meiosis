import { Route } from 'meiosis-router/types';

export type Page = 'home' | 'login' | 'data1' | 'data2';

export interface Data {
  loading: boolean;
  items: string[];
}

export interface Login {
  username: string;
  password: string;
}

export interface State {
  route: Route<Page>;
  login: Login;
  home: Page;
  loggedInUser: string;
  data1: Data;
  data2: Data;
}

export type DataProp = 'data1' | 'data2';
