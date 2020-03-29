import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import Mapper from "url-mapper";
import { type as superouter } from "superouter";

import {
  createRouteSegments,
  convertToPath,
  findPathParams,
  findQueryParams,
  sanitizeRouteConfig,
  setParams,
  createSuperouter,
  createFeatherRouter,
  createUrlMapperRouter
} from "../src";

// Define flatMap for node so that we can run the superouter tests.
const concat = (x, y): any => x.concat(y);
const flatMap = (f, xs): any => xs.map(f).reduce(concat, []);
Array.prototype["flatMap"] = function (f): any {
  return flatMap(f, this);
};

const Route = createRouteSegments([
  "Home",
  "Login",
  "User",
  "UserProfile",
  "About",
  "Search",
  "SearchDetails",
  "Beverage",
  "Brewer",
  "Invalid"
]);

const userPath = "/user/:id";

const routeConfig1 = {
  Home: "/",
  About: "/about",
  User: userPath,
  UserProfile: `${userPath}/profile`
};

const searchPath1 = "/search/:id?page&sort";

const routeConfig2 = {
  Search: searchPath1,
  SearchDetails: searchPath1 + "/details/:type?filter"
};

const routeConfig3 = {
  Home: "/",
  Invalid: "/:404..."
};

const searchPath2 = "/search/:id?page&sort";

const routeConfig4 = {
  Home: "/",
  About: "/about",
  User: "/user/:id",
  UserProfile: "/user/:id/profile",
  Search: searchPath2,
  SearchDetails: searchPath2 + "/details/:type?page&sort&filter"
};

describe("routerSetup", (): void => {
  describe("createRouteSegments", (): void => {
    test("route segment", (): void => {
      expect(Route.Home()).toEqual({ id: "Home", params: {} });
    });

    test("route segment with params", (): void => {
      expect(Route.Login({ returnTo: "Home" })).toEqual({
        id: "Login",
        params: { returnTo: "Home" }
      });
    });
  });

  describe("findPathParams", (): void => {
    test("findPathParams empty", (): void => {
      expect(findPathParams("/home")).toEqual([]);
    });

    test("findPathParams one", (): void => {
      expect(findPathParams("/user/:id")).toEqual(["id"]);
    });

    test("findPathParams two", (): void => {
      expect(findPathParams("/user/:id/setting/:setting")).toEqual(["id", "setting"]);
    });

    test("findPathParams with queryParams", (): void => {
      expect(findPathParams("/user/:id?page")).toEqual(["id"]);
    });
  });

  describe("findQueryParams", (): void => {
    test("findQueryParams empty", (): void => {
      expect(findQueryParams("/home")).toEqual([]);
    });

    test("findQueryParams one", (): void => {
      expect(findQueryParams("/user?id")).toEqual(["id"]);
    });

    test("findQueryParams two with ? ?", (): void => {
      expect(findQueryParams("/user/:id?setting?page")).toEqual(["setting", "page"]);
    });

    test("findQueryParams two with ? &", (): void => {
      expect(findQueryParams("/user/:id?setting&page")).toEqual(["setting", "page"]);
    });

    test("findQueryParams two with & &", (): void => {
      expect(findQueryParams("/user/:id&setting&page")).toEqual(["setting", "page"]);
    });
  });

  describe("setParams", (): void => {
    test("setParams none", (): void => {
      expect(setParams("/home", { id: 42 })).toEqual("/home");
    });

    test("setParams one", (): void => {
      expect(setParams("/user/:id", { id: 42 })).toEqual("/user/42");
    });

    test("setParams two", (): void => {
      expect(setParams("/user/:id/setting/:setting", { id: 42, setting: "email" })).toEqual(
        "/user/42/setting/email"
      );
    });

    test("setParams encoded", (): void => {
      expect(setParams("/profile/:username", { username: "Fox Donut" })).toEqual(
        "/profile/Fox%20Donut"
      );
    });

    test("setParams with queryString", (): void => {
      expect(setParams("/search/:id?page", { id: 42, page: 2 })).toEqual("/search/42");
    });
  });

  describe("convertToPath", (): void => {
    test("convertToPath", (): void => {
      expect(convertToPath(sanitizeRouteConfig(routeConfig1), Route.Home())).toEqual("/");
    });

    test("convertToPath params", (): void => {
      expect(convertToPath(sanitizeRouteConfig(routeConfig1), Route.User({ id: 42 }))).toEqual(
        "/user/42"
      );
    });

    test("convertToPath params child", (): void => {
      expect(
        convertToPath(sanitizeRouteConfig(routeConfig1), Route.UserProfile({ id: 42 }))
      ).toEqual("/user/42/profile");
    });

    test("convertToPath with queryString", (): void => {
      expect(
        convertToPath(
          sanitizeRouteConfig(routeConfig2),
          Route.Search({ id: 42, page: 2 }),
          queryString.stringify
        )
      ).toEqual("/search/42?page=2");
    });

    test("convertToPath with queryString multiple", (): void => {
      expect(
        convertToPath(
          sanitizeRouteConfig(routeConfig2),
          Route.SearchDetails({ id: 42, page: 2, sort: "asc", type: "author", filter: "recent" }),
          queryString.stringify
        )
      ).toEqual("/search/42/details/author?filter=recent&page=2&sort=asc");
    });

    test("convertToPath with Mithril catchall route", (): void => {
      expect(
        convertToPath(sanitizeRouteConfig(routeConfig3), Route.Invalid({ 404: "invalid" }))
      ).toEqual("/");
    });
  });

  describe("createRouter", (): void => {
    const getPath = (): string => "#/user/43";
    const setPath = (path): void => {
      expect(path).toEqual("#/about");
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const addLocationChangeListener = (): void => {};

    test("createFeatherRouter", (): void => {
      const router1 = createFeatherRouter({
        createRouteMatcher,
        routeConfig: routeConfig1,
        defaultRoute: Route.Home(),
        getPath,
        setPath,
        addLocationChangeListener
      });

      expect(router1.initialRoute).toEqual(Route.User({ id: "43" }));

      expect(router1.toPath(Route.User({ id: 42 }))).toEqual("#/user/42");

      expect(router1.parsePath("#/user/42/profile")).toEqual(Route.UserProfile({ id: "42" }));

      expect(router1.toPath(Route.User({ id: "Fox Donut" }))).toEqual("#/user/Fox%20Donut");

      expect(router1.parsePath("#/user/Fox%20Donut")).toEqual(Route.User({ id: "Fox Donut" }));

      router1.locationBarSync(Route.About());
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      router1.start({ navigateTo: (): void => {} });
    });

    test("parsePath with queryString", (): void => {
      const router2 = createFeatherRouter({
        createRouteMatcher,
        queryString,
        routeConfig: routeConfig2,
        defaultRoute: Route.Home(),
        getPath,
        setPath
      });

      expect(router2.parsePath("#/search/42/details/author?filter=recent&page=2&sort=asc")).toEqual(
        Route.SearchDetails({ id: "42", page: "2", sort: "asc", type: "author", filter: "recent" })
      );
    });

    test("createUrlMapperRouter parsePath with parent params", (): void => {
      const router1 = createUrlMapperRouter({
        Mapper,
        routeConfig: routeConfig1,
        defaultRoute: Route.Home(),
        getPath,
        setPath
      });

      expect(router1.parsePath("#/user/42")).toEqual(Route.User({ id: "42" }));
      expect(router1.parsePath("#/user/Lager%20Or%20Ale/profile")).toEqual(
        Route.UserProfile({ id: "Lager Or Ale" })
      );
    });

    test("create feather router", (): void => {
      const router4 = createFeatherRouter({
        createRouteMatcher,
        queryString,
        routeConfig: routeConfig4,
        defaultRoute: Route.Home(),
        getPath,
        setPath,
        addLocationChangeListener
      });

      expect(router4.initialRoute).toEqual(Route.User({ id: "43" }));
      expect(router4.toPath(Route.User({ id: 42 }))).toEqual("#/user/42");
      expect(router4.parsePath("#/user/42/profile")).toEqual(Route.UserProfile({ id: "42" }));
      expect(router4.toPath(Route.User({ id: "Fox Donut" }))).toEqual("#/user/Fox%20Donut");
      expect(router4.parsePath("#/user/Fox%20Donut")).toEqual(Route.User({ id: "Fox Donut" }));
      expect(router4.parsePath("#/something")).toEqual(Route.Home());

      expect(router4.parsePath("#/search/5?page=1&sort=asc")).toEqual(
        Route.Search({ id: "5", page: "1", sort: "asc" })
      );
      expect(router4.parsePath("#/search/5/details/all?page=1&sort=asc&filter=on")).toEqual(
        Route.SearchDetails({ id: "5", page: "1", sort: "asc", type: "all", filter: "on" })
      );
    });

    test("create superouter", (): void => {
      const routeConfig = {
        Home: "/",
        About: "/about",
        User: "/user/:id",
        UserProfile: "/user/:id/profile"
      };

      const router = createSuperouter({
        superouter,
        queryString,
        routeConfig: routeConfig,
        defaultRoute: Route.Home(),
        getPath,
        setPath,
        addLocationChangeListener
      });

      expect(router.initialRoute).toEqual(Route.User({ id: "43" }));
      expect(router.toPath(Route.User({ id: 42 }))).toEqual("#/user/42");
      expect(router.parsePath("#/user/42/profile")).toEqual(Route.UserProfile({ id: "42" }));
      expect(router.toPath(Route.User({ id: "Fox Donut" }))).toEqual("#/user/Fox%20Donut");
      expect(router.parsePath("#/user/Fox%20Donut")).toEqual(Route.User({ id: "Fox Donut" }));
      expect(router.parsePath("#/something")).toEqual(Route.Home());
    });

    test("create superouter with query params", (): void => {
      const router5 = createSuperouter({
        superouter,
        queryString,
        routeConfig: routeConfig4,
        defaultRoute: Route.Home(),
        getPath,
        setPath,
        addLocationChangeListener
      });

      expect(router5.initialRoute).toEqual(Route.User({ id: "43" }));
      expect(router5.toPath(Route.User({ id: 42 }))).toEqual("#/user/42");
      expect(router5.parsePath("#/user/42/profile")).toEqual(Route.UserProfile({ id: "42" }));
      expect(router5.toPath(Route.User({ id: "Fox Donut" }))).toEqual("#/user/Fox%20Donut");
      expect(router5.parsePath("#/user/Fox%20Donut")).toEqual(Route.User({ id: "Fox Donut" }));
      expect(router5.parsePath("#/something")).toEqual(Route.Home());

      expect(router5.parsePath("#/search/5?page=1&sort=asc")).toEqual(
        Route.Search({ id: "5", page: "1", sort: "asc" })
      );
      expect(router5.parsePath("#/search/5/details/all?page=1&sort=asc&filter=on")).toEqual(
        Route.SearchDetails({ id: "5", page: "1", sort: "asc", type: "all", filter: "on" })
      );
    });
  });
});
