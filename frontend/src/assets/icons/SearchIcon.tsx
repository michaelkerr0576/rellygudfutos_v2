import MuiSearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { IconProps } from './types/iconTypes';

export default function SearchIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiSearchRoundedIcon fontSize={size} />;
}
