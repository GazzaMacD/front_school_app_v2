import * as React from "react";

import { Unauthorized } from "~/components/unauthorized";
import { Error } from "~/components/errors";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
//type imports
import type { Route } from "./+types/myp-video-calls-detail";
import type { TVideoCall, TVideoCalls, TUser } from "~/common/types";
import { useLocation } from "react-router";

/*
 *  Helpers
 */

function nameFromSlug(slug: string) {
  let nameArray = slug.split("-");
  nameArray = nameArray.map(
    (name) => name.charAt(0).toUpperCase() + name.slice(1)
  );
  return nameArray.join(" ");
}

/*
 * Loaders and actions
 */
export function loader({ params, request }: Route.LoaderArgs) {
  const referer = request.headers.get("referer");
  let shouldRefresh = false;

  if (
    referer &&
    referer.includes("my-page") &&
    referer.includes("video-calls")
  ) {
    shouldRefresh = true;
  }

  const { slug } = params;
  return { slug, shouldRefresh };
}

/*
 * Page
 */
export default function VideoCallsDetail({ loaderData }: Route.ComponentProps) {
  const { slug } = loaderData;
  const parentData = useParentData<TVideoCallsParentData>(
    "/my-page/video-calls"
  );

  /* Auth Failure */
  if (
    !parentData ||
    !parentData.user ||
    !parentData.videoCalls ||
    !parentData.hasVideoPermissions
  ) {
    return (
      <>
        <title>
          {getTitle({ title: "Unauthorized・無許可", isHome: false })}
        </title>
        <Unauthorized />;
      </>
    );
  }
  const videoData = parentData.videoCalls.find(
    (videoCall: TVideoCall) => videoCall.slug === slug
  );
  /* Slug Failure */
  if (!videoData) {
    return (
      <>
        <title>
          {getTitle({ title: "404 Error・404 エラー", isHome: false })}
        </title>
        <Error />
      </>
    );
  }

  /* Success */
  let roomUrl = videoData.room_url;
  videoData.teacher.id;
  if (parentData.user.is_staff && videoData.teacher.id === parentData.user.id) {
    roomUrl = videoData.host_room_url;
  }

  return (
    <>
      <title>
        {getTitle({ title: `Call with ${nameFromSlug(slug)}`, isHome: false })}
      </title>
      <div className="mp-video-detail">
        <whereby-embed class="mp-video-detail__video" room={roomUrl} />
      </div>
    </>
  );
} // Page end

/*
 * Types
 */

type TVideoCallsParentData = {
  videoCalls: TVideoCalls;
  user: TUser;
  hasVideoPermissions: boolean;
};
