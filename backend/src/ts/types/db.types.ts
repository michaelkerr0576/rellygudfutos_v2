import * as con from '@/utils/constants/sorting';

import * as enm from '../enums/db.enum';

export type QueryStatus = { status: enm.QueryStatus };

export type SortDirection = typeof con.ASCENDING | typeof con.DESCENDING;

// #region Photo Types
export type PhotosQuery = {
  endIndex: number;
  limit: number;
  page: number;
  search: any; // TODO - fix type
  sortBy: PhotosSortColumnsWithDirection;
  startIndex: number;
  tags: any; // TODO - fix type
};

export type PhotosSortColumns = 'details.captureDate' | 'details.imageTitle';

export type PhotosSortColumnsWithDirection = { [Key in PhotosSortColumns]?: SortDirection };
// #endregion
