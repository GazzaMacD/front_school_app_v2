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
  return <div>Page here</div>;
}

/**
 * Types
 */
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
