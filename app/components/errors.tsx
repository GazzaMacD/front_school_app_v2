import { FaRegFaceSadTear } from "react-icons/fa6";

export function Error() {
  return (
    <div className="c-error">
      <div className="c-error__inner">
        <h1>
          <FaRegFaceSadTear />
          404 Page Not Found
        </h1>
        <p>
          Sorry, it seems that page is not available. Please try another page.{" "}
        </p>
      </div>
    </div>
  );
}
