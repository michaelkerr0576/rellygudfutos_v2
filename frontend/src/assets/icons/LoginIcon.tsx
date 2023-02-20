import MuiLoginRoundedIcon from '@mui/icons-material/LoginRounded';

import { IconProps } from './types/iconTypes';

export default function LoginIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiLoginRoundedIcon fontSize={size} />;
}
