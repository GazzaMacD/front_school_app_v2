import type { Route } from "./+types/courses-detail";
import { BsFillBarChartFill, BsGlobe, BsJournalText } from "react-icons/bs";

import { HeadingOne } from "~/components/headings";
import { Swoosh1 } from "~/components/swooshes";
import { DetailLinkCard } from "~/components/cards";
import { ClassPricePlanTable } from "~/components/prices";
import pricesStyles from "~/styles/components/prices.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pricesStyles,
  },
];

/**
 * Loaders and Actions
 */
export function loader({ context }: Route.LoaderArgs) {
  return { message: "Courses Detail Page" };
}

/**
 * Page
 */
export default function CoursesDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}

/**
 * Types
 */
