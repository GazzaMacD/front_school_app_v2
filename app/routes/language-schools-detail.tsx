import { Link } from "react-router";
import type { Route } from "./+types/language-schools-detail";
import { FaArrowRightLong } from "react-icons/fa6";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc } from "~/common/utils";
import { HeadingOne } from "~/components/headings";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const dPageUrl = `${BASE_API_URL}/pages/?slug=${slug}&type=languageschools.LanguageSchoolDetailPage&fields=*`;
  const res = await fetch(dPageUrl);
  const dPagepage = await res.json();
  if (!res.ok || !dPagepage.items.length) {
    throw new Response(`Sorry that is a 404`, {
      status: 404,
    });
  }
  const page = dPagepage.items[0];
  return {
    page,
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function LanguageSchoolDetail({
  loaderData,
}: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `${page.display_title}`, isHome: false })}
      </title>
      <meta name="description" content={getDesc({ desc: "", isHome: false })} />
      {/* Meta tags END*/}

      <header className="ls-dp-header">
        <div className="g-basic-container">
          <div className="ls-dp-header__titles">
            <h1>
              {page.display_title}校<span>{page.title} school</span>
            </h1>
          </div>
        </div>
        <div className="ls-dp-header__img-wrap">
          <img
            src={`${base_back_url}${page.header_image.original.src}`}
            alt={page.header_image.original.alt}
          />
        </div>
      </header>

      <section id="intro">
        <div className="g-narrow-container">
          <HeadingOne
            enText="Introduction"
            jpText="学校紹介"
            align="center"
            bkground="light"
            level="h2"
          />
          <div dangerouslySetInnerHTML={{ __html: page.display_intro }} />
          <div className="ls-dp-intro__links">
            <Link to="/contact">
              無料体験レッスン <FaArrowRightLong />
            </Link>
            <Link to="/courses">コース一覧</Link>
            <Link to="/language-schools">スクール一覧</Link>
          </div>
        </div>
      </section>
    </>
  );
}
