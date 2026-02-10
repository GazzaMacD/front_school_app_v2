import { data, Link } from "react-router";
import { BsGlobe2, BsEmojiGrimace, BsPersonLock } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { IoInformation } from "react-icons/io5";
import { LuWholeWord } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";

import { BASE_API_URL, OW_API_KEY, WN_API_KEY } from "~/.server/env";
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
  // api urls
  const blogsApiUrl = `${BASE_API_URL}/pages?order=-published_date&limit=8&type=lessons.LessonDetailPage&fields=_,id,slug,display_title,published_date,type`;
  const dadJokeApiUrl = "https://icanhazdadjoke.com/";
  const newsApiUrl = `${BASE_API_URL}/pages/?order=-published_date&limit=8&type=news.NewsDetailPage&fields=display_title,message,published_date`;
  const dadJokeOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const wordNikApiUrl = `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${WN_API_KEY}`;
  const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=35.183333&lon=136.9&units=metric&appid=${OW_API_KEY}`;
  // fetch all
  const [newsData, blogData, dadJokeData, wordNikData, openWeatherData] =
    await Promise.all([
      fetchWithMeta<TNewsData>({ url: newsApiUrl, options: undefined }),
      fetchWithMeta<TBlogData>({ url: blogsApiUrl, options: undefined }),
      fetchWithMeta<TDadJoke>({ url: dadJokeApiUrl, options: dadJokeOptions }),
      fetchWithMeta<TWordNik>({ url: wordNikApiUrl, options: undefined }),
      fetchWithMeta<TWeatherResponse>({
        url: openWeatherApiUrl,
        options: undefined,
      }),
    ]);
  //
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
  // News Dates
  let xlNews;
  if (newsData.success) {
    xlNews = newsData.data.items.map((item) => {
      const date = new Date(item.published_date);
      const dateString = `${date.getFullYear()}.${
        date.getMonth() + 1
      }.${date.getDate()}`;
      item.published_date = dateString;
      return item;
    });
  }
  return {
    blogData,
    xlNews,
    dadJokeData,
    wordNikData,
    openWeatherData,
  };
}
/**
 *Page
 */

export default function MyPageIndex({ loaderData }: Route.ComponentProps) {
  const { blogData, xlNews, dadJokeData, wordNikData, openWeatherData } =
    loaderData;

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
            {xlNews &&
              xlNews.map((item) => (
                <NewsItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  message={item.message}
                  published_date={item.published_date}
                  news_type={item.news_type}
                />
              ))}
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

        <section id="weather" className="mpg-widget mp-in-weather">
          <h2 className="mpg-widget__heading">
            <span>
              <TiWeatherPartlySunny />
            </span>
            Nagoya Weather in English
          </h2>
          <div className="mpg-widget__content1">
            {openWeatherData.success ? (
              <WeatherItem
                weather={openWeatherData.data.weather[0]}
                main={openWeatherData.data.main}
                wind={openWeatherData.data.wind}
                sys={openWeatherData.data.sys}
              />
            ) : (
              <WidgetError />
            )}
          </div>
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
type TNewsItemProps = {
  id: number;
  title: string;
  published_date: string;
  news_type: "public" | "private";
  message: string;
};
function NewsItem({
  published_date,
  title,
  message,
  news_type,
}: TNewsItemProps) {
  return (
    <div className="mp-in-news__item">
      <p>{published_date}</p>
      <div>
        {news_type === "public" ? <BsGlobe2 /> : <BsPersonLock />}
        <h3>{title}</h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: message }} />
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

// WeatherItem
const weatherCodes: Record<string, string> = {
  "200": "thunderstorm with light rain",
  "201": "thunderstorm with rain",
  "202": "thunderstorm with heavy rain",
  "210": "light thunderstorm",
  "211": "thunderstorm",
  "212": "heavy thunderstorm",
  "221": "ragged thunderstorm",
  "230": "thunderstorm with light drizzle",
  "231": "thunderstorm with drizzle",
  "232": "thunderstorm with heavy drizzle",
  "300": "light intensity drizzle",
  "301": "drizzle",
  "302": "heavy intensity drizzle",
  "310": "light intensity drizzle rain",
  "311": "drizzle rain",
  "312": "heavy intensity drizzle rain",
  "313": "shower rain and drizzle",
  "314": "heavy shower rain and drizzle",
  "321": "shower drizzle",
  "500": "light rain",
  "501": "moderate rain",
  "502": "heavy intensity rain",
  "503": "very heavy rain",
  "504": "extreme rain",
  "511": "freezing rain",
  "520": "light intensity shower rain",
  "521": "shower rain",
  "522": "heavy intensity shower rain",
  "531": "ragged shower rain",
  "600": "light snow",
  "601": "snow",
  "602": "heavy snow",
  "611": "sleet",
  "612": "light shower sleet",
  "613": "shower sleet",
  "615": "light rain and snow",
  "616": "rain and snow",
  "620": "light shower snow",
  "621": "shower snow",
  "622": "heavy shower snow",
  "701": "mist",
  "711": "smoke",
  "721": "haze",
  "731": "sand/dust whirls",
  "741": "fog",
  "751": "sand",
  "761": "dust",
  "762": "volcanic ash",
  "771": "squalls",
  "781": "tornado",
  "800": "clear sky",
  "801": "few clouds (11-25% cloudcover)",
  "802": "scattered clouds (25-50% cloudcover)",
  "803": "broken clouds (51-84% cloudcover)",
  "804": "overcast clouds (85-100% cloudcover)",
};

type TDirection =
  | "north"
  | "northeast"
  | "east"
  | "southeast"
  | "south"
  | "southwest"
  | "west"
  | "northwest";

const directions: readonly TDirection[] = [
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
  "northwest",
] as const;

const degreeToDirectionMap: Record<number, TDirection> = {};

for (let degree = 0; degree <= 360; degree++) {
  const index = Math.floor(((degree + 22.5) % 360) / 45);
  degreeToDirectionMap[degree] = directions[index];
}

function utcToJstTime(utcSeconds: number) {
  const event = new Date((utcSeconds + 9 * 60 * 60) * 1000);
  return event.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });
}
function andOrBut(temp: number, feel: number) {
  if (temp == feel) return "and";
  return "but";
}

type TWeatherItemProps = {
  weather: TWeather;
  main: TMain;
  wind: TWind;
  sys: TSys;
};

function WeatherItem({ weather, main, wind, sys }: TWeatherItemProps) {
  return (
    <div className="mp-in-weather__inner">
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={`${weather.description}`}
        />
      </div>
      <p>
        The current condition is {weatherCodes[String(weather.id)]}. The
        temperature is {Math.round(main.temp)}°C{" "}
        {andOrBut(Math.round(main.temp), Math.round(main.feels_like))} feels
        like {Math.round(main.feels_like)}°C. The humidity is currently{" "}
        {main.humidity}%. The wind is blowing from the{" "}
        {degreeToDirectionMap[Math.round(wind.deg)]} at {wind.speed}m/s with
        gusts of {wind.gust} m/s. Today, sunrise is at{" "}
        {utcToJstTime(sys.sunrise)} and sunset is at {utcToJstTime(sys.sunset)}.
      </p>
    </div>
  );
}

/*
 *
 */

/*
 * Types
 */
// News Item
type TNewsItem = {
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
  published_date: string; //iso date
  news_type: "public" | "private";
  message: string;
};
type TNews = TNewsItem[];
type TNewsData = {
  meta: { total_count: number };
  items: TNews;
};

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
  meta: { total_count: number };
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

// OpenWeather Types

type TCoord = {
  lon: number;
  lat: number;
};

type TWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type TMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type TWind = {
  speed: number;
  deg: number;
  gust: number;
};

type TClouds = {
  all: number;
};

type TSys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type TWeatherResponse = {
  coord: TCoord;
  weather: TWeather[];
  base: string;
  main: TMain;
  visibility: number;
  wind: TWind;
  clouds: TClouds;
  dt: number;
  sys: TSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
