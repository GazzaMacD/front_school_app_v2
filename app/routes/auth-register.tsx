import { useMatches, Link } from "react-router";

import { getUserFromMatches, getTitle, getDesc } from "~/common/utils";

//types
import type { Route } from "./+types/auth-register";

/**
 * Loaders and Actions
 */
export function action({ request }: Route.ActionArgs) {
  return null;
}

/**
 * Page
 */
export default function Register({ actionData }: Route.ComponentProps) {
  const matches = useMatches();
  const user = getUserFromMatches(matches);
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: "Register・アカウント作成", isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのアカウント作成フォームページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Register</h1>
        <h5 className="au-header__subtitle">アカウント作成</h5>
      </header>
      {!user ? (
        <>
          <main>
            <div className="au-form__top-message">
              <p>
                下記内容にご注意いただき、安全なパスワードの設定をお願いいたします。パスワード設定は、以下の条件を満たしていることが必要です。
              </p>
              <ul>
                <li>15文字以上で作成してください。</li>
                <li>大文字、小文字、数字、記号をご使用ください。</li>
                <li>
                  他でご使用されているパスワードと同じものはお控えください。
                </li>
                <li>
                  苗字や名前、ご家族のお名前など、個人情報を含むものや、個人が特定されやすい簡易なパスワードはお控えください。
                </li>
              </ul>
            </div>
            <form noValidate className="au-form g-form" method="post">
              {actionData?.errors?.non_field_errors ? (
                <div className="g-form__nonfield-errors">
                  <ul>
                    {actionData.errors.non_field_errors.map((error) => (
                      <li role="alert" key={error}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="g-form__input-group">
                <label
                  className="g-form__text-label g-required"
                  htmlFor="email-input"
                >
                  Eメールアドレス
                </label>
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  defaultValue={actionData?.fields?.email}
                  aria-invalid={Boolean(actionData?.errors?.email?.length)}
                  aria-errormessage={
                    actionData?.errors?.email?.length
                      ? "email-errors"
                      : undefined
                  }
                />
                {actionData?.errors?.email?.length ? (
                  <ul
                    className="g-form__validation-errors"
                    role="alert"
                    id="email-errors"
                  >
                    {actionData.errors.email.map((error: string) => {
                      return <li key={error}>{error}</li>;
                    })}
                  </ul>
                ) : null}
              </div>

              <div className="g-form__input-group">
                <label className="g-form__text-label g-required">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password1-input"
                  name="password1"
                  defaultValue={actionData?.fields?.password1}
                  aria-invalid={Boolean(actionData?.errors?.password1?.length)}
                  aria-errormessage={
                    actionData?.errors?.password1?.length
                      ? "password1-errors"
                      : undefined
                  }
                />
                {actionData?.errors?.password1?.length ? (
                  <ul
                    className="g-form__validation-errors"
                    role="alert"
                    id="password1-errors"
                  >
                    {actionData.errors.password1.map((error: string) => {
                      return <li key={error}>{error}</li>;
                    })}
                  </ul>
                ) : null}
              </div>

              <div className="g-form__input-group">
                <label
                  className="g-form__text-label g-required"
                  htmlFor="password2-input"
                >
                  パスワード再入力
                </label>
                <input
                  type="password"
                  id="password2-input"
                  name="password2"
                  defaultValue={actionData?.fields?.password2}
                  aria-invalid={Boolean(actionData?.errors?.password2?.length)}
                  aria-errormessage={
                    actionData?.errors?.password2?.length
                      ? "password2-errors"
                      : undefined
                  }
                />
                {actionData?.errors?.password2?.length ? (
                  <ul
                    className="g-form__validation-errors"
                    role="alert"
                    id="password2-errors"
                  >
                    {actionData.errors.password2.map((error: string) => {
                      return <li key={error}>{error}</li>;
                    })}
                  </ul>
                ) : null}
              </div>

              <div className="g-form__submit">
                <button type="submit">アカウント作成</button>
              </div>
            </form>
          </main>
          <footer className="au-footer">
            <p>
              <Link to="/login">ログインはこちら</Link>
            </p>
          </footer>
        </>
      ) : (
        <footer className="au-footer">
          <p>{`メールアドレス「${user.email}」でログインしています`}</p>
        </footer>
      )}
    </>
  );
}
