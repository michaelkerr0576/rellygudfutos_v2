import MuiPersonIcon from '@mui/icons-material/Person';
import MuiPerson2OutlinedIcon from '@mui/icons-material/Person2Outlined';

import { IconProps } from './types/iconTypes';

export default function PersonIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiPersonIcon className="rgf-icon" fontSize={size} />;
  }

  return <MuiPerson2OutlinedIcon className="rgf-icon" fontSize={size} />;
}
