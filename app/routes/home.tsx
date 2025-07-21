import type { Route } from "./+types/home";
import { getTitle, getDesc } from "~/common/utils";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Hello from XLingual" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <>
      {/* Meta tags*/}
      <title>{getTitle({ isHome: true })}</title>
      <meta name="description" content={getDesc({ isHome: true })} />
      {/* Meta tags*/}
      {message}
    </>
  );
}
