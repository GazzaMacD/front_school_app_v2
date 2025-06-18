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
  ]),
] satisfies RouteConfig;
