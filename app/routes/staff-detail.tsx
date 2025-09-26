import type { Route } from "./+types/staff-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { Swoosh1 } from "~/components/swooshes";
import type { TDetailMeta, TFullImage, TYoutubeBlock } from "~/common/types";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const staffApiUrl = `${BASE_API_URL}/pages/?type=staff.StaffDetailPage&slug=${slug}&fields=*`;
  const staffDetailPageResult = await fetchWithMeta<TStaffDetailPageResult>(
    staffApiUrl
  );

  //error
  if (!staffDetailPageResult.success) {
    console.error("Staff Detail page failed:", staffDetailPageResult.error);
    throw new Response("Sorry that is an error", {
      status: staffDetailPageResult.status,
    });
  }

  //success
  return {
    page: staffDetailPageResult.data.items[0],
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function StaffDetail({ loaderData }: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `${page.display_name}`, isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({ desc: page.intro, isHome: false })}
      />
      {/* Meta tags END*/}
      <div className="st">
        <div className="g-narrow-container">
          <header>
            <div className="st-header__img-wrapper">
              <img
                src={`${base_back_url}${page.profile_image.original.src}`}
                alt={`${page.profile_image.original.alt}`}
              />
            </div>
            <h1 className="st-header__name">{page.title}</h1>
          </header>
          <div className="st-summary">
            <table>
              <tbody>
                <tr>
                  <td>出身国</td>
                  <td>{page.country}</td>
                </tr>
                <tr>
                  <td>母国語</td>
                  <td>{page.native_language.name_ja}</td>
                </tr>
                <tr>
                  <td>その他の言語</td>
                  <td>
                    {page.languages_spoken
                      .map((l) => l.language.name_ja)
                      .join("、")}
                  </td>
                </tr>
                <tr>
                  <td>趣味</td>
                  <td>{page.hobbies}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="st-interview">
            {page.interview.map((block: TStaffInterview) => {
              if (block.type === "q_and_a") {
                return block.value.q_and_a_series.map(
                  (qa: TQuestionAndAnswer) => {
                    return (
                      <div key={qa.question} className="st-interview__qa">
                        <p>{qa.question}</p>
                        <p>{qa.answer}</p>
                      </div>
                    );
                  }
                );
              } else if (block.type === "youtube") {
                return (
                  <div key={block.id}>
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
                );
              }
            })}
          </div>
        </div>
      </div>
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}

/**
 * Types
 */
type TLanguageSpoken = {
  id: number;
  meta: { type: string };
  language: {
    id: number;
    name_en: string;
    name_ja: string;
    slug: string;
  };
};
type TQuestionAndAnswer = {
  question: string;
  answer: string;
};
type TStaffQuestionBlock = {
  type: "q_and_a";
  value: {
    q_and_a_series: TQuestionAndAnswer[];
  };
  id: " string";
};

type TStaffInterview = TStaffQuestionBlock | TYoutubeBlock;

type TStaffDetailPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  member: { id: number; name: string; name_en: string };
  profile_image: TFullImage;
  display_name: string;
  display_tagline: string;
  intro: string;
  role: string;
  country: string;
  native_language: {
    id: number;
    name_en: string;
    name_ja: string;
    slug: string;
  };
  languages_spoken: TLanguageSpoken[];
  hobbies: string;
  interview: TStaffInterview[];
};
type TStaffDetailPageResult = {
  meta: { total_count: number };
  items: TStaffDetailPage[];
};
