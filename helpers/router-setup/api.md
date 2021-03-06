<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [RouteConfig][1]
-   [Params][2]
-   [Route][3]
    -   [Properties][4]
-   [RouteMatcher][5]
    -   [Parameters][6]
-   [ConvertMatch][7]
    -   [Parameters][8]
-   [QueryStringParse][9]
    -   [Parameters][10]
-   [QueryStringStringify][11]
    -   [Parameters][12]
-   [QueryStringLib][13]
    -   [Properties][14]
-   [ToRoute][15]
    -   [Parameters][16]
-   [ToUrl][17]
    -   [Parameters][18]
-   [ToUrl][19]
    -   [Parameters][20]
-   [OnRouteChange][21]
    -   [Parameters][22]
-   [Start][23]
    -   [Parameters][24]
-   [SyncLocationBarParams][25]
    -   [Properties][26]
-   [SyncLocationBar][27]
    -   [Parameters][28]
-   [DecodeURI][29]
    -   [Parameters][30]
-   [PushState][31]
    -   [Parameters][32]
-   [Onpopstate][33]
    -   [Parameters][34]
-   [Location][35]
    -   [Properties][36]
-   [History][37]
    -   [Properties][38]
-   [AddEventListener][39]
    -   [Parameters][40]
-   [RemoveEventListener][41]
    -   [Parameters][42]
-   [Window][43]
    -   [Properties][44]
-   [RouterConfig][45]
    -   [Properties][46]
-   [Router][47]
    -   [Properties][48]
-   [addEventListener][49]
    -   [Parameters][50]
-   [createRouter][51]
    -   [Parameters][52]
-   [RouteChangeEffect][53]
    -   [Parameters][54]
-   [MithrilRouterConfig][55]
    -   [Properties][56]
-   [MithrilOnmatch][57]
    -   [Parameters][58]
-   [MithrilRender][59]
    -   [Parameters][60]
-   [MithrilRoute][61]
    -   [Properties][62]
-   [MithrilRoutes][63]
-   [CreateMithrilRoutesConfig][64]
    -   [Properties][65]
-   [CreateMithrilRoutes][66]
    -   [Parameters][67]
-   [MithrilRouter][68]
    -   [Properties][69]
-   [MithrilDotRoute][70]
    -   [Properties][71]
-   [m][72]
    -   [Properties][73]
-   [createMithrilRouter][74]
    -   [Parameters][75]

## RouteConfig

Route configuration. This is a plain object that associates route path templates to string page
IDs. Route path templates may contain parameters by using `:` as a prefix. For example:

```javascript
const routeConfig = {
  "/": "Home",
  "/login": "Login",
  "/user/:id": "UserProfile"
};
```

Type: [Object][76]&lt;[string][77], [string][77]>

## Params

Route and query string params.

Type: [Object][76]&lt;[string][77], any>

## Route

A route in the application state.

Type: [Object][76]

### Properties

-   `page` **[string][77]** the page corresponding to the route.
-   `params` **[Params][78]** and object with route and query string params.
-   `changed` **[boolean][79]** indicates that the route changed.
-   `replace` **[boolean][79]?** indicates whether to replace the entry in the browser's history.

## RouteMatcher

A route matcher resolves a URL to a route.

Type: [Function][80]

### Parameters

-   `url` **[string][77]** the URL to resolve.

Returns **M** the matched route.

## ConvertMatch

A function to convert the match from the router library to an object with `page` and `params`.

Type: [Function][80]

### Parameters

-   `match` **M** the route match returned by the router library

Returns **{page: [string][77], params: [Params][78]}** the converted object.

## QueryStringParse

Query string parse function.

Type: [Function][80]

### Parameters

-   `query` **[string][77]** the query string to parse.

Returns **[Params][78]** the result of parsing the query string.

## QueryStringStringify

Query string stringify function.

Type: [Function][80]

### Parameters

-   `query` **[Params][78]** the query string object.

Returns **[string][77]** the stringified query string.

## QueryStringLib

Query string library that provides the `parse` and `stringify` functions. This is only required
if your application needs query string support. Examples of query string libraries that work
out-of-the-box are:

-   [query-string][81]
-   [qs][82]
-   [urlon][83]

Note that each library supports different features for query strings.

Type: [Object][76]

### Properties

-   `parse` **[QueryStringParse][84]** 
-   `stringify` **[QueryStringStringify][85]** 

## ToRoute

Function to convert a page and params to a route.

Type: [Function][80]

### Parameters

-   `page` **[string][77]** the page ID.
-   `params` **[Params][78]?** the path parameters.

Returns **[Route][86]** the route.

## ToUrl

Function to generate a URL from a page ID and params.

Type: [Function][80]

### Parameters

-   `page` **[string][77]** the page ID.
-   `params` **[Params][78]?** the path parameters.

Returns **[string][77]** the URL.

## ToUrl

Helper that creates a `toUrl` function.

### Parameters

-   `routeConfig` **[RouteConfig][87]** 
-   `getStatePath` **function ([string][77]): [string][77]** 
-   `queryString` **[QueryStringLib][88]** 

Returns **[ToUrl][89]** 

## OnRouteChange

Callback function for when the route changes. Typically, this function updates the application
state with the route, for example:

```javascript
router.start(route => update({ route: () => route }));
```

Type: [Function][80]

### Parameters

-   `route` **[Route][86]** 

Returns **any** 

## Start

Function to start the router.

Type: [Function][80]

### Parameters

-   `onRouteChange` **[OnRouteChange][90]** callback function for when the route changes.

Returns **any** 

## SyncLocationBarParams

Type: [Object][76]

### Properties

-   `page` **[string][77]** 
-   `params` **[Params][78]?** 
-   `replace` **[boolean][79]?** 

## SyncLocationBar

Function that synchronizes the location bar with the state route.

Type: [Function][80]

### Parameters

-   `syncLocationBarParams` **[SyncLocationBarParams][91]** 

Returns **void** 

## DecodeURI

Built-in function to decode a URI.

Type: [Function][80]

### Parameters

-   `uri` **[string][77]** the URI.

Returns **[string][77]** the decoded URI.

## PushState

Built-in function to change the location.

Type: [Function][80]

### Parameters

-   `state` **any** the state object
-   `title` **[string][77]** the document title - most browsers ignore this parameter
-   `url` **[string][77]** the new history entry's URL

Returns **void** 

## Onpopstate

Built-in callback function when the location changes.

Type: [Function][80]

### Parameters

-   `event` **any** the event.

Returns **void** 

## Location

Built-in `location` object, defined for testing purposes.

Type: [Object][76]

### Properties

-   `hash` **[string][77]** 
-   `origin` **[string][77]** 
-   `pathname` **[string][77]** 
-   `search` **[string][77]** 

## History

Built-in `history` object, defined for testing purposes.

Type: [Object][76]

### Properties

-   `pushState` **[PushState][92]** 

## AddEventListener

Built-in callback function to add an event listener.

Type: [Function][80]

### Parameters

-   `type` **[string][77]** 
-   `listener` **any** 
-   `options` **any** 

## RemoveEventListener

Built-in callback function to remove an event listener.

Type: [Function][80]

### Parameters

-   `type` **[string][77]** 
-   `listener` **any** 

## Window

Built-in `window` object, defined for testing purposes.

Type: [Object][76]

### Properties

-   `decodeURI` **[DecodeURI][93]** function to decode a URI.
-   `location` **[Location][94]** the current location.
-   `history` **[History][95]** the window's history.
-   `onpopstate` **[Onpopstate][96]** callback function when the location changes.
-   `addEventListener` **[AddEventListener][97]** function to add an event listener.
-   `removeEventListener` **[RemoveEventListener][98]** function to remove an event listener.

## RouterConfig

Configuration to create a router.

Type: [Object][76]

### Properties

-   `routeMatcher` **[RouteMatcher][99]&lt;M>** the function that matches routes.
-   `convertMatch` **[ConvertMatch][100]&lt;M>** a function to convert a router library match to a
    route.
-   `routeConfig` **[RouteConfig][87]?** the route configuration. If not provided, `toUrl` must
    be provided.
-   `toUrl` **[ToUrl][89]?** the `toUrl` function. If not provided, `routeConfig` must be
    provided and `toUrl` is constructed from `routeConfig`.
-   `rootPath` **[string][77]?** if specified, uses history mode instead of hash mode. If you are
    using history mode, you need to provide server side routing support. If not provided, defaults to
    the identity function.
-   `plainHash` **[boolean][79]?** whether to use a plain hash, `"#"`, instead of a hash-bang,
    `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
    if `rootPath` is specified.
-   `queryString` **[QueryStringLib][88]?** the query string library to use. You only need to
    provide this if your application requires query string support.
-   `wdw` **[Window][101]?** the `window`, used for testing purposes.

## Router

This is the router that is created by [createRouter][51].

Type: [Object][76]

### Properties

-   `initialRoute` **[Route][86]** the initial route as parsed from the location bar.
-   `toRoute` **[ToRoute][102]** function to convert a page and params to a route.
-   `replaceRoute` **[ToRoute][102]** function to convert a page and params to a route that will
    replace the current route in the browser history.
-   `toUrl` **[ToUrl][89]** function to generate a URL.
-   `start` **[Start][103]** function to start the router.
-   `syncLocationBar` **[SyncLocationBar][104]** function that synchronizes the location bar with the
    state route.

## addEventListener

Helper to intercept link clicks in history mode.

### Parameters

-   `wdw` **[Window][101]** 
-   `prefix` **[string][77]** 
-   `setHref` **function ([string][77]): void** 

## createRouter

### Parameters

-   `config` **[RouterConfig][105]&lt;M>** 
    -   `config.routeMatcher`  
    -   `config.convertMatch`  
    -   `config.routeConfig`  
    -   `config.toUrl`  
    -   `config.rootPath`  
    -   `config.plainHash`   (optional, default `false`)
    -   `config.queryString`   (optional, default `emptyQueryString`)
    -   `config.wdw`   (optional, default `window`)

Returns **[Router][106]** the created router.

## RouteChangeEffect

Helper for route change effects.

### Parameters

-   `$0` **[Object][76]** 
    -   `$0.update`  
    -   `$0.Effects`  
    -   `$0.isRouteChanged`   (optional, default `state=>state.route.changed`)
    -   `$0.routeChangedPatch`   (optional, default `{route:{changed:false}}`)

## MithrilRouterConfig

Configuration to create a Mithril router.

Type: [Object][76]

### Properties

-   `m` **[m][107]** the Mithril instance.
-   `routeConfig` **[RouteConfig][87]** the route configuration.
-   `rootPath` **[string][77]?** if specified, uses history mode instead of hash mode. If you
    are using history mode, you need to provide server side routing support.
-   `plainHash` **[boolean][79]?** whether to use a plain hash, `"#"`, instead of a hash-bang,
    `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
    if `historyMode` is `true`.
-   `wdw` **[Window][101]?** the `window`, used for testing purposes.

## MithrilOnmatch

Mithril `onmatch` function.

Type: [Function][80]

### Parameters

-   `params` **any** 
-   `url` **[string][77]** 

Returns **void** 

## MithrilRender

Mithril `render` function.

Type: [Function][80]

### Parameters

-   `vnode` **any?** vnode
-   `attrs` **any?** attrs

Returns **any** vnode

## MithrilRoute

Mithril route.

Type: [Object][76]

### Properties

-   `onmatch` **[MithrilOnmatch][108]** 
-   `render` **[MithrilRender][109]** 

## MithrilRoutes

Mithril routes.

Type: [Object][76]&lt;[string][77], [MithrilRoute][110]>

## CreateMithrilRoutesConfig

Parameters to `createMithrilRoutes`.

Type: [Object][76]

### Properties

-   `onRouteChange` **[OnRouteChange][90]** 
-   `render` **any** 

## CreateMithrilRoutes

Creates Mithril routes suitable for passing as the third argument to `m.route`, for example:

```javascript
m.route(
  document.getElementById("app"),
  "/",
  router.createMithrilRoutes({
    onRouteChange: route => update({ route: () => route }),
    App, states, update, actions
  })
);
```

Type: [Function][80]

### Parameters

-   `config` **[CreateMithrilRoutesConfig][111]** 

Returns **[MithrilRoutes][112]** Mithril routes.

## MithrilRouter

This is the router that is created by [createMithrilRouter][74].

Type: [Object][76]

### Properties

-   `createMithrilRoutes` **[CreateMithrilRoutes][113]** creates Mithril routes suitable for passing
    as the third argument to `m.route`.
-   `toRoute` **[ToRoute][102]** function to convert a page and params to a route.
-   `replaceRoute` **[ToRoute][102]** function to convert a page and params to a route that will
    replace the current route in the browser history.
-   `toUrl` **[ToUrl][89]** function to generate a URL.
-   `syncLocationBar` **[SyncLocationBar][104]** function that synchronizes the location bar with the
    state route.

## MithrilDotRoute

Mithril route property.

Type: [Object][76]

### Properties

-   `prefix` **[string][77]** 

## m

Mithril instance.

Type: any

### Properties

-   `route` **[MithrilDotRoute][114]** 
-   `buildQueryString` **[QueryStringStringify][85]** 

## createMithrilRouter

Sets up a router using [Mithril Router][115].

### Parameters

-   `config` **[MithrilRouterConfig][116]** 
    -   `config.m`  
    -   `config.routeConfig`  
    -   `config.rootPath`  
    -   `config.plainHash`   (optional, default `false`)
    -   `config.wdw`   (optional, default `window`)

Returns **[MithrilRouter][117]** 

[1]: #routeconfig

[2]: #params

[3]: #route

[4]: #properties

[5]: #routematcher

[6]: #parameters

[7]: #convertmatch

[8]: #parameters-1

[9]: #querystringparse

[10]: #parameters-2

[11]: #querystringstringify

[12]: #parameters-3

[13]: #querystringlib

[14]: #properties-1

[15]: #toroute

[16]: #parameters-4

[17]: #tourl

[18]: #parameters-5

[19]: #tourl-1

[20]: #parameters-6

[21]: #onroutechange

[22]: #parameters-7

[23]: #start

[24]: #parameters-8

[25]: #synclocationbarparams

[26]: #properties-2

[27]: #synclocationbar

[28]: #parameters-9

[29]: #decodeuri

[30]: #parameters-10

[31]: #pushstate

[32]: #parameters-11

[33]: #onpopstate

[34]: #parameters-12

[35]: #location

[36]: #properties-3

[37]: #history

[38]: #properties-4

[39]: #addeventlistener

[40]: #parameters-13

[41]: #removeeventlistener

[42]: #parameters-14

[43]: #window

[44]: #properties-5

[45]: #routerconfig

[46]: #properties-6

[47]: #router

[48]: #properties-7

[49]: #addeventlistener-1

[50]: #parameters-15

[51]: #createrouter

[52]: #parameters-16

[53]: #routechangeeffect

[54]: #parameters-17

[55]: #mithrilrouterconfig

[56]: #properties-8

[57]: #mithrilonmatch

[58]: #parameters-18

[59]: #mithrilrender

[60]: #parameters-19

[61]: #mithrilroute

[62]: #properties-9

[63]: #mithrilroutes

[64]: #createmithrilroutesconfig

[65]: #properties-10

[66]: #createmithrilroutes

[67]: #parameters-20

[68]: #mithrilrouter

[69]: #properties-11

[70]: #mithrildotroute

[71]: #properties-12

[72]: #m

[73]: #properties-13

[74]: #createmithrilrouter

[75]: #parameters-21

[76]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[77]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[78]: #params

[79]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[80]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[81]: https://github.com/sindresorhus/query-string

[82]: https://github.com/ljharb/qs

[83]: https://github.com/cerebral/urlon

[84]: #querystringparse

[85]: #querystringstringify

[86]: #route

[87]: #routeconfig

[88]: #querystringlib

[89]: #tourl

[90]: #onroutechange

[91]: #synclocationbarparams

[92]: #pushstate

[93]: #decodeuri

[94]: #location

[95]: #history

[96]: #onpopstate

[97]: #addeventlistener

[98]: #removeeventlistener

[99]: #routematcher

[100]: #convertmatch

[101]: #window

[102]: #toroute

[103]: #start

[104]: #synclocationbar

[105]: #routerconfig

[106]: #router

[107]: #m

[108]: #mithrilonmatch

[109]: #mithrilrender

[110]: #mithrilroute

[111]: #createmithrilroutesconfig

[112]: #mithrilroutes

[113]: #createmithrilroutes

[114]: #mithrildotroute

[115]: https://mithril.js.org/route.html

[116]: #mithrilrouterconfig

[117]: #mithrilrouter
