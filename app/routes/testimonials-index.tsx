import type { Route } from "./+types/testimonials-index";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Testimonials Index Page" };
}

export default function TestimonialsIndex({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
