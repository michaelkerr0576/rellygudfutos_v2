import MuiWorkIcon from '@mui/icons-material/Work';
import MuiWorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

import { IconProps } from './types/iconTypes';

export default function PortfolioIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiWorkIcon fontSize={size} />;
  }

  return <MuiWorkOutlineOutlinedIcon fontSize={size} />;
}
