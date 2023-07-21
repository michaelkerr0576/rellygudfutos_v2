import MuiShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

import { IconProps } from './types/iconTypes';

export default function ShutterSpeedIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium' } = props;

  return <MuiShutterSpeedIcon className="rgf-icon" color={color} fontSize={size} />;
}
