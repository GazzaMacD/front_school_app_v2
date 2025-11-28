import { Outlet } from "react-router";
import type { Route } from "./+types/auth";

import { Swoosh1 } from "~/components/swooshes";
import authStyles from "~/styles/auth.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: authStyles,
  },
];

export default function AuthLayout() {
  return (
    <>
      <div className="au-wrapper">
        <article className="au-wrapper__inner">
          <Outlet />
        </article>
      </div>
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}
