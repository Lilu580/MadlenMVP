import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  slug: string;
  className?: string;
}

export const CategoryCard = ({ title, image, slug, className }: Props) => (
  <Link
    href={`/catalog/${slug}`}
    className={`relative w-full h-[190px] sm:h-[270px] lg:h-[350px] border-4 lg:border-8 shadow-md border-white rounded-[20px] overflow-hidden hover:opacity-90 transition-opacity ${className ?? ""}`}
  >
    <Image
      className="w-full h-full object-cover object-top"
      alt={title}
      src={image}
      fill
    />
    <p className="absolute top-4 left-4 text-gray-project-100 text-m-1">
      {title}
    </p>
  </Link>
);
