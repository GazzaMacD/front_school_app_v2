import { Outlet } from "react-router";
import type { Route } from "./+types/price-plans";
import pricePlanStyles from "~/styles/price-plans.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pricePlanStyles,
  },
];

/**
 * Page
 */
export default function PricePlans() {
  return <Outlet />;
}
