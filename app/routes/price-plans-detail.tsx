import type { Route } from "./+types/price-plans-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import { Swoosh1 } from "~/components/swooshes";
import type { TDetailMeta, TFullImage, TRichTextBlock } from "~/common/types";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const priceDetailUrl = `${BASE_API_URL}/pages/?slug=${slug}&type=products.ClassPricesDetailPage&fields=*`;
  const priceDetailPageResult = await fetchWithMeta<TPriceDetailPageResult>(
    priceDetailUrl
  );

  //error
  if (!priceDetailPageResult.success) {
    console.error("Price Detail page failed:", priceDetailPageResult.error);
    throw new Response("Sorry that is an error", {
      status: priceDetailPageResult.status,
    });
  }

  //success
  return {
    page: priceDetailPageResult.data.items[0],
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function PricePlansDetail({ loaderData }: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  const p = page.class_service;
  const pi = page.class_service.price_info;

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: `${page.title}・${page.display_title}`,
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.display_tagline, isHome: false })}
      />
      {/* Meta tags END*/}

      <header className="pp-dp-header">
        <div className="g-basic-container">
          <div className="pp-dp-header__titles">
            <h1>
              {page.display_title}
              <span>{page.title}</span>
            </h1>
            <p>{page.display_tagline}</p>
          </div>
        </div>
        <div className="pp-dp-header__img-wrap">
          <img
            src={`${base_back_url}${page.header_image.medium.src}`}
            alt={page.header_image.medium.alt}
          />
        </div>
      </header>
    </>
  );
}

/**
 * Types
 */
type TClassPriceInfo = {
  name: string;
  display_name: string;
  pretax_price: string;
  posttax_price: string;
  is_sale: boolean;
  start_date: string; // ISO timestamp
  is_limited_sale: boolean;
  before_sale_pretax_price: string | null;
  before_sale_posttax_price: string | null;
  end_date: string | null;
};

type TClassService = {
  id: number;
  name: string;
  slug: string;
  class_type: string;
  class_type_display: string;
  min_num: number;
  max_num: number;
  length: number;
  length_unit: string;
  quantity: number;
  quantity_unit: string;
  is_native: boolean;
  is_online: boolean;
  is_inperson: boolean;
  has_onlinenotes: boolean;
  bookable_online: boolean;
  price_info: TClassPriceInfo;
};

type TPriceDetailPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  class_service: TClassService;
  display_title: string;
  display_tagline: string;
  header_image: TFullImage;
  class_intro: TRichTextBlock[];
};

type TPriceDetailPageResult = {
  meta: { total_count: number };
  items: TPriceDetailPage[];
};
