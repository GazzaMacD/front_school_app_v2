import { Outlet } from "react-router";

import type { Route } from "./+types/testimonials";
import testimonialStyles from "~/styles/testimonials.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: testimonialStyles,
  },
];

/**
 * Page
 */

export default function Testimonials() {
  return <Outlet />;
}
