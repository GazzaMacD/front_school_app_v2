import type { Route } from "./+types/myp-video-calls-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Video Calls Detail route" };
}

export default function VideoCallsDetail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
