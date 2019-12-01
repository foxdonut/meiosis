export const Settings = ({ actions }) => [
  "div",
  ["div", "Settings Page"],
  ["button.btn.btn-danger", { onClick: () => actions.logout() }, "Logout"]
];
