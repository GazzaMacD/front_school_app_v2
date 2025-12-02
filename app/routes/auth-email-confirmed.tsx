import { Link } from "react-router";

import { getTitle, getDesc } from "~/common/utils";
/**
 * Page
 */
export default function EmailConfirmed() {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: "Email Confirmed・メールを確認しました",
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "XLingualのメールを確認しましたページ",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header className="au-header">
        <h1 className="au-header__title">Email Confirmed</h1>
        <h5 className="au-header__subtitle">メールを確認しました</h5>
      </header>
      <main>
        <p>
          Eメールアドレスをご確認いただきありがとうございます。
          <Link to="/login">ログイン</Link>または
          <Link to="/">スクールホームページ</Link>をご利用くださいませ。
        </p>
      </main>
    </>
  );
}
