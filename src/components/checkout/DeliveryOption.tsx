import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

interface Props {
  value: string;
  label: string;
  subtitle: string;
  open: boolean;
  children: React.ReactNode;
}

export function DeliveryOption({
  value,
  label,
  subtitle,
  open,
  children,
}: Props) {
  return (
    <Collapsible open={open} className="w-full">
      <CollapsibleTrigger asChild>
        <div className="flex items-start justify-start gap-3">
          <RadioGroupItem value={value} className={"mt-0.5"} />
          <div className={"flex flex-col gap-1"}>
            <p className={"text-m-1 text-gray-project-90"}>{label}</p>
            <p className={"text-gray-project-80 text-r-2"}>{subtitle}</p>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}
