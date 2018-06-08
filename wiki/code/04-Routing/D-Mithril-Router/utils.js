/* eslint no-unused-vars: 0 */
const HomePage = "HomePage";
const CoffeePage = "CoffeePage";
const BeerPage = "BeerPage";
const BeerDetailsPage = "BeerDetailsPage";

const compose = (...funcs) => x =>
  funcs.reduceRight((value, func) => func(value), x);

const preventDefault = func => evt => {
  evt.preventDefault();
  func(evt);
};
