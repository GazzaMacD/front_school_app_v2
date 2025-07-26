import type { Route } from "./+types/home";

import { getTitle, getDesc } from "~/common/utils";
import homeStyles from "~/styles/home.css?url";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: homeStyles,
  },
];

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Hello from XLingual" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <>
      {/* Meta tags*/}
      <title>{getTitle({ isHome: true })}</title>
      <meta name="description" content={getDesc({ isHome: true })} />
      {/* Meta tags END*/}
      <section id="video-banner">
        <div className="ho-hero ">
          <div className="ho-hero__video-wrapper">
            <video className="ho-hero__video" playsInline autoPlay muted loop>
              <source
                src="/video/2024-06-banner-video-2.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="ho-hero__promo">
            <p className="ho-hero__en-title">
              Learn English with our{" "}
              <span className="ho-hero__en-title--green">multilingual</span>{" "}
              expert teachers
            </p>
            <h1 className="ho-hero__ja-title">
              <span>XLingual - エクスリンガル語学学校 -</span>
              マルチリンガルの講師たちと一緒に英語を勉強しましょう
            </h1>
          </div>
        </div>
      </section>
      {message}
    </>
  );
}
