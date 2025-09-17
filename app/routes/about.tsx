import type { Route } from "./+types/about";
import { Link } from "react-router";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc, getDivisor4LetterHash } from "~/common/utils";
import { StaffRoundPicCard, NumberedHorizontalCards } from "~/components/cards";
import { SlidingHeaderPage } from "~/components/pages";
import { HeadingOne } from "~/components/headings";
// css imports
import cardStyles from "~/styles/components/cards.css?url";
import aboutStyles from "~/styles/about.css?url";
import pagesStyles from "~/styles/components/pages.css?url";

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

        <section id="teachers">
          <div className="ab-teachers">
            <div className="g-grid-container1">
              <div className="ab-teachers__heading">
                <HeadingOne
                  enText={page.staff_en_title}
                  jpText={page.staff_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>
              {page.staff_members.length ? (
                page.staff_members.map((member, i) => {
                  return (
                    <div
                      key={member.id}
                      className={`ab-teachers__card-wrapper ${teacherHash[i]}`}
                    >
                      <StaffRoundPicCard
                        url={`/staff/${member.staff.slug}`}
                        src={`${base_back_url}${member.staff.image.original.src}`}
                        alt={member.staff.image.original.alt}
                        name={member.staff.name}
                        tagline={member.staff.display_tagline}
                      />
                    </div>
                  );
                })
              ) : (
                <p>Please add at least one staff member</p>
              )}
            </div>
          </div>
        </section>

        <section id="values">
          <div className="ab-values">
            <div className="g-narrow-container">
              <HeadingOne
                enText={page.values_en_title}
                jpText={page.values_jp_title}
                align="center"
                bkground="light"
                level="h2"
              />
              <div dangerouslySetInnerHTML={{ __html: page.values_intro }} />
            </div>
            <div className="g-grid-container1">
              {page.values_list.map((block, i) => {
                const classType = i % 2;
                return (
                  <div
                    key={block.id}
                    className={`ab-values__card-wrapper t${classType}`}
                  >
                    <NumberedHorizontalCards
                      number={`0${i + 1}`}
                      enTitle={block.value.title}
                      jaTitle={block.value.jp_title}
                      text={block.value.text}
                      src={`${base_back_url}${block.value.image.thumbnail.src}`}
                      alt={block.value.image.medium.alt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}
