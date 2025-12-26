import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import globalStyles from "~/styles/global.css?url";
import fontStyles from "~/styles/fonts.css?url";
import errorStyles from "~/styles/components/errors.css?url";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStyles,
  },
  {
    rel: "stylesheet",
    href: fontStyles,
  },
  {
    rel: "stylesheet",
    href: errorStyles,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {pathname.includes("video-calls") ? (
          <script
            src="https://cdn.srv.whereby.com/embed/v2-embed.js"
            type="module"
            defer
          ></script>
        ) : null}
      </head>
      <body>
        <div className="g-base-wrapper">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
