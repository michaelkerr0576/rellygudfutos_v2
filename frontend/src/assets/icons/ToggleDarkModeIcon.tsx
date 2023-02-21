import MuiBrightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';

import { IconProps } from './types/iconTypes';

export default function ToggleDarkModeIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiBrightness4RoundedIcon fontSize={size} />;
}
