import m from 'mithril';
import { ViewAttrs } from '../app/types';

export const Settings: m.Component<ViewAttrs> = {
  view: ({ attrs: { actions } }) => [
    m('h3', 'Settings Page'),
    m(
      'button.btn.btn-danger',
      { onclick: () => actions.settings.logout() },
      'Logout'
    )
  ]
};
