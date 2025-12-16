import * as React from "react";

import type { Route } from "./+types/testimonials-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { Swoosh1 } from "~/components/swooshes";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import type {
  TDetailMeta,
  TFullImage,
  TYoutubeBlock,
  TConversationBlock,
} from "~/common/types";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const testApiUrl = `${BASE_API_URL}/pages/?type=testimonials.TestimonialDetailPage&slug=${slug}&fields=*`;
  const testDetailPageResult = await fetchWithMeta<TTestDetailPageResult>({
    url: testApiUrl,
    options: undefined,
  });

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
        {getTitle({
          title: `${page.customer_name} - お客様の声`,
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.comment, isHome: false })}
      />
      {/* Meta tags END*/}

      <header className="te-dp-header">
        <div className="g-grid-container1">
          <div className="te-dp-header__img-wrapper">
            <img
              src={`${base_back_url}${page.customer_portrait_image.thumbnail.src}`}
              alt={page.customer_portrait_image.thumbnail.alt}
            />
          </div>
          <div className="te-dp-header__details">
            <h5>お客様の声</h5>
            <h1>{page.customer_name}</h1>
            {page.occupation && <p>{page.occupation}</p>}
            {page.organization_name && (
              <p className="test-page__org">{page.organization_name}</p>
            )}
          </div>
        </div>
      </header>

      <section id="testimonial">
        <div>
          <div
            className="g-narrow-container"
            dangerouslySetInnerHTML={{ __html: page.comment }}
          />
        </div>
      </section>

      <section id="interview">
        {page.customer_interview.map((block) => {
          if (block.type === "youtube") {
            return (
              <div key={block.id} className="g-basic-container">
                <div className="te-dp-interview__video">
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
          } else if (block.type === "conversation") {
            const p1 = block.value.person_one_name;
            const p2 = block.value.person_two_name;
            return (
              <div key={block.id} className="g-narrow-container">
                <div className="te-dp-interview__text">
                  <h4>{block.value.title}</h4>
                  <p>{block.value.intro}</p>
                  <table className="te-dp-interview__text__table">
                    <tbody>
                      {block.value.conversation.map((lines: any) => {
                        return (
                          <React.Fragment key={lines.person_one.slice(0, 6)}>
                            <tr>
                              <td>{p1}</td>
                              <td>:</td> <td>{lines.person_one}</td>
                            </tr>
                            <tr>
                              <td>{p2}</td>
                              <td>:</td> <td>{lines.person_two}</td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
        })}
      </section>
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}

/**
 * Types
 */

type TCustomerInterview = TConversationBlock | TYoutubeBlock;

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
  customer_interview: TCustomerInterview[];
};

type TTestDetailPageResult = {
  meta: { total_count: number };
  items: TTestDetailPage[];
};
