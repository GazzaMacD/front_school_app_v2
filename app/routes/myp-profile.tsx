import type { Route } from "./+types/myp-profile";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Profile route" };
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
