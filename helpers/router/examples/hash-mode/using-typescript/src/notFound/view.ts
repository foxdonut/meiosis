import m from 'mithril';
import { ViewAttrs } from '../app/types';

export const NotFound: m.Component<ViewAttrs> = {
  view: () =>
    m(
      'div',
      m(
        'div',
        'Oops! The link is not valid. Please click on a tab above.'
      )
    )
};
