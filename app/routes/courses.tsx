import type { Route } from "./+types/courses";
import { Outlet } from "react-router";

import cardStyles from "~/styles/components/cards.css?url";
import coursesStyles from "~/styles/courses.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: coursesStyles,
  },
  {
    rel: "stylesheet",
    href: cardStyles,
  },
];

/**
 * Page
 */
export default function Courses() {
  return <Outlet />;
}
