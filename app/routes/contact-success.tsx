import type { Route } from "./+types/contact-success";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Contact Success route" };
}

export default function ContactSuccess({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
