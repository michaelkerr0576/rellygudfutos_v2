import MuiDashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';

import { IconProps } from './types/iconTypes';

export default function DashboardIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiDashboardCustomizeRoundedIcon fontSize={size} />;
}
