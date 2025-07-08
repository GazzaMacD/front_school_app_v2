import type { Route } from "./+types/myp-schedules-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Schedules Detail route" };
}

export default function SchedulesDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
