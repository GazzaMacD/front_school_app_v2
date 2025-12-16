import type { Route } from "./+types/price-plans-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import { Swoosh1 } from "~/components/swooshes";
import { HeadingOne } from "~/components/headings";
import type {
  TDetailMeta,
  TFullImage,
  TRichTextBlock,
  TTextWidthImageBlock,
  TYoutubeBlock,
} from "~/common/types";
import { ClassPricePlanTable } from "~/components/prices";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const priceDetailUrl = `${BASE_API_URL}/pages/?slug=${slug}&type=products.ClassPricesDetailPage&fields=*`;
  const priceDetailPageResult = await fetchWithMeta<TPriceDetailPageResult>({
    url: priceDetailUrl,
    options: undefined,
  });

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

      <section id="about">
        <div className="g-narrow-container">
          <HeadingOne
            enText="About Plan"
            jpText="プランについて"
            align="center"
            bkground="light"
            level="h2"
          />
        </div>
        <div className="pp-dp-about__intro">
          {page.class_intro.map((block) => {
            if (block.type === "rich_text") {
              return (
                <div
                  className="g-narrow-container"
                  key={block.id}
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            } else if (block.type === "text_width_img") {
              return (
                <div key={block.id} className="g-narrow-container">
                  <figure className="pp-dp-about__img-wrapper text-width">
                    <img
                      src={`${base_back_url}${block.value.image.original.src}`}
                      alt={block.value.image.original?.alt}
                    />
                    {block.value?.caption ? (
                      <figcaption>{block.value.caption}</figcaption>
                    ) : null}
                  </figure>
                </div>
              );
            } else if (block.type === "youtube") {
              return (
                <div key={block.id}>
                  <div className="pp-dp-intro__youtube">
                    <iframe
                      className={`g-youtube-iframe ${
                        block.value.short ? "g-youtube-short" : ""
                      }`}
                      src={`${block.value.src}?modestbranding=1&controls=0&rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="pp-dp-about__price">
          <ClassPricePlanTable
            color="beige"
            showLinkButton={false}
            slug={p.slug}
            titleEn={page.title}
            titleJa={page.display_title}
            duration={p.length}
            durationUnit={p.length_unit}
            stdQuantity={p.quantity}
            stdQuantityUnit={p.quantity_unit}
            maxNum={p.max_num}
            isNative={p.is_native}
            isOnline={p.is_online}
            isInperson={p.is_inperson}
            hasOnlineNotes={p.has_onlinenotes}
            bookableOnline={p.bookable_online}
            postTaxPrice={pi.posttax_price}
            onSale={pi.is_sale}
            preSalePostTaxPrice={pi.before_sale_posttax_price}
            priceStartDate={pi.start_date}
            priceEndDate={pi.end_date}
          />
        </div>
      </section>
      <Swoosh1 swooshColor="beige" backColor="cream" />
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

type TClassIntro = TRichTextBlock | TYoutubeBlock | TTextWidthImageBlock;

type TPriceDetailPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  class_service: TClassService;
  display_title: string;
  display_tagline: string;
  header_image: TFullImage;
  class_intro: TClassIntro[];
};

type TPriceDetailPageResult = {
  meta: { total_count: number };
  items: TPriceDetailPage[];
};
