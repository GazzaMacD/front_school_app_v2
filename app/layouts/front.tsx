import { Outlet } from "react-router";

export default function FrontLayout() {
  return (
    <>
      <header>Header for Front</header>
      <Outlet />
      <footer>Footer for Front</footer>
    </>
  );
}
