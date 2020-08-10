export const getLinkAttrs = (router, page, params) => {
  const url = router.toUrl(page, params);

  return { href: url, onclick: router.getLinkHandler(url) };
};
