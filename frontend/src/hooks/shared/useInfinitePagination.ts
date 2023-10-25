import { RefObject, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { ApiResponsePaginated } from '@/types/api/data.types';

export interface UsePagination<T> {
  data: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  inViewRef: RefObject<any> | ((node?: Element | null) => void);
  limit?: number;
  nextPage?: number;
  page?: number;
  pages?: number;
  previousPage?: number;
  total?: number;
}

export default function usePagination<T>(
  fetchedPages: ApiResponsePaginated<T[]>[] | undefined,
  fetchNextPage: () => void,
): UsePagination<T> {
  const { ref: inViewRef, inView } = useInView({ threshold: 1 });

  const pagination = fetchedPages && fetchedPages[fetchedPages.length - 1]?.pagination;
  const total = pagination?.total;
  const limit = pagination?.limit;
  const page = pagination?.page;
  const pages = pagination?.pages;
  const hasNextPage = !!pagination?.next;
  const hasPreviousPage = !!pagination?.previous;
  const nextPage = pagination?.next?.page;
  const previousPage = pagination?.next?.page;

  const fetchedPagesData = useMemo((): T[] => {
    const hasPages = fetchedPages?.length;
    if (!hasPages) {
      return [];
    }

    let pagesData: T[] = [];

    fetchedPages.forEach((fetchedPage): void => {
      pagesData = [...pagesData, ...fetchedPage.data];
    });

    return pagesData;
  }, [fetchedPages?.length]);

  useEffect((): void => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return {
    data: fetchedPagesData,
    hasNextPage,
    hasPreviousPage,
    inViewRef,
    limit,
    nextPage,
    page,
    pages,
    previousPage,
    total,
  };
}
