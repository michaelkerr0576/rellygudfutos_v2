import MuiCloseIcon from '@mui/icons-material/Close';

import { IconProps } from './types/iconTypes';

export default function CloseIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiCloseIcon fontSize={size} />;
}
