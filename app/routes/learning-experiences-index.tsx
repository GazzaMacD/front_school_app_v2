import type { Route } from "./+types/learning-experiences-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Learning Experiences Index Page" };
}

export default function LearningExperiencesIndex({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
