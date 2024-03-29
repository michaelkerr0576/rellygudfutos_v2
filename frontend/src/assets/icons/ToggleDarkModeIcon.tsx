import MuiBrightness4Icon from '@mui/icons-material/Brightness4';
import MuiBrightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import MuiBrightness7Icon from '@mui/icons-material/Brightness7';
import MuiBrightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';

import { IconProps } from './types/iconTypes';

type Type = 'dark' | 'light';

export interface ToggleDarkModeIconProps extends IconProps {
  type: Type;
}

export default function ToggleDarkModeIcon(props: ToggleDarkModeIconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', type, variant = 'filled' } = props;

  if (type === 'dark') {
    if (variant === 'filled') {
      return <MuiBrightness4Icon className="rgf-icon" color={color} fontSize={size} />;
    }

    return <MuiBrightness4OutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  if (variant === 'filled') {
    return <MuiBrightness7Icon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiBrightness7OutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
