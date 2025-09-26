import { Outlet } from "react-router";

import type { Route } from "./+types/staff";
import staffStyles from "~/styles/staff.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: staffStyles,
  },
];

/**
 * Page
 */
export default function Staff() {
  return <Outlet />;
}
