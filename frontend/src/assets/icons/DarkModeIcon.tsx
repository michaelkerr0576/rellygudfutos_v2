import MuiDarkModeIcon from '@mui/icons-material/DarkMode';
import MuiDarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import { IconProps } from './types/iconTypes';

export default function DarkModeIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiDarkModeIcon className="rgf-icon" fontSize={size} />;
  }

  return <MuiDarkModeOutlinedIcon className="rgf-icon" fontSize={size} />;
}
