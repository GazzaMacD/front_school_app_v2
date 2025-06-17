import { Outlet } from "react-router";

export default function FrontLayout() {
  return (
    <>
      <Outlet />
      <footer>This is the footer</footer>
    </>
  );
}
