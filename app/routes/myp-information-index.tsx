import { Link } from "react-router";

import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { BsInfoSquare } from "react-icons/bs";

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
        <section id="mp-info-index__inner" className="mp-info-index__inner">
          <h2 className="mpg-widget__heading">
            <span>
              <BsInfoSquare />
            </span>
            XLingual Information Links
          </h2>
          <p>
            Welcome{" "}
            {parentData.user.contact.name ? parentData.user.contact.name : ""}{" "}
            to our information link page.
          </p>
          <p>
            {" "}
            Please click on the links below to go to the page with the
            information you might need. If you can't find any information
            suitable, please contact us on our email contact@xlingual.co.jp. We
            are always happy to help you.{" "}
          </p>
          <nav>
            <ul>
              <li>
                <Link to="booking-system">Booking System</Link>
              </li>
              <li>Info link</li>
              <li>Info link</li>
              <li>Info link</li>
              <li>Info link</li>
              <li>Info link</li>
              <li>Info link</li>
              <li>Info link</li>
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
