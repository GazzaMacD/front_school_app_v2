import { Link } from "react-router";
import * as React from "react";

import type { Route } from "./+types/blog-lessons-detail";
import { BASE_API_URL, BASE_BACK_URL } from "~/.server/env";
import { getTitle, getDesc, fetchWithMeta } from "~/common/utils";
//css
import cardStyles from "~/styles/components/cards.css?url";
import emailSubscribeStyles from "~/styles/components/email-subscribe.css?url";
import campaignAdStyles from "~/styles/components/campaign-ads.css?url";
//types
import type {
  TAltFullImage,
  TBeyondTextImageBlock,
  TDetailMeta,
  TFullWidthImageBlock,
  TOrigThumbImage,
  TRichTextBlock,
  TTextWidthImageBlock,
  TYoutubeBlock,
} from "~/common/types";

/**
 * Helpers
 */
export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: cardStyles,
  },
  {
    rel: "stylesheet",
    href: emailSubscribeStyles,
  },
  {
    rel: "stylesheet",
    href: campaignAdStyles,
  },
];

function shuffleQuestions(questionsArray: TArrayQuestions): TArrayQuestions {
  const array: TArrayQuestions = [...questionsArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type TMCAnswerFrag = {
  id: number;
  correct: boolean;
  text: string;
};

type TMCQuestionObj = {
  questionNumber: number;
  question: string;
  answers: TMCAnswerFrag[];
};
type TMCQuestions = TMCQuestionObj[];

type TMCQuestionBlock = {
  type: "mc_questions";
  value: {
    title: string;
    intro: string;
    questions: TMCQuestions;
    id: string;
  };
};

function transformQuestionToTestQuestion(
  question: TQuestion,
  i: number
): TMCQuestionObj {
  const newQuestion: TMCQuestionObj = {
    questionNumber: i + 1,
    question: question.question,
    answers: shuffleQuestions([
      {
        id: 1,
        correct: true,
        text: question.correct_answer,
      },
      {
        id: 2,
        correct: false,
        text: question.incorrect_answer1,
      },
      {
        id: 3,
        correct: false,
        text: question.incorrect_answer2,
      },
    ]),
  };
  return newQuestion;
}

function multipleChoiceCreator(page: TBlogDetailAPIPage) {
  if (page.lesson_content.some((block) => block.type === "mc_questions")) {
    const lessonContentCpy = [...page.lesson_content].map((block) => {
      if (block.type === "mc_questions") {
        const newQuestions = block.value.questions.map(
          transformQuestionToTestQuestion
        );
        const newBlock = {
          type: block.type,
          value: {
            title: block.value.title,
            intro: block.value.intro,
            questions: newQuestions,
          },
          id: block.id,
        };
        return newBlock;
      }
      return block;
    });

    page.lesson_content = lessonContentCpy;
    return page;
  }
  //no change if no multiple choice questions
  return page;
}

/**
 * Loaders and Actions
 */
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const blogDetailUrl = `${BASE_API_URL}/pages/?type=lessons.LessonDetailPage&slug=${slug}&fields=*`;
  const blogDetailPageResult = await fetchWithMeta<TBlogDetailPageResult>(
    blogDetailUrl
  );

  //errors
  if (!blogDetailPageResult.success) {
    console.error(
      "Blog Lessons Detail page failed:",
      blogDetailPageResult.error
    );
    throw new Response("Sorry that is an error", {
      status: blogDetailPageResult.status,
    });
  }

  // success
  let page = blogDetailPageResult.data.items[0];
  page = multipleChoiceCreator(page);

  console.dir(page, { depth: null });
  return { page, base_back_url: BASE_BACK_URL };
}

/**
 * Page
 */
export default function BlogLessonsDetail({
  loaderData,
}: Route.ComponentProps) {
  const { page, base_back_url } = loaderData;
  return <div>Page here</div>;
}

/**
 * Multiple choice test components
 */

//Types
type TArrayAnswers = {
  id: number;
  correct: boolean;
  text: string;
}[];

type TArrayQuestions = {
  id: number;
  correct: boolean;
  text: string;
}[];

type TMCQuestion = {
  questionNumber: number;
  question: string;
  answers: TArrayAnswers;
};

type TMCValue = {
  title: string;
  intro: string;
  questions: TMCQuestion[];
};

type TMCQuestionsProps = {
  value: TMCValue;
};
type TTestRecordAnswer = {
  letter: string;
  text: string;
};

type TTestRecordQuestion = {
  questionNumber: number;
  question: string;
  answers: TArrayAnswers;
  answer: TTestRecordQuestion;
  answered: boolean;
  answerCorrect: boolean;
};
type TTestRecordQuestions = TTestRecordQuestion[];

type TTestRecord = {
  title: string;
  intro: string;
  questions: TTestRecordQuestions;
  numQuestions: 3;
};

type TMCQuestionProps = {
  questionNumber: number;
  question: string;
  answers: TArrayAnswers;
  answered: boolean;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    correct: boolean,
    answered: boolean,
    questionNumber: number,
    question: string
  ) => void;
};

// functions

function MCQuestion({
  questionNumber,
  question,
  answers,
  answered,
  handleClick,
}: TMCQuestionProps) {
  return (
    <div className="bl-dp__mctest__qa">
      <p>
        {questionNumber}: {question}
      </p>
      <div>
        {answers.map((question, i) => {
          const letters = ["a", "b", "c"];
          return (
            <div
              key={question.id}
              onClick={(e) => {
                handleClick(
                  e,
                  question.correct,
                  answered,
                  questionNumber,
                  question.text
                );
              }}
              className="bl-dp__mctest__choice"
            >
              <span>{letters[i]}: </span>
              {question.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MCQuestions({ value }: TMCQuestionsProps) {
  const [testRecord, setTestRecord] = React.useState<TTestRecord | null>(null);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const numQuestions = value.questions.length;
  const numCorrect = testRecord ? calculateScore(testRecord.questions) : 0;
  const numAnswered = testRecord
    ? calculateNumAnswered(testRecord.questions)
    : 0;

  function calculateNumAnswered(questions: TTestRecordQuestions) {
    let numAnswered = 0;
    questions.forEach((q) => {
      if (q.answered) {
        numAnswered += 1;
      }
    });
    return numAnswered;
  }

  function calculateScore(questions: TTestRecordQuestions) {
    let score = 0;
    questions.forEach((q) => {
      if (q.answerCorrect) {
        score += 1;
      }
    });
    return score;
  }

  function getAnswers(answers: TArrayAnswers): TTestRecordAnswer {
    const answer = {
      letter: "",
      text: "",
    };
    answers.forEach((q, i) => {
      const letters = ["a", "b", "c"];
      if (q.correct) {
        answer.text = q.text;
        answer.letter = letters[i];
      }
    });
    return answer;
  }

  function updateTestRecord(
    testRecord: TTestRecord,
    qNumber: number,
    correct: boolean
  ) {
    const newTestRecord: TTestRecord = JSON.parse(JSON.stringify(testRecord));
    const updatedQuestions: TTestRecordQuestions = newTestRecord.questions.map(
      (q) => {
        if (q.questionNumber === qNumber) {
          const updatedQ = JSON.parse(JSON.stringify(q));
          updatedQ.answered = true;
          updatedQ.answerCorrect = correct;
          return updatedQ;
        } else {
          return q;
        }
      }
    );
    newTestRecord.questions = updatedQuestions;
    return newTestRecord;
  }

  function handleClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    correct: boolean,
    answered: boolean,
    questionNumber: number,
    text: string
  ) {
    if (answered || !testRecord) return;

    if (correct) {
      e.currentTarget.classList.add("correct");
      setTestRecord(updateTestRecord(testRecord, questionNumber, correct));
    } else {
      e.currentTarget.classList.add("incorrect");
      setTestRecord(updateTestRecord(testRecord, questionNumber, correct));
    }
  }

  React.useEffect(() => {
    if (testRecord) return;
    function createTestRecord(value: TMCValue): TTestRecord {
      const testRecord = JSON.parse(JSON.stringify(value));
      const questions = testRecord.questions.map((q) => {
        q.answer = getAnswers(q.answers);
        q.answered = false;
        q.answerCorrect = false;
        return q;
      });
      testRecord.questions = questions;
      testRecord.numQuestions = testRecord.questions.length;
      return testRecord;
    }
    setTestRecord(createTestRecord(value));
  }, [value, testRecord]);

  return (
    <div className="g-narrow-container">
      <h3>{value.title}</h3>
      <p>{value.intro}</p>
      <div className="bl-dp__mctest">
        <div className="bl-dp__mctest__header">A fun multiple choice test!</div>
        <div className="bl-dp__mctest__test">
          <p>
            Please click on the answer. Only your first try will be recorded for
            the results. When you have finished, you can see your results and
            answers by clicking on the button 'results and answers'
          </p>
          <div>
            {testRecord
              ? testRecord.questions.map((q: any) => {
                  return (
                    <MCQuestion
                      key={q.questionNumber}
                      questionNumber={q.questionNumber}
                      question={q.question}
                      answers={q.answers}
                      answered={q.answered}
                      handleClick={handleClick}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <div className="bl-dp__mctest__answers">
          <div>
            <button
              className="bl-dp__mctest__btn"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {showAnswers ? "Hide" : "Results & answers"}
            </button>
          </div>
          <div>
            {showAnswers && (
              <>
                <div className="bl-dp__mctest__results">
                  <h5>Results</h5>
                  {numAnswered < numQuestions ? (
                    <p>Please finish the test to see your results.</p>
                  ) : (
                    <p>
                      Your result: {numCorrect}/{numQuestions} ={" "}
                      {Math.round((numCorrect / numQuestions) * 100)}%{" "}
                    </p>
                  )}
                </div>
                <div>
                  <h5>Answers</h5>
                  {testRecord
                    ? testRecord.questions.map((q) => {
                        return (
                          <div
                            key={q.question}
                            className="bl-dp__mctest__answer"
                          >
                            <p>
                              {q.questionNumber}: {q.question}
                            </p>
                            <p>
                              {q.answer.letter}: {q.answer.text}
                            </p>
                          </div>
                        );
                      })
                    : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Types
 */

type TBlogAuthor = {
  id: number;
  title: string;
  slug: string;
  name: string;
  image: TOrigThumbImage;
};

type TBlogLessonCategory = {
  id: number;
  name: number;
  ja_name: string;
  slug: string;
};

type TQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answer1: string;
  incorrect_answer2: string;
};

type TMCAPIQuestionBlock = {
  type: "mc_questions";
  value: {
    title: string;
    intro: string;
    questions: TQuestion[];
  };
  id: string;
};

type TRightWrongListBlock = {
  type: "wrong_right_list";
  value: {
    wrong_right_list: { wrong: string; right: string }[];
  };
  id: string;
};
type TExamplesListBlock = {
  type: "examples_list";
  value: {
    sentences_list: string[];
  };
  id: string;
};

type TConversationFrag = {
  person_one: string;
  person_two: string;
};

type TConversationBlock = {
  type: "conversation";
  value: {
    title: string;
    intro: string;
    person_one_name: string;
    person_two_name: string;
    conversation: TConversationBlock[];
  };
  id: string;
};

type TQuoteBlock = {
  type: "block_quote";
  value: {
    quote: string;
    author: string;
    citation_url: string;
    citation_source: string;
  };
  id: string;
};

type TAPILessonContent =
  | TRightWrongListBlock
  | TQuoteBlock
  | TMCAPIQuestionBlock
  | TExamplesListBlock
  | TConversationBlock
  | TFullWidthImageBlock
  | TTextWidthImageBlock
  | TBeyondTextImageBlock
  | TRichTextBlock
  | TYoutubeBlock;

type TLessonContentPostProcess =
  | TRightWrongListBlock
  | TQuoteBlock
  | TMCQuestionBlock
  | TExamplesListBlock
  | TConversationBlock
  | TFullWidthImageBlock
  | TTextWidthImageBlock
  | TBeyondTextImageBlock
  | TRichTextBlock
  | TYoutubeBlock;
type TLessonContent = TAPILessonContent | TLessonContentPostProcess;

type TRelatedLesson = {
  id: number;
  lesson: {
    id: 102;
    title: string;
    display_title: string;
    published_date: string;
    display_tagline: string;
    slug: string;
    category: {
      name: string;
      ja_name: string;
      slug: string;
    };
    image: TOrigThumbImage;
  };
};

type TBlogDetailAPIPage = {
  id: number;
  meta: TDetailMeta;
  title: string;
  header_image: TAltFullImage;
  author: TBlogAuthor;
  display_title: string;
  display_tagline: string;
  published_date: string;
  estimated_time: number;
  category: TBlogLessonCategory;
  lesson_content: TLessonContent[];
  related_simple_banner_campaigns: [];
  related_lessons: TRelatedLesson[];
};

type TBlogDetailPageResult = {
  meta: { total_count: 1 };
  items: TBlogDetailAPIPage[];
};
