import MuiPaper from '@mui/material/Paper';

export interface ContainerProps {
  children: React.ReactNode;
  elevation?: number;
}

export default function Paper(props: ContainerProps): JSX.Element {
  const { children, elevation } = props;

  return <MuiPaper elevation={elevation}>{children}</MuiPaper>;
}

Paper.defaultProps = {
  elevation: 3,
};
