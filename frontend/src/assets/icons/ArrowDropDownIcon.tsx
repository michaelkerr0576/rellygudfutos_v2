import MuiArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MuiArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { IconProps } from './types/iconTypes';

type Type = 'open' | 'closed';

export interface ExpandIconProps extends IconProps {
  type: Type;
}

export default function ArrowDropDownIcon(props: ExpandIconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', type } = props;

  if (type === 'closed') {
    return <MuiArrowDropDownIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiArrowDropUpIcon className="rgf-icon" color={color} fontSize={size} />;
}
