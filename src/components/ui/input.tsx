import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border w-full disabled:border-gray-project-30 disabled:bg-gray-project-10 disabled:text-gray-project-40 disabled:placeholder:text-gray-project-40 border-gray-project-30 focus:!outline-0 focus:!border-gray-project-90 text-r-2 text-gray-project-80 rounded-xl placeholder:text-r-2 placeholder:text-gray-project-60 !p-4",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
