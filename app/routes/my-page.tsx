import { Outlet } from "react-router";

export default function MyPage() {
  return (
    <>
      <header>Header for My Page</header>
      <aside>Aside for my page</aside>
      <Outlet />
    </>
  );
}
