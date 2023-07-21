import MuiMoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { IconProps } from './types/iconTypes';

export default function MoreOptionsIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium' } = props;

  return <MuiMoreHorizIcon className="rgf-icon" color={color} fontSize={size} />;
}
