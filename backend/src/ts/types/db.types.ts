import * as con from '@/utils/constants/sorting';

import * as enm from '../enums/db.enum';

export type QueryStatus = { status: enm.QueryStatus };

export type SortDirection = typeof con.ASCENDING | typeof con.DESCENDING;

// #region Photo Types
export type PhotosQuery = {
  endIndex: number;
  filter: any; // TODO - fix type
  limit: number;
  page: number;
  sortBy: PhotosSortColumnsWithDirection | enm.PhotoSortOptions.RANDOM;
  startIndex: number;
};

export type PhotosSortColumns = 'details.captureDate' | 'details.imageTitle';

export type PhotosSortColumnsWithDirection = { [Key in PhotosSortColumns]?: SortDirection };
// #endregion
