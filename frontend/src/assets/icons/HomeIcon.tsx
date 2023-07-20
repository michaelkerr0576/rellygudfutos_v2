import MuiHomeIcon from '@mui/icons-material/Home';
import MuiHomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { IconProps } from './types/iconTypes';

export default function HomeIcon(props: IconProps): JSX.Element {
  const { color = 'primary', size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiHomeIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiHomeOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
