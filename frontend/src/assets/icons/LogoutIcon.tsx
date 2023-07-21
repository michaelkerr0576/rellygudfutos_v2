import MuiLogoutIcon from '@mui/icons-material/Logout';

import { IconProps } from './types/iconTypes';

export default function LogoutIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium' } = props;

  return <MuiLogoutIcon className="rgf-icon" color={color} fontSize={size} />;
}
