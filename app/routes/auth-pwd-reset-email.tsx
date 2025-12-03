import { redirect } from "react-router";
import { getTitle, getDesc } from "~/common/utils";

//types
import type { Route } from "./+types/auth-pwd-reset-email";

/**
 * Loaders and Actions
 */
export function loader({ request }: Route.LoaderArgs) {
  const referer = request.headers.get("referer");
  if (!referer || new URL(referer).pathname !== "/password-reset") {
    return redirect("/");
  }
  return null;
}

/**
 * Page
 */
export default function PwdResetEmailCheck({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: "Check Reset Email・リセットメールを確認する",
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのリセットメールを確認するページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Check Reset Email</h1>
        <h5 className="au-header__subtitle">リセットメールを確認する</h5>
      </header>
      <main>
        <div>
          <p>
            メールをご確認の上、指示に従ってパスワードの再設定を行ってください。メールが届いていない場合は、迷惑メールフォルダをご確認ください。
          </p>
        </div>
      </main>
    </>
  );
}
