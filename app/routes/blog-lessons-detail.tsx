import type { Route } from "./+types/blog-lessons-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Blog Lessons Detail Page" };
}

export default function BlogLessonsDetail({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
