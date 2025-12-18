import { Unauthorized } from "~/components/unauthorized";
//type imports
import type { TVideoCalls, TUser } from "~/common/types";

import { useParentData } from "~/hooks/use-parent-data";

export default function VideoCallsIndex() {
  const parentData = useParentData<TVideoCallsParentData>(
    "/my-page/video-calls"
  );
  if (
    !parentData ||
    !parentData.user ||
    !parentData.videoCalls ||
    !parentData.hasVideoPermissions
  ) {
    return <Unauthorized />;
  }
  return <div> Ok </div>;
}

/*
 * Types
 */

type TVideoCallsParentData = {
  videoCalls: TVideoCalls;
  user: TUser;
  hasVideoPermissions: boolean;
};
