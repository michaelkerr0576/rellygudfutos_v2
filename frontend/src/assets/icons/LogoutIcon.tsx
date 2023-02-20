import MuiLogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { IconProps } from './types/iconTypes';

export default function LogoutIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiLogoutRoundedIcon fontSize={size} />;
}
