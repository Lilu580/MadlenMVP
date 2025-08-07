import { FC } from "react";
import Image from "next/image";
import { BANNER_IMAGES } from "./constants";

interface BannerProps {
  className?: string;
}

export const Banner: FC<BannerProps> = ({ className = "" }) => {
  return (
    <>
      <div
        className="h-[760px]
                sm:h-[420px]
                md:h-[500px]
                lg:h-[580px]
                xl:h-[620px]
                2xl:h-[660px]"
      >
        <section
          className={`
                absolute
                mx-auto
                max-w-[1440px]
                h-[760px]
                sm:h-[420px]
                md:h-[500px]
                lg:h-[580px]
                xl:h-[620px]
                2xl:h-[660px]
                flex flex-col sm:flex-row
                bg-banner-primary
                text-banner-text
                overflow-hidden
                left-0
                right-0
                rounded-b-[10px]
                pt-10

                ${className}
            `}
        >
          <div className="w-full h-full bg-banner-secondary relative">
            <Image
              src={BANNER_IMAGES.first}
              fill
              alt="Banner image 1"
              className="w-full h-full transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
          <div className="w-full h-full bg-banner-accent relative">
            <Image
              fill
              src={BANNER_IMAGES.second}
              alt="Banner image 2"
              className="w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          {/* Overlay text and button */}
          <div className="absolute top-1/2 sm:left-1/2 flex flex-col gap-7 sm:items-center items-start justify-start sm:justify-center sm:-translate-x-1/2 sm:-translate-y-1/2 mt-[20px] z-10 w-2/3 sm:w-1/2 px-1 sm:px-4 pt-10">
            <h1 className="header-1 text-gray-project-100 text-center">
              СТАНЬТЕ ЧАСТИНОЮ
              <br className="hidden md:block" /> СТИЛЬНОГО РУХУ!
            </h1>
            <button className="bg-[#0A0B0C] text-[#F1F3F5] text-[14px] lg:text-[16px] font-medium uppercase rounded-[12px] px-3 sm:px-12 py-4 shadow-lg hover:bg-black transition">
              Дивитись колекцію
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
