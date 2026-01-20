import { Link } from "react-router";

import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { TbContract } from "react-icons/tb";

//type imports
import type { TUser, TUIMatch } from "~/common/types";

/**
 * Helpers
 */
export const handle = {
  breadcrumb: function (m: TUIMatch) {
    return <Link to="/my-page/information/contract">契約書</Link>;
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
      <title>{getTitle({ title: "Contract・契約書", isHome: false })}</title>
      <div className="mp-info-page">
        <section className="mp-info-page__inner">
          <h2 className="mpg-widget__heading">
            <span>
              <TbContract />
            </span>
            Contract・契約書
          </h2>
          <div>
            <ul>
              <li>
                添付の契約書PDFファイルをご覧ください。契約書項目についてご質問などございましたら遠慮なくお問い合わせください。
              </li>
              <li>
                契約書を2部プリントアウトしていただき、両方にご署名、押印いただき、ご署名日を明記ください。後日一部を弊社控えとしてご提出いただき、もう一部はお客様控えとしてご自宅で保管してください。
              </li>
              <li>
                チャーターグループレッスンの場合は、グループ代表者の方に契約書をご確認いただき、署名押印いただきます。
              </li>
              <li>
                オンラインレッスンの場合は、ご自宅にて契約書を2部プリントアウトしていただき、ご署名、押印後に、一部をPDFファイルでご返信いただくか、もしくは、ご署名・押印後のご契約書一部を当校へご郵送いただきますよう、よろしくお願いいたします。
              </li>
              <li>
                郵送先：
                <div className="mp-info-page__inner__box">
                  <h4>エクスリンガルはなみずき通校</h4>
                  <p>〒480-1157</p>
                  <p>愛知県長久手市桜作1104エクセレントヒルズC</p>
                </div>
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
