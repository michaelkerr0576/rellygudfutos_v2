import MuiWorkRoundedIcon from '@mui/icons-material/WorkRounded';

import { IconProps } from './types/iconTypes';

export default function PortfolioIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiWorkRoundedIcon fontSize={size} />;
}
