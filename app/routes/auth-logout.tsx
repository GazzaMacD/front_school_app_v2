import type { Route } from "./+types/auth-login";
import { redirect } from "react-router";

import { logout } from "~/.server/session";

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  return logout(request);
}

export async function loader() {
  return redirect("/");
}
