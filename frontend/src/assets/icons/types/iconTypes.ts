type Color = 'primary' | 'secondary';
type Size = 'large' | 'medium' | 'small';
type Variant = 'filled' | 'outlined';

export interface IconProps {
  color?: Color;
  size?: Size;
  variant?: Variant;
}
