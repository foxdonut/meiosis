export const Home = ({ state }) => [
  "div",
  ["div", "Home Page"],
  state.user && ["div", "You are logged in as: ", state.user]
];
