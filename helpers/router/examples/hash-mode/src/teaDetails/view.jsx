import { Route } from '../router';

export const TeaDetails = {
  view: ({ attrs: { state, router } }) => (
    <div>
      <div>{state.tea}</div>
      <div>
        <a href={router.toUrl(Route.Tea)}>Close</a>
      </div>
    </div>
  )
};
