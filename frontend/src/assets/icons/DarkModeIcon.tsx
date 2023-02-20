import MuiDarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

import { IconProps } from './types/iconTypes';

export default function DarkModeIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiDarkModeRoundedIcon fontSize={size} />;
}
