import { Outlet } from "react-router";

import { FrontFooter } from "~/components/front-footer";
import { FrontHeader } from "~/components/front-header";
import type { Route } from "./+types/front";
import footerStyles from "~/styles/components/front-footer.css?url";
import headerStyles from "~/styles/components/front-header.css?url";
import { authenticatedUser } from "~/.server/session";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: footerStyles,
  },
  {
    rel: "stylesheet",
    href: headerStyles,
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const userData = await authenticatedUser(request);
  const user = userData ? userData.user : null;
  return { user };
}

export default function FrontLayout({ loaderData }: Route.ComponentProps) {
  let { user } = loaderData;
  console.log("user --> ", user);
  return (
    <>
      <FrontHeader user={user} />
      <div className="g-content-wrapper">
        <Outlet />
      </div>
      <FrontFooter />
    </>
  );
}
