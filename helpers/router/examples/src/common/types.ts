import { Login } from '../login/types';

export interface Tea {
  id: string;
  type: string;
  title: string;
  description: string;
}

export interface Page {
  active: boolean;
}

export interface State {
  user?: string;
  message?: string;
  login: Login;
  loading?: boolean;
  teas?: Tea[];
  tea?: string;
  searchTeas: Tea[];
}
