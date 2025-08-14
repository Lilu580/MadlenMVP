import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const CardMain = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col min-h-screen max-w-8xl px-4 md:px-20 lg:px-[112px] gap-12 md:pt-[83px] lg:pt-[115px] pt-[65px]",
        className,
      )}
    >
      {children}
    </div>
  );
};
