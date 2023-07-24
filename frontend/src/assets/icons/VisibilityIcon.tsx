import MuiVisibilityIcon from '@mui/icons-material/Visibility';
import MuiVisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MuiVisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import MuiVisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { IconProps } from './types/iconTypes';

type Type = 'on' | 'off';

export interface VisibilityIconProps extends IconProps {
  type: Type;
}

export default function VisibilityIcon(props: VisibilityIconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', type, variant = 'filled' } = props;

  if (type === 'on') {
    if (variant === 'filled') {
      return <MuiVisibilityIcon className="rgf-icon" color={color} fontSize={size} />;
    }

    return <MuiVisibilityOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  if (variant === 'filled') {
    return <MuiVisibilityOffIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiVisibilityOffOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
