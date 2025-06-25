import type { Route } from "./+types/auth-pwd-reset-confirm";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Password Reset Confirm route" };
}

export default function PwdResetConfirm({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
