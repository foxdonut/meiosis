/* global addPage, pageMap */

// Utilities

const compose = (f1, f2) => x => f1(f2(x));

const navigate = (page, params = {}) =>
  model => Object.assign(model, { page, params });

const navAction = action => ctx => {
  action(ctx.params);
  return true;
};

// Home

const createHome = update => {
  const page = {
    name: "Home",
    tab: "Home",
    path: ""
  };
  const navigateToHome = params => update(navigate(page, params));
  addPage(page, navAction(navigateToHome));

  const view = _model => (<div>Home Page</div>);

  return { page, view };
};

// Coffee

const createCoffee = update => {
  const coffees = [
    { id: "c1", description: "Coffee 1" },
    { id: "c2", description: "Coffee 2" }
  ];

  const coffeeMap = coffees.reduce((result, next) => {
    result[next.id] = next;
    return result;
  }, {});

  const loadCoffees = () => new Promise(resolve =>
    setTimeout(() => resolve(coffees), 1)
  );

  const loadCoffee = params => new Promise(resolve =>
    setTimeout(() => resolve(coffeeMap[params.id]||""))
  );

  const page = {
    name: "Coffee",
    tab: "Coffee",
    path: "/coffee/:id?"
  };

  const navigateToCoffee = params => {
    loadCoffees().then(coffees => {
      const assignCoffees = model => Object.assign(model, { coffees });
      if (params && params.id) {
        loadCoffee(params).then(coffee => {
          const assignCoffee = compose(
            model => Object.assign(model, { coffee: coffee.description }), assignCoffees);
          update(compose(navigate(page, params), assignCoffee));
        });
      }
      else {
        update(compose(navigate(page, params), assignCoffees));
      }
    });
  };
  addPage(page, navAction(navigateToCoffee));

  const view = model => (
    <div>
      <p>Coffee Page</p>
      {model.coffees.map(coffee => <span key={coffee.id}>
        <a href={"#" + pageMap[page.name].toPath({ id: coffee.id })}>{coffee.id}</a>
        {" "}
      </span>)}
      {model.coffee}
    </div>
  );

  return { page, view };
};

// Beer

const createBeer = update => {
  const beerList = [
    { id: "b1", title: "Beer 1" },
    { id: "b2", title: "Beer 2" }
  ];

  const loadBeer = () => new Promise(resolve =>
    setTimeout(() => resolve(beerList), 1)
  );

  const page = {
    name: "Beer",
    tab: "Beer",
    path: "/beer"
  };

  const navigateToBeer = () => {
    loadBeer().then(beerList => {
      update(compose(navigate(page), model => Object.assign(model, { beerList })));
    });
  };
  addPage(page, navAction(navigateToBeer));

  const view = model => (
    <div>
      <p>Beer Page</p>
      <ul>
        {model.beerList.map(beer =>
          <li key={beer.id}>
            <a href={"#/beer/" + beer.id}>{beer.title}</a>
          </li>
        )}
      </ul>
    </div>
  );
  return { page, view };
};

// App

// eslint-disable-next-line no-unused-vars
const createApp = update => {
  const components = [createHome, createCoffee, createBeer].map(create => create(update));

  const findPage = pageName => {
    for (let i = 0; i < components.length; i++) {
      if (components[i].page.name === pageName) {
        return components[i];
      }
    }
    return null;
  };

  return {
    model: () => ({
      page: components[0].page,
      params: {}
    }),
    view: model => {
      const pageName = findPage(model.page.name) ? model.page.name : components[0].page.name;
      const component = findPage(pageName);
      const currentTab = model.page.tab;
      const isActive = tab => tab === currentTab ? "active" : "";

      return (
        <div>
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
              {components.map(component => (
                <li key={component.page.name} className={isActive(component.page.tab)}>
                  <a href={"#" + pageMap[component.page.name].toPath()}>{component.page.tab}</a>
                </li>
              ))}
            </ul>
          </nav>
          {component.view(model)}
        </div>
      );
    }
  };
};
