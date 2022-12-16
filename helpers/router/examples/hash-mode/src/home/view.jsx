export const Home = {
  view: ({ attrs: { state } }) => (
    <>
      <h3>Home Page</h3>
      {state.user &&
        <div>You are logged in as: {state.user}</div>}
      {state.message && <div>state.message</div>}
    </>
  )
};
