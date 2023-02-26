/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { Page, router } from '../router';
import { PleaseWait } from '../pleaseWait';

const teaTypes = ['Black', 'Green', 'Herbal', 'Oolong'];

export const TeaSearch = ({ cell }) => (
  <>
    <h4>Tea Search Page</h4>
    {cell.state.searchTeas
      ? (
        <div class="row">
          <div class="col-md-6">
            {cell.state.searching
              ? null
              : <div>
                  {teaTypes.map((teaType) => (
                    <a style={{ marginRight: '10px' }}
                      href={router.toUrl(Page.TeaSearch, {
                        teaType
                      })
                      }>{teaType}</a>
                  ))}
                  <a href={router.toUrl(Page.TeaSearch)}>All</a>
                </div>}
            {cell.state.searching
              ? <div>Loading...</div>
              : null}
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {cell.state.searchTeas
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
