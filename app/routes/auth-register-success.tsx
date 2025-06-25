import type { Route } from "./+types/auth-register-success";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Register Success route" };
}

export default function RegisterSuccess({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
