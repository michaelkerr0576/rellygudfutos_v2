import MuiCameraAltIcon from '@mui/icons-material/CameraAlt';
import MuiCameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import { IconProps } from './types/iconTypes';

export default function CameraIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiCameraAltIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiCameraAltOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
