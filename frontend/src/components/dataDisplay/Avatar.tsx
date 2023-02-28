import MuiAvatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

export interface AvatarProps {
  children: React.ReactNode;
}

const StyledMuiAvatar = styled(MuiAvatar)((): { [key: string]: any } => ({
  fontSize: '1rem',
  height: 34,
  width: 34,
}));

export default function Avatar(props: AvatarProps): JSX.Element {
  const { children } = props;

  return <StyledMuiAvatar className="rgf_avatar">{children}</StyledMuiAvatar>;
}
