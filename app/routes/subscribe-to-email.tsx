import { EmailSubscription } from "~/components/email-subscriptions";
import { getTitle, getDesc } from "~/common/utils";
import { HeadingOne } from "~/components/headings";
import { Swoosh1 } from "~/components/swooshes";
import emailSubscribeStyles from "~/styles/subscribe-email.css?url";

//
import type { Route } from "./+types/subscribe-to-email";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: emailSubscribeStyles,
  },
];

/**
 *  Page
 */
export default function SubscribeToEmail() {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: `学習メール登録に登録する`, isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "言語学習に関する最新ブログやその他の役立つ情報を入手しましょう",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}
      <section>
        <HeadingOne
          enText="Subscribe To Email"
          jpText="学習メール登録"
          align="center"
          bkground="light"
          level="h1"
        />
        <div className="es-container">
          <EmailSubscription hasHeader={false} />
        </div>
      </section>
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}
