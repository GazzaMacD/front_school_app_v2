import type { Route } from "./+types/auth-pwd-reset-email";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Password Reset Check Email" };
}

export default function PwdResetEmail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
