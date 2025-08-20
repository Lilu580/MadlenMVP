import { Button } from "@/components/ui/button";
import { SkeletonProduct } from "@/components/skeletons/SkeletonProduct";
import React from "react";

export const SkeletonRecommends = () => {
  return (
    <section
      id={"products"}
      className="flex flex-col items-start gap-[50px] py-[60px] md:py-20 lg:py-[120px] px-4 md:px-20 lg:px-[112px] relative"
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="header-2 text-gray-project-100">НОВИНКИ</h2>
        <Button disabled variant={"outline"}>
          Переглянути все
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        {"0123".split("").map((_, index) => (
          <SkeletonProduct key={index} />
        ))}
      </div>
    </section>
  );
};
