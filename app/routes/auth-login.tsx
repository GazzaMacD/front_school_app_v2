import type { Route } from "./+types/auth-login";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Login page" };
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
