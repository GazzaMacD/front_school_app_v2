import { Link } from "react-router";

import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { FaYenSign } from "react-icons/fa";

//type imports
import type { TUser, TUIMatch } from "~/common/types";
/**
 * Helpers
 */
export const handle = {
  breadcrumb: function (m: TUIMatch) {
    return (
      <Link to="my-page/information/invoices-and-calendar">
        請求書とカレンダー
      </Link>
    );
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
      <title>
        {getTitle({
          title: "Invoices&Calender・請求書とカレンダー",
          isHome: false,
        })}
      </title>
      <div className="mp-info-page">
        <section className="mp-info-page__inner">
          <h2 className="mpg-widget__heading">
            <span>
              <FaYenSign />
            </span>
            Invoices&Calender・請求書とカレンダー
          </h2>
          <div>
            <h3>Introduction</h3>
            <ul>
              <li>
                当校では、開校日はエクスリンガルのカレンダーに基づき、
                <strong>年間48週間</strong>となっております。
              </li>
              <li>
                ゴールデンウィーク、お盆、年末年始は休校期間をいただいております。
              </li>
              <li>
                <strong>
                  毎週日曜日と月曜日、また下記カレンダーの緑の部分は休校
                </strong>
                です。その他の<strong>祝日は開校</strong>しております。
              </li>
              <li>
                Please see an example of a XLingual year's calendar below.{" "}
              </li>
            </ul>
            <div>
              <img src="/img/info/temp_calendar_xl.png" alt="calendar" />
            </div>
            <details>
              <summary>
                <h3>プライベートレッスンをご受講の生徒様へ</h3>
              </summary>
              <ul>
                <li>
                  年間レッスン数は<strong>48レッスン</strong>
                  です。月4レッスンでご契約の場合、1週間に1回を目安にご受講ください。（月2レッスンでご契約の場合は、年間24レッスンです。上記の休校期間を除いて、2週間に1回を目安にご受講ください。)
                </li>
                <li>
                  月4レッスンでご契約であっても、カレンダー上、レッスンが月3回や月5回となる場合がございます。しかし、
                  <strong>
                    当校の休校期間（ゴールデンウィーク、お盆、年末年始）を除いて、1週間に1回を目安にご受講いただくと、年間48レッスンをご受講いただけます
                  </strong>
                  ので、ご安心ください。
                  <div className="mp-info-page__inner__ex">
                    (例）上記カレンダーの12月は、年末年始の休校期間があるため、開校しているのは3週間分です。そのため、
                    <strong>
                      月4レッスンのご契約の場合でも、12月のレッスン回数は3回です。しかし、その他の月にレッスンが5回となる月があり、年間のレッスン数は変わりません
                    </strong>
                    ので、ご安心ください。
                  </div>
                </li>
                <li>
                  レッスン料のご請求は、<strong>月々固定金額でのご請求</strong>
                  です。月4レッスンでご契約の場合、毎月4レッスン分のご請求です。
                  <strong>
                    カレンダー上、レッスンが月3回の場合や月5回の場合がございますが、その場合も、月4レッスン分のご請求
                  </strong>
                  です。
                  <div className="mp-info-page__inner__ex">
                    例）上記カレンダーの12月では、開校日は3週間分のため、月4レッスンのご契約でも、レッスン回数は3回です。しかし、12月のご請求は4レッスン分です。その他の月にレッスンが月5回となる場合がございますが、その場合も、ご請求は4レッスン分です。
                  </div>
                </li>
                <li>
                  レッスンノート（グーグルドキュメント）の上部に、レッスンをご受講いただいた日付を記入するリストがございます。レッスンをご受講いただく際に、受講日時をご記入いただき、受講回数のご確認にお役立てください。
                </li>
              </ul>
            </details>
            <details>
              <summary>
                <h3>レッスンのキャンセルと振替について</h3>
              </summary>
              <ul>
                <li>
                  レッスンのキャンセルや振替をご希望の場合は、予定されていたレッスン開始時間の
                  <strong>24時間前まで</strong>に、
                  <strong>ネット予約システムで変更またはメール</strong>
                  でお知らせください。（メールでのご連絡の場合、当校のメールサーバーの受信時間を基準とさせていただきます。）
                </li>
                <li>
                  該当の日時の
                  <strong>
                    24時間前以降にレッスンがキャンセルになった場合は、振替レッスンはご受講いただけません
                  </strong>
                  ので、お気をつけください。また、レッスン料の返金はございませんのでご了承ください。
                </li>
                <li>
                  レッスンを規定の時間までにキャンセルされた場合、キャンセルになったレッスン日から
                  <strong>2ヶ月以内</strong>
                  に振替レッスンを予約することができます。
                  <strong>
                    振替レッスンが 2ヵ月以内
                    に受けられない場合は、そのレッスンの予約はできません
                  </strong>
                  。レッスン料の返金は致しかねますので、ご了承ください。
                </li>
                <li>
                  当校の都合でレッスンがキャンセルになった場合は、キャンセルになったレッスン日から6ヶ月以内に振替レッスンを受けることができます。
                </li>
              </ul>
            </details>
            <details>
              <summary>
                <h3>グループレッスンをご受講の生徒様へ</h3>
              </summary>
              <ul>
                <li>
                  グループレッスンは、年間48レッスンのスケジュール制です。
                </li>
                <li>エクスリンガルのカレンダーに基づいて行います。</li>
                <li>
                  <strong>
                    レッスン料は、月々固定金額でのご請求です。月4レッスンでご契約の場合、毎月4レッスン分のご請求です。カレンダー上、レッスンが月3回の場合や月5回の場合がございますが、その場合も、月4レッスン分のご請求です。
                  </strong>
                </li>
                <li>
                  グループレッスンをお休みされた場合、振替レッスンはご受講いただけませんのでご了承ください。
                </li>
              </ul>
            </details>
            <details>
              <summary>
                <h3>レッスン料のお支払いについて</h3>
              </summary>
              <ul>
                <li>
                  ※ご契約書にも記載させていただいておりますが、ご確認の程、どうぞよろしくお願いいたします。
                </li>
                <li>
                  <strong>
                    当月1日にレッスン料の請求をさせていただきます。
                  </strong>
                </li>
                <li>
                  初回のお支払いは、月初めからレッスンを開始される場合、当月1日にご請求書をメールでお送りいたします。
                </li>
                <li>
                  レッスン料の支払いは、<strong>当月15日までに</strong>
                  お支払いいただきますよう、よろしくお願いいたします。
                  <div className="mp-info-page__inner__ex">
                    例　10月の月謝 ：10月15日までのお支払いとなります。
                  </div>
                </li>
                <li>
                  お支払方法につきましては、現金払いまたは下記銀行口座へのお振込みとさせていただきます。
                </li>
                <li>
                  大変恐れ入りますが、振込手数料はお客様にご負担いただいております。
                </li>
                <li>
                  現金払いの場合は、必ず請求書のコピーを同封していただくか、スマートフォンの画面などで請求金額をご提示の上、レッスン時に講師へお渡しください。
                </li>
                <table>
                  <tbody>
                    <tr>
                      <td>銀行名</td>
                      <td>三菱東京ＵＦＪ銀行</td>
                    </tr>
                    <tr>
                      <td>支店名 (コード)</td>
                      <td>浄心支店(店番400)</td>
                    </tr>
                    <tr>
                      <td>口座番号</td>
                      <td>3234509</td>
                    </tr>
                    <tr>
                      <td>口座タイプ</td>
                      <td>普通</td>
                    </tr>
                    <tr>
                      <td>口座名義</td>
                      <td>株式会社XLingual</td>
                    </tr>
                    <tr>
                      <td>口座名義　（カタカナ）</td>
                      <td>カブシキガイシャエクスリンガル</td>
                    </tr>
                  </tbody>
                </table>
              </ul>
            </details>
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
