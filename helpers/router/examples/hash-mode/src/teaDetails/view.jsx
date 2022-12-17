import { Route, router } from '../router';

export const TeaDetails = ({ cell }) => (
  <div>
    <div>{cell.state.tea}</div>
    <div>
      <a href={router.toUrl(Route.Tea)}>Close</a>
    </div>
  </div>
);
