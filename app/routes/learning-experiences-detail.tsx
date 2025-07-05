import type { Route } from "./+types/learning-experiences-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Learning Experiences Detail route" };
}

export default function LearningExperiencesDetail({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
