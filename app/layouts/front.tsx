import { Outlet } from "react-router";

import { FrontFooter } from "~/components/front-footer";
import { FrontHeader } from "~/components/front-header";
import type { Route } from "./+types/front";
import footerStyles from "~/styles/components/front-footer.css?url";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: footerStyles,
  },
];

export default function FrontLayout() {
  return (
    <>
      <FrontHeader />
      <Outlet />
      <FrontFooter />
    </>
  );
}
