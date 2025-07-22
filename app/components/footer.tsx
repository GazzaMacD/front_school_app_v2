import { Link } from "react-router";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

import { SOCIAL_URLS } from "~/common/constants";

function Footer() {
  return (
    <footer className="c-footer">
      <div className="g-grid-container1">
        <div className="c-footer__branding-col">
          <div className="c-footer__logo">
            <Link prefetch="viewport" to="/">
              <img src="/img/logo_with_tagline.svg" alt="XLingual logo"></img>
            </Link>
          </div>
          <div className="c-footer__socials">
            <div>
              <Link
                prefetch="viewport"
                className="c-footer__social instagram"
                to={SOCIAL_URLS.instagram_learn}
              >
                <FaInstagram />
                <span>Instagram | Language Learning</span>
              </Link>
              <Link
                prefetch="viewport"
                className="c-footer__social instagram"
                to={SOCIAL_URLS.instagram_news}
              >
                <FaInstagram />
                <span>Instagram | News</span>
              </Link>
            </div>
            <div>
              <Link
                prefetch="viewport"
                to={SOCIAL_URLS.facebook}
                className="c-footer__social regular"
              >
                <FaFacebookF />
                <span>Facebook</span>
              </Link>
              <Link
                prefetch="viewport"
                to={SOCIAL_URLS.youtube}
                className="c-footer__social regular"
              >
                <FaYoutube />
                <span>Youtube</span>
              </Link>
            </div>
          </div>
          <div className="c-footer__copyright">
            <p>
              © Copyright 2025{" "}
              <Link to="https://fr.linkedin.com/in/macdonaldgareth/fr">
                Gareth Macdonald
              </Link>{" "}
              | All Rights Reserved | Website by{" "}
              <Link to="https://fr.linkedin.com/in/macdonaldgareth/fr">
                Gareth Macdonald
              </Link>{" "}
            </p>
          </div>
        </div>
        <div className="c-footer__links-col">
          <div>
            <h3>言語学習</h3>
            <ul>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/courses">
                  語学コース一覧
                </Link>
              </li>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/price-plans">
                  料金プラン
                </Link>
              </li>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/learning-experiences">
                  ラーニング・エクスペリエンス
                </Link>
              </li>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/blog-lessons">
                  読んで学べるブログ
                </Link>
              </li>
            </ul>

            <h3>会社案内</h3>
            <ul>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/about">
                  私たちについて
                </Link>
              </li>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/language-schools">
                  スクール一覧
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>お問い合わせ</h3>
            <ul>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/contact#form">
                  フォームでのお問い合わせ
                </Link>
              </li>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/contact#telephone">
                  電話でのお問い合わせe
                </Link>
              </li>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="mailto:contact@xlingual.co.jp">
                  Eメールでのお問い合わせ
                </Link>
              </li>
            </ul>
            <h3>その他</h3>
            <ul>
              <li>
                ―{" "}
                <Link prefetch="viewport" to="/my-page">
                  マイページ
                </Link>
              </li>
              <li>
                <Link prefetch="viewport" to="/privacy">
                  ― プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
