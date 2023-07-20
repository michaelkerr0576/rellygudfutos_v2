import MuiExpandLessIcon from '@mui/icons-material/ExpandLess';
import MuiExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { IconProps } from './types/iconTypes';

type Type = 'more' | 'less';

export interface ExpandIconProps extends IconProps {
  type: Type;
}

export default function ExpandIcon(props: ExpandIconProps): JSX.Element {
  const { color = 'primary', size = 'medium', type } = props;

  if (type === 'more') {
    return <MuiExpandMoreIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiExpandLessIcon className="rgf-icon" color={color} fontSize={size} />;
}
