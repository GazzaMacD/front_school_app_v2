import type { Route } from "./+types/auth-register";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Register route" };
}

export default function Register({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
