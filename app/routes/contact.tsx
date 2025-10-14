import { Outlet } from "react-router";

import type { Route } from "./+types/contact";

import contactStyles from "~/styles/contact.css?url";
import pageStyles from "~/styles/components/pages.css?url";
import cardStyles from "~/styles/components/cards.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: contactStyles,
  },
  {
    rel: "stylesheet",
    href: pageStyles,
  },
  {
    rel: "stylesheet",
    href: cardStyles,
  },
];

/**
 * Page
 */
export default function Contact() {
  return <Outlet />;
}
