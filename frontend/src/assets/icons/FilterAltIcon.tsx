import MuiTuneIcon from '@mui/icons-material/Tune';

import { IconProps } from './types/iconTypes';

export default function FilterAltIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium' } = props;

  return <MuiTuneIcon className="rgf-icon" color={color} fontSize={size} />;
}
