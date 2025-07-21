import { BASE_TITLE, HOME_DESC } from "./constants";
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
