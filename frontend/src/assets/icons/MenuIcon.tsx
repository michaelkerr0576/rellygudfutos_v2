import MuiMenuIcon from '@mui/icons-material/Menu';

import { IconProps } from './types/iconTypes';

export default function MenuIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiMenuIcon fontSize={size} />;
}
