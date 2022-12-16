
import { Route } from '../router';
import { PleaseWait } from '../ui';

const types = ['Black', 'Green', 'Herbal', 'Oolong'];

export const TeaSearch = () => ({
  view: ({ attrs: { state, router } }) => {
    const teaType = state.route.params.type;

    return (
      <>
        <h3>Tea Search Page</h3>
        <div class="row">
          <div class="col-md-6">
            {state.searchTeas && <>
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
                  {state.searchTeas
                    .filter(
                      (tea) =>
                        !teaType || tea.type === teaType
                    )
                    .map((tea) => (
                      <tr key={tea.id}>
                        <td>{tea.type}</td>
                        <td>{tea.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>}
          </div>
        </div>
        <PleaseWait state={state} />
      </>
    );
  }
});
