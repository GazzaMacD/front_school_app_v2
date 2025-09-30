import type { Route } from "./+types/testimonials-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { Swoosh1 } from "~/components/swooshes";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import type { TDetailMeta, TFullImage, TYoutubeBlock } from "~/common/types";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const testApiUrl = `${BASE_API_URL}/pages/?type=testimonials.TestimonialDetailPage&slug=${slug}&fields=*`;
  const testDetailPageResult = await fetchWithMeta<TTestDetailPageResult>(
    testApiUrl
  );

  //error
  if (!testDetailPageResult.success) {
    console.error(
      "Testimonial Detail page failed:",
      testDetailPageResult.error
    );
    throw new Response("Sorry that is an error", {
      status: testDetailPageResult.status,
    });
  }

  //success
  return {
    page: testDetailPageResult.data.items[0],
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function TestimonialDetail({
  loaderData,
}: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `${page.customer_name}`, isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.comment, isHome: false })}
      />
      {/* Meta tags END*/}
    </>
  );
}

/**
 * Types
 */
type TTestDetailPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  customer_name: string;
  customer_square_image: TFullImage;
  customer_portrait_image: TFullImage;
  occupation: string;
  organization_name: string;
  organization_url: string;
  published_date: string; // ISO date
  comment: string;
  customer_interview: TYoutubeBlock[];
};

type TTestDetailPageResult = {
  meta: { total_count: number };
  items: TTestDetailPage[];
};
