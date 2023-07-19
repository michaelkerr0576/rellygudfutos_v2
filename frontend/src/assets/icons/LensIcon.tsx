import MuiPanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import { IconProps } from './types/iconTypes';

export default function LensIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiPanoramaFishEyeIcon className="rgf-icon" fontSize={size} />;
}
