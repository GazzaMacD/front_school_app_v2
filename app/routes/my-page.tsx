import * as React from "react";
import { Outlet, Link, NavLink, redirect, useMatches } from "react-router";
import { RxDashboard } from "react-icons/rx";
import {
  BsPersonCircle,
  BsCalendarWeek,
  BsPersonVcard,
  BsPersonVideo2,
  BsInfoSquare,
  BsHouse,
} from "react-icons/bs";

import myPageGlobalStyles from "~/styles/mypage-global.css?url";
import unauthorizedStyles from "~/styles/components/unauthorized.css?url";
import { authenticatedUser, hasStudentPermissions } from "~/.server/session";
// type imports
import type { Route } from "./+types/my-page";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: myPageGlobalStyles,
  },
  {
    rel: "stylesheet",
    href: unauthorizedStyles,
  },
];
export const handle = {
  breadcrumb: () => (
    <Link to="/my-page">
      <RxDashboard />
    </Link>
  ),
};

/**
 * Actions
 */

export async function loader({ request }: Route.LoaderArgs) {
  const userData = await authenticatedUser(request);

  //if null get path and redirect to login route with redirect parameter
  if (!userData) {
    const redirectTo = new URL(request.url).pathname;
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return redirect(`/login?${searchParams}`);
  }

  const { user } = userData;
  const perms = {
    classSchedules: hasStudentPermissions(user.groups, user.is_staff),
  };
  return { user, perms };
}

/**
 * Page
 */
export default function MyPage({ loaderData }: Route.ComponentProps) {
  const { user, perms } = loaderData;
  const matches = useMatches();
  console.log(matches);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div>
      <header className="mpg-header">
        <ol className="mpg-breadcrumbs">
          <li>
            <Link to="/" className="mpg-breadcrumbs__home">
              <div>
                <img
                  src="/img/x_only_xlingual_logo.svg"
                  alt="xlingual x only logo"
                />
              </div>
            </Link>
          </li>
          {matches
            .filter((match) => match.handle && match.handle.breadcrumb)
            .map((match, index) => (
              <li key={index}>{match.handle.breadcrumb(match)}</li>
            ))}
        </ol>
        <button
          className={`mpg-header__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div>
            <span></span>
          </div>
        </button>
        <div className={`mpg-menu ${menuOpen ? "open" : ""}`}>
          <div className="mpg-menu__top">
            <BsPersonCircle />
            <span>{user.contact.name}</span>
          </div>
          <div className="mpg-menu__middle">
            <nav className="mpt-menu__middle_nav">
              <ul>
                <li>
                  <NavLink
                    to="/my-page"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    end
                    onClick={() => setMenuOpen(false)}
                  >
                    <RxDashboard />
                    マイページホーム
                  </NavLink>
                </li>
                {perms.classSchedules ? (
                  <>
                    <li>
                      <NavLink
                        to="/my-page/schedules"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        end
                        onClick={() => setMenuOpen(false)}
                      >
                        <BsCalendarWeek />
                        スケジュール
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-page/video-calls"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        end
                        onClick={() => setMenuOpen(false)}
                      >
                        <BsPersonVideo2 />
                        ビデオ通話
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-page/information"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        end
                        onClick={() => setMenuOpen(false)}
                      >
                        <BsInfoSquare />
                        エクスリンガル情報
                      </NavLink>
                    </li>
                  </>
                ) : null}
                <li>
                  <NavLink
                    to="/my-page/profile"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    end
                    onClick={() => setMenuOpen(false)}
                  >
                    <BsPersonVcard />
                    プロフィール
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    end
                    onClick={() => setMenuOpen(false)}
                  >
                    <BsHouse />
                    ホームページ
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mpg-menu__bottom">
            <p>{user.email}</p>
            <form action="/logout" method="post">
              <button className="mpg-menu__logout" type="submit">
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mpg-main">
        <Outlet />
      </main>
    </div>
  );
}
