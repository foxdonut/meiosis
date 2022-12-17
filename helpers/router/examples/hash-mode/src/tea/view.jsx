/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { TeaDetails } from '../teaDetails';
import { Route, router } from '../router';
import { PleaseWait } from '../ui';

export const Tea = ({ state }) => (
  <>
    <h4>Tea Page</h4>
    <div class="row">
      <div class="col-md-6">
        {state.teas &&
          state.teas.map((tea) =>
            <div key={tea.id}>
              <a href={router.toUrl(Route.TeaDetails, {
                id: tea.id
              })}>{tea.title}</a>
            </div>
          )}
      </div>
      {state.route.value === 'TeaDetails' &&
        <div class="col-md-6"><TeaDetails state={state} /></div>}
    </div>
    <PleaseWait state={state} />
  </>
);
