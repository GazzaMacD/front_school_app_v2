import { Outlet } from "react-router";
import type { Route } from "./+types/blog-lessons";

import blogLessonStyles from "~/styles/blog-lessons.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: blogLessonStyles,
  },
];

/**
 * Page
 */

export default function BlogLessons() {
  return <Outlet />;
}
