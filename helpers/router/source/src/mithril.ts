import { SyncLocationBarParams } from './types';
import { MithrilRouterConfig, MithrilRouter } from './mithril-types';
import {
  addHistoryEventListener,
  createGetUrl,
  createToUrl,
  doSyncLocationBar,
  getConfig,
  replaceRoute,
  toRoute
} from './util';

/**
 * Sets up a router using [Mithril Router](https://mithril.js.org/route.html).
 */
export const createMithrilRouter = ({
  m,
  routeConfig,
  rootPath,
  plainHash = false,
  wdw = window
}: MithrilRouterConfig): MithrilRouter => {
  if (!m) {
    throw 'm is required';
  }

  if (!routeConfig) {
    throw 'routeConfig is required';
  }

  const { prefix, historyMode } = getConfig(rootPath, plainHash);

  m.route.prefix = prefix;

  const queryString = { stringify: m.buildQueryString, parse: m.parseQueryString };
  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const toUrl = createToUrl(routeConfig, prefix, queryString, historyMode);

  const createMithrilRoutes = ({ onRouteChange, render }) => {
    if (historyMode) {
      const prefixLength = prefix.length;
      addHistoryEventListener(wdw, prefix, (href) => {
        m.route.set(href.substring(href.indexOf(prefix) + prefixLength));
      });
    }

    return Object.keys(routeConfig).reduce((result, path) => {
      const page = routeConfig[path];
      result[path] = {
        onmatch: (params) => onRouteChange({ page, params, changed: true }),
        render
      };
      return result;
    }, {});
  };

  const syncLocationBar = ({ page, params, replace }: SyncLocationBarParams) => {
    if (page) {
      doSyncLocationBar({ replace, url: toUrl(page, params), getUrl, wdw });
    }
  };

  return { createMithrilRoutes, toRoute, replaceRoute, toUrl, syncLocationBar };
};
