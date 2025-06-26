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
    //blog lessons
    route("blog-lessons", "routes/blog-lessons.tsx", [
      index("routes/blog-lessons-index.tsx"),
      route(":slug", "routes/blog-lessons-detail.tsx"),
    ]),
    //auth
    layout("layouts/auth.tsx", [
      route("confirm-email/:key", "routes/auth-confirm-email.tsx"),
      route("email-confirmed", "routes/auth-email-confirmed.tsx"),
      route("login", "routes/auth-login.tsx"),
      route("logout", "routes/auth-logout.tsx"),
      route("password-reset-check-email", "routes/auth-pwd-reset-email.tsx"),
      route(
        "password-reset-confirm/:uid/:token",
        "routes/auth-pwd-reset-confirm.tsx"
      ),
      route("password-reset-done", "routes/auth-pwd-reset-done.tsx"),
      route("password-reset", "routes/auth-pwd-reset.tsx"),
      route("register-success", "routes/auth-register-success.tsx"),
      route("register", "routes/auth-register.tsx"),
    ]),
    // campaigns
    route("campaigns", "routes/campaigns.tsx", [
      index("routes/campaigns-index.tsx"),
      route(":slug", "routes/campaigns-detail.tsx"),
    ]),
    // contact
    route("contact", "routes/contact.tsx", [
      index("routes/contact-index.tsx"),
      route("success", "routes/contact-success.tsx"),
    ]),
    //courses
    route("courses", "routes/courses.tsx", [
      index("routes/courses-index.tsx"),
      route(":subject/:slug", "routes/courses-detail.tsx"),
    ]),
    // language-schools
    route("language-schools", "routes/language-schools.tsx", [
      index("routes/language-schools-index.tsx"),
      route(":slug", "routes/language-schools-detail.tsx"),
    ]),
  ]), // --end front layout
] satisfies RouteConfig;
