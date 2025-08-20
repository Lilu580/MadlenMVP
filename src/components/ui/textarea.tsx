import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-gray-project-30 placeholder:text-gray-project-60 aria-invalid:border-red-project-50 min-h-28 max-h-36 h-auto resize-none w-full rounded-[8px] border bg-transparent p-4 text-r-2 transition-[color,box-shadow] outline-none focus-visible:!border-gray-project-100 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
