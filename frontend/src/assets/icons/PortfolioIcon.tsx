import MuiWorkIcon from '@mui/icons-material/Work';
import MuiWorkOutlineIcon from '@mui/icons-material/WorkOutline';

import { IconProps } from './types/iconTypes';

export default function PortfolioIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiWorkIcon fontSize={size} />;
  }

  return <MuiWorkOutlineIcon fontSize={size} />;
}
