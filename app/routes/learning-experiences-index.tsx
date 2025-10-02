import type { Route } from "./+types/learning-experiences-index";
import { SimpleImageGallery } from "~/components/galleries";
import galleryStyles from "~/styles/components/galleries.css?url";
import { SlidingHeaderPage } from "~/components/pages";
import pageCStyles from "~/styles/components/pages.css?url";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import {
  getTitle,
  getDesc,
  fetchWithMeta,
  getDivisor3LetterHash,
} from "~/common/utils";
import { HeadingOne } from "~/components/headings";
import type {
  TDetailMeta,
  TFullImage,
  TSimpleImageBlock,
} from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: galleryStyles,
  },
  {
    rel: "stylesheet",
    href: pageCStyles,
  },
];
const learningExperienceDesc = `エクスリンガルのラーニング・エクスペリエンスとは？ エクスリンガルのラーニング・エクスペリエンスは、当校人気の語学イベントです。 楽しくイベントに参加しながら、様々なシチュエーションの中で好奇心をもってわくわくしながら語学を学べるよう、当校のマルチリンガルなネイティブ講師たちが創り上げる語学アドベンチャーです。ラーニング・エクスペリエンスでは、コミュニケーション意欲を掻き立て、自然な学習意欲を生み出すことで、あなたの語学力向上を目指します。`;

/**
 * Loaders and Actions
 */
export async function loader({ context }: Route.LoaderArgs) {
  const listPageUrl = `${BASE_API_URL}/pages/?type=products.LearningExperienceListPage&fields=*`;
  const detailPageUrl = `${BASE_API_URL}/pages/?type=products.LearningExperienceDetailPage&fields=title,display_title,display_tagline,slug,start_date,end_date,header_image`;

  //api fetch
  const [listPageResult, detailPagesResult] = await Promise.all([
    fetchWithMeta<TLearnExpListPageResult>(listPageUrl),
    fetchWithMeta<TLearnExpDetailPagesResult>(detailPageUrl),
  ]);

  //error
  if (!listPageResult.success) {
    console.error(
      "Learning Experience List page failed:",
      listPageResult.error
    );
    throw new Response("Sorry that is an error", {
      status: listPageResult.status,
    });
  }
  if (!detailPagesResult.success) {
    console.error(
      "Detail pages on Learning Exprience List page failed:",
      detailPagesResult.error
    );
    throw new Response("Sorry that is an error", {
      status: detailPagesResult.status,
    });
  }

  // filter on end date
  const detailPages = detailPagesResult.data.items.filter((page) => {
    const now = new Date(new Date().toDateString()).getTime();
    const end = new Date(page.end_date).getTime();
    return end >= now;
  });

  // success
  return {
    listPage: listPageResult.data.items[0],
    detailPages: detailPagesResult.data.items,
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function LearningExperiencesIndex({
  loaderData,
}: Route.ComponentProps) {
  const { listPage, detailPages, base_back_url } = loaderData;
  const upcomingHash = getDivisor3LetterHash(detailPages.length);
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: `${listPage.display_title}`,
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: learningExperienceDesc,
          isHome: false,
        })}
      />
      {/* Meta tags END*/}
      <SlidingHeaderPage
        mainTitle={listPage.title}
        subTitle={listPage.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <section id="intro">
          <div>
            <div className="g-narrow-container">
              <div>
                <HeadingOne
                  enText={listPage.intro_en_title}
                  jpText={listPage.intro_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: listPage.intro }} />
            </div>
          </div>
        </section>
        <div>page here</div>
      </SlidingHeaderPage>
    </>
  );
}

/**
 * Types
 */
type TLearnExpListPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  intro_en_title: string;
  intro_jp_title: string;
  intro: string;
  upcoming_en_title: string;
  upcoming_jp_title: string;
  gallery_en_title: string;
  gallery_jp_title: string;
  experiences_gallery: TSimpleImageBlock[];
};
type TLearnExpListPageResult = {
  meta: { total_count: number };
  items: TLearnExpListPage[];
};
type TLearnExpDetailPageItem = {
  id: number;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    first_published_at: string;
  };
  title: string;
  display_title: string;
  display_tagline: string;
  header_image: { alt: string } & TFullImage;
  start_date: string;
  end_date: string;
};

type TLearnExpDetailPagesResult = {
  meta: { total_count: number };
  items: TLearnExpDetailPageItem[];
};
