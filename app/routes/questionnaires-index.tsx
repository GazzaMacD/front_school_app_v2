import { redirect } from "react-router";

/**
 * Actions and loaders
 */
export function loader() {
  // No index page currently, just redirect to home
  return redirect("/");
}
