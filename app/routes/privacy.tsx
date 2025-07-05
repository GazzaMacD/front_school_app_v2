import type { Route } from "./+types/privacy";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Privacy route" };
}

export default function Privacy({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
