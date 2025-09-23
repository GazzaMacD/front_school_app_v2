import { Link } from "react-router";
import type { Route } from "./+types/language-schools-detail";
import { FaArrowRightLong } from "react-icons/fa6";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc } from "~/common/utils";
import { HeadingOne } from "~/components/headings";
import { Swoosh1 } from "~/components/swooshes";
import { SimpleImageGallery } from "~/common/galleries";
import galleryStyles from "~/styles/components/galleries.css?url";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: galleryStyles,
  },
];

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
  const ad = page?.ls?.address;

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

      <section id="access">
        <div className="g-narrow-container">
          <HeadingOne
            enText="Access"
            jpText="アクセス"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <div
          className="ls-dp-access__map"
          dangerouslySetInnerHTML={{ __html: page.display_map }}
        />
        <div className="g-basic-container">
          <div className="ls-dp-access__contact">
            <p>
              〒{ad.code} {ad.state}
              {ad.city}
              {ad.line_two}
              {ad.line_one}
            </p>
            <p>TEL：0561-42-5707</p>
            <p>
              メールアドレス：
              <Link to="mailto:contact@xlingual.co.jp">
                contact@xlingual.co.jp
              </Link>
            </p>
          </div>
          <div className="ls-dp-access__directions">
            <p>[ 電車でお越しの方 ] {page.access_train} </p>
            <p>[ お車でお越しの方 ] {page.access_car} </p>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="g-narrow-container">
          <HeadingOne
            enText="Gallery"
            jpText="ギャラリー"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <SimpleImageGallery images={page.ls_photos} baseUrl={base_back_url} />
      </section>

      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}
