import MuiGalleryIcon from '@mui/icons-material/PhotoLibraryRounded';

import { IconProps } from './types/iconTypes';

export default function GalleryIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiGalleryIcon fontSize={size} />;
}
