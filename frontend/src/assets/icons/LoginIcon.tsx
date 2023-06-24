import MuiLoginIcon from '@mui/icons-material/Login';

import { IconProps } from './types/iconTypes';

export default function LoginIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiLoginIcon className="rgf-icon" fontSize={size} />;
}
