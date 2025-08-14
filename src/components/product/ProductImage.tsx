import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { X } from "@/components/svg/X";
import React, { useState } from "react";

export const ProductImage = () => {
  const [index, setIndex] = useState(0);

  return (
    <section className={"flex gap-2 items-start justify-start"}>
      <Carousel>
        <CarouselContent
          position={"vertical"}
          className={"h-[681px] flex gap-2"}
        >
          {images.map((image, key) => (
            <CarouselItem key={key}>
              <Button
                variant={"ghost"}
                onClick={() => setIndex(key)}
                className={cn(
                  "rounded-[20px] overflow-hidden relative w-[95px] h-[108px]",
                  {
                    ["border border-gray-project-90 pointer-events-none"]:
                      key === index,
                  },
                )}
              >
                {key === index && (
                  <div
                    className={
                      "absolute top-0 left-0 w-full h-full bg-gray-project-100/30"
                    }
                  />
                )}
                <Image
                  src={image}
                  alt={""}
                  width={95}
                  height={108}
                  className={"w-[95px] h-[108px] object-cover object-center"}
                />
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation position={"vertical"} />
      </Carousel>
      <Carousel onIndexChange={setIndex} index={index}>
        <CarouselContent className={"relative max-w-[495px]"}>
          {images.map((image, index) => (
            <CarouselItem key={index} className={"w-[495px] h-[681px]"}>
              <MorphingDialog
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <MorphingDialogTrigger>
                  <MorphingDialogImage
                    src={image}
                    alt=""
                    className="w-[495px] h-[681px] rounded-[20px] object-cover object-center"
                  />
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative">
                    <MorphingDialogImage
                      src={image}
                      alt=""
                      className="h-auto w-full max-w-[90vw] rounded-[20px] object-cover lg:h-[90vh]"
                    />
                  </MorphingDialogContent>
                  <MorphingDialogClose
                    className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: { delay: 0.3, duration: 0.1 },
                      },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                  >
                    <X className="h-5 w-5 fill-gray-project-40" />
                  </MorphingDialogClose>
                </MorphingDialogContainer>
              </MorphingDialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

const images = ["/image-4.png", "/image-3.png", "/image-2.png", "/image.png"];
