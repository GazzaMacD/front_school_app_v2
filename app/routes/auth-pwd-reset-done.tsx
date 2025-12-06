import { Link, redirect } from "react-router";

import { getTitle, getDesc } from "~/common/utils";
//types
import type { Route } from "./+types/auth-pwd-reset-done";

/**
 * Loaders and Actions
 */
export function loader({ request }: Route.LoaderArgs) {
  const referer = request.headers.get("referer");
  if (
    !referer ||
    !new URL(referer).pathname.includes("password-reset-confirm")
  ) {
    return redirect("/");
  }
  return null;
}

/**
 * Page
 */
export default function PwdResetDone() {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: "Password Reset Done・パスワードリセット完了",
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのパスワードリセット完了したページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Password Reset Done</h1>
        <h5 className="au-header__subtitle">パスワードリセット完了</h5>
      </header>
      <main>
        <div>
          <p>
            パスワードが変更されましたのでお知らせいたします。
            <Link to="/login">ログイン</Link>
            が可能な状態となっております。
          </p>
        </div>
      </main>
    </>
  );
}
