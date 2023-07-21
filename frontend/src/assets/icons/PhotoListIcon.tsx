import MuiViewDayIcon from '@mui/icons-material/ViewDay';
import MuiViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import { IconProps } from './types/iconTypes';

export default function PhotoListIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiViewDayIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiViewDayOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
