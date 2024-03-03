import MuiArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { IconProps } from './types/iconTypes';

export default function ArrowDropDownIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium' } = props;

  return <MuiArrowDropDownIcon className="rgf-icon" color={color} fontSize={size} />;
}
