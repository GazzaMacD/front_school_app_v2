import type { Route } from "./+types/courses-index";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { SlidingHeaderPage } from "~/components/pages";
import { DetailLinkCard } from "~/components/cards";
import { HeadingOne } from "~/components/headings";
import {
  getTitle,
  getDesc,
  fetchWithMeta,
  getDivisor4LetterHash,
} from "~/common/utils";
import pageStyles from "~/styles/components/pages.css?url";
import type { TFullImage, TDetailMeta } from "~/common/types";
/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pageStyles,
  },
];

function createLanguageDictionary(items: TCourses) {
  const dict: TDict = {};
  items.forEach((item) => {
    if (item.course.subject in dict) {
      if (item.course.course_category in dict[item.course.subject]) {
        dict[item.course.subject][item.course.course_category].push(item);
      } else {
        dict[item.course.subject][item.course.course_category] = [];
        dict[item.course.subject][item.course.course_category].push(item);
      }
    } else {
      dict[item.course.subject] = {};
      dict[item.course.subject][item.course.course_category] = [];
      dict[item.course.subject][item.course.course_category].push(item);
    }
  });
  return dict;
}

/**
 * Loaders and Actions
 */
export async function loader() {
  const listPageUrl = `${BASE_API_URL}/pages/?type=courses.CourseDisplayListPage&fields=*`;
  const detailPageUrl = `${BASE_API_URL}/pages/?type=courses.CourseDisplayDetailPage&fields=_,id,course,display_title,subject_slug,slug`;

  //api fetch
  const [listPageResult, detailPageResult] = await Promise.all([
    fetchWithMeta<TCourseListPage>(listPageUrl),
    fetchWithMeta<TCourseDetailPage>(detailPageUrl),
  ]);

  //error
  if (!listPageResult.success) {
    console.error("List page failed:", listPageResult.error);
    throw new Response("Sorry that is an error", {
      status: listPageResult.status,
    });
  }
  if (!detailPageResult.success) {
    console.error("Detail page failed:", detailPageResult.error);
    throw new Response("Sorry that is an error", {
      status: detailPageResult.status,
    });
  }

  // success
  const langDict = createLanguageDictionary(detailPageResult.data.items);
  return {
    listPage: listPageResult.data.items[0],
    langDict,
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function CoursesIndex({ loaderData }: Route.ComponentProps) {
  const { listPage: lp, langDict: ld, base_back_url } = loaderData;
  const popularHash = getDivisor4LetterHash(lp.popular_courses.length);
  const englishHeadings = {
    general: ["a", "日常英会話"],
    business: ["b", "ビジネス英会話"],
    testpreparation: ["c", "英語試験対策"],
    writing: ["d", "英語ライティング"],
  };
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `${lp.title}・${lp.display_title}`, isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: lp.meta.search_description, isHome: false })}
      />
      <SlidingHeaderPage
        mainTitle={lp.title}
        subTitle={lp.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <section id="popular">
          <div className="cs-lp-popular">
            <div className="g-grid-container1">
              <div className="cs-lp-popular__heading">
                <HeadingOne
                  enText={lp.popular_en_title}
                  jpText={lp.popular_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>
              {lp.popular_courses.map((c, i) => {
                return (
                  <div
                    key={c.id}
                    className={`cs-lp-popular__card ${popularHash[i]}`}
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

        <section id="english">
          <div className="cs-lp-language">
            <div className="g-grid-container1">
              <div className="cs-lp-language__heading">
                <HeadingOne
                  enText={lp.english_en_title}
                  jpText={lp.english_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>
              <div className="cs-lp-language__english">
                {Object.entries(englishHeadings).map(([k, v]) => {
                  return (
                    <div
                      key={k}
                      className={`cs-lp-language__col ${v[0]}`}
                      id={v[1]}
                    >
                      <h3>{v[1]}</h3>
                      {ld.english[k] ? (
                        ld.english[k].map((cs) => {
                          return (
                            <Link
                              key={cs.id}
                              to={`/courses/${cs.course.subject}/${cs.meta.slug}`}
                              className="cs-lp-language__link"
                            >
                              {cs.display_title}
                              <FaArrowRightLong />
                            </Link>
                          );
                        })
                      ) : (
                        <p>Coming soon</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}

/**
 * Types
 */

// List Page
type TImageCourse = {
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

type TCourseIndexPageItem = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  popular_en_title: string;
  popular_jp_title: string;
  popular_courses: TImageCourse[];
  english_en_title: string;
  english_jp_title: string;
};

type TCourseListPage = {
  meta: { total_count: number };
  items: TCourseIndexPageItem[];
};

// Detail Page
type TCourse = {
  meta: {
    slug: string;
  };
  display_title: string;
  id: number;
  course: {
    id: number;
    title_en: string;
    subject: string;
    subject_display: string;
    course_category: string;
    course_category_display: string;
  };
  subject_slug: string;
};
type TCourses = TCourse[];

type TCourseDetailPage = {
  meta: { total_count: number };
  items: TCourses;
};

// Dictionary Function
type TDict = {
  [key: string]: {
    [key: string]: TCourses;
  };
};
