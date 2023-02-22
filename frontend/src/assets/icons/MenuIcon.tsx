import MuiMenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { IconProps } from './types/iconTypes';

export default function MenuIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiMenuRoundedIcon fontSize={size} />;
}
