import MuiViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import { IconProps } from './types/iconTypes';

export default function PhotoListIcon(props: IconProps): JSX.Element {
  const { size = 'medium' } = props;

  return <MuiViewDayOutlinedIcon fontSize={size} />;
}
