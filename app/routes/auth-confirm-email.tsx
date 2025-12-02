import { data, redirect } from "react-router";

import { getTitle, getDesc } from "~/common/utils";
import { verifyEmail } from "~/.server/session";
import { FaArrowRightLong } from "react-icons/fa6";
// Types
import type { Route } from "./+types/auth-confirm-email";

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const key = form.get("key") as string;

  const response = await verifyEmail({ key });

  if (!response.success) {
    return data(response, { status: response.status });
  }
  return redirect("/email-confirmed");
}

export async function loader({ params }: Route.LoaderArgs) {
  const { key } = params;
  return { key };
}

/**
 * Page
 */
export default function ConfirmEmail({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { key } = loaderData;

  let ui = (
    <form className="au-form g-form" noValidate method="post">
      <div className="au-form__top-message">
        <p>
          ご登録いただき誠にありがとうございます。下記のボタンをクリックしてあなたのアカウントをご確認ください。
        </p>
      </div>
      <div>
        <input type="hidden" id="key-input" name="key" defaultValue={key} />
      </div>
      <div className="g-form__submit">
        <button type="submit">
          Eメールを確認する
          <FaArrowRightLong />
        </button>
      </div>
    </form>
  );

  if (actionData && !actionData.success) {
    ui = (
      <form className="au-form g-form" noValidate method="post">
        <div className="g-form__nonfield-errors">
          <ul>
            <li role="alert">
              メールの確認において問題があるようです。大変お手数ですが、お問い合わせフォームからご連絡ください。
            </li>
          </ul>
        </div>
        <div>
          <input type="hidden" id="key-input" name="key" defaultValue={key} />
        </div>
        <div className="g-form__submit">
          <button type="submit" disabled={true}>
            Eメールを確認する
            <FaArrowRightLong />
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: "Confirm Email・Eメールを確認する", isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのEメールを確認するフォームページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Confirm Email</h1>
        <h5 className="au-header__subtitle">Eメールを確認する</h5>
      </header>
      <main>{ui}</main>
    </>
  );
}
