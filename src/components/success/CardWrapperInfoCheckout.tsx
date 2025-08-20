import React from "react";

interface Props {
  children: React.ReactNode;
}

export const CardWrapperInfoCheckout = ({ children }: Props) => {
  return (
    <li
      className={
        "flex md:flex-row flex-col gap-4 w-full md:border-b-[1px] border-gray-project-30 last-of-type:border-b-0 [&:last-child>div:last-child]:border-b-0"
      }
    >
      {children}
    </li>
  );
};
