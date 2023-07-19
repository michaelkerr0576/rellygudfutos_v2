import MuiFlareIcon from '@mui/icons-material/Flare';

import { IconProps } from './types/iconTypes';

export default function FocalLengthIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiFlareIcon className="rgf-icon" fontSize={size} />;
}
