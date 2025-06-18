import type { Route } from "./+types/blog-lessons-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Blog Lessons Index Page" };
}

export default function BlogLessonsIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
