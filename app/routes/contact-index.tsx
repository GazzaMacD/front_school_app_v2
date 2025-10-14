import { FaCaretDown, FaArrowDown, FaArrowRightLong } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";

import type { Route } from "./+types/contact-index";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { HeadingOne } from "~/components/headings";
import { NumberedHorizontalCards } from "~/components/cards";
import { SlidingHeaderPage } from "~/components/pages";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";

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
  const apiUrl = `${BASE_API_URL}/pages/?slug=contact&type=contacts.ContactPage&fields=*`;
  return { message: "Contact Index Page", base_back_url: BASE_BACK_URL };
}

/**
 * Page
 */
export default function ContactIndex({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}

/**
 * Types
 */
