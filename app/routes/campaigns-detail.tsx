import { Link } from "react-router";
import { BsCurrencyYen, BsInfoCircle } from "react-icons/bs";

import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { Swoosh1 } from "~/components/swooshes";
import {
  getJapaneseDurationString,
  getTitle,
  getDesc,
  fetchWithMeta,
} from "~/common/utils";

// types
import type { Route } from "./+types/campaigns-detail";

import type {
  TAltFullImage,
  TFullMeta,
  TRichTextBlock,
  TYoutubeBlock,
  TTextWidthImageBlock,
} from "~/common/types";
import { RiArticleLine } from "react-icons/ri";
import { FaRegGrinStars } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  //Get campaign type
  const typeUrl = `${BASE_API_URL}/pages/?slug=${slug}&fields=_,type`;

  const campaignTypeResult = await fetchWithMeta<TImageBannerType>({
    url: typeUrl,
    options: undefined,
  });
  if (!campaignTypeResult.success || !campaignTypeResult.data.items.length) {
    throw new Response("No page available", { status: 404 });
  }
  //Get page
  const type = campaignTypeResult.data.items[0].meta.type;
  const pageUrl = `${BASE_API_URL}/pages/?type=${type}&slug=${slug}&fields=*`;

  const campaignPageResult = await fetchWithMeta<TImageBannerCampaignPage>({
    url: pageUrl,
    options: undefined,
  });

  if (!campaignPageResult.success || !campaignPageResult.data.items.length) {
    throw new Response("No page available", { status: 404 });
  }
  const page = campaignPageResult.data.items[0];
  return { page, base_back_url: BASE_BACK_URL };
}

export default function CampaignDetail({ loaderData }: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;

  let campaignPage;
  const pType = page?.campaign_page_type;

  if (pType === "image_banner") {
    campaignPage = (
      <ImageBanner
        startDate={page.start_date}
        endDate={page.end_date}
        bannerImage={page.banner_image}
        baseBackUrl={base_back_url}
        additionalDetails={page.additional_details}
      />
    );
  } else if (pType === "simple_banner") {
    campaignPage = (
      <SimpleBanner
        colorType={page.color_type}
        nameJa={page.name_ja}
        offer={page.offer}
        tagline={page.tagline}
        startDate={page.start_date}
        endDate={page.end_date}
        additionalDetails={page.additional_details}
      />
    );
  } else {
    campaignPage = <h2>Sorry seems there is an error here!</h2>;
  }

  return (
    <>
      {/* Meta tags*/}
      <title>{getTitle({ title: `${page.name_ja}`, isHome: false })}</title>
      <meta
        name="description"
        content={getDesc({ desc: page.tagline, isHome: false })}
      />
      {/* Meta tags END*/}

      {campaignPage}
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}

/**
 * Types
 */

type TAdditionalDetails = Array<
  TYoutubeBlock | TRichTextBlock | TTextWidthImageBlock | TShowHide
>;

type TImageBannerCampaign = {
  id: number;
  meta: TFullMeta;
  title: string;
  campaign_page_type: "image_banner";
  banner_image: TAltFullImage;
  name_ja: string;
  tagline: string;
  marketing_start_date: string;
  start_date: string;
  end_date: string;
  additional_details: TAdditionalDetails;
};
type TSimpleBannerCampaign = {
  id: number;
  meta: TFullMeta;
  title: string;
  color_type: string;
  campaign_page_type: "simple_banner";
  banner_image: TAltFullImage;
  offer: string;
  name_ja: string;
  tagline: string;
  marketing_start_date: string;
  start_date: string;
  end_date: string;
  additional_details: TAdditionalDetails;
};

type TImageBannerCampaignPage = {
  meta: { total_count: number };
  items: Array<TImageBannerCampaign | TSimpleBannerCampaign>;
};

type TImageBannerType = {
  meta: { total_count: number };
  items: { meta: { type: "campaigns.CampaignImageBannerPage" } }[];
};

export type TShowHide = {
  type: "show_hide";
  value: {
    showing: string;
    hidden: string;
  };
  id: string;
};

/**
 * Components
 */

/** Simple Banner Component */

type TSimpleBannerProps = {
  colorType: string;
  nameJa: string;
  offer: string;
  tagline: string;
  startDate: string;
  endDate: string;
  additionalDetails: TAdditionalDetails;
};

function SimpleBanner({
  colorType,
  nameJa,
  offer,
  tagline,
  startDate,
  endDate,
  additionalDetails,
}: TSimpleBannerProps) {
  const period = getJapaneseDurationString(startDate, endDate);
  return (
    <>
      <header className="cn-dp-scb-header">
        <div className="cn-dp-scb-header__side">
          <div>
            <h2>Browse our site</h2>
            <article>
              <h4>
                <BsCurrencyYen />
                <Link to="/price-plans">Our price plans</Link>
              </h4>
              <p>
                あなたのニーズに合わせた最高の語学教育を、最適な価格でご提供します。幅広い料金プランをぜひご覧ください。
              </p>
            </article>
            <article>
              <h4>
                <GiTalk />
                <Link to="/courses">Language courses</Link>
              </h4>
              <p>
                マルチリンガルなエキスパート講師による質の高いレッスンをご提供します。幅広い語学学習コースをぜひご覧ください。
              </p>
            </article>
            <article>
              <h4>
                <FaRegGrinStars />
                <Link to="/learning-experiences">Learning experiences</Link>
              </h4>
              <p>
                魅力的なアクティビティを取り入れた語学学習イベントを開催しています。新しい人と出会い、楽しみながら語学を学びます。
              </p>
            </article>
            <article>
              <h4>
                <RiArticleLine />
                <Link to="/blog-lessons">Learning Blog</Link>
              </h4>
              <p>
                ネイティブのように流暢に自然な英語を話せるよう、語学学習者なら知っておきたい、役立つ知識が満載のブログレッスンです。
              </p>
            </article>
            <article>
              <h4>
                <BsInfoCircle />
                <Link to="/about">About Us</Link>
              </h4>
              <p>
                私たちエクスリンガルの企業としての使命と、教育経験豊富で才能豊かなマルチリンガル講師たちの詳細をご覧いただけます。
              </p>
            </article>
          </div>
        </div>
        <div className="cn-dp-scb-header__main">
          <div>
            <p className="cn-dp-scb-header__main__name">{nameJa}</p>
            <p className="cn-dp-scb-header__main__campaign">キャンペーン</p>
            <p className="cn-dp-scb-header__main__offer">{offer}</p>
            <div>
              <p className="cn-dp-scb-header__main__tagline">{tagline}</p>
            </div>
            <p className="cn-dp-scb-header__main__time">期間: {period}</p>
            <Link to="/contact" className="cn-dp-scb-header__main__btn">
              お問い合わせ
            </Link>
          </div>
        </div>
      </header>

      <section className="cn-dp-scb-details">
        <div dangerouslySetInnerHTML={{ __html: additionalDetails }} />
      </section>
    </>
  );
}

/** Image Banner Component */

type TImageBannerProps = {
  startDate: string;
  endDate: string;
  bannerImage: TAltFullImage;
  baseBackUrl: string;
  additionalDetails: TAdditionalDetails;
};

function ImageBanner({
  startDate,
  endDate,
  bannerImage,
  baseBackUrl,
  additionalDetails,
}: TImageBannerProps) {
  const period = getJapaneseDurationString(startDate, endDate);
  return (
    <>
      <header className="cn-dp-ib-header">
        <img
          src={`${baseBackUrl}${bannerImage.medium.src}`}
          alt={bannerImage.title}
        />
      </header>
      <section className="cn-dp-ib-details">
        {additionalDetails.map((block) => {
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
                <figure className="cn-dp__figure text-width">
                  <img
                    src={`${baseBackUrl}${block.value.image.original.src}`}
                    alt={block.value.image.title}
                  />
                  {block.value?.caption ? (
                    <figcaption>{block.value.caption}</figcaption>
                  ) : null}
                </figure>
              </div>
            );
          } else if (block.type === "youtube") {
            return (
              <div key={block.id} className="g-narrow-container">
                <div className="bl-dp__youtube">
                  <iframe
                    className={`youtube-iframe ${
                      block.value.short ? "youtube-short" : ""
                    }`}
                    src={`${block.value.src}?modestbranding=1&controls=0&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          } else if (block.type === "show_hide") {
            return (
              <div key={block.id} className="g-narrow-container">
                <details className="cn-dp__show-hide">
                  <summary>{block.value.showing}</summary>
                  <div
                    dangerouslySetInnerHTML={{ __html: block.value.hidden }}
                  />
                </details>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </section>
    </>
  );
}
