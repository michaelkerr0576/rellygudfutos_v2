import MuiAvatar from '@mui/material/Avatar';

export type Size = 'large' | 'medium' | 'small';

export interface AvatarProps {
  children: React.ReactNode;
  size?: Size;
}

export default function Avatar(props: AvatarProps): JSX.Element {
  const { children, size = 'medium' } = props;

  const muiStyle = (): { fontSize: string; height: number; width: number } => {
    switch (size) {
      case 'small':
        return { fontSize: '0.85rem', height: 20, width: 20 };
      case 'large':
        return { fontSize: '1.25rem', height: 32, width: 32 };
      case 'medium':
      default:
        return { fontSize: '0.95rem', height: 24, width: 24 };
    }
  };

  return (
    <MuiAvatar className="rgf_avatar" style={{ ...muiStyle() }}>
      {children}
    </MuiAvatar>
  );
}
