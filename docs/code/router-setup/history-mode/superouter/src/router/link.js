export const getLinkAttrs = (router, page, queryParams) => {
  const url = router.toUrl(page, null, queryParams);

  return { href: url, onclick: router.getLinkHandler(url) };
};
