import * as React from "react";

import type { Route } from "./+types/price-plans-index";
import { BASE_API_URL } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import pageStyles from "~/styles/components/pages.css?url";

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
  console.dir(page, { depth: null });

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
      <div>price index page</div>;
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
