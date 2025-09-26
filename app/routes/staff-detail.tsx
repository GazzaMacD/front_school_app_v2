import type { Route } from "./+types/staff-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { fetchWithMeta } from "~/common/utils";
import type { TDetailMeta, TFullImage, TRichTextBlock } from "~/common/types";

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
  const { page } = loaderData;
  return <div>Html here</div>;
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
  interview: TStaffQuestionBlock;
};
type TStaffDetailPageResult = {
  meta: { total_count: number };
  items: TStaffDetailPage[];
};
