import { Outlet } from "react-router";
import type { Route } from "./+types/learning-experiences";
import learnExpStyles from "~/styles/learning-experiences.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: learnExpStyles,
  },
];

/**
 * Page
 */
export default function LearningExperiences() {
  return <Outlet />;
}
