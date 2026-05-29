import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  image: string;
  slug: string;
  className?: string;
  onClick?: () => void;
}

export const CardItemCategory = ({ title, image, slug, className, onClick }: Props) => {
  return (
    <Link
      href={`/catalog/${slug}`}
      onClick={onClick}
      className={cn("flex flex-col gap-2 lg:gap-5 hover:opacity-80 transition-opacity", className)}
    >
      <div className="lg:w-[153px] lg:h-[175px] md:w-[99px] md:h-[110px] w-full h-[136px] relative">
        <Image
          className="object-cover object-center rounded-[10px] w-full h-full"
          fill
          src={image}
          alt={title}
        />
      </div>
      <p className="text-m-1 text-center w-full">{title}</p>
    </Link>
  );
};
