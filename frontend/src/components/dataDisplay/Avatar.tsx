import clsx from 'clsx';

import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

export type Size = 'large' | 'medium' | 'small';

export interface AvatarProps {
  children: React.ReactNode;
  className?: MuiAvatarProps['className'];
  size?: Size;
}

const StyledMuiAvatar = styled(MuiAvatar)((): { [key: string]: any } => ({
  '&.rgf': {
    '&-avatar': {
      '&--large': {
        fontSize: '1.25rem',
        height: 32,
        width: 32,
      },
      '&--medium': {
        fontSize: '0.95rem',
        height: 24,
        width: 24,
      },
      '&--small': {
        fontSize: '0.85rem',
        height: 20,
        width: 20,
      },
    },
  },
}));

export default function Avatar(props: AvatarProps): JSX.Element {
  const { children, className = '', size = 'medium' } = props;

  const avatarStyles = clsx('rgf-avatar', `rgf-avatar--${size}`, {
    [className]: !!className,
  });

  return <StyledMuiAvatar className={avatarStyles}>{children}</StyledMuiAvatar>;
}
