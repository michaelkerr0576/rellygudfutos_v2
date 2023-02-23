import MuiBrightness4Icon from '@mui/icons-material/Brightness4';
import MuiBrightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import MuiBrightness7Icon from '@mui/icons-material/Brightness7';
import MuiBrightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';

import { IconProps } from './types/iconTypes';

type Mode = 'dark' | 'light';

export interface ToggleDarkModeIconProps extends IconProps {
  mode: Mode;
}

export default function ToggleDarkModeIcon(props: ToggleDarkModeIconProps): JSX.Element {
  const { size = 'medium', mode, variant = 'outlined' } = props;

  if (mode === 'dark') {
    if (variant === 'filled') {
      return <MuiBrightness4Icon fontSize={size} />;
    }

    return <MuiBrightness4OutlinedIcon fontSize={size} />;
  }

  if (variant === 'filled') {
    return <MuiBrightness7Icon fontSize={size} />;
  }

  return <MuiBrightness7OutlinedIcon fontSize={size} />;
}
