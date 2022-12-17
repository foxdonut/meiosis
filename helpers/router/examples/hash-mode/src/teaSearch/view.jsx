/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { Route, router } from '../router';
import { PleaseWait } from '../pleaseWait';

const types = ['Black', 'Green', 'Herbal', 'Oolong'];

export const TeaSearch = ({ cell }) => {
  const teaType = cell.state.route.params.type;

  return (
    <>
      <h4>Tea Search Page</h4>
      {cell.state.searchTeas
        ? (
          <div class="row">
            <div class="col-md-6">
              <div>
                {types.map((type) => (
                  <a style={{ marginRight: '10px' }}
                    href={router.toUrl(Route.TeaSearch, {
                      type
                    })
                    }>{type}</a>
                )
                )}
                <a href={router.toUrl(Route.TeaSearch)}>All</a>
              </div>
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {cell.state.searchTeas
                    .filter((tea) => !teaType || tea.type === teaType)
                    .map((tea) => (
                      <tr key={tea.id}>
                        <td>{tea.type}</td>
                        <td>{tea.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <PleaseWait />
        )}
    </>
  );
};
