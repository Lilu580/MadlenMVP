import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/svg";
import React, { Dispatch, SetStateAction, Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IProductSelect } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts, mapToProductSelect } from "@/lib/api";

interface Props {
  setProducts?: Dispatch<SetStateAction<IProductSelect[]>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const HeaderSearchInitial = ({ setProducts, setLoading, isOpen, setIsOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const refSearch = useRef<NodeJS.Timeout | undefined>(undefined);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    setSearch(value);
    if (!setLoading || !setProducts) return;

    const params = new URLSearchParams(searchParams?.toString());
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);

    setLoading(true);
    clearTimeout(refSearch.current);

    refSearch.current = setTimeout(async () => {
      if (value.trim()) {
        try {
          const data = await fetchProducts({ search: value.trim(), limit: 20 });
          setProducts(data.products.map(mapToProductSelect));
        } catch {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const q = searchParams?.get("search");
    if (q?.trim()) handleSearch(q);
  }, []);

  return (
    <div className={cn("relative max-w-8", { ["w-full max-w-none md:max-w-[304px] lg:max-w-[708px]"]: isOpen })}>
      <Input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        name="search"
        type="search"
        className={cn("pr-36", {
          ["w-full opacity-100"]: isOpen,
          ["h-6 w-6 pointer-events-none opacity-0"]: !isOpen,
        })}
      />
      <div className={cn("absolute flex w-full h-full top-0 right-0 items-center justify-end pointer-events-none", { ["pr-4"]: isOpen, ["pr-1"]: !isOpen })}>
        <Button variant="ghost" className="pointer-events-auto" onClick={() => setIsOpen(!isOpen)}>
          <Search size={24} color="black" className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>
      </div>
    </div>
  );
};

export const HeaderSearch = (props: Props) => (
  <Suspense fallback={<Skeleton className="w-5 h-5 lg:w-6 lg:h-6" />}>
    <HeaderSearchInitial {...props} />
  </Suspense>
);
