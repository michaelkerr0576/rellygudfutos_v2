import MuiSavedSearchIcon from '@mui/icons-material/SavedSearch';
import MuiSearchIcon from '@mui/icons-material/Search';

import { IconProps } from './types/iconTypes';

export default function SearchIcon(props: IconProps): JSX.Element {
  const { size = 'medium', variant = 'outlined' } = props;

  if (variant === 'filled') {
    return <MuiSavedSearchIcon fontSize={size} />;
  }

  return <MuiSearchIcon fontSize={size} />;
}
