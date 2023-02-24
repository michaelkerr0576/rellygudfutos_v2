import MuiContainer from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

type VerticalPadding = 'small' | 'medium' | 'large';

export interface ContainerProps {
  children: React.ReactNode;
  verticalPadding?: VerticalPadding;
}

export default function Container(props: ContainerProps): JSX.Element {
  const { children, verticalPadding = 'small' } = props;

  const theme = useTheme();

  const muiPadding = (): string => {
    switch (verticalPadding) {
      case 'large':
        return theme.spacing(3, 2);
      case 'medium':
        return theme.spacing(2, 2);
      case 'small':
      default:
        return theme.spacing(1, 2);
    }
  };

  return (
    <MuiContainer className="rgf_container" maxWidth={false} sx={{ padding: muiPadding() }}>
      {children}
    </MuiContainer>
  );
}
