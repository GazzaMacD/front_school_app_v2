import * as React from "react";
import { Link } from "react-router";

import type { Route } from "./+types/blog-lessons-index";
import { SlidingHeaderPage } from "~/components/pages";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import pageStyles from "~/styles/components/pages.css?url";
import { BLOG_LESSONS_LIMIT, BLOG_LESSONS_OFFSET } from "~/app-config";
import { FaArrowRightLong } from "react-icons/fa6";

import type { TAltFullImage } from "~/common/types";

/**
 * Helpers
 */
const pageDesc =
  "すべてのXlingualブログレッスンの一覧ページには、カテゴリーボタンがあり、簡単に記事を並べ替えることができます。";
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pageStyles,
  },
];

function deDuplicateLessons(lessons: TLearningBlogs): TLearningBlogs {
  const lessonTracker: { [key: string]: "exists" } = {};
  const deDuplicated = lessons.filter((lesson) => {
    if (lessonTracker.hasOwnProperty(String(lesson.id))) {
      return false;
    }
    lessonTracker[String(lesson.id)] = "exists";
    return true;
  });
  return deDuplicated;
}

/**
 * Loaders and Actions
 */

export async function loader({ request }: Route.LoaderArgs) {
  const listPageUrl = `${BASE_API_URL}/pages/?type=lessons.LessonListPage&fields=_,title,display_title`;
  const blogCategoriesUrl = `${BASE_API_URL}/lesson-categories/`;

  //fetch listpage and categories
  const [listPageResult, blogCategoriesResult] = await Promise.all([
    fetchWithMeta<TBlogListPageResult>({
      url: listPageUrl,
      options: undefined,
    }),
    fetchWithMeta<TBlogCategoriesResult>({
      url: blogCategoriesUrl,
      options: undefined,
    }),
  ]);

  //errors
  if (!listPageResult.success) {
    console.error("Blog Lessons List page failed:", listPageResult.error);
    throw new Response("Sorry that is an error", {
      status: listPageResult.status,
    });
  }
  if (!blogCategoriesResult.success) {
    console.error(
      "Blog categories request failed:",
      blogCategoriesResult.error
    );
    throw new Response("Sorry that is an error", {
      status: blogCategoriesResult.status,
    });
  }

  //success
  const listPage = listPageResult.data.items[0];
  let categories = blogCategoriesResult.data;

  /*
   * Get blogs list
   */
  const category = new URL(request.url).searchParams.get("category");
  const page = new URL(request.url).searchParams.get("page");
  let blogsUrl = `${BASE_API_URL}/pages/?order=-published_date&type=lessons.LessonDetailPage&fields=_,id,slug,display_title,display_tagline,published_date,title,header_image,category&limit=${BLOG_LESSONS_LIMIT}`;

  // Get category and compose url accordingly
  categories = [
    ...[{ id: 0, name: "All", ja_name: "全レッスン", slug: "" }],
    ...blogCategoriesResult.data,
  ];
  const filtered = categories.filter((c) => c.ja_name === category);
  const selectedCategory = filtered.length ? filtered[0] : categories[0];
  blogsUrl = filtered.length
    ? blogsUrl + `&category=${selectedCategory.id}`
    : blogsUrl;

  // Determine if page number is coming from load more on list page & if not then reset page number to 1
  const referer = request.headers.get("referer");
  const isFromListPage = Boolean(
    referer && new URL(referer).pathname.includes("blog-lessons")
  );
  const pageNumber =
    isFromListPage &&
    page &&
    !Number.isNaN(Number.parseInt(page)) &&
    Number.parseInt(page) > 1
      ? Number.parseInt(page)
      : 1;

  // Recompose blogDetailUrl with offset if needed
  blogsUrl =
    pageNumber > 1
      ? blogsUrl + `&offset=${(pageNumber - 1) * BLOG_LESSONS_OFFSET}`
      : blogsUrl;

  // Fetch blogs
  const learningBlogsResult = await fetchWithMeta<TLearningBlogsResult>({
    url: blogsUrl,
    options: undefined,
  });

  //errors
  if (!learningBlogsResult.success) {
    console.error(
      "Blog Lessons fetch on Blog lessons List page failed:",
      learningBlogsResult.error
    );
    throw new Response("Sorry that is an error", {
      status: learningBlogsResult.status,
    });
  }

  // success
  const learningBlogs = learningBlogsResult.data.items;
  const totalBlogs = learningBlogsResult.data.meta.total_count;

  return {
    categories,
    selectedCategory,
    listPage,
    learningBlogs,
    totalBlogs,
    base_back_url: BASE_BACK_URL,
    pageNumber,
    limit: BLOG_LESSONS_LIMIT,
  };
}

/**
 * Page
 */

export default function BlogLessonsIndex({ loaderData }: Route.ComponentProps) {
  const {
    categories,
    selectedCategory,
    listPage,
    learningBlogs,
    totalBlogs,
    base_back_url,
    pageNumber,
    limit,
  } = loaderData;

  const [lessons, setLessons] = React.useState<TLearningBlogs>(learningBlogs);
  const [currentCategory, setCurrentCategory] =
    React.useState<TBlogCategory>(selectedCategory);
  const [loadMore, setLoadMore] = React.useState(false);
  const currentLessonCount = lessons.length;
  const totalPages = Math.ceil(totalBlogs / limit);

  /* === Effects === */
  // set page and blog lessons
  React.useEffect(() => {
    const previousPage = Number(sessionStorage.getItem("previous-page"));
    if (!previousPage) {
      sessionStorage.setItem("previous-page", String(pageNumber));
      return;
    }
    if (previousPage === pageNumber) return;
    setLessons((old) => deDuplicateLessons([...old, ...learningBlogs]));
    sessionStorage.setItem("previous-page", String(pageNumber));
    setLoadMore(false);
  }, [loadMore, pageNumber, learningBlogs]);

  React.useEffect(() => {
    if (currentCategory.id !== selectedCategory.id) {
      setCurrentCategory(() => selectedCategory);
      setLessons(() => learningBlogs);
    }
  }, [
    selectedCategory.id,
    currentCategory.id,
    selectedCategory,
    learningBlogs,
  ]);

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: `${listPage.title}・${listPage.display_title}`,
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: pageDesc, isHome: false })}
      />
      {/* Meta tags END*/}
      <SlidingHeaderPage
        mainTitle={listPage.title}
        subTitle={listPage.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <section className="bl-lp-cats-wrapper">
          <div className="bl-lp-cats-wrapper__inner">
            <div className="bl-lp-cats-aside">カテゴリで絞り込む</div>
            <div className="bl-lp-cats">
              {categories.map((category, i) => {
                if (i === 0) {
                  return (
                    <Link
                      to="/blog-lessons"
                      className={`bl-lp-cat ${
                        currentCategory.id === 0 ? "bl-lp-cat--active" : ""
                      }`}
                      key={category.id}
                    >
                      {category.ja_name}
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      to={`/blog-lessons?category=${category.ja_name}`}
                      key={category.id}
                      className={`bl-lp-cat ${
                        currentCategory.id === category.id
                          ? "bl-lp-cat--active"
                          : ""
                      }`}
                    >
                      {category.ja_name}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </section>

        <section id="posts">
          <div className="bl-lp-posts">
            <div className="g-grid-container1">
              {lessons.length
                ? lessons.map((lesson, i) => {
                    const pubDate = new Date(lesson.published_date);
                    const n = i % 2;
                    return (
                      <div
                        key={lesson.id}
                        className={`bl-lp-post-wrapper t${n}`}
                      >
                        <Link
                          to={lesson.meta.slug}
                          className="bl-lp-post-link"
                          target="_blank"
                        >
                          <article className="bl-lp-post">
                            <div className="bl-lp-post__img-wrapper">
                              <img
                                src={`${base_back_url}${lesson.header_image.thumbnail.src}`}
                                alt={lesson.header_image.title}
                              />
                              <div className="bl-lp-post__overlay">
                                <p>Let's learn!</p>
                                <p>勉強しよう</p>
                                <FaArrowRightLong />
                              </div>
                            </div>
                            <div className="bl-lp-post__details">
                              <p>
                                {`${pubDate.getFullYear()}.${
                                  pubDate.getMonth() + 1
                                }.${pubDate.getDate()}`}{" "}
                                <span>[ {lesson.category.ja_name} ]</span>
                              </p>
                              <h3>{lesson.display_title}</h3>
                            </div>
                          </article>
                        </Link>
                      </div>
                    );
                  })
                : null}
            </div>
            {pageNumber < totalPages ? (
              <>
                <p className="bl-lp-post__see-more-count">
                  {totalBlogs}投稿中{currentLessonCount}投稿を表示
                </p>
                <Link
                  to={`/blog-lessons?page=${pageNumber + 1}${
                    currentCategory.id === 0
                      ? ""
                      : "&category=" + currentCategory.ja_name
                  }`}
                  onClick={() => setLoadMore(true)}
                  preventScrollReset
                  className="bl-lp-post__see-more-btn"
                >
                  もっと見る
                </Link>
              </>
            ) : null}
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}

/**
 * Types
 */

type TBlogLessonsListPage = {
  title: string;
  display_title: string;
};

type TBlogListPageResult = {
  meta: { total_count: number };
  items: TBlogLessonsListPage[];
};

//blogResult
type TLearningBlog = {
  id: number;
  meta: { slug: string };
  title: string;
  header_image: TAltFullImage;
  display_title: string;
  display_tagline: string;
  published_date: string; //iso date string
  category: TBlogCategory;
};
type TLearningBlogs = TLearningBlog[];
type TLearningBlogsResult = {
  meta: { total_count: number };
  items: TLearningBlogs;
};

type TBlogCategory = {
  id: number;
  name: string;
  ja_name: string;
  slug: string;
};
type TBlogCategoriesResult = TBlogCategory[];
