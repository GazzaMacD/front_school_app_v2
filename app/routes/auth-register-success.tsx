import { redirect, Link } from "react-router";

import { getTitle, getDesc } from "~/common/utils";

//types
import type { Route } from "./+types/auth-register-success";

/**
 * Loaders and Actions
 */
export async function loader({ request }: Route.LoaderArgs) {
  const referer = request.headers.get("referer");
  if (!referer || new URL(referer).pathname !== "/register") {
    return redirect("/");
  }
  return null;
}

/**
 * Page
 */
export default function RegisterSuccess() {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: "Register Email Check・アカウント作成メールを確認する",
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのアカウント作成メールを確認するページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Register Email Check</h1>
        <h5 className="au-header__subtitle">アカウント作成メールを確認する</h5>
      </header>
      <main>
        <p>
          アカウントを作成いただき誠にありがとうございます。Eメールをご確認後、記載されている手順でアカウントをご確認ください。
        </p>
      </main>
    </>
  );
}
