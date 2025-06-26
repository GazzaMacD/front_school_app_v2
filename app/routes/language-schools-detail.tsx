import type { Route } from "./+types/contact-success";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Language Schools Detail route" };
}

export default function LanguageSchoolDetail({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
