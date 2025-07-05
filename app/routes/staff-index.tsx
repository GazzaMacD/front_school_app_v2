import type { Route } from "./+types/staff-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Staff Index Page" };
}

export default function StaffIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
