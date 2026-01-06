import { redirect, Form } from "react-router";
import * as React from "react";
import { BsPersonCircle, BsPersonVcard, BsPencil } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";

import { BASE_API_URL } from "~/.server/env";
import { Error } from "~/components/errors";
import {
  authenticatedUser,
  createAuthenticatedHeaders,
} from "~/.server/session";
import { fetchWithMeta } from "~/common/utils";
import profileStyles from "~/styles/mypage-profile.css?url";

//type
import type { Route } from "./+types/myp-profile";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: profileStyles,
  },
];

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const name = form.get("name") as string;
  const name_en = form.get("name_en") as string;
  const bday = form.get("bday") as string;

  const userData = await authenticatedUser(request);
  if (!userData) {
    const redirectTo = new URL(request.url).pathname;
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  const profileUrl = `${BASE_API_URL}/users/${userData.user.id}/profile/`;
  const profileOptions = {
    method: "POST",
    headers: await createAuthenticatedHeaders(userData.access),
    body: JSON.stringify({
      name,
      name_en,
      bday,
    }),
  };
  const profileResponseData = fetchWithMeta<TProfileResponse>({
    url: profileUrl,
    options: profileOptions,
  });

  return null;
}
export async function loader({ request }: Route.LoaderArgs) {
  // Check auth

  const userData = await authenticatedUser(request);
  if (!userData) {
    const redirectTo = new URL(request.url).pathname;
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  const profileUrl = `${BASE_API_URL}/users/${userData.user.id}/profile/`;
  const profileOptions = {
    method: "GET",
    headers: await createAuthenticatedHeaders(userData.access),
  };
  const profileResponseData = await fetchWithMeta<TProfileResponse>({
    url: profileUrl,
    options: profileOptions,
  });
  return { profileResponseData };
}

/**
 * Page
 */
export default function Profile({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { profileResponseData } = loaderData;
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    if (!actionData || !actionData.success) return;
    setShowForm(false);
  }, [actionData]);

  //Error in loader
  if (!profileResponseData.success) return <Error />;

  return (
    <div className="mp-p-main__content">
      <section className="mp-pr-main">
        <div className="mp-pr-profile-outer">
          <div className={`mp-pr-profile-inner ${showForm ? "show" : ""}`}>
            <article className="mp-pr-profile-front">
              <div className="mp-pr-profile-front__header">
                <h2>My Profile</h2>
                <div className="mp-pr-profile-front__header__icon">
                  <BsPersonCircle />
                </div>
              </div>
              <div className="mp-pr-profile-front__detail">
                <table>
                  <tbody>
                    <tr>
                      <td>氏名</td>
                      <td>{loaderData.name}</td>
                    </tr>
                    <tr>
                      <td>英語での氏名</td>
                      <td>{loaderData.name_en}</td>
                    </tr>
                    <tr>
                      <td>英語での誕生日</td>
                      <td>{loaderData.bday}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                className="mp-pr-profile-flip-btn"
                onClick={() => setShowForm(true)}
              >
                <BsPencil />
              </button>
            </article>
            <article className="mp-pr-profile-form">
              <button
                className="mp-pr-profile-flip-btn"
                onClick={() => setShowForm(false)}
              >
                <BsPersonVcard />
              </button>
              <Form method="PUT">
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
                  <label className="g-form__text-label" htmlFor="name-input">
                    氏名{" "}
                    <span className="g-form__help-text">(例：山田太郎)</span>
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    defaultValue={
                      actionData?.fields?.name
                        ? actionData.fields.name
                        : loaderData.name
                    }
                    aria-invalid={Boolean(actionData?.errors?.name?.length)}
                    aria-errormessage={
                      actionData?.errors?.name?.length
                        ? "name-errors"
                        : undefined
                    }
                  />
                  {actionData?.errors?.name?.length ? (
                    <ul
                      className="g-form__validation-errors"
                      role="alert"
                      id="name-errors"
                    >
                      {actionData.errors.name.map((error: string) => {
                        return <li key={error}>{error}</li>;
                      })}
                    </ul>
                  ) : null}
                </div>

                <div className="g-form__input-group">
                  <label className="g-form__text-label" htmlFor="name-en-input">
                    英語での氏名{" "}
                    <span className="g-form__help-text">(例：Yamada Taro)</span>
                  </label>
                  <input
                    type="text"
                    id="name-en-input"
                    name="name_en"
                    defaultValue={
                      actionData?.fields?.name_en
                        ? actionData.fields.name_en
                        : loaderData.name_en
                    }
                    aria-invalid={Boolean(actionData?.errors?.name_en?.length)}
                    aria-errormessage={
                      actionData?.errors?.name_en?.length
                        ? "name-en-errors"
                        : undefined
                    }
                  />
                  {actionData?.errors?.name_en?.length ? (
                    <ul
                      className="g-form__validation-errors"
                      role="alert"
                      id="name-en-errors"
                    >
                      {actionData.errors.name_en.map((error: string) => {
                        return <li key={error}>{error}</li>;
                      })}
                    </ul>
                  ) : null}
                </div>

                <div className="g-form__input-group">
                  <label className="g-form__text-label" htmlFor="bday-input">
                    英語での誕生日
                    <span className="g-form__help-text">(例：11 May)</span>
                  </label>
                  <input
                    type="text"
                    id="bday-input"
                    name="bday"
                    maxLength={13}
                    defaultValue={
                      actionData?.fields?.bday
                        ? actionData.fields.bday
                        : loaderData.bday
                    }
                    aria-invalid={Boolean(actionData?.errors?.bday?.length)}
                    aria-errormessage={
                      actionData?.errors?.bday?.length
                        ? "bday-errors"
                        : undefined
                    }
                  />
                  {actionData?.errors?.bday?.length ? (
                    <ul
                      className="g-form__validation-errors"
                      role="alert"
                      id="bday-errors"
                    >
                      {actionData.errors.name.map((error: string) => {
                        return <li key={error}>{error}</li>;
                      })}
                    </ul>
                  ) : null}
                </div>

                <div className="g-form__submit mp-pr-profile-form__submit">
                  <button type="submit">
                    更新
                    <FaArrowRightLong />
                  </button>
                </div>
              </Form>
            </article>
          </div>
        </div>
        {/*
        <div className="mp-pr-form">
        </div>
        */}
      </section>
    </div>
  );
}
/**
 *  Types
 */

type TProfileResponse = {
  name: string;
  name_en: string;
  bday: string;
};
