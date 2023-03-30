// #region Common Interfaces
export interface Pagination {
  limit: number;
  page: number;
  pages: number;
  total: number;
  previous?: {
    limit: number;
    page: number;
  };
  next?: {
    limit: number;
    page: number;
  };
}
// #endregion
