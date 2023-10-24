import * as con from '@/constants/sorting.constants';

import * as enm from '../enums/db.enum';

export type PaginatedResponse = {
  limit: number;
  next?: PaginationPreviousNext;
  page: number;
  pages: number;
  previous?: PaginationPreviousNext;
  total: number;
};

interface PaginationPreviousNext {
  limit: number;
  page: number;
}

export type PaginationQuery = {
  endIndex: number;
  limit: number;
  page: number;
  startIndex: number;
};

export type QueryStatus = { status: enm.QueryStatus };

export type SortDirection = typeof con.ASCENDING | typeof con.DESCENDING;

// #region Photo Types
export type PhotosQuery = PaginationQuery & {
  filter: PhotosFilterColumnsWithPattern;
  sort: PhotosSortColumnsWithDirection | enm.PhotoSortOptions.RANDOM;
};

export type PhotosFilterColumnsWithPattern = {
  photographer?: { _id: string };
  tags?: { $in: string[] };
  $or?: [{ caption: { $regex: RegExp } }, { location: { $regex: RegExp } }, { title: { $regex: RegExp } }];
};

export type PhotosSearchColumns = 'caption' | 'location' | 'title';

export type PhotosSortColumns = 'captureDate' | 'title';

export type PhotosSortColumnsWithDirection = { [Key in PhotosSortColumns]?: SortDirection };
// #endregion
