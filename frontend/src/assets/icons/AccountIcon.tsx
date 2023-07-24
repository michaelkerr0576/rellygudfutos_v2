import MuiAccountBoxIcon from '@mui/icons-material/AccountBox';
import MuiAccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

import { IconProps } from './types/iconTypes';

export default function AccountIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiAccountBoxIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiAccountBoxOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
