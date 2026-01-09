import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { BsInfoSquare } from "react-icons/bs";

//type imports
import type { TUser } from "~/common/types";

/**
 * Page
 */
export default function InfoBookingSystem() {
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
      <title>
        {getTitle({ title: "Booking System・情報", isHome: false })}
      </title>
      <div className="mp-info-page">
        <section className="mp-info-page__inner">
          <h2 className="mpg-widget__heading">
            <span>
              <BsInfoSquare />
            </span>
            Booking System
          </h2>
          <div>some info here ~</div>
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
