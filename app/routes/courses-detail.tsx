import type { Route } from "./+types/courses-detail";
import { BsFillBarChartFill, BsGlobe, BsJournalText } from "react-icons/bs";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { HeadingOne } from "~/components/headings";
import { Swoosh1 } from "~/components/swooshes";
import { DetailLinkCard } from "~/components/cards";
import { ClassPricePlanTable } from "~/components/prices";
import pricesStyles from "~/styles/components/prices.css?url";
import { fetchWithMeta } from "~/common/utils";
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
  return <div>Detail page with title & desc here</div>;
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
