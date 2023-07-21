import MuiCameraIcon from '@mui/icons-material/Camera';
import MuiCameraOutlinedIcon from '@mui/icons-material/CameraOutlined';

import { IconProps } from './types/iconTypes';

export default function ApertureIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiCameraIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiCameraOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
