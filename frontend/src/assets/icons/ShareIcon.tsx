import MuiShareIcon from '@mui/icons-material/Share';
import MuiShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import { IconProps } from './types/iconTypes';

export default function ShareIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiShareIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiShareOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
