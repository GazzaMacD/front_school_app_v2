import type { Route } from "./+types/auth-confirm-email";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Confirm Email page" };
}

export default function ConfirmEmail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
