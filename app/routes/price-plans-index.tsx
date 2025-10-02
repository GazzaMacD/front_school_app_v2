import type { Route } from "./+types/price-plans-index";
import { BASE_API_URL } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import pageStyles from "~/styles/components/pages.css?url";
import { SlidingHeaderPage } from "~/components/pages";
import { HeadingOne } from "~/components/headings";
import { ClassPricePlanTable } from "~/components/prices";
import { useCarousel } from "~/hooks/use-carousel";

import type { TDetailMeta, TPricePlan } from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pageStyles,
  },
];

/**
 * Loaders and Actions
 */
export async function loader() {
  const priceIndexUrl = `${BASE_API_URL}/pages/?type=products.ClassPricesListPage&fields=*`;
  const priceIndexPageResult = await fetchWithMeta<TPriceIndexPageResult>(
    priceIndexUrl
  );

  //error
  if (!priceIndexPageResult.success) {
    console.error("Price Index page failed:", priceIndexPageResult.error);
    throw new Response("Sorry that is an error", {
      status: priceIndexPageResult.status,
    });
  }

  //success
  return {
    page: priceIndexPageResult.data.items[0],
  };
}

/**
 * Page
 */
export default function PricePlansIndex({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;

  // Private Slider
  const {
    sliderRef: privateSliderRef,
    sliderPrev: privateSliderPrev,
    prevBtnDisabled: prevPrivateBtnDisabled,
    sliderNext: privateSliderNext,
    nextBtnDisabled: nextPrivateBtnDisabled,
  } = useCarousel({ loop: false });

  // Regular Slider
  const {
    sliderRef: regularSliderRef,
    sliderPrev: regularSliderPrev,
    prevBtnDisabled: prevRegularBtnDisabled,
    sliderNext: regularSliderNext,
    nextBtnDisabled: nextRegularBtnDisabled,
  } = useCarousel({ loop: false });

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: `${page.title}・${page.display_title}`,
          isHome: false,
        })}
      </title>
      <meta name="description" content={getDesc({ desc: "", isHome: false })} />
      {/* Meta tags END*/}

      <SlidingHeaderPage
        mainTitle={page.title}
        subTitle={page.display_title}
        swooshBackColor="white"
        swooshFrontColor="beige"
      >
        <section id="private">
          <div className="pp-lp-private">
            <div className="g-basic-container">
              <div className="pp-lp-private__intro">
                <HeadingOne
                  enText={page.private_en_title}
                  jpText={page.private_jp_title}
                  align="left"
                  bkground="light"
                  level="h2"
                />
                <div dangerouslySetInnerHTML={{ __html: page.private_intro }} />
              </div>

              <div className="pp-lp-slider__wrapper">
                <div className="pp-lp-slider">
                  <button
                    className="pp-lp-slider__button prev"
                    onClick={privateSliderPrev}
                    disabled={prevPrivateBtnDisabled}
                  ></button>
                  <button
                    className="pp-lp-slider__button next"
                    onClick={privateSliderNext}
                    disabled={nextPrivateBtnDisabled}
                  ></button>

                  <div
                    className="pp-lp-slider__viewport"
                    ref={privateSliderRef}
                  >
                    <div className="pp-lp-slider__container">
                      {page.private_price_plans.map((item) => {
                        const p = item.price_plan;
                        const pi = item.price_plan.price_info;
                        return (
                          <article
                            key={item.id}
                            className="pp-lp-slider__slide"
                          >
                            <ClassPricePlanTable
                              color="beige"
                              showLinkButton={true}
                              slug={p.slug}
                              titleEn={p.title}
                              titleJa={p.display_title}
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
                          </article>
                        );
                      })}
                    </div>
                    {/* end container */}
                  </div>
                  {/* end viewport */}
                </div>
                {/* end slider */}
              </div>
              {/* end slider-wrapper */}
            </div>
            {/* end basic container */}
          </div>
          {/* end pp lp private */}
        </section>

        <section id="regular">
          <div className="pp-lp-regular">
            <div className="g-basic-container">
              <div className="pp-lp-regular__intro">
                <HeadingOne
                  enText={page.regular_en_title}
                  jpText={page.regular_jp_title}
                  align="left"
                  bkground="light"
                  level="h2"
                />
                <div dangerouslySetInnerHTML={{ __html: page.regular_intro }} />
              </div>
              <div className="pp-lp-slider__wrapper">
                <div className="pp-lp-slider">
                  <button
                    className="pp-lp-slider__button prev"
                    onClick={regularSliderPrev}
                    disabled={prevRegularBtnDisabled}
                  ></button>
                  <button
                    className="pp-lp-slider__button next"
                    onClick={regularSliderNext}
                    disabled={nextRegularBtnDisabled}
                  ></button>

                  <div
                    className="pp-lp-slider__viewport"
                    ref={regularSliderRef}
                  >
                    <div className="pp-lp-slider__container">
                      {page.regular_price_plans.map((item) => {
                        const p = item.price_plan;
                        const pi = item.price_plan.price_info;
                        return (
                          <article
                            key={item.id}
                            className="pp-lp-slider__slide"
                          >
                            <ClassPricePlanTable
                              color="beige"
                              showLinkButton={true}
                              slug={p.slug}
                              titleEn={p.title}
                              titleJa={p.display_title}
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
                          </article>
                        );
                      })}
                    </div>
                    {/* end container */}
                  </div>
                  {/* end viewport */}
                </div>
                {/* end slider */}
              </div>
              {/* end slider-wrapper */}
            </div>
            {/* end basic container */}
          </div>
          {/* end pp lp private */}
        </section>
      </SlidingHeaderPage>
    </>
  );
}

/**
 * Types
 */

type TPriceIndexPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  private_en_title: string;
  private_jp_title: string;
  private_intro: string;
  private_price_plans: TPricePlan[];
  regular_en_title: string;
  regular_jp_title: string;
  regular_intro: string;
  regular_price_plans: TPricePlan[];
};

type TPriceIndexPageResult = {
  meta: { total_count: number };
  items: TPriceIndexPage[];
};
