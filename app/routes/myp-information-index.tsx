import { Link } from "react-router";

import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import {
  BsCalendarWeek,
  BsInfoSquare,
  BsGoogle,
  BsCalendar3,
} from "react-icons/bs";
import { FaYenSign } from "react-icons/fa6";
import { GiDiscussion } from "react-icons/gi";
import { TbContract } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa6";

//type imports
import type { TUser } from "~/common/types";

/**
 * Page
 */
export default function InformationIndex() {
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
      <title>{getTitle({ title: "Information・情報", isHome: false })}</title>
      <div className="mp-info-index">
        <section
          id="mp-info-index__inner"
          className="mp-info-page__inner index"
        >
          <h2 className="mpg-widget__heading">
            <span>
              <BsInfoSquare />
            </span>
            XLingual Information Links
          </h2>
          <div className="mp-info-index__inner__intro">
            <p>
              {parentData.user.contact.name
                ? `${parentData.user.contact.name}, w`
                : "W"}
              elcome to our information link page.
            </p>
            <p>
              Please click on the links below to go to the page with the
              information you might need. If you can't find any information
              suitable, please contact us on our email contact@xlingual.co.jp.
              We are always happy to help you.{" "}
            </p>
          </div>
          <nav className="mp-info-index__nav">
            <ul>
              <li className="mp-info-index__nav__item">
                <Link to="contract">
                  <article>
                    <header>
                      <div>
                        <TbContract />
                      </div>
                      <div>
                        <h3>
                          Contract<span>契約書</span>
                        </h3>
                      </div>
                    </header>
                    <div>
                      <p>ご契約書に関する詳細をご覧いただけます</p>
                    </div>
                  </article>
                </Link>
              </li>
              <li className="mp-info-index__nav__item">
                <Link to="invoices-and-calendar">
                  <article>
                    <header>
                      <div>
                        <FaYenSign /> + <BsCalendar3 />
                      </div>
                      <h3>Monthly Invoices & Yearly Calendar</h3>
                    </header>
                    <div>
                      <p>
                        Our system is unique. Find out all you need to know
                        about invoices, making payments and our yearly calendar
                        system here.
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
              <li className="mp-info-index__nav__item">
                <Link to="google">
                  <article>
                    <header>
                      <div>
                        <BsGoogle />
                      </div>
                      <h3>Google & XLingual</h3>
                    </header>
                    <div>
                      <p>
                        We use Google docs for our students lesson notes. Find
                        out all about Google accounts, Google docs and Google
                        drive here
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
              <li className="mp-info-index__nav__item">
                <Link to="booking-system">
                  <article>
                    <header>
                      <div>
                        <BsCalendarWeek />
                      </div>
                      <h3>Class Booking System</h3>
                    </header>
                    <div>
                      <p>
                        Find out how to book lessons on our system, all the
                        color codes, limits to booking numbers and times.
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
              <li className="mp-info-index__nav__item">
                <Link to="booking-system">
                  <article>
                    <header>
                      <div>
                        <GiDiscussion />
                      </div>
                      <h3>Communication Policy</h3>
                    </header>
                    <div>
                      <p>
                        We are different from other schools. Find out about how
                        we encourage language learning even with our
                        communication policy here.
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
              <li className="mp-info-index__nav__item">
                <Link to="booking-system">
                  <article>
                    <header>
                      <div>
                        <FaHandHoldingHeart />
                      </div>
                      <h3>Friend Introduction System</h3>
                    </header>
                    <div>
                      <p>
                        Many students in XLingual were introduced by other
                        students. We have friend introduction discounts. Find
                        out how it works here.
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
            </ul>
          </nav>
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
