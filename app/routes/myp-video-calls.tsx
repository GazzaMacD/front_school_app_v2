import { Outlet, redirect, data } from "react-router";

import {
  authenticatedUser,
  createAuthenticatedHeaders,
  hasStudentPermissions,
} from "~/.server/session";
import { fetchWithMeta } from "~/common/utils";
import { BASE_API_URL } from "~/.server/env";
import videoStyles from "~/styles/mypage-video.css?url";
//type imports
import type { Route } from "./+types/myp-video-calls";
import type { TVideoCalls, TUser } from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: videoStyles,
  },
];
/*
 * Loaders and Actions
 */
export async function loader({ request }: Route.LoaderArgs) {
  const userData = await authenticatedUser(request);
  const redirectTo = new URL(request.url).pathname;
  const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  //if null get path and redirect to login route with redirect parameter
  if (!userData) {
    return redirect(`/login?${searchParams}`);
  }
  try {
    const headers = await createAuthenticatedHeaders(userData.access);
    const options = {
      method: "GET",
      headers,
    };
    const videoCallsUrl = `${BASE_API_URL}/video-calls/`;
    const videoCallsData = await fetchWithMeta<TVideoCalls>({
      url: videoCallsUrl,
      options,
    });

    if (!videoCallsData.success) {
      return redirect(`/login?${searchParams}`);
    }

    const hasVideoPermissions = hasStudentPermissions(
      userData.user.groups,
      userData.user.is_staff
    );

    return data({
      videoCalls: videoCallsData.data,
      user: userData.user,
      hasVideoPermissions,
    });
  } catch (error) {
    console.error(`Error in loader at ${redirectTo}: ${error}`);
    throw data("Ooops that is a 500", { status: 500 });
  }
}

/*
 * Page
 */
export default function VideoCalls({ loaderData }: Route.ComponentProps) {
  const { user, videoCalls, hasVideoPermissions } = loaderData;
  return (
    <>
      <Outlet />
    </>
  );
}
