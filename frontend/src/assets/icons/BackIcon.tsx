import MuiArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { IconProps } from './types/iconTypes';

export default function BackIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiArrowBackIosIcon className="rgf-icon" fontSize={size} />;
}
