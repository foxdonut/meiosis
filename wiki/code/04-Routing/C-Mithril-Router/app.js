/* global pages */

const Layout = {
  view: vnode => {
    const model = vnode.attrs.model;
    const currentPageId = model.page.id;
    const currentTab = model.page.tab;
    const isActive = tab => tab === currentTab ? "active" : "";

    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            m("li", { class: isActive(pages.home.tab) },
              m("a", { href: "#!/" }, "Home")
            ),
            m("li", { class: isActive(pages.coffee.tab) },
              m("a", { href: "#!/coffee" }, "Coffee")
            ),
            m("li", { class: isActive(pages.beer.tab) },
              m("a", { href: "#!/beer" }, "Beer")
            ),
            m("li.btn",
              m("button.btn.btn-default",
                { onclick: _evt => navigation.navigateToHome() }, "Home")
            ),
            m("li.btn",
              m("button.btn.btn-default",
                { onclick: _evt => navigation.navigateToCoffee() }, "Coffee")
            ),
            m("li.btn",
              m("button.btn.btn-default",
                { onclick: _evt => navigation.navigateToBeer() }, "Beer")
            ),
          )
        ),
        vnode.children
      )
    );
  }
};

const createBeerDetails = _update => ({
  view: model => m("p", "Details of beer ", model.params.id)
});

const createBeer = (update, navigation) => {
  const actions = {
    beerDetails: id => _evt => navigation.navigateToBeerDetails({ id }),
  };

  return {
    view: model =>
      m("div",
        m("p", "Beer Page"),
        m("ul",
          model.beerList.map(beer =>
            m("li", { key: beer.id },
              m("a", { href: "#/beer/" + beer.id }, beer.title),
              " ",
              m("button.btn.btn-default.btn-xs",
                { onclick: actions.beerDetails(beer.id) },
                beer.title
              )
            )
          )
        )
      )
  };
};

const Coffee = {
  view: vnode => {
    const model = vnode.attrs.model;
    return (
      m("div",
        m("p", "Coffee Page"),
          model.coffees.map(coffee => m("span", { key: coffee.id},
            m("a", { href: "#/coffee/" + coffee.id }, coffee.id),
            " "
          ),
          model.coffee
        )
      )
    );
  }
};

const Home = {
  view: vnode => m("div", "Home Page")
};
