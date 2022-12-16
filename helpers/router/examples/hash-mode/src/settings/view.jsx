export const Settings = {
  view: ({ attrs: { actions } }) => (
    <>
      <h3>Settings Page</h3>
      <button class="btn btn-danger"
        onClick={() => actions.settings.logout()}>Logout</button>
    </>
  )
};
