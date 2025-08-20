import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  size?: "sm" | "xs";
}

export const SkeletonProduct = ({ size = "sm" }: Props) => {
  return (
    <Skeleton
      className={cn({
        ["w-[168px] md:w-[140px] h-[301px] lg:w-[227px] lg:h-[362px]"]:
          size === "sm",
        ["w-[343px] h-[430px] md:w-[192px] md:h-[430px] lg:w-[292px] lg:h-[460px]"]:
          size === "xs",
      })}
    />
  );
};
