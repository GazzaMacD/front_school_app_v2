import { Outlet } from "react-router";

import { Footer } from "~/components/footer";

export default function FrontLayout() {
  return (
    <>
      <header>Header for Front</header>
      <Outlet />
      <Footer />
    </>
  );
}
