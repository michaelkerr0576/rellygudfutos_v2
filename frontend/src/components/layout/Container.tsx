import MuiContainer from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export interface ContainerProps {
  children: React.ReactNode;
}

const StyledMuiContainer = styled(MuiContainer)(({ theme }): { [key: string]: string } => ({
  padding: theme.spacing(1, 2),
}));

export default function Container(props: ContainerProps): JSX.Element {
  const { children } = props;

  return <StyledMuiContainer maxWidth={false}>{children}</StyledMuiContainer>;
}
