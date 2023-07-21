import MUiPhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MuiPhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';

import { IconProps } from './types/iconTypes';

export default function GalleryIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MUiPhotoLibraryIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiPhotoLibraryOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
