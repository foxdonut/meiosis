const createCoffee = update => ({
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
