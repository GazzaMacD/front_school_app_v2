import { Outlet, redirect, data, Link } from "react-router";

import { authenticatedUser, hasStudentPermissions } from "~/.server/session";
import infoStyles from "~/styles/mypage-info.css?url";
//type imports
import type { Route } from "./+types/myp-information";
import type { TUIMatch } from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: infoStyles,
  },
];

export const handle = {
  breadcrumb: function (m: TUIMatch) {
    return <Link to="/my-page/information">情報</Link>;
  },
};

/*
 * Loaders and Actions
 */
export async function loader({ request }: Route.LoaderArgs) {
  const userData = await authenticatedUser(request);
  //if null get path and redirect to login route with redirect parameter
  if (!userData) {
    const redirectTo = new URL(request.url).pathname;
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return redirect(`/login?${searchParams}`);
  }

  const hasStudentPerms = hasStudentPermissions(
    userData.user.groups,
    userData.user.is_staff
  );

  return data({
    user: userData.user,
    hasStudentPerms,
  });
}

/*
 * Page
 */
export default function SchoolInformation({
  loaderData,
}: Route.ComponentProps) {
  const { user, hasStudentPerms } = loaderData;
  return (
    <>
      <Outlet />
    </>
  );
}
