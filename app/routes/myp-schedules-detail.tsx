import { useParentData } from "~/hooks/use-parent-data";
import { Unauthorized } from "~/components/unauthorized";
import { Error } from "~/components/errors";
import { getTitle } from "~/common/utils";

//type imports
import type { Route } from "./+types/myp-schedules-detail";
import type {
  TSchedulesBySchool,
  TSchedulesObject,
  TUser,
} from "~/common/types";

/*
 * Actions and Loaders
 */
export function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  return { slug };
}

/*
 * Page
 */
export default function SchedulesDetail({ loaderData }: Route.ComponentProps) {
  const { slug } = loaderData;
  const parentData = useParentData<TSchedulesParentData>("/my-page/schedules");

  // Unauthorized
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

  // No schedule found
  const schedule = getSchedule(parentData.schedulesBySchool, slug);
  if (!schedule) {
    return <Error />;
  }

  // No schedule found
  return (
    <>
      <title>
        {getTitle({
          title: `${schedule.teacher}'s ${schedule.school} Booking Schedule`,
          isHome: false,
        })}
      </title>
      <div className="mp-schedules-detail">
        <div className="mp-schedules-detail__inner">
          <iframe
            title={`${schedule.teacher}'s ${schedule.school} Booking Schedule`}
            className="mp-schedules-detail__iframe"
            src={schedule.url}
            scrolling="no"
          ></iframe>
        </div>
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

type TGetScheduleReturn = TSchedulesObject | undefined;

function getSchedule(
  schedules: TSchedulesBySchool,
  slug: string
): TGetScheduleReturn {
  let scheduleObj;
  for (const [_, value] of Object.entries(schedules)) {
    scheduleObj = value.find((schedule) => schedule.slug === slug);
    if (scheduleObj) {
      return scheduleObj;
    }
  }
  return scheduleObj;
}
