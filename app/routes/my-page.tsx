import * as React from "react";

import { Outlet, Link, NavLink } from "react-router";
import { RxDashboard } from "react-icons/rx";
import {
  BsPersonCircle,
  BsCalendarWeek,
  BsPersonVcard,
  BsPersonVideo2,
  BsHouse,
} from "react-icons/bs";

import myPageGlobalStyles from "~/styles/mypage-global.css?url";
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
];

/**
 * Page
 */
export default function MyPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <header className="mpg-header">
        <Link to="/" className="mpg-header__logo">
          <div>
            <img
              src="/img/x_only_xlingual_logo.svg"
              alt="xlingual x only logo"
            />
          </div>
        </Link>
        <button
          className={`mpg-header__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div>
            <span></span>
          </div>
        </button>
      </header>
      <aside className={`mpg-menu ${menuOpen ? "open" : ""}`}>
        <div className="mpg-menu__top">
          <BsPersonCircle />
          <span>Gareth Macdonald</span>
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
                >
                  <RxDashboard />
                  マイページホーム
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-page/schedules"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  end
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
                >
                  <BsPersonVideo2 />
                  ビデオ通話
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-page/profile"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  end
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
                >
                  <BsHouse />
                  ホームページ
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mpg-menu__bottom">
          <p>macdonald.gareth@gmail.com</p>
          <form action="/logout" method="post">
            <button className="mpg-menu__logout" type="submit">
              ログアウト
            </button>
          </form>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </>
  );
}
