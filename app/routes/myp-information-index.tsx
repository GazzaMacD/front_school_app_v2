import { Unauthorized } from "~/components/unauthorized";
import { getTitle } from "~/common/utils";
import { useParentData } from "~/hooks/use-parent-data";
import { SolidPillButtonLink } from "~/components/buttons";

//type imports
import type { TUser } from "~/common/types";

/**
 * Page
 */
export default function InformationIndex() {
  const parentData = useParentData<TInformationParentData>(
    "/my-page/information"
  );
  if (!parentData || !parentData.user || !parentData.hasStudentPerms) {
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
        <section id="mp-info-inner" className="mp-info__inner">
          Information
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
