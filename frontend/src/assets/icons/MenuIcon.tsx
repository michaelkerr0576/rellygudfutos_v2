import MuiMenuIcon from '@mui/icons-material/Menu';
import MuiMenuOpenIcon from '@mui/icons-material/MenuOpen';

import { IconProps } from './types/iconTypes';

export default function MenuIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiMenuOpenIcon className="rgf-icon" fontSize={size} />;
  }

  return <MuiMenuIcon className="rgf-icon" fontSize={size} />;
}
