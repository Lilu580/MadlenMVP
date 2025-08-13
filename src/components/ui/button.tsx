import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none outline-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-black !text-white hover:bg-gray-project-90 active:!bg-black disabled:bg-gray-project-50 disabled:!text-gray-project-30 text-m-2 rounded-[10px] px-6 lg:px-10 py-4 lg:py-5 uppercase",
        outline:
          "border border-black text-m-2 hover:bg-black hover:!text-white active:bg-transparent active:!text-gray-project-100 rounded-full px-4 lg:px-6 py-1 lg:py-3 disabled:!text-gray-project-40 disabled:!border-gray-project-40",
        secondary:
          "bg-black !text-white border stroke-white active:!stroke-white border-black hover:bg-gray-project-100/10 px-4 lg:px-6 py-1 lg:py-3 hover:!text-gray-project-100 hover:!fill-gray-project-100 hover:!stroke-gray-project-100 active:bg-black active:!text-white active:shadow-xl disabled:opacity-40 rounded-full",
        ghost: "rounded-full text-m-2",
        link: "text-gray-project-100 text-r-1 underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        icon: "lg:p-3 p-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
