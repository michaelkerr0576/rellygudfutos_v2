import MuiMenuIcon from '@mui/icons-material/Menu';
import MuiMenuOpenIcon from '@mui/icons-material/MenuOpen';

import { IconProps } from './types/iconTypes';

export default function MenuIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiMenuOpenIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiMenuIcon className="rgf-icon" color={color} fontSize={size} />;
}
