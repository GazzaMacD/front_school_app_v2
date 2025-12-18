import type { UIMatch } from "react-router";

import { BASE_TITLE, HOME_DESC } from "./constants";
import type { TUser } from "./types";

/*
 * Display functions
 */
export function getDisplay(str: string, langNum: number) {
  return str.split(",")[langNum];
}

/*
 * Fetch and other API functions
 */
// fetch with Meta - for Fetch.all etc
type TFetchWithMetaSuccess<T> = {
  success: true;
  status: number;
  data: T;
  error: null;
  url: string;
};

type TFetchWithMetaError = {
  success: false;
  status: number;
  data: null;
  error: unknown;
  url: string;
};

type TFetchWithMetaResult<T = null> =
  | TFetchWithMetaSuccess<T>
  | TFetchWithMetaError;

export async function fetchWithMeta<T = unknown>({
  url,
  options = undefined,
}: {
  url: string;
  options: undefined | RequestInit;
}): Promise<TFetchWithMetaResult<T>> {
  try {
    let res;
    if (!options) {
      res = await fetch(url);
    }
    res = await fetch(url, options);
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        data: null,
        error: res.statusText,
        url,
      };
    }
    const data: T = await res.json();
    return {
      success: true,
      status: res.status,
      data,
      error: null,
      url,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error,
      url,
    };
  }
}

/**
 * Route Functions
 */
type TGetUserFromMatches = TUser | null;
type TUIData = { user: TUser } | undefined;

export function getUserFromMatches(
  matches: UIMatch<TUIData>[]
): TGetUserFromMatches {
  const filtered = matches.filter((match) => match.data?.user);
  if (!filtered.length) return null;
  const user = filtered[0].data?.user;
  if (!user) return null;
  return user;
}

/*
 * Meta functions
 */
export function getTitle({
  title,
  isHome,
}: {
  title?: string;
  isHome: boolean;
}): string {
  const noTitleWarn = "This route has no title!";
  if (typeof title === "string" && !title.length && !isHome) {
    console.warn(noTitleWarn);
    return "";
  } else if (typeof title === "undefined" && !isHome) {
    console.warn(noTitleWarn);
    return "";
  } else if (
    (typeof title === "undefined" && isHome) ||
    (typeof title === "string" && !title.length && isHome)
  ) {
    return BASE_TITLE;
  } else {
    if (typeof title === "string" && title.length) {
      return `${title} | ${BASE_TITLE}`;
    }
    console.warn(noTitleWarn);
    return "";
  }
}

export function getDesc({
  desc,
  isHome,
}: {
  desc?: string;
  isHome: boolean;
}): string {
  const noDescWarn = "This route has no description tag!";
  if (typeof desc === "string" && !desc.length && !isHome) {
    console.warn(noDescWarn);
    return "";
  } else if (typeof desc === "undefined" && !isHome) {
    console.warn(noDescWarn);
    return "";
  } else if (
    (typeof desc === "undefined" && isHome) ||
    (typeof desc === "string" && !desc.length && isHome)
  ) {
    return HOME_DESC;
  } else {
    if (typeof desc === "string" && desc.length) {
      return desc;
    }
    console.warn(noDescWarn);
    return "";
  }
}

/*
 * Date and time functions
 */

export function getJapaneseDurationString(s: string, e: string): string {
  const start = new Date(s);
  const end = new Date(e);
  const startString = `${start.getFullYear()}年${
    start.getMonth() + 1
  }月${start.getDate()}日`;
  const endString = `${end.getFullYear()}年${
    end.getMonth() + 1
  }月${end.getDate()}日`;
  return `${startString} ~ ${endString}`;
}

export function getDateString(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let dateString: string;
  if (startDate.getTime() === endDate.getTime()) {
    dateString = `${startDate.getFullYear()}.${
      startDate.getMonth() + 1
    }.${startDate.getDate()}`;
  } else {
    dateString = `${startDate.getFullYear()}.${
      startDate.getMonth() + 1
    }.${startDate.getDate()} ~ ${endDate.getFullYear()}.${
      endDate.getMonth() + 1
    }.${endDate.getDate()}`;
  }
  return dateString;
}

export function getDateStringWithDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dateString: string;
  if (startDate.getTime() === endDate.getTime()) {
    dateString = `${startDate.getFullYear()}.${
      startDate.getMonth() + 1
    }.${startDate.getDate()} (${days[startDate.getDay()]})`;
  } else {
    dateString = `${startDate.getFullYear()}.${
      startDate.getMonth() + 1
    }.${startDate.getDate()} (${
      days[startDate.getDay()]
    }) ~ ${endDate.getFullYear()}.${
      endDate.getMonth() + 1
    }.${endDate.getDate()} (${days[endDate.getDay()]})`;
  }
  return dateString;
}

/*
 * Hash creators
 *
 * For creating hash map objects to map numbers
 * to letters primarily for grid css layouts
 */
export function getDivisor4LetterHash(length: number) {
  const hash: Record<string, string> = {};
  const letters = "abcd";
  let count = 0;
  for (let i = 0; i < length; i++) {
    hash[i] = letters[count];
    count += 1;
    if (count > 3) count = 0;
  }
  return hash;
}

export function getDivisor3LetterHash(length: number) {
  const hash: Record<string, string> = {};
  const letters = "abc";
  let count = 0;
  for (let i = 0; i < length; i++) {
    hash[i] = letters[count];
    count += 1;
    if (count > 2) count = 0;
  }
  return hash;
}
