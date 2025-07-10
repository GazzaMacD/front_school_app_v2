import type { Route } from "./+types/myp-video-calls-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Video Calls Index Page" };
}

export default function VideoCallsIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
