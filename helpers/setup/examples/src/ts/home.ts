import { MeiosisViewComponent } from '../../../source/dist/mergerino';
import m from 'mithril';
import { Page } from './types';

export const home: MeiosisViewComponent<Page> = {
  view: () => m('h4', 'Home page')
};
