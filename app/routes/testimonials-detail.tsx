import type { Route } from "./+types/testimonials-detail";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Testimonial Detail route" };
}

export default function TestimonialDetail({
  loaderData,
}: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
