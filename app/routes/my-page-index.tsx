import type { Route } from "./+types/staff-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "My Page Index Page" };
}

export default function MyPageIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
