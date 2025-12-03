import { redirect, data, useNavigation, Form } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";

import { passwordReset } from "~/.server/session";
import { getDesc, getTitle } from "~/common/utils";
import { MESSAGES } from "~/common/constants";
//types
import type { Route } from "./+types/auth-pwd-reset";
import type { TPasswordResetActionResponse } from "~/common/types";

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = form.get("email") as string;
  const fields = { email };
  try {
    const response = await passwordReset({ email });
    if (!response.success) {
      const pwdResetEmailActionData = Object.assign(response, {
        fields,
      });
      return data<TPasswordResetActionResponse>(pwdResetEmailActionData, {
        status: response.status,
      });
    }
    //success
    return redirect("/password-reset-check-email");
  } catch (e) {
    console.error(`Error in pwd reset email action: ${e}`);
    return data<TPasswordResetActionResponse>(
      {
        success: false,
        status: 500,
        data: null,
        errors: {
          non_field_errors: [MESSAGES["ja"].networkError],
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
export default function PwdReset({ actionData }: Route.ComponentProps) {
  let navigation = useNavigation();
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: "Password Reset・パスワード再設定", isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのパスワード再設定フォームページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Password Reset</h1>
        <h5 className="au-header__subtitle">パスワード再設定</h5>
      </header>

      <main>
        <Form className="au-form g-form" noValidate method="post">
          {actionData && actionData?.errors?.non_field_errors ? (
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

          <div className="g-form__submit au-form__submit">
            <button type="submit" disabled={navigation.state !== "idle"}>
              {navigation.state === "idle" ? "送信する" : "送信中"}
            </button>
          </div>
        </Form>
      </main>
    </>
  );
}
