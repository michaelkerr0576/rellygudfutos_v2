import MuiCameraIcon from '@mui/icons-material/Camera';
import MuiCameraOutlinedIcon from '@mui/icons-material/CameraOutlined';

import { IconProps } from './types/iconTypes';

export default function ApertureIcon(props: IconProps): JSX.Element {
  const { color = 'primary', size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiCameraIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiCameraOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
