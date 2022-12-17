import { Route, router } from '../router';

export const TeaDetails = ({ state }) => (
  <div>
    <div>{state.tea}</div>
    <div>
      <a href={router.toUrl(Route.Tea)}>Close</a>
    </div>
  </div>
);
