import { Link } from "react-router";

import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { BsGoogle } from "react-icons/bs";

//type imports
import type { TUser, TUIMatch } from "~/common/types";

/**
 * Helpers
 */
export const handle = {
  breadcrumb: function (m: TUIMatch) {
    return <Link to="/my-page/information/google">Google</Link>;
  },
};

/**
 * Page
 */
export default function InfoBookingSystem() {
  const parentData = useParentData<TInformationParentData>(
    "/my-page/information"
  );
  if (!parentData?.user && !parentData?.hasStudentPerms) {
    return (
      <>
        <title>
          {getTitle({ title: "Unauthorized・無許可", isHome: false })}
        </title>
        <Unauthorized />;
      </>
    );
  }
  return (
    <>
      <title>{getTitle({ title: "Google & XLingual", isHome: false })}</title>
      <div className="mp-info-page">
        <section className="mp-info-page__inner">
          <h2 className="mpg-widget__heading">
            <span>
              <BsGoogle />
            </span>
            Google & XLingual
          </h2>
          <div>
            <ul>
              <li>
                当校では、生徒様に便利にお使いいただけるGoogleのシステムをレッスンに取り入れており、Google
                Document（グーグルドキュメント）をレッスンノートとして使用しております。
              </li>
              <li>
                レッスンでは講師がGoogle
                Document（グーグルドキュメント）にレッスン内容を記載し、生徒様も同時に記載したり、レッスン外でもレッスンノートを見直すことができます。
              </li>
              <li>
                レッスンによっては、こちらのGoogle
                Documentをレッスンノートとして使用しない場合もございますので、あらかじめご了承ください。
              </li>
            </ul>
            <h2>Gmail アカウント</h2>
            <ul>
              <li>
                Google
                Document（グーグルドキュメント）をご使用いただくには、Google
                アカウントを新規作成（無料）していただく必要があります。
              </li>
              <li>
                すでにGoogleアカウントをお持ちの方は新たに作成いただく必要はございません。
              </li>
              <li>下記リンクにアクセスして作成をお願いいたします。</li>
              <li>
                <a
                  href="https://support.google.com/mail/topic/3394216?hl=ja&ref_topic=3394144"
                  target="_target"
                >
                  Gmail アカウントを管理する
                </a>
              </li>
            </ul>
            <h2>グーグルドライブとドキュメントのセットアップ</h2>
            <ul>
              <li>
                <strong>
                  レッスンノートのGoogle
                  Document（グーグルドキュメント）は、講師が作成し、ご入会後にファイルを共有させていただきます。
                </strong>
              </li>
              <li>
                レッスンで使用するGoogle Document（レッスンノート）は、Google
                ドライブに保管されます。リンクにアクセスして
                <a
                  href="https://support.google.com/drive/?hl=ja#
"
                  target="_blank"
                >
                  Googleドライブの使い方
                </a>
                をご参照ください。
              </li>
              <li>
                ウェブを利用してのノート管理をご希望でない場合はお申し出ください。また、セットアップ方法や利用方法がわからない場合は、レッスンの際に講師とパソコンを一緒にご覧いただきながらご案内させていただくことも可能です。お気軽にお申し付けください。
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

/*
 * Types
 */

type TInformationParentData = {
  user: TUser;
  hasStudentPerms: boolean;
};
