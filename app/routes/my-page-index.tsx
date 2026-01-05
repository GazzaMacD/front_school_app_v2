import { data, Link } from "react-router";
import { BsGlobe2, BsEmojiGrimace, BsPersonLock } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { IoInformation } from "react-icons/io5";
import { LuWholeWord } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";

import { BASE_API_URL, WN_API_KEY } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import myPageIndexStyles from "~/styles/mypage-index.css?url";
// type imports
import type { Route } from "./+types/my-page-index";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: myPageIndexStyles,
  },
];

/**
 * Loaders
 */
export async function loader({ context }: Route.LoaderArgs) {
  let xlNews: TNewsItem[] = [
    {
      id: 1,
      title: "Wine Tasting Learning Experience",
      content:
        "We will be having a wine tasting experiences at Hanamizukidori School on Saturday, 12 February 2026 from 8:00pm ~ 10:00pm. Please check this page for details and we hope to see you there.",
      type: "public",
      published_date: "2025-12-06T03:28:00Z",
    },
    {
      id: 2,
      title: "New School Year Calender",
      content:
        "We have released the school year calendar for 2025/2026. Please check this link to see the pdf. You can download it if you would like.",
      type: "student",
      published_date: "2025-12-14T03:28:00Z",
    },
    {
      id: 3,
      title: "Friend Introduction Campaign",
      content:
        "We are doing a freind introduction campaign. It starts from March 1, 2026. Details are on this link.",
      type: "public",
      published_date: "2025-12-28T03:28:00Z",
    },
  ];
  // api urls
  const blogsApiUrl = `${BASE_API_URL}/pages?order=-published_date&limit=8&type=lessons.LessonDetailPage&fields=_,id,slug,display_title,published_date,type`;
  const dadJokeApiUrl = "https://icanhazdadjoke.com/";
  const dadJokeOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const wordNikApiURL = `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${WN_API_KEY}`;
  // fetch all
  const [blogData, dadJokeData, wordNikData] = await Promise.all([
    fetchWithMeta<TBlogData>({ url: blogsApiUrl, options: undefined }),
    fetchWithMeta<TDadJoke>({ url: dadJokeApiUrl, options: dadJokeOptions }),
    fetchWithMeta<TWordNik>({ url: wordNikApiURL, options: undefined }),
  ]);
  //wordNik
  console.dir(wordNikData, { depth: null });
  //Blog Dates
  if (blogData.success) {
    const blogsWithDate = blogData.data.items.map((blog) => {
      const date = new Date(blog.published_date);
      const dateString = `${date.getFullYear()}.${
        date.getMonth() + 1
      }.${date.getDate()}`;
      blog.date = dateString;
      return blog;
    });
    blogData.data.items = blogsWithDate;
  }
  xlNews = xlNews.map((item) => {
    const date = new Date(item.published_date);
    const dateString = `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}`;
    item.published_date = dateString;
    return item;
  });
  return {
    blogData,
    xlNews,
    dadJokeData,
    wordNikData,
  };
}

export default function MyPageIndex({ loaderData }: Route.ComponentProps) {
  const { blogData, xlNews, dadJokeData, wordNikData } = loaderData;
  return (
    <>
      {/* Meta tags*/}
      <title>{getTitle({ title: "My Page・マイページ", isHome: false })}</title>

      <div className="mp-in-wrapper">
        <section id="blog-lessons" className="mpg-widget mp-in-blogs">
          <h2 className="mpg-widget__heading">
            <span>
              <TfiWrite />
            </span>
            Latest Blog Lessons
          </h2>
          <div className="mpg-widget__content1">
            {blogData.success ? (
              blogData.data.items.map((blog) => (
                <BlogItem
                  key={blog.id}
                  title={blog.display_title}
                  slug={blog.meta.slug}
                  date={blog.date}
                />
              ))
            ) : (
              <WidgetError />
            )}
          </div>
        </section>

        <section id="xl-news" className="mpg-widget mp-in-news">
          <h2 className="mpg-widget__heading">
            <span>
              <IoInformation />
            </span>
            XLingual News
          </h2>
          <div className="mpg-widget__content1">
            {xlNews.map((item) => (
              <NewsItem
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                published_date={item.published_date}
                type={item.type}
              />
            ))}
          </div>
        </section>

        <section id="joke" className="mpg-widget mp-in-joke">
          <h2 className="mpg-widget__heading">
            <span>
              <FaRegFaceLaughSquint />
            </span>
            Random Dad Joke
          </h2>
          <div className="mpg-widget__content1">
            {dadJokeData.success ? (
              <h5>"{dadJokeData.data.joke}"</h5>
            ) : (
              <WidgetError />
            )}
          </div>
        </section>

        <section id="word" className="mpg-widget mp-in-word">
          <h2 className="mpg-widget__heading">
            <span>
              <LuWholeWord />
            </span>
            English Word of the Day
          </h2>
          <div className="mpg-widget__content1">
            {wordNikData.success ? (
              <WordOfTheDay
                word={wordNikData.data.word}
                definitions={wordNikData.data.definitions}
                examples={wordNikData.data.examples}
                note={wordNikData.data.note}
              />
            ) : (
              <WidgetError />
            )}
          </div>
        </section>

        <section id="weather" className="mpg-widget mp-in-weather">
          <h2 className="mpg-widget__heading">
            <span>
              <TiWeatherPartlySunny />
            </span>
            Nagoya Weather in English
          </h2>
          <div className="mpg-widget__content1"></div>
        </section>
      </div>
    </>
  );
}

/**
 * Components
 */
// Blog Item
type TBlogItem = {
  date: string;
  title: string;
  slug: string;
};

function BlogItem({ date, title, slug }: TBlogItem) {
  return (
    <Link to={`/blog-lessons/${slug}`} className="mp-in-blogs__item">
      <div>
        <p>{date}</p>
        <h3>{title}</h3>
      </div>
    </Link>
  );
}

// Widget Item
function WidgetError() {
  return (
    <div className="mpg-widget__error">
      <BsEmojiGrimace />
      <p> Sorry, there is a problem with this widget</p>
    </div>
  );
}

// News Item
type TNewsItem = {
  id: number;
  title: string;
  content: string;
  published_date: string;
  type: "public" | "student";
};
function NewsItem({ published_date, title, content, type }: TNewsItem) {
  return (
    <div className="mp-in-news__item">
      <p>{published_date}</p>
      <div>
        {type === "public" ? <BsGlobe2 /> : <BsPersonLock />}
        <h3>{title}</h3>
      </div>
      <p>{content}</p>
    </div>
  );
}

// WordNikItem
type TWordOfTheDayProps = {
  word: string;
  note: string;
  definitions: TWordNikDef[];
  examples: TWordNikExample[];
};
function WordOfTheDay({
  word,
  note,
  definitions,
  examples,
}: TWordOfTheDayProps) {
  return (
    <div>
      <h4>{word}</h4>
      {definitions.length ? (
        <div>
          <h5>Defintion</h5>
          <p>
            [<i>{definitions[0].partOfSpeech}</i>]&nbsp;
            {definitions[0].text}
          </p>
        </div>
      ) : null}
      {examples.length ? (
        <div>
          <h5>Examples</h5>
          {examples.map((example) => (
            <div key={example.url}>
              <blockquote cite={example.url}>
                <p>{example.text}</p>
              </blockquote>
              <p>
                <cite>{example.title}</cite>
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {note ? (
        <div>
          <h5>Note</h5>
          <p>Note: {note}</p>
        </div>
      ) : null}
    </div>
  );
}

/*
 * Types
 */

type TBlog = {
  id: number;
  meta: {
    type: string;
    slug: string;
  };
  display_title: string;
  published_date: string;
  date: string;
};
type TBlogs = TBlog[];
type TBlogData = {
  meta: { total_count: 93 };
  items: TBlogs;
};
type TDadJoke = {
  id: string;
  joke: string;
  status: number;
};

//WORDNIK
type TWordNikDef = {
  text: string;
  partOfSpeech: string;
  source: "century";
  note: string | null;
};
type TWordNikExample = {
  url: string;
  text: string;
  title: string;
  id: number;
};

type TWordNik = {
  _id: string;
  word: string;
  publishDate: string; // iso datetime string
  contentProvider: { name: "wordnik"; id: 711 };
  note: string;
  htmlExtra: string | null;
  pdd: string;
  definitions: TWordNikDef[];
  examples: TWordNikExample[];
};
