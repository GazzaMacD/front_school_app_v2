import type { Route } from "./+types/about";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "About page" };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
