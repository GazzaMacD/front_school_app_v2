import type { Route } from "./+types/courses-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Courses Detail Page" };
}

export default function CoursesDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
