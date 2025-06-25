import type { Route } from "./+types/auth-pwd-reset";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Password Reset route" };
}

export default function PwdReset({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
