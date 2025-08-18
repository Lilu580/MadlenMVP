import { Skeleton } from "@/components/ui/skeleton";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";

const Loading = () => {
  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <Skeleton className={"w-full h-6"} />
      <div
        className={
          "flex flex-col md:flex-row items-center md:items-start justify-start w-full gap-4 lg:gap-5"
        }
      >
        <Skeleton
          className={
            "min-w-[343px] h-[415px] md:min-w-[296px] md:h-[570px] lg:min-w-[598px] lg:h-[681px] rounded-[20px]"
          }
        />
        <section
          className={
            "flex gap-8 lg:gap-10 items-start justify-start flex-col w-full"
          }
        >
          <section className={"flex flex-col gap-6 lg:gap-8 w-full"}>
            <section className={"flex flex-col gap-2 w-full"}>
              <Skeleton className={"w-full h-[29px] lg:h-[43px]"} />
              <Skeleton className={"w-full h-[20px] lg:h-[25px]"} />
            </section>
            <section className={"flex gap-4 items-center justify-start"}>
              <Skeleton className={"w-full h-[30px] lg:h-[34px]"} />
            </section>
            <section
              className={"flex flex-col justify-start items-start gap-6"}
            >
              <div className={"flex flex-col gap-4 lg:gap-5"}>
                <Skeleton className={"w-full h-[70px] lg:h-[81px]"} />
              </div>
              <div className={"flex flex-col gap-4 lg:gap-5"}>
                <Skeleton className={"w-full h-[75px] lg:h-[82px]"} />
              </div>
            </section>
            <Skeleton className={"w-full h-[52px] lg:h-[62px]"} />
          </section>
          <section className={"flex gap-4 w-full"}>
            <Skeleton className={"w-full h-[73px] lg:h-[85px]"} />
            <Skeleton className={"w-full h-[73px] lg:h-[85px]"} />
          </section>
        </section>
      </div>
    </CardMain>
  );
};

export default Loading;
