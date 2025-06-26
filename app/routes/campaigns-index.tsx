import type { Route } from "./+types/campaigns-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Campaigns Index Page" };
}

export default function CampaignIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
