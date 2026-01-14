import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { BsGoogle } from "react-icons/bs";

//type imports
import type { TUser } from "~/common/types";

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
      <title>{getTitle({ title: "Google・グーグル", isHome: false })}</title>
      <div className="mp-info-page">
        <section className="mp-info-page__inner">
          <h2 className="mpg-widget__heading">
            <span>
              <BsGoogle />
            </span>
            Google・グーグル
          </h2>
          <div>
            <h3>Gmail アカウント</h3>
            <ul>
              <li>
                {" "}
                XLingualでは、お客様に便利にお使いいただけるGoogleのシステムをレッスンに取り入れています。Google
                アカウントを新規作成（無料）していただく必要があります。
              </li>
              <li>
                すでにGoogleアカウントをお持ちの方は新たに作成いただく必要はございません。
              </li>
              <li>下記リンクにアクセスして作成をお願いいたします。</li>{" "}
              <li>
                <a
                  href="
https://support.google.com/mail/topic/3394216?hl=ja&ref_topic=3394144
                "
                  target="_target"
                >
                  Gmail アカウントを管理する
                </a>
              </li>
            </ul>
            <h3>Google DriveとDocumentのセットアップ</h3>
            <ul>
              <li>
                Googleアカウントを作成したら、次はドライブとドキュメントのセットアップです。
              </li>
              <li>
                Google
                ドライブにはレッスンで利用する書類が保管されます。下記リンクにアクセスしてGoogleドライブの使い方をご覧ください。
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://support.google.com/drive/?hl=ja#topic=14940"
                >
                  Google ドライブ ヘルプ
                </a>
              </li>
              <li>
                ウェブを利用してのノート管理等をご希望でない場合はお申し出ください。また、セットアップ方法や利用方法がわからない場合は、レッスンの際に教師とパソコンを一緒に見ていただきながら説明することも可能です。お気軽にお申し付けください。
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
