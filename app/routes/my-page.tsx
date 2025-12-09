import * as React from "react";

import { Outlet, Link } from "react-router";

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
      <aside></aside>
      <main>
        <Outlet />
      </main>
    </>
  );
}
