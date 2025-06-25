import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/front.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("blog-lessons", "routes/blog-lessons.tsx", [
      index("routes/blog-lessons-index.tsx"),
      route(":slug", "routes/blog-lessons-detail.tsx"),
    ]),
    layout("layouts/auth.tsx", [
      route("confirm-email/:key", "routes/auth-confirm-email.tsx"),
      route("email-confirmed", "routes/auth-email-confirmed.tsx"),
      route("login", "routes/auth-login.tsx"),
      route("logout", "routes/auth-logout.tsx"),
      route("password-reset-check-email", "routes/auth-pwd-reset-email.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
