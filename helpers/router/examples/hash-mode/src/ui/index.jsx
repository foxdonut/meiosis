export const PleaseWait = ({ state }) => (
  <div style={{
    visibility: state.route.changed
      ? 'visible'
      : 'hidden'
  }}>
    <div class="simpleModal">
      <div class="simpleBox">
        <div>Loading, please wait...</div>
      </div>
    </div>
  </div>
);
