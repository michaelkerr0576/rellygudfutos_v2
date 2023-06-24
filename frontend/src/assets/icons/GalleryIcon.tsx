import MUiPhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MuiPhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';

import { IconProps } from './types/iconTypes';

export default function GalleryIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MUiPhotoLibraryIcon className="rgf-icon" fontSize={size} />;
  }

  return <MuiPhotoLibraryOutlinedIcon className="rgf-icon" fontSize={size} />;
}
