export interface DomEvent {
  preventDefault: () => void;
  target: {
    value: string;
  };
}

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
  page: keyof State;
  home: Page;
  data: Data;
  login: Login;
}
