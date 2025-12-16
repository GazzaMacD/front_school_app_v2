import type { Route } from "./+types/learning-experiences-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import {
  getTitle,
  getDesc,
  fetchWithMeta,
  getDateStringWithDays,
} from "~/common/utils";
import { BlogCard, StaffRoundPicCard } from "~/components/cards";
import { Swoosh1 } from "~/components/swooshes";
import { SimpleImageGallery } from "~/components/galleries";
import {
  FaRegCalendar,
  FaRegHandPointRight,
  FaYenSign,
  FaRegClock,
  FaInfo,
} from "react-icons/fa6";
import { HeadingOne } from "~/components/headings";
import galleryStyles from "~/styles/components/galleries.css?url";
import cardStyles from "~/styles/components/cards.css?url";
import type {
  TDetailMeta,
  TImageFrag,
  TAltFullImage,
  TSimpleImageBlock,
} from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: cardStyles,
  },
  {
    rel: "stylesheet",
    href: galleryStyles,
  },
];

function getValidPrices(prices: TLearnExpPrice[]): TLearnExpPrice[] {
  const now = new Date().getTime();
  const validPrices = prices.filter((price) => {
    const startDate = new Date(price.start_date).getTime();
    const endDate = price.end_date ? new Date(price.end_date).getTime() : null;
    if (startDate > now) return false;
    if (endDate && endDate < now) return false;
    return true;
  });
  return validPrices;
}

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const learnExpUrl = `${BASE_API_URL}/pages/?slug=${slug}&type=products.LearningExperienceDetailPage&fields=*`;

  const learnExpDetailPageResult =
    await fetchWithMeta<TLearnExpDetailPageResult>({
      url: learnExpUrl,
      options: undefined,
    });

  //error
  if (!learnExpDetailPageResult.success) {
    console.error(
      "Learning Experience Detail page failed:",
      learnExpDetailPageResult.error
    );
    throw new Response("Sorry that is an error", {
      status: learnExpDetailPageResult.status,
    });
  }

  //success
  return {
    page: learnExpDetailPageResult.data.items[0],
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function LearningExperiencesDetail({
  loaderData,
}: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  const dateString = getDateStringWithDays(page.start_date, page.end_date);
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: `${page.display_title} - Learning Experience`,
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.display_tagline, isHome: false })}
      />
      {/* Meta tags END*/}

      <header className="le-dp-header">
        <div className="g-basic-container">
          <div className="le-dp-header__titles">
            <h1>
              {page.display_title}
              <span>{page.title}</span>
            </h1>
            <p>{page.display_tagline}</p>
            <div>
              <FaRegCalendar />
              {dateString}
            </div>
          </div>
        </div>
        <div className="le-dp-header__img-wrapper">
          <img
            src={`${base_back_url}${page.header_image.medium.src}`}
            alt={page.header_image.medium.alt}
          />
        </div>
      </header>

      <section id="will-do">
        <div className="g-narrow-container">
          <HeadingOne
            enText="What will we do?"
            jpText="何をするか"
            align="center"
            bkground="light"
            level="h2"
          />
          <div
            className="text-container"
            dangerouslySetInnerHTML={{ __html: page.will_do }}
          />
        </div>
      </section>

      <section id="teachers">
        <div className="g-basic-container">
          <HeadingOne
            enText="Who are your teachers?"
            jpText="担当の講師"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <div className="le-dp-teachers">
          {page.staff_members.map((member) => {
            return (
              <div className="le-dp-teacher" key={member.id}>
                <StaffRoundPicCard
                  url={`/staff/${member.staff.slug}`}
                  src={`${base_back_url}${member.staff.image.thumbnail.src}`}
                  alt={member.staff.image.thumbnail.alt}
                  name={member.staff.name}
                  tagline={member.staff.tagline}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section id="past-photos">
        <div className="g-narrow-container">
          <HeadingOne
            enText="Past Pictures"
            jpText="過去の写真"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <SimpleImageGallery images={page.past_photos} baseUrl={base_back_url} />
      </section>

      <section id="details">
        <div className="g-narrow-container">
          <HeadingOne
            enText="Experience Details"
            jpText="エクスペリエンスの詳細"
            align="center"
            bkground="light"
            level="h2"
          />
          {page.details.map((block) => {
            if (block.type === "limited_rich_text_block") {
              return (
                <div
                  key={block.id}
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            }
            if (block.type === "schedule_block") {
              const hasDate: boolean = block.value.schedule.some(
                (item) => item.date
              );
              return (
                <div key={block.id}>
                  <h4>スケジュール</h4>
                  {block.value.intro && <p>{block.value.intro}</p>}
                  <table className="le-dp-details__schedule-table">
                    <thead>
                      {hasDate ? (
                        <tr>
                          <th className="date">
                            <div>
                              <span>
                                <FaRegCalendar /> Date
                              </span>
                            </div>
                          </th>
                          <th className="time">
                            <div>
                              <span>
                                <FaRegClock /> Time
                              </span>
                            </div>
                          </th>
                          <th className="info">
                            <div>
                              <span>
                                <FaInfo /> Information
                              </span>
                            </div>
                          </th>
                        </tr>
                      ) : (
                        <tr>
                          <th className="time">
                            <div>
                              <FaRegClock /> Time
                            </div>
                          </th>
                          <th className="info">
                            <div>
                              <FaInfo /> Information
                            </div>
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {block.value.schedule.map((row) => {
                        return (
                          <tr key={row.detail.slice(0, 12)}>
                            {hasDate && <td className="date">{row?.date}</td>}
                            <td className="time">{row.time.slice(0, 5)}</td>
                            <td className="info">{row.detail}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
          })}
          <div className="le-dp-details__prices">
            <h4>料金</h4>
            <table className="le-dp-details__price-table">
              <thead>
                <tr>
                  <th className="choice">
                    <span>
                      <FaRegHandPointRight /> Option
                    </span>
                  </th>
                  <th className="price">
                    <span>
                      <FaYenSign /> Price
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getValidPrices(
                  page.learning_experience.product_service.prices
                ).map((price) => {
                  return (
                    <tr key={price.id}>
                      <td>{price.display_name}</td>
                      <td>
                        ￥{price.posttax_price} <span>(税込)</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ul></ul>
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
          className="le-dp-access__map"
          dangerouslySetInnerHTML={{ __html: page.display_map }}
        />
        {page.address && (
          <div className="g-basic-container">
            <div className="le-dp-access__contact">
              <p>
                {page.address.postal_code} {page.address.city_town_village}{" "}
                {page.address.line_two} {page.address.line_one}{" "}
                {page.address.name}
              </p>
              <p>TEL: 0561-42-5707</p>
              <p>
                メールアドレス:{" "}
                <a href="mailto:contact@xlingual.co.jp">
                  contact@xlingual.co.jp
                </a>
              </p>
            </div>
          </div>
        )}
      </section>

      <section id="related-lessons">
        <div className="g-grid-container1">
          <div className="le-dp-related__heading">
            <h2>あなたへのおすすめ記事</h2>
          </div>
          {page.related_lessons.map((item, i) => {
            const lesson = item.lesson;
            return (
              <BlogCard
                key={lesson.id}
                i={`item${i}`}
                slug={lesson.slug}
                src={`${base_back_url}/${lesson.image.thumbnail.src}`}
                alt={lesson.image.thumbnail.alt}
                date={lesson.published_date}
                title={lesson.display_title}
                category={lesson.category}
              />
            );
          })}
        </div>
      </section>

      <Swoosh1 swooshColor="beige" backColor="white" />
    </>
  );
}

/**
 * Types
 */
type TRelatedLesson = {
  id: number;
  meta: { type: string };
  lesson: {
    id: number;
    title: string;
    display_title: string;
    published_date: string;
    display_tagline: string;
    slug: string;
    category: {
      name: string;
      ja_name: string;
      slug: string;
    };
    image: TOrigThumbImage;
  };
};
type TLearnExpPrice = {
  id: number;
  name: string;
  display_name: string;
  pretax_price: string;
  posttax_price: string;
  start_date: string; // ISO date
  is_limited_sale: boolean;
  before_sale_pretax_price: string | null;
  before_sale_posttax_price: string | null;
  end_date: string | null;
};

type TOrigThumbImage = {
  id: number;
  title: string;
  original: TImageFrag;
  thumbnail: TImageFrag;
};

type TStaff = {
  id: number;
  meta: { type: string };
  staff: {
    id: number;
    name: string;
    tagline: string;
    slug: string;
    image: TOrigThumbImage;
  };
};

type TSchduleDate = {
  date: string | null;
  time: string;
  detail: string;
};
type TScheduleBlock = {
  type: "schedule_block";
  value: {
    title: string;
    intro: string;
    schedule: TSchduleDate[];
  };
  id: string;
};
type TLimitedTextBlock = {
  type: "limited_rich_text_block";
  value: string;
  id: string;
};

type TLearnExpDetails = TScheduleBlock | TLimitedTextBlock;

type TLearnExpDetailPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  display_tagline: string;
  learning_experience: {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    product_service: {
      id: number;
      name: string;
      tax_rate: number;
      prices: TLearnExpPrice[];
    };
  };
  header_image: TAltFullImage;
  start_date: string;
  end_date: string;
  will_do: string;
  staff_members: TStaff[];
  past_photos: TSimpleImageBlock[];
  details: TLearnExpDetails[];
  display_map: string; //iframe src
  address: {
    id: number;
    name: string;
    display_name: string;
    line_one: string;
    line_two: string;
    city_town_village: string;
    postal_code: string;
    country: string;
  };
  related_lessons: TRelatedLesson[];
};

type TLearnExpDetailPageResult = {
  meta: { total_count: number };
  items: TLearnExpDetailPage[];
};
