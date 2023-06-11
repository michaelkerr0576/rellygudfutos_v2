import * as con from '@/utils/constants/sorting';

import * as enm from '../enums/db.enum';

export type PaginatedResponse = {
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
};

export type PaginationQuery = {
  endIndex: number;
  limit: number;
  page: number;
  startIndex: number;
};

export type QueryStatus = { status: enm.QueryStatus };

export type SortDirection = typeof con.ASCENDING | typeof con.DESCENDING;

export type RegexPattern = typeof RegExp;

// #region Photo Types
export type PhotosQuery = PaginationQuery & {
  filter: PhotosFilterColumnsWithPattern;
  sort: PhotosSortColumnsWithDirection | enm.PhotoSortOptions.RANDOM;
};

export type PhotosFilterColumnsWithPattern = {
  tags?: { _id: string[] };
  photographer?: { _id: string };
  $or?: [{ [Key in PhotosSearchColumns as any]?: RegexPattern }];
};

export type PhotosSearchColumns = 'caption' | 'location' | 'title';

export type PhotosSortColumns = 'captureDate' | 'title';

export type PhotosSortColumnsWithDirection = { [Key in PhotosSortColumns]?: SortDirection };
// #endregion
