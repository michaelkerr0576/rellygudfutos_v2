import MuiShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

import { IconProps } from './types/iconTypes';

export default function ShutterSpeedIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiShutterSpeedIcon className="rgf-icon" fontSize={size} />;
}
