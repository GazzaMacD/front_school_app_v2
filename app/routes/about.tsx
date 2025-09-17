import type { Route } from "./+types/about";
import { Link } from "react-router";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import cardStyles from "~/styles/components/cards.css?url";
import aboutStyles from "~/styles/about.css?url";
import pagesStyles from "~/styles/components/pages.css?url";
import { getTitle, getDesc, getDivisor4LetterHash } from "~/common/utils";
import { SlidingHeaderPage } from "~/components/pages";
import { HeadingOne } from "~/components/headings";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: cardStyles,
  },
  {
    rel: "stylesheet",
    href: aboutStyles,
  },
  {
    rel: "stylesheet",
    href: pagesStyles,
  },
];

/**
 * Loaders and Actions
 */

export async function loader() {
  const aboutAPIUrl = `${BASE_API_URL}/pages/?type=about.AboutPage&slug=about&fields=*`;
  try {
    const response = await fetch(aboutAPIUrl);
    const aboutPageData = await response.json();
    if (!response.ok || !aboutPageData.items.length) {
      throw new Response("Sorry that's a 404", { status: 404 });
    }
    const page = aboutPageData.items[0];
    return {
      page,
      base_back_url: BASE_BACK_URL,
    };
  } catch (error) {
    throw new Response("Sorry that's a 500", { status: 500 });
  }
}

/**
 * Page
 */

export default function About({ loaderData }: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  const teacherHash = getDivisor4LetterHash(page.staff_members.length);

  return (
    <>
      {/* Meta tags*/}

      <title>
        {getTitle({ title: "About Us・私たちについて", isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.mission_content, isHome: false })}
      />
      {/* Meta tags END*/}
      <SlidingHeaderPage
        mainTitle={page.title}
        subTitle={page.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <section id="mission">
          <div className="ab-mission">
            <div className="g-narrow-container">
              <HeadingOne
                enText={page.mission_en_title}
                jpText={page.mission_jp_title}
                align="center"
                bkground="light"
                level="h2"
              />
              <h2>{page.mission_title}</h2>
              <p>{page.mission_tagline}</p>
              <p>{page.mission_content}</p>
            </div>
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}
