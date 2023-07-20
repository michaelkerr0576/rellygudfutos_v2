import MuiPlaceIcon from '@mui/icons-material/Place';
import MuiPlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import { IconProps } from './types/iconTypes';

export default function LocationIcon(props: IconProps): JSX.Element {
  const { color = 'primary', size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiPlaceIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiPlaceOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
