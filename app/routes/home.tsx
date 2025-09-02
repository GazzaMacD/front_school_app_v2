import type { Route } from "./+types/home";

import { getTitle, getDesc } from "~/common/utils";
import homeStyles from "~/styles/home.css?url";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import type {
  TDetailMeta,
  TFullImage,
  THomeServiceCard,
  THomeTestimonial,
  THomePrice,
  THomeTeacher,
  THomeBlogPost,
} from "~/common/types";
import { HeadingOne } from "~/components/headings";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: homeStyles,
  },
];

/**
 * Loaders and Actions
 */

const homeUrl = `${BASE_API_URL}/pages/?type=home.homepage&fields=*`;
const blogslUrl = `${BASE_API_URL}/pages/?order=-published_date&limit=8&type=lessons.LessonDetailPage&fields=_,id,slug,display_title,display_tagline,published_date,title,category,header_image,id`;
//campaign urls
const simpleBannerUrl = `${BASE_API_URL}/pages/?type=campaigns.CampaignSimpleBannerPage&order=-start_date&limit=3&fields=*`;
const imageBannerUrl = `${BASE_API_URL}/pages/?type=campaigns.CampaignImageBannerPage&order=-start_date&limit=3&fields=_,banner_image,slug,title,marketing_start_date,start_date,end_date,name_ja,campaign_page_type`;

export async function loader({ context }: Route.LoaderArgs) {
  const urls = [homeUrl, blogslUrl, simpleBannerUrl, imageBannerUrl];
  const [home, blogs, simpleBanner, imageBanner] = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then(async (r) => {
          return {
            data: await r.json(),
            status: r.status,
            ok: r.ok,
          };
        })
        .then((data) => {
          return {
            data: data.data,
            status: data.status,
            ok: data.ok,
            url: url,
          };
        })
        .catch((error) => ({ error, url }))
    )
  );
  const campaigns = [
    ...simpleBanner.data.items,
    ...imageBanner.data.items,
  ].filter((campaign) => {
    const now = Date.now();
    const marketing_start = new Date(campaign.marketing_start_date).getTime();
    const end = new Date(campaign.end_date).getTime();
    if (marketing_start <= now && end >= now) {
      return true;
    }
    return false;
  });

  return {
    home: home.data.items[0] as THomePageData,
    blogs: blogs.data.items as THomeBlogPosts,
    campaigns,
    base_back_url: BASE_BACK_URL,
  };
} // end loader

/**
 * Page
 */

export default function Home({ loaderData }: Route.ComponentProps) {
  const { home, blogs, campaigns, base_back_url } = loaderData;
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

      <section id="why">
        <div className="g-grid-container1 ho-why">
          <div className="ho-why__img-wrapper">
            <img
              src={`${base_back_url}${home.why_image.medium.src}`}
              alt={home.why_image.medium.alt}
            />
          </div>
          <div className="ho-why__details">
            <HeadingOne
              enText={home.why_en_title}
              jpText={home.why_jp_title}
              align="left"
              bkground="light"
              level="h2"
            />

            <div dangerouslySetInnerHTML={{ __html: home.why_content }}></div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Types
 */
type THomePageData = {
  id: number;
  meta: TDetailMeta;
  title: string;
  //why
  why_en_title: string;
  why_jp_title: string;
  why_image: TFullImage;
  why_content: string;
  // services
  service_en_title: string;
  service_jp_title: string;
  service_cards: THomeServiceCard[];
  // testimonials
  testimonial_en_title: string;
  testimonial_jp_title: string;
  home_testimonials: THomeTestimonial[];
  //prices
  price_en_title: string;
  price_jp_title: string;
  home_class_prices: THomePrice[];
  //teachers
  teacher_en_title: string;
  teacher_jp_title: string;
  home_teachers: THomeTeacher[];
  // learning blog
  bloglesson_en_title: string;
  bloglesson_jp_title: string;
};

type THomePage = {
  meta: {
    total_count: number;
  };
  items: THomePageData[];
};

type THomeBlogPosts = THomeBlogPost[];
