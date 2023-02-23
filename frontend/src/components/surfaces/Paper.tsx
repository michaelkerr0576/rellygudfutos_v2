import MuiPaper from '@mui/material/Paper';

export interface ContainerProps {
  children: React.ReactNode;
  elevation?: number;
}

export default function Paper(props: ContainerProps): JSX.Element {
  const { children, elevation = 3 } = props;

  return (
    <MuiPaper className="rgf_paper" elevation={elevation}>
      {children}
    </MuiPaper>
  );
}
