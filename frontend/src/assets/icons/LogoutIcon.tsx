import MuiLogoutIcon from '@mui/icons-material/Logout';

import { IconProps } from './types/iconTypes';

export default function LogoutIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiLogoutIcon className="rgf-icon" fontSize={size} />;
}
