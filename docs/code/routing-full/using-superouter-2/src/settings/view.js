export const Settings = ({ actions }) => [
  "div",
  ["div", "Settings Page"],
  ["button.btn.btn-danger", { onclick: () => actions.logout() }, "Logout"]
];
