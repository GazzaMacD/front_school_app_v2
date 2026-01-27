import { Outlet } from "react-router";

import campaignStyles from "~/styles/campaigns.css?url";

//types
import type { Route } from "./+types/contact";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: campaignStyles,
  },
];

/**
 * Page
 */

export default function Campaigns() {
  return <Outlet />;
}
