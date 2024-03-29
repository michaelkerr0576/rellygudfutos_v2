import MuiDashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MuiDashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

import { IconProps } from './types/iconTypes';

export default function DashboardIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiDashboardCustomizeIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiDashboardCustomizeOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
