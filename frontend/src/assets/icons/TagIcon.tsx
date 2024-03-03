import MuiLocalOfferIcon from '@mui/icons-material/LocalOffer';
import MuiLocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import { IconProps } from './types/iconTypes';

export default function TagIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiLocalOfferIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiLocalOfferOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
