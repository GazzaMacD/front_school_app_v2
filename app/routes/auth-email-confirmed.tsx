import type { Route } from "./+types/auth-email-confirmed";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Email Confirmed page" };
}

export default function EmailConfirmed({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
