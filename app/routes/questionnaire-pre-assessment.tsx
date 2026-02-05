import { Swoosh1 } from "~/components/swooshes";
import { HeadingOne } from "~/components/headings";
import { getTitle, getDesc } from "~/common/utils";

export default function PreAssessmentQuestionnaire() {
  return (
    <>
      {/* Meta tags*/}
      <title>
        {getTitle({ title: "Pre Assessment Questionnaire", isHome: false })}
      </title>
      <meta
        name="description"
        content={getDesc({
          desc: "当校の知識向上にご協力いただけるよう、素晴らしい評価と体験レッスンをご提供するためのフォームです",
          isHome: false,
        })}
      />
      {/* Meta tags END*/}

      <header id="questionnaire-header" className="g-narrow-container">
        <HeadingOne
          enText="Pre Assessment Questionnaire"
          jpText="レベルチェック受付フォーム"
          align="center"
          bkground="light"
          level="h1"
        />
        <p>
          Thank you very much for contacting us for a free assessment lesson and
          a free trial lesson
        </p>
        <p>
          以下に記入いただく情報は、お客様に最適な無料レベルチェック及び体験レッスンを提供するためにのみ使用いたします。
        </p>
      </header>
      <section
        id="pre-assessment-questionnaire"
        className="g-narrow-container qu-dp-questionnaire"
      >
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdzRF6tbBj9D5WipgsHlq2kZmZo1XHCjsDLXgvZDQCHXaBSSA/viewform?embedded=true">
          Loading…
        </iframe>
      </section>
      <Swoosh1 swooshColor="beige" backColor="cream" />
    </>
  );
}
