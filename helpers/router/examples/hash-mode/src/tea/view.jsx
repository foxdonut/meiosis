/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { TeaDetails } from '../teaDetails';
import { Route, router } from '../router';
import { PleaseWait } from '../pleaseWait';

export const Tea = ({ cell }) => (
  <>
    <h4>Tea Page</h4>
    {cell.state.teas
      ? (
        <div class="row">
          <div class="col-md-3">
            {cell.state.teas.map((tea) =>
              <div key={tea.id}>
                <a href={router.toUrl(Route.TeaDetails, {
                  id: tea.id
                })}>{tea.title}</a>
              </div>
            )}
          </div>
          {cell.state.route.value === 'TeaDetails' &&
            <div class="col-md-3"><TeaDetails cell={cell} /></div>}
        </div>
      )
      : (<PleaseWait />)
    }
  </>
);
