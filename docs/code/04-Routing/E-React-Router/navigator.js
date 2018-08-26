/* global pathToRegexp, NotFoundPage */

// eslint-disable-next-line no-unused-vars
const createNavigator = () => {
  const toPath = {};

  const getUrl = (id, params) => toPath[id](params);

  return {
    register: (configs, notFound) => {
      if (notFound) {
        configs.push({ key: NotFoundPage, page: notFound });
      }
      configs.forEach(config => {
        if (config.path) {
          toPath[config.key] = pathToRegexp.compile(config.path);
        }
      });
      return configs;
    },
    getUrl
  };
};
