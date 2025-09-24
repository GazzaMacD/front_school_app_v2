import { BASE_TITLE, HOME_DESC } from "./constants";
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
  ok: boolean;
  data: T;
  status: number;
  url: string;
};

type TFetchWithMetaError = {
  error: unknown;
  url: string;
};

type TFetchWithMetaResult<T> = TFetchWithMetaSuccess<T> | TFetchWithMetaError;

export async function fetchWithMeta<T = unknown>(
  url: string
): Promise<TFetchWithMetaResult<T>> {
  try {
    const res = await fetch(url);
    const data: T = await res.json();
    return { ok: res.ok, data, status: res.status, url };
  } catch (error) {
    return { error, url };
  }
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
