import MuiShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { IconProps } from './types/iconTypes';

export default function CartIcon(props: IconProps): JSX.Element {
  const { color = 'inherit', size = 'medium', variant = 'filled' } = props;

  if (variant === 'filled') {
    return <MuiShoppingCartIcon className="rgf-icon" color={color} fontSize={size} />;
  }

  return <MuiShoppingCartOutlinedIcon className="rgf-icon" color={color} fontSize={size} />;
}
