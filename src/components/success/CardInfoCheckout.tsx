import React from "react";

interface Props {
  title: string;
  subtext: string;
}

export const CardInfoCheckout = ({ title, subtext }: Props) => {
  return (
    <div
      className={
        "flex flex-col gap-2 w-full border-b-[1px] md:border-b-0 border-gray-project-30"
      }
    >
      <p className={"text-m-1 text-gray-project-90"}>{title}</p>
      <p className={"py-2.5 text-r-2 text-gray-project-90"}>{subtext}</p>
    </div>
  );
};
