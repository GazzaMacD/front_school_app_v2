import type { Route } from "./+types/campaigns-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Campaigns Detail route" };
}

export default function CampaignDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
