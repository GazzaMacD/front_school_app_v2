import type { Route } from "./+types/privacy";

import { SlidingHeaderPage } from "~/components/pages";
import { BASE_API_URL } from "~/.server/env";
import pageStyles from "~/styles/components/pages.css?url";
import { getTitle, getDesc } from "~/common/utils";

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
  const url = `${BASE_API_URL}/pages/?type=singles.PrivacyPage&slug=privacy&fields=*`;
  const response = await fetch(url);
  const data = await response.json();
  const page = data.items[0];
  if (!response.ok || !data.items.length) {
    throw new Response("Sorry, the requested page could not be found", {
      status: 404,
    });
  }
  return { page };
}

export default function Privacy({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: "Privacy・個人情報保護方針", isHome: false })}
      </title>
      <meta name="description" content={getDesc({ isHome: false })} />
      {/* Meta tags END*/}

      <SlidingHeaderPage
        mainTitle={page.title}
        subTitle={page.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <section id="content">
          <div className="si-privacy">
            <div className="g-narrow-container">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}
