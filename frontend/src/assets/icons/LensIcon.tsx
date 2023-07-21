import MuiPanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import { IconProps } from './types/iconTypes';

export default function LensIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium' } = props;

  return <MuiPanoramaFishEyeIcon className="rgf-icon" color={color} fontSize={size} />;
}
