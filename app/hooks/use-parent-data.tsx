import { useMatches } from "react-router";

export function useParentData<F>(pathname: string): F | null {
  let matches = useMatches();
  let parentMatch = matches.find((match) => match.pathname === pathname);
  if (!parentMatch) return null;
  const data = parentMatch.data as F;
  return data;
}
