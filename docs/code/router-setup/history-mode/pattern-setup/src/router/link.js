import m from "mithril";

import { router } from ".";

export const Link = {
  view: ({ attrs, children }) => {
    const url = router.toUrl(attrs.href);

    return m("a", { href: url, onclick: router.getLinkHandler(url), ...attrs }, children);
  }
};
