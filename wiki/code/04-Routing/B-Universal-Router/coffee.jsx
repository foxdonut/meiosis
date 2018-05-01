// eslint-disable-next-line no-unused-vars
const createCoffee = _update => ({
  view: model => (
    <div>
      <p>Coffee Page</p>
      {model.coffees.map(coffee => <span key={coffee.id}>
        <a href={"#/coffee/" + coffee.id}>{coffee.id}</a>
        {" "}
      </span>)}
      {model.coffee}
    </div>
  )
});
