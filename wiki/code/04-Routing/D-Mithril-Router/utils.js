/* global m */
/* eslint no-unused-vars: 0 */
const HomePage = "HomePage";
const CoffeePage = "CoffeePage";
const BeerPage = "BeerPage";
const BeerDetailsPage = "BeerDetailsPage";

// Tab defaults to page id. Indicate exceptions here.
const tabMap = {
  [BeerDetailsPage]: BeerPage
};

const compose = (...funcs) => x =>
  funcs.reduceRight((value, func) => func(value), x);

const prefix = "#!";
const href = link =>
  ({ href: link, oncreate: m.route.link, onupdate: m.route.link });
