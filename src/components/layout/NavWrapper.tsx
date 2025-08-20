"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
  onClick?: (route?: string) => void;
}

export const NavWrapper = ({ children, onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Button
        className={"text-r-1"}
        variant={"link"}
        onClick={() => {
          router.push("/catalog");
          if (onClick) {
            onClick("/catalog");
          }
        }}
        asChild
      >
        <Link
          href={"/catalog"}
          onClick={() => {
            if (onClick) {
              onClick("/catalog");
            }
          }}
        >
          Каталог
        </Link>
      </Button>
      <Button
        className={"text-r-1"}
        variant={"link"}
        onClick={() => {
          if (pathname === "/") {
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" });
          } else {
            router.push("/");
          }
          if (onClick) {
            onClick();
          }
        }}
      >
        Новинки
      </Button>
      {children}
      <Button
        className={"text-r-1"}
        variant={"link"}
        onClick={() => {
          document
            .getElementById("footer")
            ?.scrollIntoView({ behavior: "smooth" });
          if (onClick) {
            onClick();
          }
        }}
      >
        Контакти
      </Button>
    </>
  );
};
