import MuiFilterAltIcon from '@mui/icons-material/FilterAlt';
import MuiFilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import MuiFilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import MuiFilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { IconProps } from './types/iconTypes';

type Type = 'on' | 'off';

export interface FilterIconProps extends IconProps {
  type: Type;
}

export default function FilterIcon(props: FilterIconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', type, variant = 'filled' } = props;

  if (type === 'on') {
    if (variant === 'filled') {
      return <MuiFilterAltIcon className="rgf-icon" color={color} fontSize={size} />;
    }

    return <MuiFilterAltOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  if (variant === 'filled') {
    return <MuiFilterAltOffIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiFilterAltOffOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
