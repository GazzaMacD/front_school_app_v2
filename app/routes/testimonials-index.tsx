import { redirect } from "react-router";

/**
 * Actions and loaders
 */
export function loader() {
  // No index page currently. Redirect to home testimonials
  return redirect("/#testimonials");
}
