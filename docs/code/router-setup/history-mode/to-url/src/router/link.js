export const getLinkAttrs = (router, page, params, queryParams) => {
  const url = router.toUrl(page, params, queryParams);

  return { href: url, onclick: router.getLinkHandler(url) };
};
