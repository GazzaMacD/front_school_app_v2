import type { Route } from "./+types/courses-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Courses Index Page" };
}

export default function CoursesIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
