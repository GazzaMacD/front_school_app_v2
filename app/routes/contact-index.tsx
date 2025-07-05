import type { Route } from "./+types/contact-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Contact Index Page" };
}

export default function ContactIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
