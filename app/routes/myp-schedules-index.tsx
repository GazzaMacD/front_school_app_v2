import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { BsCalendarWeek } from "react-icons/bs";
import { SolidPillButtonLink } from "~/components/buttons";

//type imports
import type { Route } from "./+types/myp-schedules";
import type { TSchedulesBySchool, TUser } from "~/common/types";

export default function SchedulesIndex() {
  const parentData = useParentData<TSchedulesParentData>("/my-page/schedules");
  if (
    !parentData ||
    !parentData.user ||
    !parentData.schedulesBySchool ||
    !parentData.hasSchedulePermissions
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
        {getTitle({ title: "Schedules・スケジュール", isHome: false })}
      </title>
      <div className="mp-schedules-index">
        <div className="mp-schedules-index__msg-box">
          <div>
            <p>**</p>
            <p>
              Please note that schedules for physical schools allow both online
              and face to face lessons if the time is open
            </p>
          </div>
        </div>
        {Object.entries(parentData.schedulesBySchool).map(
          ([school, schedules]) => {
            return (
              <article key={school} className="mpg-widget mp-schedules-school">
                <h2 className="mpg-widget__heading">
                  <span>
                    <BsCalendarWeek />
                  </span>
                  {`${school} School Teacher Schedules`}
                </h2>
                <div className="mpg-widget__content1">
                  <div className="mp-schedules-school__inner">
                    {schedules.map((schedule) => (
                      <SolidPillButtonLink
                        color="green"
                        key={schedule.slug}
                        to={`/my-page/schedules/${schedule.slug}`}
                      >
                        <div className="mp-schedules-school-button">
                          <BsCalendarWeek />
                          {`${schedule.teacher}`}
                        </div>
                      </SolidPillButtonLink>
                    ))}
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>
    </>
  );
}

/*
 * Types
 */

type TSchedulesParentData = {
  schedulesBySchool: TSchedulesBySchool;
  user: TUser;
  hasSchedulePermissions: boolean;
};
