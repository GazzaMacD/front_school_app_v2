import { Link, redirect } from "react-router";

import type { Route } from "./+types/contact-success";
import { HeadingOne } from "~/components/headings";
import { Swoosh1 } from "~/components/swooshes";

export function loader({ request }: Route.LoaderArgs) {
  const referer = request.headers.get("referer");
  const pathname = referer ? new URL(referer).pathname : "";
  if (pathname === "/contact") {
    return null;
  }
  return redirect("/");
}

export default function ContactSuccess() {
  return (
    <>
      <div className="ct-success">
        <div className="g-narrow-container">
          <div className="ct-success__heading">
            <HeadingOne
              enText="Success"
              jpText="送信しました"
              align="center"
              bkground="light"
              level="h1"
            />
          </div>
          <div className="ct-success__details">
            <p>
              お問い合わせいただき誠にありがとうございます。こちらから改めてご連絡させていただきますのでお待ち下さいませ。
            </p>
            <p>
              もしよろしければ、
              <Link to="/blog-lessons">ブログレッスン一覧</Link>や、
              <Link to="/">エクスリンガルホームページ</Link>をご覧ください。
            </p>
          </div>
        </div>
      </div>
      <Swoosh1 backColor="cream" swooshColor="beige" />
    </>
  );
}
