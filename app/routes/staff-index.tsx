import { redirect } from "react-router";

/**
 * Actions and loaders
 */
export function loader() {
  // No index page currently. Staff are on About page so redirect to /about#teachers
  return redirect("/about#teachers");
}
