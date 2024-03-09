import clsx from 'clsx';

import MuiContainer, { ContainerProps as MuiContainerProps } from '@mui/material/Container';

export interface ContainerProps {
  children: React.ReactNode;
  className?: MuiContainerProps['className'];
}

export default function Container(props: ContainerProps): JSX.Element {
  const { children, className = '' } = props;

  const containerStyles = clsx('rgf-container', {
    [className]: !!className,
  });

  return (
    <MuiContainer className={containerStyles} maxWidth={false}>
      {children}
    </MuiContainer>
  );
}
