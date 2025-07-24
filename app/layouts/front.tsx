import { Outlet } from "react-router";

import { FrontFooter } from "~/components/front-footer";
import { FrontHeader } from "~/components/front-header";
import type { Route } from "./+types/front";
import footerStyles from "~/styles/components/front-footer.css?url";
import headerStyles from "~/styles/components/front-header.css?url";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: footerStyles,
  },
  {
    rel: "stylesheet",
    href: headerStyles,
  },
];

export default function FrontLayout() {
  //FIX: get user from useMatches() and root
  let user = null;
  return (
    <>
      <FrontHeader user={user} />
      <Outlet />
      <FrontFooter />
    </>
  );
}
