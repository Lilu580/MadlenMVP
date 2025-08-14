"use client";
import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, Transition, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselContextType = {
  index: number;
  setIndex: (newIndex: number) => void;
  itemsCount: number;
  setItemsCount: (newItemsCount: number) => void;
  disableDrag: boolean;
};

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined,
);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within an CarouselProvider");
  }
  return context;
}

export type CarouselProviderProps = {
  children: ReactNode;
  initialIndex?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState<number>(initialIndex);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const handleSetIndex = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: handleSetIndex,
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export type CarouselProps = {
  children: ReactNode;
  className?: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function Carousel({
  children,
  className,
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState<number>(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
      disableDrag={disableDrag}
    >
      <div className={cn("group/hover relative", className)}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </CarouselProvider>
  );
}

export type CarouselNavigationProps = {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
  position?: "vertical" | "horizontal";
};

function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
  position,
}: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div
      className={cn(
        "pointer-events-none absolute",
        {
          ["left-[-12.5%] top-1/2 flex w-[125%] -translate-y-1/2 justify-between px-2"]:
            position === "horizontal",
          ["left-0 top-0 flex flex-col items-center h-full w-full justify-between"]:
            position === "vertical",
        },
        className,
      )}
    >
      <button
        type="button"
        aria-label="Previous slide"
        className={cn(
          "pointer-events-auto bg-gray-project-20 transition-opacity duration-300 h-fit w-fit rounded-full p-2",
          {
            ["opacity-100 disabled:opacity-40"]: alwaysShow,
            ["opacity-0 group-hover/hover:opacity-100 group-hover/hover:disabled:opacity-40"]:
              !alwaysShow,
          },
          classNameButton,
        )}
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        <ChevronLeft
          className={cn("stroke-gray-project-60", {
            ["rotate-90"]: position === "vertical",
          })}
          size={16}
        />
      </button>
      <button
        type="button"
        className={cn(
          "pointer-events-auto bg-gray-project-20 transition-opacity duration-300 h-fit w-fit rounded-full p-2",
          {
            ["opacity-100 disabled:opacity-40"]: alwaysShow,
            ["opacity-0 group-hover/hover:opacity-100 group-hover/hover:disabled:opacity-40"]:
              !alwaysShow,
          },
          classNameButton,
        )}
        aria-label="Next slide"
        disabled={index + 1 === itemsCount}
        onClick={() => {
          if (index < itemsCount - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <ChevronRight
          className={cn("stroke-gray-project-60", {
            ["rotate-90"]: position === "vertical",
          })}
          size={16}
        />
      </button>
    </div>
  );
}

export type CarouselIndicatorProps = {
  className?: string;
  classNameButton?: string;
};

function CarouselIndicator({
  className,
  classNameButton,
}: CarouselIndicatorProps) {
  const { index, itemsCount, setIndex } = useCarousel();

  return (
    <div
      className={cn(
        "absolute bottom-0 z-10 flex w-full items-center justify-center",
        className,
      )}
    >
      <div className="flex space-x-2">
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-opacity duration-300",
              index === i
                ? "bg-zinc-950 dark:bg-zinc-50"
                : "bg-zinc-900/50 dark:bg-zinc-100/50",
              classNameButton,
            )}
          />
        ))}
      </div>
    </div>
  );
}

export type CarouselContentProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  position?: "vertical" | "horizontal";
};

function CarouselContent({
  children,
  className,
  transition,
  position = "horizontal",
}: CarouselContentProps) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsLength = Children.count(children);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const options = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleCount = entries.filter(
        (entry) => entry.isIntersecting,
      ).length;
      setVisibleItemsCount(visibleCount);
    }, options);

    const childNodes = containerRef.current.children;
    Array.from(childNodes).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [children, setItemsCount]);

  useEffect(() => {
    if (!itemsLength) {
      return;
    }

    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -10 && index < itemsLength - 1) {
      setIndex(index + 1);
    } else if (x >= 10 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <motion.div
      drag={disableDrag ? false : position === "horizontal" ? "x" : "y"}
      dragConstraints={
        disableDrag
          ? undefined
          : position === "horizontal"
            ? { left: 0, right: 0 }
            : {
                top: 0,
                bottom: 0,
              }
      }
      dragMomentum={disableDrag ? undefined : false}
      style={{
        [position === "horizontal" ? "x" : "y"]: disableDrag
          ? undefined
          : dragX,
      }}
      animate={{
        [position === "horizontal" ? "translateX" : "translateY"]:
          `-${index * (100 / visibleItemsCount)}%`,
      }}
      onDragEnd={disableDrag ? undefined : onDragEnd}
      transition={
        transition || {
          damping: 18,
          stiffness: 90,
          type: "spring",
          duration: 0.2,
        }
      }
      className={cn(
        "flex items-center",
        {
          ["flex-col"]: position === "vertical",
          ["cursor-grab active:cursor-grabbing"]: !disableDrag,
        },
        className,
      )}
      ref={containerRef}
    >
      {children}
    </motion.div>
  );
}

export type CarouselItemProps = {
  children: ReactNode;
  className?: string;
};

function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <motion.div
      className={cn(
        "w-full min-w-0 shrink-0 grow-0 overflow-hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
  useCarousel,
};
