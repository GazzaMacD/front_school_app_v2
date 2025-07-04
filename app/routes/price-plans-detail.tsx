import type { Route } from "./+types/price-plans-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Price Plans Detail route" };
}

export default function PricePlansDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
