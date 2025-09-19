import { Outlet } from "react-router";
import type { Route } from "./+types/language-schools";
import lsStyles from "~/styles/language-schools.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: lsStyles,
  },
];
export default function LanguageSchools() {
  return (
    <>
      <Outlet />
    </>
  );
}
