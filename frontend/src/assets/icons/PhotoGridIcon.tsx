import MuiGridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';

import { IconProps } from './types/iconTypes';

export default function PhotoGridIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiGridOnOutlinedIcon fontSize={size} />;
}
