import { Swoosh1 } from "~/components/swooshes";
import { HeadingOne } from "~/components/headings";
import { getTitle, getDesc } from "~/common/utils";

export default function PostLearningExperience() {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({
          title: "Post Learning Experience Questionnaire",
          isHome: false,
        })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "皆様、イベントにご来場いただき誠にありがとうございます。今後の改善に役立てるため、貴重なご意見をお聞かせいただければ幸いです。",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header id="questionnaire-header" className="g-narrow-container">
        <HeadingOne
          enText="Post Learning Experience Questionnaire"
          jpText="ラーニング・エクスペリエンス後のアンケート"
          align="center"
          bkground="light"
          level="h1"
        />
        <p>
          Thank you very much for coming to Xlingual’s Learning Experience! We
          would like to get your feedback!
        </p>
        <p>
          先日はXLingualのラーニング・エクスペリエンスにお越しいただきまして、誠にありがとうございました！よろしければ、皆様のご意見をぜひお聞かせください！
        </p>
      </header>
      <section
        id="post-experience-questionnaire"
        className="g-narrow-container qu-dp-questionnaire"
      >
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfvuq3RhCvSY_tgvhNMErrqSQ2PbwJoc-CBUDUaHDm2DvTJpg/viewform?embedded=true">
          Loading…
        </iframe>
      </section>
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}
