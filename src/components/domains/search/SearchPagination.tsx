"use client";

import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type KeyboardEvent, useMemo } from "react";
import { useSearchParamsState } from "@/context/SearchParamsStateContext";
import Button from "@/components/ui/Button/Button";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function SearchPagination({
  currentPage,
  totalPages,
}: SearchPaginationProps) {
  const {
    isPending,
    removeParam,
    setParam,
  } = useSearchParamsState();
  const lastPage = useMemo(() => {
    if (!Number.isFinite(totalPages)) {
      return 1;
    }

    return Math.max(1, Math.floor(totalPages));
  }, [totalPages]);
  const page = useMemo(() => {
    if (!Number.isFinite(currentPage)) {
      return 1;
    }

    return Math.min(Math.max(1, Math.floor(currentPage)), lastPage);
  }, [currentPage, lastPage]);
  const isFirstPage = page <= 1;
  const isLastPage = page >= lastPage;

  const setPage = (nextPage: number) => {
    if (isPending) return;

    if (!Number.isFinite(nextPage)) {
      return;
    }

    const normalizedPage = Math.min(Math.max(1, Math.floor(nextPage)), lastPage);

    if (normalizedPage === page) {
      return;
    }

    if (normalizedPage === 1) {
      removeParam("p");
      return;
    }

    setParam("p", normalizedPage);
  };
  const submitDraftPage = (input: HTMLInputElement) => {
    const draftPage = input.value.trim();
    const nextPage = Number(draftPage);

    if (draftPage === "" || !Number.isFinite(nextPage)) {
      input.value = String(page);
      return;
    }

    setPage(nextPage);
  };
  const submitDraftPageOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitDraftPage(event.currentTarget);
    }
  };

  return (
    <nav className="mt-16 flex flex-row items-center justify-center gap-2" aria-label="Pagination">
      <Button
        type="button"
        variant="ghost"
        aria-label="First page"
        disabled={isPending || isFirstPage}
        onClick={() => setPage(1)}>
        <FontAwesomeIcon icon={faAnglesLeft} className="lg:hidden" />
        <span className="hidden lg:inline">First</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Previous page"
        disabled={isPending || isFirstPage}
        onClick={() => setPage(page - 1)}>
        <FontAwesomeIcon icon={faAngleLeft} className="lg:hidden" />
        <span className="hidden lg:inline">Previous</span>
      </Button>
      <div className="flex flex-row items-center gap-2 text-sm">
        <input
          className="h-10 w-16 rounded-sm border border-foreground/30 shadow-md bg-white px-2 text-center text-sm disabled:cursor-not-allowed disabled:bg-foreground/5 outline-brand-blue"
          type="number"
          min="1"
          max={lastPage}
          key={page}
          defaultValue={page}
          disabled={isPending}
          onBlur={(event) => submitDraftPage(event.currentTarget)}
          onKeyDown={submitDraftPageOnEnter}
          aria-label="Current page" />
        <span className="whitespace-nowrap">
          of {lastPage}
        </span>
      </div>
      <Button
        type="button"
        variant="ghost"
        aria-label="Next page"
        disabled={isPending || isLastPage}
        onClick={() => setPage(page + 1)}>
        <span className="hidden lg:inline">Next</span>
        <FontAwesomeIcon icon={faAngleRight} className="lg:hidden" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Last page"
        disabled={isPending || isLastPage}
        onClick={() => setPage(lastPage)}>
        <span className="hidden lg:inline">Last</span>
        <FontAwesomeIcon icon={faAnglesRight} className="lg:hidden" />
      </Button>
    </nav>
  );
}
