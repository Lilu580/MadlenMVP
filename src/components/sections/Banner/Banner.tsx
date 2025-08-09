import Image from "next/image";
import { BANNER_IMAGES } from "./constants";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export const Banner = ({}: Props) => {
  return (
    <section
      className={
        "md:h-[413px] h-[759px] flex md:flex-row flex-col relative overflow-hidden rounded-b-4xl lg:h-[645px] md:mt-16 mt-11"
      }
    >
      <div className={"w-full h-full relative"}>
        <Image
          src={BANNER_IMAGES.first}
          alt="Banner image 1"
          className="w-full h-full flex-1 flex object-cover object-top transition-transform duration-300 hover:scale-105"
          fill
        />
      </div>
      <div className={"w-full h-full relative"}>
        <Image
          fill
          src={BANNER_IMAGES.second}
          alt="Banner image 2"
          className="w-full h-full flex-1 flex object-cover object-top transition-transform duration-300 hover:scale-105"
        />
      </div>
      {/* Overlay text and button */}
      <div className="absolute border top-0 md:top-auto md:bottom-0 left-0 w-full h-full px-4 flex flex-col items-start md:items-center justify-start md:justify-end gap-7 pt-[423px] md:pt-0 pb-0 lg:pb-[140px] md:pb-[60px]">
        <h1 className="header-1 text-gray-project-100 text-left md:text-center">
          СТАНЬТЕ ЧАСТИНОЮ
          <br className="" /> СТИЛЬНОГО РУХУ!
        </h1>
        <Button>Дивитись колекцію</Button>
      </div>
    </section>
  );
};
