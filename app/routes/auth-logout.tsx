import type { Route } from "./+types/auth-login";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Logout Route" };
}

export default function Logout({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
