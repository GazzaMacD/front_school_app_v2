import { data, Form, useNavigation, redirect } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";

import { resetConfirm } from "~/.server/session";
import { getDesc, getTitle } from "~/common/utils";
import { MESSAGES } from "~/common/constants";

// type imports
import type { Route } from "./+types/auth-pwd-reset-confirm";
import type { TResetConfirmActionResponse } from "~/common/types";

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const uid = Number(form.get("uid")) as number;
  const token = form.get("token") as string;
  const new_password1 = form.get("new_password1") as string;
  const new_password2 = form.get("new_password2") as string;

  const fields = {
    uid,
    token,
    new_password1,
    new_password2,
  };

  try {
    const response = await resetConfirm(fields);
    if (!response.success) {
      const pwdResetConfirmActionData = Object.assign(response, {
        fields,
      });
      if (response.errors?.uid || response.errors?.token) {
        //invalid
        return data<TResetConfirmActionResponse>(
          {
            success: false,
            status: response.status,
            data: null,
            errors: {
              non_field_errors: [MESSAGES["ja"].formInvalid],
            },
            fields,
          },
          { status: response.status }
        );
      } else {
        //form field errors
        return data<TResetConfirmActionResponse>(pwdResetConfirmActionData, {
          status: response.status,
        });
      }
    }

    //success
    return redirect("/password-reset-done");
  } catch (e) {
    console.error(`Error in reset confirm action: ${e}`);
    return data<TResetConfirmActionResponse>(
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

export async function loader({ params }: Route.LoaderArgs) {
  const { uid, token } = params;
  return { uid, token };
}

/**
 * Page
 */
export default function PwdResetConfirm({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { uid, token } = loaderData;
  let navigation = useNavigation();

  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: "Password Reset Confirm・リセットの確認",
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのアカウントリセットの確認するフォームページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Password Reset Confirm</h1>
        <h5 className="au-header__subtitle">リセットの確認</h5>
      </header>
      <main>
        <div className="au-form__top-message">
          <p>
            下記内容にご注意いただき、安全なパスワードの設定をお願いいたします。パスワード設定は、以下の条件を満たしていることが必要です。
          </p>
          <ul>
            <li>15文字以上で作成してください。</li>
            <li>大文字、小文字、数字、記号をご使用ください。</li>
            <li>他でご使用されているパスワードと同じものはお控えください。</li>
            <li>
              苗字や名前、ご家族のお名前など、個人情報を含むものや、個人が特定されやすい簡易なパスワードはお控えください。
            </li>
          </ul>
        </div>
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

          <input type="hidden" name="uid" value={uid} />

          <input type="hidden" name="token" value={token} />

          <div className="g-form__input-group">
            <label
              htmlFor="new-password1-input"
              className="g-form__text-label g-required"
            >
              新しいパスワード
            </label>
            <input
              type="password"
              id="new-password1-input"
              name="new_password1"
              defaultValue={actionData?.fields?.new_password1}
              aria-invalid={Boolean(actionData?.errors?.new_password1?.length)}
              aria-errormessage={
                actionData?.errors?.new_password1?.length
                  ? "new-password1-errors"
                  : undefined
              }
            />
            {actionData?.errors?.new_password1?.length ? (
              <ul
                className="g-form__validation-errors"
                role="alert"
                id="new-password1-errors"
              >
                {actionData.errors.new_password1.map((error: string) => {
                  return <li key={error}>{error}</li>;
                })}
              </ul>
            ) : null}
          </div>

          <div className="g-form__input-group">
            <label
              htmlFor="new-password2-input"
              className="g-form__text-label g-required"
            >
              新しいパスワードの確認
            </label>
            <input
              type="password"
              id="new-password2-input"
              name="new_password2"
              defaultValue={actionData?.fields?.new_password2}
              aria-invalid={Boolean(actionData?.errors?.new_password2?.length)}
              aria-errormessage={
                actionData?.errors?.new_password2?.length
                  ? "new-password2-errors"
                  : undefined
              }
            />
            {actionData?.errors?.new_password2?.length ? (
              <ul
                className="g-form__validation-errors"
                role="alert"
                id="new-password2-errors"
              >
                {actionData.errors.new_password2.map((error: string) => {
                  return <li key={error}>{error}</li>;
                })}
              </ul>
            ) : null}
          </div>

          <div className="g-form__submit au-form__submit">
            <button type="submit" disabled={navigation.state !== "idle"}>
              {navigation.state === "idle" ? "送信する" : "送信中"}
              <FaArrowRightLong />
            </button>
          </div>
        </Form>
      </main>
    </>
  );
}
