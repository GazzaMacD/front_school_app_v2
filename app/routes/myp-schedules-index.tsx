import type { Route } from "./+types/myp-schedules-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Schedules Index Page" };
}

export default function SchedulesIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
