import { Outlet, redirect, data } from "react-router";

import {
  authenticatedUser,
  createAuthenticatedHeaders,
  hasStudentPermissions,
} from "~/.server/session";
import { fetchWithMeta } from "~/common/utils";
import { BASE_API_URL } from "~/.server/env";
import scheduleStyles from "~/styles/mypage-schedules.css?url";

//type imports
import type { Route } from "./+types/myp-schedules";
import type { TAPISchedules, TSchedulesBySchool } from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: scheduleStyles,
  },
];

function groupSchedulesBySchool(schedules: TAPISchedules): TSchedulesBySchool {
  const schedulesBySchool: TSchedulesBySchool = {};
  schedules.forEach((schedule) => {
    const scheduleObject = {
      slug: schedule.slug,
      url: schedule.schedule_url,
      teacher: schedule.teacher.name,
      school: schedule.language_school.name,
    };
    if (!Object.hasOwn(schedulesBySchool, schedule.language_school.name)) {
      schedulesBySchool[schedule.language_school.name] = [scheduleObject];
    } else {
      schedulesBySchool[schedule.language_school.name].push(scheduleObject);
    }
  });
  return schedulesBySchool;
}

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
    const schedulesUrl = `${BASE_API_URL}/supersaas-schedules`;
    const schedulesData = await fetchWithMeta<TAPISchedules>({
      url: schedulesUrl,
      options,
    });

    if (!schedulesData.success) {
      return redirect(`/login?${searchParams}`);
    }

    const hasSchedulePermissions = hasStudentPermissions(
      userData.user.groups,
      userData.user.is_staff
    );
    const schedulesBySchool = groupSchedulesBySchool(schedulesData.data);

    return data({
      schedulesBySchool,
      user: userData.user,
      hasSchedulePermissions,
    });
  } catch (error) {
    console.error(`Error in loader at ${redirectTo}: ${error}`);
    throw data("Ooops that is a 500", { status: 500 });
  }
}

/*
 * Page
 */

export default function Schedules({ loaderData }: Route.ComponentProps) {
  const { user, schedulesBySchool, hasSchedulePermissions } = loaderData;
  return (
    <>
      <Outlet />
    </>
  );
}
