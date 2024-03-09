import clsx from 'clsx';

import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';

export interface ContainerProps {
  children: React.ReactNode;
  className?: MuiPaperProps['className'];
  elevation?: MuiPaperProps['elevation'];
  isSquare?: MuiPaperProps['square'];
}

export default function Paper(props: ContainerProps): JSX.Element {
  const { children, className = '', elevation = 3, isSquare = true } = props;

  const paperStyles = clsx('rgf-paper', {
    [className]: !!className,
  });

  return (
    <MuiPaper className={paperStyles} elevation={elevation} square={isSquare}>
      {children}
    </MuiPaper>
  );
}
