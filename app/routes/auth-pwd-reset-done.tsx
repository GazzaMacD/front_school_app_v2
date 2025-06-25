import type { Route } from "./+types/auth-pwd-reset-done";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Password Reset Done route" };
}

export default function PwdResetDone({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
