import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className={"w-full h-full"}>
      <Skeleton className={"w-full h-full"} />
    </div>
  );
};

export default Loading;
