import MuiCloseIcon from '@mui/icons-material/Close';

import { IconProps } from './types/iconTypes';

export default function CloseIcon(props: IconProps): JSX.Element {
  const { color = 'primary', size = 'medium' } = props;

  return <MuiCloseIcon className="rgf-icon" color={color} fontSize={size} />;
}
