import { MeiosisViewComponent } from 'meiosis-setup/types';
import m from 'mithril';
import { Page } from './types';

export const home: MeiosisViewComponent<Page> = {
  view: () => m('h4', 'Home page')
};
