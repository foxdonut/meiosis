export const getLinkAttrs = (router, href) => {
  const url = router.toUrl(href);

  return { href: url, onclick: router.getLinkHandler(url) };
};
