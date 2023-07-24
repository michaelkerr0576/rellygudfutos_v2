import MuiLockIcon from '@mui/icons-material/Lock';
import MuiLockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { IconProps } from './types/iconTypes';

export default function LockIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiLockIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiLockOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
