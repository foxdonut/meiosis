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

const compose = (...funcs) => x =>
  funcs.reduceRight((value, func) => func(value), x);
