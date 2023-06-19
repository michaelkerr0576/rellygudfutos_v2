import { AxiosError } from 'axios';

// #region Data Types
export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiResponsePaginated<T> extends ApiResponse<T> {
  pagination: Pagination;
}

export interface Pagination {
  limit: number;
  next?: PaginationPreviousNext;
  page: number;
  pages: number;
  previous?: PaginationPreviousNext;
  total: number;
}

interface PaginationPreviousNext {
  limit: number;
  page: number;
}

export type ApiErrorResponse = AxiosError<ApiErrorResponseData>;

interface ApiErrorResponseData {
  message: string;
  stack: string;
}
// #endregion
