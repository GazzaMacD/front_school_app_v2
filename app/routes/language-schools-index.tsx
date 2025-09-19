import type { Route } from "./+types/language-schools-index";

import { SlidingHeaderPage } from "~/components/pages";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import pageStyles from "~/styles/components/pages.css?url";
import { getTitle, getDesc } from "~/common/utils";
import type { TDetailMeta, TFullImage } from "~/common/types";
import { Link } from "react-router";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pageStyles,
  },
];

/**
 * Loaders and Actions
 */

export async function loader({ context }: Route.LoaderArgs) {
  const lPageUrl = `${BASE_API_URL}/pages/?type=languageschools.LanguageSchoolListPage&fields=*`;
  const dPageUrl = `${BASE_API_URL}/pages/?type=languageschools.LanguageSchoolDetailPage&fields=_,id,title,display_title,display_tagline,slug,display_city,header_image`;
  try {
    const urls = [lPageUrl, dPageUrl];
    const [lPage, dPage] = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then(async (res) => {
            return {
              data: await res.json(),
              status: res.status,
              url: url,
            };
          })
          .catch((error) => ({ error, url }))
      )
    );

    if (lPage.status !== 200 || dPage.status !== 200) {
      throw new Error(JSON.stringify({ lPage, dPage }, null, 2));
    }
    if (!lPage.data.items.length || !dPage.data.items.length) {
      throw new Response("Oops, that is not found", { status: 404 });
    }
    return {
      listPage: lPage.data.items[0] as TListPage,
      dPages: dPage.data.items as TDetailPages,
      base_back_url: BASE_BACK_URL,
    };
  } catch (error) {
    console.log(error);
    throw new Response("oops that is an error", { status: 500 });
  }
}

/**
 * Page
 */

export default function LanguageSchoolsIndex({
  loaderData,
}: Route.ComponentProps) {
  const { listPage: lp, dPages: dp, base_back_url } = loaderData;

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `${lp.title}・${lp.display_title}`, isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: lp.display_intro, isHome: false })}
      />

      {/* Meta tags END*/}
      <SlidingHeaderPage
        mainTitle={lp.title}
        subTitle={lp.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <section className="ls-lp-schools">
          <div className="g-grid-container1">
            {dp.map((school, i) => {
              return (
                <article key={school.id} className={`ls-lp-school t${i % 2}`}>
                  <div className="ls-lp-school__img-wrap">
                    <img
                      src={`${base_back_url}${school.header_image.thumbnail.src}`}
                      alt={school.display_title}
                    />
                  </div>
                  <div className="ls-lp-school__details">
                    <div className="ls-lp-school__heading">
                      <h3>{school.display_title}校</h3>
                      <p>愛知県{school.display_city}</p>
                    </div>
                    <p className="ls-lp-school__tagline">
                      {school.display_tagline}
                    </p>
                    <Link
                      className="ls-lp-school__link"
                      to={`/language-schools/${school.meta.slug}`}
                      key={school.id}
                    >
                      詳しく見る
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}

/**
 * Types
 */
type TListPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  display_intro: string;
};

type TDetailPage = {
  id: number;
  meta: { slug: string };
  title: string;
  display_title: string;
  display_tagline: string;
  header_image: TFullImage;
  display_city: string;
};

type TDetailPages = TDetailPage[];
