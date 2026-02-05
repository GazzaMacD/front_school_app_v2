import { Outlet } from "react-router";

import type { Route } from "./+types/questionnaires";
import questionnaireStyles from "~/styles/questionnaires.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: questionnaireStyles,
  },
];

/**
 * Page
 */
export default function Questionnaires() {
  return <Outlet />;
}
