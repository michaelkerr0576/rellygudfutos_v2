import MuiBrightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';

import { IconProps } from './types/iconTypes';

export default function ToggleLightModeIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiBrightness7RoundedIcon fontSize={size} />;
}
