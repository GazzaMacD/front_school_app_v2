//types
import type { Route } from "./+types/auth-pwd-reset-email";

/**
 * Loaders and Actions
 */
export function loader({ context }: Route.LoaderArgs) {
  return { message: "Password Reset Email Check" };
}

/**
 * Page
 */
export default function PwdResetEmailCheck({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
