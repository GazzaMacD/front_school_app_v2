import { data, Link, useSearchParams } from "react-router";

import { getTitle, getDesc } from "~/common/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { login, secureRedirect, createUserSession } from "~/.server/session";
import { MESSAGES } from "~/common/constants";

//types
import type { Route } from "./+types/auth-login";
import type { TLoginAction, TLoginOk, TLoginFail } from "~/common/types";

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  let redirectTo = form.get("redirectTo");

  redirectTo = secureRedirect(redirectTo);

  const fields = { email, password };

  try {
    const response = await login(fields);
    if (!response.success) {
      const loginActionData = Object.assign(response, {
        fields,
      });
      return data<TLoginAction>(loginActionData, { status: response.status });
    }
    // success
    return createUserSession(response.data, redirectTo);
  } catch (e) {
    console.error(`Error in login action: ${e}`);
    return data(
      {
        success: false,
        status: 500,
        data: null,
        errors: {
          non_field_errors: [MESSAGES["ja"].networkError],
          email: [],
          password: [],
        },
        fields,
      },
      { status: 500 }
    );
  }
} // end action

/**
 * Page
 */
export default function Login({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();

  return (
    <>
      {/* Meta tags*/}
      <title>{getTitle({ title: "Login・ログイン", isHome: false })}</title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのログインフォームページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Login</h1>
        <h5 className="au-header__subtitle">ログイン</h5>
      </header>
      <main>
        <form className="au-form g-form" noValidate method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />

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
              required
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.errors?.email?.length)}
              aria-errormessage={
                actionData?.errors?.email?.length ? "email-errors" : undefined
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
            <label
              className="g-form__text-label g-required"
              htmlFor="password-input"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password-input"
              name="password"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.errors?.password?.length)}
              aria-errormessage={
                actionData?.errors?.password?.length
                  ? "password-errors"
                  : undefined
              }
            />
            {actionData?.errors?.password?.length ? (
              <ul
                className="g-form__validation-errors"
                role="alert"
                id="password-errors"
              >
                {actionData.errors.password.map((error: string) => {
                  return <li key={error}>{error}</li>;
                })}
              </ul>
            ) : null}
          </div>

          <div className="g-form__submit">
            <button type="submit">
              ログイン
              <FaArrowRightLong />
            </button>
          </div>
        </form>
      </main>
      <footer className="au-footer">
        <p>
          初めてのご利用ですか？ <Link to="/register">新規登録はこちら</Link>
        </p>
        <p>
          <Link to="/password-reset">パスワードを忘れた場合</Link>
        </p>
      </footer>
    </>
  );
}
