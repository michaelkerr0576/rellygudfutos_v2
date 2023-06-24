import MuiViewDayIcon from '@mui/icons-material/ViewDay';
import MuiViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import { IconProps } from './types/iconTypes';

export default function PhotoListIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiViewDayIcon className="rgf-icon" fontSize={size} />;
  }

  return <MuiViewDayOutlinedIcon className="rgf-icon" fontSize={size} />;
}
