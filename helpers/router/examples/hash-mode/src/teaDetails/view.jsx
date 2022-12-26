import { Page, router } from '../router';

export const TeaDetails = ({ cell }) => (
  <div>
    <div>{cell.state.tea}</div>
    <div>
      <a href={router.toUrl(Page.Tea)}>Close</a>
    </div>
  </div>
);
