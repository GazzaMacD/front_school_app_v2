import { useLocation, Link } from "react-router";
import {
  FaMobileAlt,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { SOCIAL_URLS } from "~/common/constants";
import type { TUser } from "~/types";

type TFrontHeaderProps = {
  user: TUser | null;
};

function FrontHeader({ user }: TFrontHeaderProps) {
  let { pathname } = useLocation();
  return (
    <header className="c-fheader">
      <div className="c-fheader__inner">
        <div className="c-fheader__tagline-background"></div>
        <div className="c-fheader__branding">
          <Link to="/" className="c-fheader__logo-link">
            <img
              className="c-fheader__logo"
              src="/img/xlingual_logo_without_tagline.svg"
              alt="XLingual logo"
            ></img>
          </Link>
          <div className="c-fheader__tagline">
            エクスリンガル｜Experts in Language Learning
          </div>
        </div>
        <div className="c-fheader-menu">
          <nav className="c-fheader-menu__nav">
            <ul className="c-fheader-menu__list">
              <li className="c-fheader-menu__item">
                <a className="c-fheader-menu__phone" href="tel:0561-42-5707">
                  <FaMobileAlt />
                  <span>0561-42-5707</span>
                </a>
              </li>
              <li className="c-fheader-menu__item c-fheader-menu__contact">
                <Link to="/contact#form">
                  <span>問合せ</span>
                  <span>お問い合わせ</span>
                </Link>
              </li>
              {user ? (
                <li className="c-fheader-menu__item">
                  <form
                    className="right-menu__form"
                    action="/logout"
                    method="post"
                  >
                    <button className="c-fheader-menu__logout" type="submit">
                      ログアウト
                    </button>
                  </form>
                </li>
              ) : (
                <>
                  <li className="c-fheader-menu__item">
                    <a className="c-fheader-menu__reglog-link" href="/register">
                      <div className="c-fheader-menu__reglog reg">
                        <span>新規</span>登録
                      </div>
                    </a>
                    <a className="c-fheader-menu__reglog-link" href="/login">
                      <div className="c-fheader-menu__reglog log">ログイン</div>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <HamburgerMenu key={pathname} />
        </div>
      </div>
    </header>
  );
}

// Hamburger Menu Component

function HamburgerMenu() {
  return (
    <div>
      <form>
        <input
          type="checkbox"
          id="navi-toggle"
          className="c-fheader-sm__checkbox"
        />
        <label
          htmlFor="navi-toggle"
          className="c-fheader-sm__button"
          role="button"
        >
          <div>
            <span className="c-fheader-sm__button__icon">&nbsp;</span>
            <span className="c-fheader-sm__button__text">メニュー</span>
          </div>
        </label>
        <div className="c-fheader-sm">
          <nav className="c-fheader-sm__inner">
            <div className="c-fheader-sm__inner__menus">
              <h3>言語学習</h3>
              <ul>
                <li>
                  <Link to="/courses">― 語学コース一覧</Link>
                </li>
                <li>
                  <Link to="/price-plans">― 料金プラン</Link>
                </li>
                <li>
                  <Link to="/learning-experiences">
                    ― ラーニング・エクスペリエンス
                  </Link>
                </li>
                <li>
                  <Link to="/blog-lessons">― 読んで学べるブログ</Link>
                </li>
              </ul>

              <h3>会社案内</h3>
              <ul>
                <li>
                  <Link to="/about">― 私たちについて</Link>
                </li>
                <li>
                  <Link to="/language-schools">― スクール一覧</Link>
                </li>
              </ul>
              <h3>お問い合わせ</h3>
              <ul>
                <li>
                  <Link to="/contact#form">― フォームでのお問い合わせ</Link>
                </li>
                <li>
                  <Link to="/contact#telephone">― 電話でのお問い合わせ</Link>
                </li>
                <li>
                  <Link to="mailto:contact@xlingual.co.jp">
                    ― Eメールでのお問い合わせ
                  </Link>
                </li>
              </ul>
              <h3>その他</h3>
              <ul>
                <li>
                  <Link to="/my-page">― マイページ</Link>
                </li>
                <li>
                  <Link to="/privacy">― プライバシーポリシー</Link>
                </li>
              </ul>
            </div>
            <div className="c-fheader-sm__inner__socials">
              <Link
                className="c-fheader-sm__social instagram"
                to={SOCIAL_URLS.instagram_learn}
              >
                <FaInstagram />
                <div>Instagram | Language Learning</div>
              </Link>
              <Link
                to={SOCIAL_URLS.facebook}
                className="c-fheader-sm__social regular"
              >
                <FaFacebookF />
                <div>Facebook</div>
              </Link>
              <Link
                to={SOCIAL_URLS.instagram_news}
                className="c-fheader-sm__social instagram"
              >
                <FaInstagram />
                <div>Instagram | News</div>
              </Link>
              <Link
                to={SOCIAL_URLS.youtube}
                className="c-fheader-sm__social regular"
              >
                <FaYoutube />
                <div>Youtube</div>
              </Link>
            </div>
          </nav>
        </div>
      </form>
    </div>
  );
}

export { FrontHeader };
