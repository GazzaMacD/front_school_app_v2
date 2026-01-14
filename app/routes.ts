import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // ** Front Layout **
  layout("layouts/front.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    // ** Auth Layout in Front **
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
    //blog lessons
    route("blog-lessons", "routes/blog-lessons.tsx", [
      index("routes/blog-lessons-index.tsx"),
      route(":slug", "routes/blog-lessons-detail.tsx"),
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
    // learning-experiences
    route("learning-experiences", "routes/learning-experiences.tsx", [
      index("routes/learning-experiences-index.tsx"),
      route(":slug", "routes/learning-experiences-detail.tsx"),
    ]),
    // price plans
    route("price-plans", "routes/price-plans.tsx", [
      index("routes/price-plans-index.tsx"),
      route(":slug", "routes/price-plans-detail.tsx"),
    ]),
    // privacy
    route("privacy", "routes/privacy.tsx"),
    // staff
    route("staff", "routes/staff.tsx", [
      index("routes/staff-index.tsx"),
      route(":slug", "routes/staff-detail.tsx"),
    ]),
    // testimonials
    route("testimonials", "routes/testimonials.tsx", [
      index("routes/testimonials-index.tsx"),
      route(":slug", "routes/testimonials-detail.tsx"),
    ]),
  ]), // --end front layout
  // ** Back Layout **
  route("my-page", "routes/my-page.tsx", [
    index("routes/my-page-index.tsx"),
    //profile
    route("profile", "routes/myp-profile.tsx"),
    // booking system
    route("schedules", "routes/myp-schedules.tsx", [
      index("routes/myp-schedules-index.tsx"),
      route(":slug", "routes/myp-schedules-detail.tsx"),
    ]),
    // video calls
    route("video-calls", "routes/myp-video-calls.tsx", [
      index("routes/myp-video-calls-index.tsx"),
      route(":slug", "routes/myp-video-calls-detail.tsx"),
    ]),
    // company information
    route("information", "routes/myp-information.tsx", [
      index("routes/myp-information-index.tsx"),
      route("booking-system", "routes/myp-info-booking-system.tsx"),
      route("contract", "routes/myp-info-contract.tsx"),
      route("google", "routes/myp-info-google.tsx"),
    ]),
  ]),
  // ** Resource and Splat routes **
  route("email-subscribe", "routes/rr-email-subscribe.tsx"),
] satisfies RouteConfig;
