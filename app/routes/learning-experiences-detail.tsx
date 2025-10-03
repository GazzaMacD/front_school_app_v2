import type { Route } from "./+types/learning-experiences-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import {
  getTitle,
  getDesc,
  fetchWithMeta,
  getDateStringWithDays,
  getDivisor4LetterHash,
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
  TYoutubeBlock,
  TConversationBlock,
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
    await fetchWithMeta<TLearnExpDetailPageResult>(learnExpUrl);

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
  return <div>page here</div>;
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
    name: number;
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
  type: string;
  value: {
    title: string;
    intro: string;
    schedule: TSchduleDate[];
  };
  id: string;
};
type TLearnExpDetails = TScheduleBlock;

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
