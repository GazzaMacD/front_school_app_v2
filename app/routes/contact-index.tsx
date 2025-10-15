import { Link } from "react-router";
import { FaCaretDown, FaArrowDown, FaArrowRightLong } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";

import type { Route } from "./+types/contact-index";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { HeadingOne } from "~/components/headings";
import { NumberedHorizontalCards } from "~/components/cards";
import { SlidingHeaderPage } from "~/components/pages";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
import type { TDetailMeta, TFullImage } from "~/common/types";

/**
 * Helpers
 */

const contactMenu: TContactMenu = [
  {
    id: 1,
    text: "レベルチェックと体験レッスン",
    url: "#trial",
  },
  {
    id: 2,
    text: "ラーニング・エクスペリエンス",
    url: "#experience",
  },
  {
    id: 3,
    text: "よくある質問",
    url: "#q&a",
  },
  {
    id: 4,
    text: "お電話でのお問い合わせ",
    url: "#telephone",
  },
  {
    id: 5,
    text: "お問い合わせフォーム",
    url: "#form",
  },
];

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  return null;
}

export async function loader({ context }: Route.LoaderArgs) {
  const contactApiUrl = `${BASE_API_URL}/pages/?slug=contact&type=contacts.ContactPage&fields=*`;
  const contactPageResult = await fetchWithMeta<TContactPageResult>(
    contactApiUrl
  );

  //error
  if (!contactPageResult.success) {
    console.error("Contact page fetch failed:", contactPageResult.error);
    throw new Response("Sorry that is an error", {
      status: contactPageResult.status,
    });
  }

  //success
  return {
    page: contactPageResult.data.items[0],
    base_back_url: BASE_BACK_URL,
  };
}

/**
 * Page
 */
export default function ContactIndex({ loaderData }: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: `${page.display_title}・${page.title}`,
          isHome: false,
        })}
      </title>
      <meta name="description" content={getDesc({ desc: "", isHome: false })} />
      {/* Meta tags END*/}

      <SlidingHeaderPage
        mainTitle={page.title}
        subTitle={page.display_title}
        swooshBackColor="cream"
        swooshFrontColor="beige"
      >
        <div className="ct-nav">
          {contactMenu.map((item) => {
            return <PageNav key={item.id} text={item.text} url={item.url} />;
          })}
        </div>

        <section id="trial">
          <div className="ct-texp">
            <div className="g-narrow-container">
              <div className="ct-texp__heading">
                <HeadingOne
                  enText={page.trial_en_title}
                  jpText={page.trial_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>
              <div
                className="ct-texp__intro"
                dangerouslySetInnerHTML={{ __html: page.trial_intro }}
              />
              <div className="ct-texp__steps">
                {page.trial_steps.map((step, i, arr) => {
                  const len = arr.length;
                  return (
                    <div key={step.id}>
                      <NumberedHorizontalCards
                        number={`0${i + 1}`}
                        jaTitle={step.value.title}
                        text={step.value.text}
                        src={
                          step.value.image
                            ? `${base_back_url}${step.value.image.thumbnail.src}`
                            : null
                        }
                        alt={
                          step.value.image ? step.value.image.medium.alt : null
                        }
                      />
                      {i + 1 < len ? (
                        <div className="ct-texp__step__caret">
                          <FaCaretDown />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="ct-texp">
            <div className="g-narrow-container">
              <div className="ct-texp__heading">
                <HeadingOne
                  enText={page.exp_en_title}
                  jpText={page.exp_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>
              <div
                className="ct-texp__intro"
                dangerouslySetInnerHTML={{ __html: page.exp_intro }}
              />
              <div className="ct-texp__steps">
                {page.exp_steps.map((step, i, arr) => {
                  const len = arr.length;
                  return (
                    <div key={step.id}>
                      <NumberedHorizontalCards
                        number={`0${i + 1}`}
                        jaTitle={step.value.title}
                        text={step.value.text}
                        src={
                          step.value.image
                            ? `${base_back_url}${step.value.image.thumbnail.src}`
                            : null
                        }
                        alt={
                          step.value.image ? step.value.image.medium.alt : null
                        }
                      />
                      {i + 1 < len ? (
                        <div className="ct-texp__step__caret">
                          <FaCaretDown />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="q&a">
          <div className="ct-qas">
            <div className="g-narrow-container">
              <div className="ct-qa__heading">
                <HeadingOne
                  enText={page.qa_en_title}
                  jpText={page.qa_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>

              <div className="ct-qa__qas">
                {page.qas.map((block) => {
                  return (
                    <div className="ct-qas__qa" key={block.id}>
                      <p>{block.value.question}</p>
                      <p>{block.value.answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="telephone">
          <div className="ct-tel">
            <div className="g-narrow-container">
              <div className="ct-tel__heading">
                <HeadingOne
                  enText={page.tel_en_title}
                  jpText={page.tel_jp_title}
                  align="center"
                  bkground="light"
                  level="h2"
                />
              </div>

              <div className="ct-tel__details">
                <Link className="ct-tel__link" to={`tel:${page.tel_number}`}>
                  <FaMobileAlt />
                  <div>
                    {page.tel_display_number}
                    <span>タップして電話をかける</span>
                  </div>
                </Link>
                <div className="ct-tel__times">
                  <div className="ct-tel__times__label">
                    <span>電話受付時間</span>
                  </div>
                  <div className="ct-tel__times__time">
                    <span>火/水/木/金/土</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="ct-tel__times__time">
                    <span>日/月/祝</span>
                    <span>休業</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SlidingHeaderPage>
    </>
  );
}

/*
 * Components
 */

type TPageNavProps = {
  text: string;
  url: string;
};

function PageNav({ text, url }: TPageNavProps) {
  return (
    <Link className="ct-nav__link " to={url}>
      <div className="ct-nav__btn">
        <div className="ct-nav__icon">
          <FaArrowDown />
        </div>
        <div className="ct-nav__text">{text}</div>
      </div>
    </Link>
  );
}

/**
 * Types
 */
type TContactMenuItem = {
  id: number;
  text: string;
  url: string;
};

type TContactMenu = TContactMenuItem[];

type TQAndABlock = {
  type: "q_and_a";
  value: {
    question: string;
    answer: string;
  };
  id: string;
};
type TInfoCardBlock = {
  type: "info_cards";
  value: {
    title: string;
    image: TFullImage | null;
    text: string;
  };
  id: string;
};

type TContactPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  display_title: string;
  trial_en_title: string;
  trial_jp_title: string;
  trial_intro: string;
  trial_steps: TInfoCardBlock[];
  exp_en_title: string;
  exp_jp_title: string;
  exp_intro: string;
  exp_steps: TInfoCardBlock[];
  qa_en_title: string;
  qa_jp_title: string;
  qas: TQAndABlock[];
  tel_en_title: string;
  tel_jp_title: string;
  tel_number: string;
  tel_display_number: string;
  form_en_title: string;
  form_jp_title: string;
};
type TContactPageResult = {
  meta: { total_count: number };
  items: TContactPage[];
};
