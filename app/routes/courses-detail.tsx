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
  TCoursePrice,
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
  const detailPageResult = await fetchWithMeta<TCourseDetailResult>(
    detailPageUrl
  );

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
        content={getDesc({ desc: page.display_title, isHome: false })}
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
  common_price_plans: TCoursePrice;
  course_description: TRichTextBlock[];
  related_courses: TRelatedCourse[];
};

type TCourseDetailResult = {
  meta: { total_count: number };
  items: TCourseDetailPage[];
};
