export type PageKey = 'home' | 'login' | 'data1' | 'data2';

export interface Page {
  active: boolean;
}

export interface Data extends Page {
  loading: boolean;
  items: string[];
}

export interface Login extends Page {
  username: string;
  password: string;
}

export interface State extends Page {
  page: PageKey;
  home: Page;
  login: Login;
  loggedInUser: string;
  data1: Data;
  data2: Data;
}
