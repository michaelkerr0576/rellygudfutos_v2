import MuiAppsIcon from '@mui/icons-material/Apps';
import MuiGridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';

import { IconProps } from './types/iconTypes';

export default function PhotoGridIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiAppsIcon fontSize={size} />;
  }

  return <MuiGridOnOutlinedIcon fontSize={size} />;
}
