import * as con from '@/utils/constants/sorting';

import * as enm from '../enums/db.enum';

export type QueryStatus = { status: enm.QueryStatus };

export type SortDirection = typeof con.ASCENDING | typeof con.DESCENDING;

// #region Photo Types
export type PhotoSortColumns = 'details.captureDate' | 'details.imageTitle';

export type PhotoSortColumnsWithDirection = { [Key in PhotoSortColumns]?: SortDirection };
// #endregion
