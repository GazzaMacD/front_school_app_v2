import type { Route } from "./+types/staff-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Staff Detail route" };
}

export default function StaffDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
