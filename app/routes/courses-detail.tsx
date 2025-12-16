import type { Route } from "./+types/courses-detail";
import { BsFillBarChartFill, BsGlobe, BsJournalText } from "react-icons/bs";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import {
  getTitle,
  getDesc,
  fetchWithMeta,
  getDivisor4LetterHash,
} from "~/common/utils";
import { HeadingOne } from "~/components/headings";
import { Swoosh1 } from "~/components/swooshes";
import { DetailLinkCard } from "~/components/cards";
import { ClassPricePlanTable } from "~/components/prices";
import pricesStyles from "~/styles/components/prices.css?url";
import type {
  TPricePlan,
  TDetailMeta,
  TFullImage,
  TRichTextBlock,
} from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pricesStyles,
  },
];

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { subject, slug } = params;
  const detailPageUrl = `${BASE_API_URL}/pages/?type=courses.CourseDisplayDetailPage&subject_slug=${subject}&slug=${slug}&fields=*`;
  const detailPageResult = await fetchWithMeta<TCourseDetailResult>({
    url: detailPageUrl,
    options: undefined,
  });

  //error
  if (!detailPageResult.success) {
    console.error("Course Detail page failed:", detailPageResult.error);
    throw new Response("Sorry that is an error", {
      status: detailPageResult.status,
    });
  }

  //success
  return { page: detailPageResult.data.items[0], base_back_url: BASE_BACK_URL };
}

/**
 * Page
 */
export default function CoursesDetail({ loaderData }: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  const subject = page.course.subject as "english" | "japanese" | "french";
  const subjectDisplay = page.course.subject_display.split(",");
  const categoryDisplay = page.course.course_category_display.split(",");
  const levelFromDisplay = page.level_from.display.split(",");
  const levelToDisplay = page.level_to.display.split(",");
  const relatedHash = getDivisor4LetterHash(page.related_courses.length);

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `${page.display_title}`, isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.display_tagline, isHome: false })}
      />
      {/* Meta tags END*/}

      <header className="cs-dp-header">
        <div className="g-basic-container">
          <div className="cs-dp-header__titles">
            <h1>
              {page.display_title}
              <span>{page.title}</span>
            </h1>
            <p>{page.display_tagline}</p>
          </div>
          <div className="cs-dp-header__info">
            <div>
              <BsGlobe />
              <span>言語 :</span>
              <span>
                {subject === "japanese" ? subjectDisplay[1] : subjectDisplay[2]}
              </span>
            </div>
            <div>
              <BsJournalText />
              <span>コース種別 :</span>
              <span>
                {subject === "japanese"
                  ? categoryDisplay[0]
                  : categoryDisplay[1]}
              </span>
            </div>
            <div>
              <BsFillBarChartFill />
              <span>レベル :</span>
              <span>
                {subject === "japanese"
                  ? levelFromDisplay[0]
                  : levelFromDisplay[1]}
                {page.level_to.number < 2 ||
                page.level_to.number <= page.level_from.number
                  ? ""
                  : subject === "japanese"
                  ? ` ~ ${levelToDisplay[0]}`
                  : ` ~ ${levelToDisplay[1]}`}
              </span>
            </div>
          </div>
        </div>
        <div className="cs-dp-header__img-wrap">
          <img
            src={`${base_back_url}${page.header_image.medium.src}`}
            alt={page.header_image.medium.alt}
          />
        </div>
      </header>

      <section id="skills">
        <div className="g-narrow-container">
          <HeadingOne
            enText="What skills will I learn"
            jpText="学べるスキルの例"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <div className="g-basic-container">
          <div className="cs-dp-skills">
            <ul>
              {page.course_content_points.map((sk, i) => {
                const num = i > 8 ? i + 1 : `0${i + 1}`;
                return (
                  <li key={sk.id} className="cs-dp-skills__skill">
                    <div>{num}</div>
                    <div>{sk.value.text}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="g-narrow-container">
          <HeadingOne
            enText="About course"
            jpText="このコースについて"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        {page.course_description.map((block: any) => {
          if (block.type === "rich_text") {
            return (
              <div
                className="g-narrow-container"
                key={block.id}
                dangerouslySetInnerHTML={{ __html: block.value }}
              />
            );
          } else if (block.type === "text_width_img") {
            return (
              <div key={block.id} className="g-narrow-container">
                <figure className="cs-dp-about__img-wrapper text-width">
                  <img
                    src={`${base_back_url}${block.value.image.original.src}`}
                    alt={block.value.image.original?.alt}
                  />
                  {block.value?.caption ? (
                    <figcaption>{block.value.caption}</figcaption>
                  ) : null}
                </figure>
              </div>
            );
          } else if (block.type === "youtube") {
            return (
              <div key={block.id}>
                <div className="cs-dp-intro__youtube">
                  <iframe
                    className={`g-youtube-iframe ${
                      block.value.short ? "g-youtube-short" : ""
                    }`}
                    src={`${block.value.src}?modestbranding=1&controls=0&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </section>

      <section id="plans">
        <div className="g-basic-container">
          <HeadingOne
            enText="Popular Price Plans"
            jpText="人気のプラン"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <div className="g-basic-container">
          <div className="cs-dp-plans__wrapper">
            {page.common_price_plans.map((item, i) => {
              const p = item.price_plan;
              const pi = item.price_plan.price_info;
              return (
                <div key={item.id} className="cs-dp-plans__plan">
                  <ClassPricePlanTable
                    color="beige"
                    showLinkButton={true}
                    slug={p.slug}
                    titleEn={p.title}
                    titleJa={p.display_title}
                    duration={p.length}
                    durationUnit={p.length_unit}
                    stdQuantity={p.quantity}
                    stdQuantityUnit={p.quantity_unit}
                    maxNum={p.max_num}
                    isNative={p.is_native}
                    isOnline={p.is_online}
                    isInperson={p.is_inperson}
                    hasOnlineNotes={p.has_onlinenotes}
                    bookableOnline={p.bookable_online}
                    preTaxPrice={pi.pretax_price}
                    postTaxPrice={pi.posttax_price}
                    onSale={pi.is_sale}
                    preSalePreTaxPrice={pi.before_sale_pretax_price}
                    preSalePostTaxPrice={pi.before_sale_posttax_price}
                    priceStartDate={pi.start_date}
                    priceEndDate={pi.end_date}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="related">
        <div className="cs-dp-related">
          <div className="g-grid-container1">
            <div className="cs-dp-related__heading">
              <h2>その他のおすすめコース</h2>
            </div>
            {page.related_courses.map((c, i) => {
              return (
                <div
                  key={c.id}
                  className={`cs-dp-related__card ${relatedHash[i]}`}
                >
                  <DetailLinkCard
                    title={c.course.display_title}
                    tagline={c.course.display_tagline}
                    src={`${base_back_url}${c.course.image.thumbnail.src}`}
                    alt={`${c.course.image.thumbnail.alt}`}
                    url={`/courses/${c.course.subject_slug}/${c.course.slug}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Swoosh1 swooshColor="beige" backColor="white" />
    </>
  );
}

/**
 * Types
 */

type TLevel = {
  number: number;
  display: string;
};

type TCourseContentPoint = {
  type: string;
  value: {
    text: string;
  };
  id: string;
};

type TCourse = {
  id: number;
  title_en: string;
  subject: string;
  subject_display: string;
  course_category: string;
  course_category_display: string;
};

type TRelatedCourse = {
  id: number;
  meta: { type: string };
  course: {
    id: number;
    title: string;
    display_title: string;
    display_tagline: string;
    slug: string;
    subject_slug: string;
    subject_display: string;
    image: TFullImage;
  };
};

type TCourseDetailPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  display_tagline: string;
  course: TCourse;
  header_image: TFullImage;
  subject_slug: string;
  level_from: TLevel;
  level_to: TLevel;
  course_content_points: TCourseContentPoint[];
  common_price_plans: TPricePlan;
  course_description: TRichTextBlock[];
  related_courses: TRelatedCourse[];
};

type TCourseDetailResult = {
  meta: { total_count: number };
  items: TCourseDetailPage[];
};
