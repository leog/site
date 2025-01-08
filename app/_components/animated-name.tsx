import { Link } from "next-view-transitions";

export function AnimatedName() {
  return (
    <Link href="/" className="flex mb-8 font-semibold text-gray-400 fade-in">
      Leo Giovanetti
    </Link>
  );
}
