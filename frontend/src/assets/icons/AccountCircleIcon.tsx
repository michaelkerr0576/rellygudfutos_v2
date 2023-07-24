import MuiAccountCircleIcon from '@mui/icons-material/AccountCircle';
import MuiAccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { IconProps } from './types/iconTypes';

export default function AccountCircleIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiAccountCircleIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiAccountCircleOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
