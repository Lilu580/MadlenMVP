import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { TProductDescription } from "@/lib/types";

interface Props {
  descriptions: TProductDescription[];
}

export const ProductAccording = ({ descriptions }: Props) => {
  return (
    <section className={"flex gap-4 w-full"}>
      <Accordion type="multiple" className="w-full gap-4 flex flex-col">
        {descriptions.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="w-full !border px-4 py-6 lg:p-7 rounded-[20px]"
          >
            <AccordionTrigger isCheck className={"p-0 items-center"}>
              <h4 className={"header-4 text-gray-project-100"}>{item.title}</h4>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance mt-4 pb-0">
              <p
                className={"text-r-2 text-gray-project-80 whitespace-pre-wrap"}
              >
                {item.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
