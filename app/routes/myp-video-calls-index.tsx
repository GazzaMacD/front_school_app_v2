import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { BsPersonVideo2 } from "react-icons/bs";
//type imports
import type { TVideoCall, TVideoCalls, TUser } from "~/common/types";
import { SolidPillButtonLink } from "~/components/buttons";

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
    return (
      <>
        <title>
          {getTitle({ title: "Unauthorized・無許可", isHome: false })}
        </title>
        <Unauthorized />;
      </>
    );
  }
  return (
    <>
      <title>
        {getTitle({ title: "Video Calls・ビデオ通話", isHome: false })}
      </title>
      <div className="mp-video-index">
        <section id="weather" className="mpg-widget">
          <h2 className="mpg-widget__heading">
            <span>
              <BsPersonVideo2 />
            </span>
            Video Calls
          </h2>
          <div className="mp-video-index__msg">
            <p>
              Please click one of the buttons below to start a video lesson or
              call with the staff member whose name is indicated on the button.
              They will accept your call as soon as they are ready
            </p>
          </div>
          <div className="mpg-widget__content1">
            <div className="mp-video-index__links">
              {parentData.videoCalls.map((videoCallObj: TVideoCall) => {
                return (
                  <SolidPillButtonLink
                    color="green"
                    key={videoCallObj.teacher.id}
                    to={`/my-page/video-calls/${videoCallObj.slug}`}
                    reloadDoc={true}
                  >
                    <div className="mp-video-index__button_inner">
                      <BsPersonVideo2 />
                      {videoCallObj.teacher.name}
                    </div>
                  </SolidPillButtonLink>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/*
 * Types
 */

type TVideoCallsParentData = {
  videoCalls: TVideoCalls;
  user: TUser;
  hasVideoPermissions: boolean;
};
