/* global m */
/* eslint no-unused-vars: 0 */
const HomePage = "HomePage";
const CoffeePage = "CoffeePage";
const CoffeeDetailsPage = "CoffeeDetailsPage";
const BeerPage = "BeerPage";
const BeerDetailsPage = "BeerDetailsPage";

// Tab defaults to page id. Indicate exceptions here.
const tabMap = {
  [BeerDetailsPage]: BeerPage
};

const prefix = "#!";
const href = link =>
  ({ href: link, oncreate: m.route.link, onupdate: m.route.link });
