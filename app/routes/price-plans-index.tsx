import type { Route } from "./+types/price-plans-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Price Plans Index Page" };
}

export default function PricePlansIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
