import MuiLightModeIcon from '@mui/icons-material/LightMode';
import MuiLightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import { IconProps } from './types/iconTypes';

export default function LightIcon(props: IconProps): JSX.Element {
  const { color = 'primary', size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiLightModeIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiLightModeOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
