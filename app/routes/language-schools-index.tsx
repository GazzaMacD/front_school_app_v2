import type { Route } from "./+types/language-schools-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Language Schools Index Page" };
}

export default function LanguageSchoolsIndex({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
