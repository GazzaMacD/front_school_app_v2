import { Outlet } from "react-router";

import { Footer } from "~/components/footer";
import type { Route } from "./+types/front";
import footerStyles from "~/styles/components/footer.css?url";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: footerStyles,
  },
];

export default function FrontLayout() {
  return (
    <>
      <header>Header for Front</header>
      <Outlet />
      <Footer />
    </>
  );
}
