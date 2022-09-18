import { Route } from 'meiosis-router/types';
import { Page } from '../common/types';

export type StayOnLogin = {
  type: 'StayOnLogin'
};

export type LoginUser = {
  type: 'LoginUser';
  username: string;
};

export type LoginOutput = StayOnLogin | LoginUser;

export const stayOnLogin = (): StayOnLogin => ({
  type: 'StayOnLogin'
});

export const loginUser = (username: string): LoginUser => ({
  type: 'LoginUser',
  username
});

export interface Login extends Page {
  username: string;
  password: string;
  message?: string;
  returnTo?: Route;
  output?: LoginOutput;
}
