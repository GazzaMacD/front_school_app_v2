import { BsPersonLock } from "react-icons/bs";
import { Link } from "react-router";

export function Unauthorized() {
  return (
    <div className="c-unauthorized">
      <div className="c-unauthorized__inner">
        <h1>
          <span>
            <BsPersonLock />
          </span>
          Sorry, Unauthorized!
        </h1>
        <p>
          Sorry, it seems you do not have the permissions to see this page. If
          you are a student, please contact us for support. If you are a regular
          user please click these links to go back to either the{" "}
          <Link to="/my-page">my page home</Link> or the{" "}
          <Link to="/my-page">home page</Link>
        </p>
      </div>
    </div>
  );
}
