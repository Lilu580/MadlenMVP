"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const NavWrapper = ({ children, onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Button
        className={"text-lg"}
        variant={"link"}
        onClick={() => {
          router.push("/catalog");
          onClick && onClick();
        }}
      >
        Каталог
      </Button>
      <Button
        className={"text-lg"}
        variant={"link"}
        onClick={() => {
          if (pathname === "/") {
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" });
          } else {
            router.push("/");
          }
          onClick && onClick();
        }}
      >
        Новинки
      </Button>
      {children}
      <Button
        className={"text-lg"}
        variant={"link"}
        onClick={() => {
          if (pathname === "/") {
            document
              .getElementById("footer")
              ?.scrollIntoView({ behavior: "smooth" });
          } else {
            router.push("/");
          }
          onClick && onClick();
        }}
      >
        Контакти
      </Button>
    </>
  );
};
