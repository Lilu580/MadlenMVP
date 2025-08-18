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
import React, { useEffect, useState } from "react";
import { TProductImage } from "@/lib/types";

interface Props {
  images: TProductImage[];
  color: string;
}

export const ProductImage = ({ images, color }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [color]);

  return (
    <section className={"flex gap-2 items-start justify-start"}>
      <Carousel>
        <CarouselContent
          position={"vertical"}
          className={"h-[415px] md:h-[570px] xl:h-[681px] flex gap-2"}
        >
          {images
            .sort((a, b) => a.count - b.count)
            .map((image, key) => (
              <CarouselItem
                key={key}
                className={cn(
                  "rounded-[8px] lg:rounded-[20px] overflow-hidden relative w-[43px] h-[60px] lg:w-[95px] lg:h-[108px] cursor-pointer",
                  {
                    ["border border-gray-project-90 pointer-events-none"]:
                      key === index,
                  },
                )}
              >
                <Button
                  variant={"ghost"}
                  className={"w-full h-full"}
                  onClick={() => setIndex(key)}
                >
                  {key === index && (
                    <div
                      className={
                        "absolute top-0 left-0 w-full h-full bg-gray-project-100/30 z-10"
                      }
                    />
                  )}
                  <Image
                    src={image.link}
                    alt={""}
                    fill
                    className={"object-cover object-center"}
                  />
                </Button>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselNavigation position={"vertical"} />
      </Carousel>
      <Carousel onIndexChange={setIndex} index={index}>
        <CarouselContent
          className={"relative max-w-[292px] md:max-w-[245px] xl:max-w-[495px]"}
        >
          {images
            .sort((a, b) => a.count - b.count)
            .map((image, index) => (
              <CarouselItem
                key={index}
                className={
                  "w-[292px] h-[415px] md:w-[245px] md:h-[570px] xl:w-[495px] xl:h-[681px]"
                }
              >
                <MorphingDialog
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <MorphingDialogTrigger>
                    <MorphingDialogImage
                      src={image.link}
                      alt=""
                      className="w-[292px] h-[415px] md:w-[245px] md:h-[570px] xl:w-[495px] xl:h-[681px] rounded-[20px] object-cover object-center"
                    />
                  </MorphingDialogTrigger>
                  <MorphingDialogContainer>
                    <MorphingDialogContent className="relative">
                      <MorphingDialogImage
                        src={image.link}
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
