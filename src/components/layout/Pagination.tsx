import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

interface Props {
  page: number;
  pages?: number;
  setPage: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
  isSetParams?: boolean;
}

export const PaginationCatalog = ({
  page,
  pages,
  setPage,
  refetch,
  isSetParams = false,
}: Props) => {
  const router = useRouter();

  const handlePageSetSearch = (page: number) => {
    setPage(page);
    if (isSetParams) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", page.toString());
      router.replace(`/?${searchParams.toString()}`);
    }
    if (refetch) {
      refetch();
    }
  };

  const pagesInit = pages || 1;

  if (pages === 1 || !pages) return null;

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem className={"cursor-pointer"}>
            <PaginationPrevious
              onClick={() => handlePageSetSearch(page > 1 ? page - 1 : page)}
            />
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              type="button"
              onClick={() => handlePageSetSearch(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {3 <= page - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 2 && (
          <PaginationItem className={"cursor-pointer"}>
            <PaginationLink
              type={"button"}
              isActive={page === page - 1}
              onClick={() => handlePageSetSearch(page - 1)}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className={"cursor-pointer"}>
          <PaginationLink type={"button"} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {pagesInit > page && pagesInit - 1 !== page && (
          <PaginationItem className={"cursor-pointer"}>
            <PaginationLink
              type={"button"}
              isActive={page === page + 1}
              onClick={() => handlePageSetSearch(page + 1)}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {pagesInit - 3 >= page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page button */}
        {page < (pages || 0) && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              type="button"
              onClick={() => handlePageSetSearch(pages ?? 1)}
            >
              {pages}
            </PaginationLink>
          </PaginationItem>
        )}
        {(pages || 0) > page && (
          <PaginationItem className={"cursor-pointer"}>
            <PaginationNext
              onClick={() =>
                handlePageSetSearch((pages ?? 0) > page ? page + 1 : page)
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
