import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <p>Auth layout</p>
      <Outlet />
    </>
  );
}
